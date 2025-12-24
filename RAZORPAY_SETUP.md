# Razorpay Integration Setup Guide

## 🚀 Complete Razorpay Payment Integration for Niwas Nest

This guide will help you set up Razorpay payment integration for your PG & Hostel booking platform.

## 📋 Prerequisites

1. **Razorpay Account**: Sign up at [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. **API Keys**: Get your Test/Live API keys from Razorpay Dashboard
3. **Environment Variables**: Configure your `.env.local` file

## 🔧 Setup Steps

### Step 1: Get Razorpay API Keys

1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **API Keys**
3. Generate/Copy your:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this secure!)

### Step 2: Configure Environment Variables

Create/Update your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Step 3: Test the Integration

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Test Payment Flow**:
   - Visit a property page
   - Fill booking form
   - Proceed to payment
   - Use Razorpay test cards

## 💳 Test Cards for Development

Use these test card details in development mode:

| Card Number | CVV | Expiry | Result |
|-------------|-----|--------|--------|
| 4111 1111 1111 1111 | 123 | Any future date | Success |
| 4000 0000 0000 0002 | 123 | Any future date | Declined |
| 5555 5555 5555 4444 | 123 | Any future date | Success |

## 🏗️ Integration Components

### 1. **API Routes**
- ✅ `/api/payment/create-order` - Creates Razorpay order
- ✅ `/api/payment/verify` - Verifies payment signature

### 2. **Components**
- ✅ `PaymentButton` - Handles payment initiation
- ✅ `BookingForm` - Collects booking details
- ✅ Payment success page

### 3. **Hooks**
- ✅ `useRazorpay` - Custom hook for payment logic

### 4. **Utilities**
- ✅ `lib/razorpay.ts` - Razorpay configuration and utilities

## 🔄 Payment Flow

1. **User fills booking form** → Booking details collected
2. **Proceeds to payment** → Order created in Razorpay
3. **Payment gateway opens** → User enters card details
4. **Payment processed** → Razorpay processes payment
5. **Verification** → Server verifies payment signature
6. **Database updated** → Booking status updated to confirmed
7. **Success page** → User sees confirmation

## 🛡️ Security Features

- ✅ **Payment Signature Verification** - Server-side verification
- ✅ **Secure API Keys** - Environment variables
- ✅ **HTTPS Required** - For production
- ✅ **Database Validation** - Booking status tracking

## 📊 Database Schema

The integration uses the existing `bookings` table:

```sql
-- Booking statuses tracked:
payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
booking_status: 'pending' | 'confirmed' | 'cancelled'
```

## 🚀 Going Live

### Step 1: Switch to Live Mode
1. Get Live API keys from Razorpay Dashboard
2. Update environment variables:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id
   RAZORPAY_KEY_SECRET=your_live_secret_key
   ```

### Step 2: Enable Webhooks (Optional)
1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`

### Step 3: Configure Payment Methods
1. Enable desired payment methods in Razorpay Dashboard
2. Set up international payments if needed
3. Configure settlement schedule

## 🎨 Customization

### Theme Colors
The payment gateway uses your brand colors:
```javascript
theme: {
  color: '#f97316', // Orange color matching your theme
}
```

### Company Details
```javascript
name: 'Niwas Nest',
description: 'PG & Hostel Booking',
image: '/logo.png', // Add your logo
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Key ID is required"**
   - Check if `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set in `.env.local`
   - Restart development server after adding env vars

2. **"Payment verification failed"**
   - Ensure `RAZORPAY_KEY_SECRET` is correct
   - Check server logs for detailed error

3. **"Order creation failed"**
   - Verify Supabase connection
   - Check if `bookings` table exists

4. **Payment gateway not opening**
   - Check browser console for errors
   - Ensure Razorpay script is loaded

### Debug Mode:
Add this to see detailed logs:
```javascript
// In useRazorpay.ts
console.log('Payment options:', razorpayOptions);
```

## 📞 Support

- **Razorpay Support**: [https://razorpay.com/support/](https://razorpay.com/support/)
- **Documentation**: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- **Integration Guide**: [https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)

## ✅ Checklist

- [ ] Razorpay account created
- [ ] API keys obtained
- [ ] Environment variables configured
- [ ] Test payment completed
- [ ] Database booking created
- [ ] Success page working
- [ ] Ready for production

## 🎯 Next Steps

1. **Email Notifications**: Add booking confirmation emails
2. **SMS Notifications**: Send booking confirmations via SMS
3. **Refund System**: Implement refund functionality
4. **Payment Analytics**: Track payment metrics
5. **Multiple Payment Methods**: Add UPI, Net Banking, etc.

---

**🎉 Your Razorpay integration is now complete and ready to accept payments!**