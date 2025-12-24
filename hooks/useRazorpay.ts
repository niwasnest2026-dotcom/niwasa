'use client';

import { useState, useCallback } from 'react';
import { razorpayConfig, formatAmountForDisplay } from '@/lib/razorpay';

interface PaymentOptions {
  amount: number;
  propertyId: string;
  roomId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate?: string;
  duration: number;
  sharingType: string;
  userId?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Razorpay script
  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  // Create payment order
  const createOrder = useCallback(async (paymentData: Omit<PaymentOptions, 'onSuccess' | 'onError'>) => {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }, []);

  // Verify payment
  const verifyPayment = useCallback(async (paymentResponse: RazorpayResponse, bookingDetails: any) => {
    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentResponse,
          bookingDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }, []);

  // Main payment function
  const initiatePayment = useCallback(async (options: PaymentOptions) => {
    try {
      setLoading(true);
      setError(null);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order
      const order = await createOrder(options);

      // Configure Razorpay options
      const razorpayOptions = {
        ...razorpayConfig,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        prefill: {
          name: options.guestName,
          email: options.guestEmail,
          contact: options.guestPhone,
        },
        notes: {
          propertyId: options.propertyId,
          roomId: options.roomId || '',
          checkInDate: options.checkInDate,
          duration: options.duration.toString(),
        },
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            const verificationResult = await verifyPayment(response, {
              amount: options.amount,
              propertyId: options.propertyId,
              roomId: options.roomId,
              guestName: options.guestName,
              guestEmail: options.guestEmail,
              guestPhone: options.guestPhone,
            });

            if (verificationResult.success) {
              options.onSuccess?.(verificationResult);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            options.onError?.(error);
            setError('Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            setError('Payment cancelled by user');
            options.onError?.({ message: 'Payment cancelled' });
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [loadRazorpayScript, createOrder, verifyPayment]);

  return {
    initiatePayment,
    loading,
    error,
    clearError: () => setError(null),
  };
};