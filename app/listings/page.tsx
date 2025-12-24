'use client';

import LayoutWrapper from '@/components/LayoutWrapper';
import FeaturedProperties from '@/components/FeaturedProperties';
import SearchForm from '@/components/SearchForm';

export default function ListingsPage() {
  return (
    <LayoutWrapper showSidebar={true}>
      <div className="p-6 space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 text-shadow">
            Browse Properties
          </h1>
          <p className="text-neutral-600 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Discover your perfect stay from our curated collection of properties
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-6xl mx-auto">
          <SearchForm />
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto">
          <FeaturedProperties />
        </div>
      </div>
    </LayoutWrapper>
  );
}