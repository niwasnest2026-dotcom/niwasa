import SearchForm from '@/components/SearchForm';
import FeaturedProperties from '@/components/FeaturedProperties';

export default function Home() {
  return (
    <div className="pt-4">
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-900 text-shadow">
            Find safe, affordable
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">PGs & Hostels</span> near you
          </h2>
          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto font-medium leading-relaxed">
            Book trusted student housing and coliving spaces across India with zero brokerage.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 pb-4">
          <SearchForm />
        </div>
      </section>

      <section className="pt-2 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 text-shadow">
              Available Properties
            </h2>
            <p className="text-neutral-600 text-xl font-medium">
              Browse our latest listings
            </p>
          </div>

          <FeaturedProperties />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 text-shadow">
              Why Choose Us?
            </h2>
            <p className="text-neutral-600 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              We make finding your perfect home away from home simple, secure, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="glass-card p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 card-hover">
              <div className="w-24 h-24 glass-badge rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">🏠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Verified Properties</h3>
              <p className="text-neutral-600 font-medium text-lg leading-relaxed">
                All listings are personally verified to ensure quality and safety for our users.
              </p>
            </div>

            <div className="glass-card p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 card-hover">
              <div className="w-24 h-24 glass-badge rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Zero Brokerage</h3>
              <p className="text-neutral-600 font-medium text-lg leading-relaxed">
                Book directly with property owners without paying any brokerage fees.
              </p>
            </div>

            <div className="glass-card p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 card-hover">
              <div className="w-24 h-24 glass-badge rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Secure Booking</h3>
              <p className="text-neutral-600 font-medium text-lg leading-relaxed">
                Safe and secure payment process with instant booking confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
