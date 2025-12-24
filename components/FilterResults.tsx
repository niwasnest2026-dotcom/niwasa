'use client';

import { useState } from 'react';
import { 
  FaFilter, 
  FaRupeeSign, 
  FaStar, 
  FaMapMarkerAlt, 
  FaSort, 
  FaChevronDown,
  FaTimes
} from 'react-icons/fa';

interface FilterResultsProps {
  totalResults?: number;
  currentFilters?: {
    priceRange?: string;
    rating?: string;
    location?: string;
    sortBy?: string;
  };
  onFilterChange?: (filters: any) => void;
}

const priceRanges = [
  { label: '₹5,000 - ₹10,000', value: '5000-10000' },
  { label: '₹10,000 - ₹15,000', value: '10000-15000' },
  { label: '₹15,000 - ₹25,000', value: '15000-25000' },
  { label: '₹25,000 - ₹35,000', value: '25000-35000' },
  { label: '₹35,000 - ₹50,000', value: '35000-50000' },
  { label: '₹50,000+', value: '50000+' }
];

const ratingOptions = [
  { label: '4+ Stars', value: '4+' },
  { label: '3+ Stars', value: '3+' },
  { label: '2+ Stars', value: '2+' },
  { label: 'Any Rating', value: 'any' }
];

const cities = [
  'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Most Popular', value: 'popular' }
];

export default function FilterResults({ 
  totalResults = 0, 
  currentFilters = {}, 
  onFilterChange 
}: FilterResultsProps) {
  const [filters, setFilters] = useState({
    priceRange: currentFilters.priceRange || '5000-10000',
    rating: currentFilters.rating || '4+',
    location: currentFilters.location || 'Bangalore',
    sortBy: currentFilters.sortBy || 'price-asc'
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilter = (key: string) => {
    const newFilters = { ...filters, [key]: '' };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <FaFilter className="text-white text-sm sm:text-base" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-800">Filter & Sort</h2>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
            <FaRupeeSign className="text-green-500" />
            <span>Price Range</span>
          </label>
          <div className="relative">
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full p-3 pr-10 border-2 border-neutral-200 rounded-xl bg-white text-sm sm:text-base focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 appearance-none"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span>Rating</span>
          </label>
          <div className="relative">
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full p-3 pr-10 border-2 border-yellow-200 rounded-xl bg-white text-sm sm:text-base focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 appearance-none"
              style={{ borderColor: '#f59e0b', borderWidth: '2px' }}
            >
              {ratingOptions.map((rating) => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Location</span>
          </label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-3 pr-10 border-2 border-neutral-200 rounded-xl bg-white text-sm sm:text-base focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all duration-300 appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
            <FaSort className="text-blue-500" />
            <span>Sort By</span>
          </label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full p-3 pr-10 border-2 border-neutral-200 rounded-xl bg-white text-sm sm:text-base focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-neutral-200">
        <p className="text-sm sm:text-base text-neutral-600 text-center">
          <span className="font-semibold text-neutral-800">Showing {totalResults}</span> of <span className="font-semibold">5 properties</span>
        </p>
      </div>
    </div>
  );
}