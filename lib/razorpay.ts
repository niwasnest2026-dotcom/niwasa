import Razorpay from 'razorpay';

// Initialize Razorpay instance (server-side only)
export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Razorpay configuration for client-side
export const razorpayConfig = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  currency: 'INR',
  name: 'Niwas Nest',
  description: 'PG & Hostel Booking',
  image: '/logo.png', // Add your logo
  theme: {
    color: '#f97316', // Orange color matching your theme
  },
};

// Payment status types
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Payment interface
export interface PaymentData {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

// Booking payment interface
export interface BookingPayment extends PaymentData {
  propertyId: string;
  roomId?: string;
  userId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate?: string;
  duration: number; // in months
  sharingType: string;
}

// Utility function to format amount for Razorpay (in paise)
export const formatAmountForRazorpay = (amount: number): number => {
  return Math.round(amount * 100);
};

// Utility function to format amount for display (in rupees)
export const formatAmountForDisplay = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Generate receipt ID
export const generateReceiptId = (prefix: string = 'NIWAS'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
};

// Verify payment signature
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const crypto = require('crypto');
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest('hex');
  
  return expectedSignature === signature;
};