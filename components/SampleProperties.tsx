'use client';

import PropertyCard from './PropertyCard';

// Sample properties for demonstration
const sampleProperties = [
  {
    id: '1',
    name: 'Cozy PG in Koramangala',
    title: 'Cozy PG in Koramangala',
    description: 'Fully furnished PG with all amenities in the heart of Koramangala',
    price: 12000,
    city: 'Bangalore',
    area: 'Koramangala',
    rating: 4.5,
    created_at: new Date().toISOString(),
    property_type: 'PG',
    featured_image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
    amenities: [],
    images: [],
    address: 'Koramangala, Bangalore',
    original_price: 15000,
    security_deposit: 24000,
    available_months: 12,
    review_count: 25,
    instant_book: true,
    verified: true,
    secure_booking: true
  },
  {
    id: '2',
    name: 'Modern Hostel in HSR Layout',
    title: 'Modern Hostel in HSR Layout',
    description: 'Premium hostel with modern facilities and great connectivity',
    price: 15000,
    city: 'Bangalore',
    area: 'HSR Layout',
    rating: 4.3,
    created_at: new Date().toISOString(),
    property_type: 'Hostel',
    featured_image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
    amenities: [],
    images: [],
    address: 'HSR Layout, Bangalore',
    original_price: 18000,
    security_deposit: 30000,
    available_months: 12,
    review_count: 18,
    instant_book: true,
    verified: true,
    secure_booking: true
  },
  {
    id: '3',
    name: 'Affordable PG in Whitefield',
    title: 'Affordable PG in Whitefield',
    description: 'Budget-friendly PG near IT parks with good amenities',
    price: 9000,
    city: 'Bangalore',
    area: 'Whitefield',
    rating: 4.1,
    created_at: new Date().toISOString(),
    property_type: 'PG',
    featured_image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    amenities: [],
    images: [],
    address: 'Whitefield, Bangalore',
    original_price: 11000,
    security_deposit: 18000,
    available_months: 12,
    review_count: 32,
    instant_book: false,
    verified: true,
    secure_booking: true
  },
  {
    id: '4',
    name: 'Luxury Co-living in Indiranagar',
    title: 'Luxury Co-living in Indiranagar',
    description: 'Premium co-living space with all modern amenities',
    price: 25000,
    city: 'Bangalore',
    area: 'Indiranagar',
    rating: 4.8,
    created_at: new Date().toISOString(),
    property_type: 'Co-living',
    featured_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    amenities: [],
    images: [],
    address: 'Indiranagar, Bangalore',
    original_price: 30000,
    security_deposit: 50000,
    available_months: 12,
    review_count: 15,
    instant_book: true,
    verified: true,
    secure_booking: true
  },
  {
    id: '5',
    name: 'Student Hostel in BTM Layout',
    title: 'Student Hostel in BTM Layout',
    description: 'Perfect for students with study rooms and high-speed internet',
    price: 8500,
    city: 'Bangalore',
    area: 'BTM Layout',
    rating: 4.2,
    created_at: new Date().toISOString(),
    property_type: 'Hostel',
    featured_image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    amenities: [],
    images: [],
    address: 'BTM Layout, Bangalore',
    original_price: 10000,
    security_deposit: 17000,
    available_months: 12,
    review_count: 28,
    instant_book: true,
    verified: true,
    secure_booking: true
  },
  {
    id: '6',
    name: 'Executive PG in Electronic City',
    title: 'Executive PG in Electronic City',
    description: 'Professional PG for working executives with premium facilities',
    price: 18000,
    city: 'Bangalore',
    area: 'Electronic City',
    rating: 4.6,
    created_at: new Date().toISOString(),
    property_type: 'PG',
    featured_image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
    amenities: [],
    images: [],
    address: 'Electronic City, Bangalore',
    original_price: 22000,
    security_deposit: 36000,
    available_months: 12,
    review_count: 22,
    instant_book: true,
    verified: true,
    secure_booking: true
  }
];

export default function SampleProperties() {
  return (
    <div className="space-y-6">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}