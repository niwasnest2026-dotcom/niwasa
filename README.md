# 🏠 Niwas Nest - PG & Hostel Booking Platform

A modern, full-stack web application for booking PGs, hostels, and co-living spaces across India with zero brokerage fees.

## 🚀 Live Demo

- **Website**: Coming Soon
- **Test Payment**: Available in development mode

## ✨ Features

### 🏡 Property Management
- **Sample Properties**: 6 beautiful sample properties with real images
- **Property Cards**: Responsive property cards with ratings, amenities, and pricing
- **Search & Filter**: Advanced search with location, price, and rating filters
- **Property Details**: Detailed property pages with image galleries

### 💳 Payment Integration
- **Razorpay Integration**: Complete payment gateway integration
- **Secure Payments**: Payment signature verification and secure transactions
- **Test Mode**: Full test environment with test cards
- **Booking Management**: Complete booking flow with status tracking

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first responsive design
- **Glass Morphism**: Modern glass-effect UI components
- **Smooth Animations**: Hover effects and smooth transitions
- **Performance Optimized**: Fast loading with optimized images and code

### 🔐 Backend & Database
- **Supabase Integration**: PostgreSQL database with real-time features
- **Authentication**: User authentication and profile management
- **Admin Panel**: Property and booking management
- **API Routes**: RESTful API for all operations

## 🛠️ Tech Stack

### Frontend
- **Next.js 13.5.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library

### Backend
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Next.js API Routes** - Serverless API endpoints
- **Razorpay** - Payment gateway integration

### Deployment
- **GitHub** - Version control and CI/CD
- **Self-hosted** - Ready for deployment on any platform

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/niwasnest2026-dotcom/niwasa.git
   cd niwasa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Razorpay Configuration
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📱 Key Pages

- **Home** (`/`) - Landing page with featured properties
- **Properties** (`/test-properties`) - Browse all available properties
- **Payment Test** (`/test-payment`) - Test payment integration
- **About** (`/about`) - About the platform
- **Contact** (`/contact`) - Contact information

## 💳 Payment Testing

Use these test cards in development mode:

| Card Number | Result | CVV | Expiry |
|-------------|--------|-----|--------|
| 4111 1111 1111 1111 | ✅ Success | 123 | Any future |
| 4000 0000 0000 0002 | ❌ Declined | 123 | Any future |
| 5555 5555 5555 4444 | ✅ Success | 123 | Any future |

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── payment/           # Payment pages
│   └── test-payment/      # Payment testing
├── components/            # React components
│   ├── BookingForm.tsx    # Booking form component
│   ├── PaymentButton.tsx  # Payment integration
│   └── PropertyCard.tsx   # Property display cards
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration with performance optimizations
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 📊 Performance Features

- **Server Start Time**: Reduced from 23s to 6.8s
- **Bundle Optimization**: SWC minification and code splitting
- **Image Optimization**: WebP and AVIF format support
- **CSS Optimization**: Optimized Tailwind CSS build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: niwasnest2026@gmail.com
- **Phone**: +91 63048 09598
- **GitHub Issues**: [Create an issue](https://github.com/niwasnest2026-dotcom/niwasa/issues)

## 🎯 Roadmap

- [ ] Email notifications for bookings
- [ ] SMS notifications
- [ ] Advanced property filters
- [ ] User reviews and ratings
- [ ] Property owner dashboard
- [ ] Mobile app development

---

**Made with ❤️ in India**

*Niwas Nest - Your trusted partner in finding the perfect home away from home*