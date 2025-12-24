'use client';

import { useEffect, useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import SampleProperties from './SampleProperties';
import { supabase } from '@/lib/supabase';
import type { PropertyWithDetails } from '@/types/database';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
  { label: '₹30,000+', min: 30000, max: Infinity },
];

const ratingFilters = [
  { label: 'All Ratings', min: 0 },
  { label: '4+ Stars', min: 4 },
  { label: '3+ Stars', min: 3 },
  { label: '2+ Stars', min: 2 },
];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
];

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<PropertyWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [selectedRating, setSelectedRating] = useState(ratingFilters[0]);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('newest');
  const [locations, setLocations] = useState<string[]>([]);
  const [hasDbError, setHasDbError] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setHasDbError(false);

        // Optimized query - fetch only essential data first
        const { data, error } = await supabase
          .from('properties')
          .select(`
            id,
            name,
            description,
            price,
            city,
            area,
            rating,
            created_at,
            property_type,
            featured_image
          `)
          .order('created_at', { ascending: false })
          .limit(8); // Reduced from 12 to 8 for faster loading

        if (error) {
          console.error('Database error:', error);
          setHasDbError(true);
          return;
        }

        // Set properties without heavy relations first
        const basicProperties = data?.map((property: any) => ({
          ...property,
          title: property.name, // Map name to title for compatibility
          amenities: [], // Load amenities lazily when needed
          images: [], // Load images lazily when needed
        })) || [];

        setProperties(basicProperties);
        
        // Extract unique locations
        const uniqueLocations = Array.from(new Set(
          basicProperties.map(p => p.city).filter(Boolean)
        ));
        setLocations(['All Locations', ...uniqueLocations]);
        
      } catch (error) {
        console.error('Error fetching properties:', error);
        setHasDbError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Memoize filtered properties to avoid recalculation on every render
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Apply price filter
    if (selectedPriceRange.min > 0 || selectedPriceRange.max < Infinity) {
      filtered = filtered.filter(property => {
        const price = property.price;
        return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      });
    }

    // Apply rating filter
    if (selectedRating.min > 0) {
      filtered = filtered.filter(property => 
        property.rating && property.rating >= selectedRating.min
      );
    }

    // Apply location filter
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(property => property.city === selectedLocation);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    }

    return filtered;
  }, [properties, selectedPriceRange, selectedRating, selectedLocation, sortBy]);

  // --- OPTIMIZED LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-3 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-3 border-rose-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-3 text-gray-500 font-medium">Loading properties...</p>
      </div>
    );
  }

  // --- SHOW SAMPLE DATA IF NO DATABASE DATA OR ERROR ---
  if (hasDbError || properties.length === 0) {
    return (
      <div className="space-y-6">
        {hasDbError && (
          <div className="text-center py-4 px-6 rounded-lg bg-blue-50 border border-blue-200 mx-auto max-w-xl mb-6">
            <div className="text-2xl mb-2">🏠</div>
            <p className="text-blue-800 font-medium">Showing sample properties</p>
            <p className="text-blue-600 text-sm">Database connection in progress...</p>
          </div>
        )}
        <SampleProperties />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Optimized Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* No Results State */}
      {filteredProperties.length === 0 && properties.length > 0 && (
        <div className="text-center py-12 px-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 shadow-sm mx-auto max-w-xl">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No properties match your filters</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria to see more results.</p>
          <button
            onClick={() => {
              setSelectedPriceRange(priceRanges[0]);
              setSelectedRating(ratingFilters[0]);
              setSelectedLocation('All Locations');
              setSortBy('newest');
            }}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-rose-600 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}