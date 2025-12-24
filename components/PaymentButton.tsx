'use client';

import { useState } from 'react';
import { FaCreditCard, FaSpinner, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useRazorpay } from '@/hooks/useRazorpay';
import { formatAmountForDisplay } from '@/lib/razorpay';

interface PaymentButtonProps {
  amount: number;
  propertyId: string;
  roomId?: string;
  propertyName: string;
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
  className?: string;
  disabled?: boolean;
}

export default function PaymentButton({
  amount,
  propertyId,
  roomId,
  propertyName,
  guestName,
  guestEmail,
  guestPhone,
  checkInDate,
  checkOutDate,
  duration,
  sharingType,
  userId,
  onSuccess,
  onError,
  className = '',
  disabled = false,
}: PaymentButtonProps) {
  const { initiatePayment, loading, error, clearError } = useRazorpay();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    clearError();
    setPaymentStatus('idle');

    await initiatePayment({
      amount,
      propertyId,
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      duration,
      sharingType,
      userId,
      onSuccess: (response) => {
        setPaymentStatus('success');
        onSuccess?.(response);
      },
      onError: (error) => {
        setPaymentStatus('error');
        onError?.(error);
      },
    });
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <FaSpinner className="animate-spin mr-2" />
          Processing Payment...
        </>
      );
    }

    if (paymentStatus === 'success') {
      return (
        <>
          <FaCheck className="mr-2" />
          Payment Successful
        </>
      );
    }

    if (paymentStatus === 'error') {
      return (
        <>
          <FaExclamationTriangle className="mr-2" />
          Payment Failed - Retry
        </>
      );
    }

    return (
      <>
        <FaCreditCard className="mr-2" />
        Pay {formatAmountForDisplay(amount)}
      </>
    );
  };

  const getButtonClasses = () => {
    const baseClasses = `w-full flex items-center justify-center px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${className}`;
    
    if (disabled || loading) {
      return `${baseClasses} bg-gray-400 text-gray-200 cursor-not-allowed`;
    }

    if (paymentStatus === 'success') {
      return `${baseClasses} bg-green-500 hover:bg-green-600 text-white`;
    }

    if (paymentStatus === 'error') {
      return `${baseClasses} bg-red-500 hover:bg-red-600 text-white`;
    }

    return `${baseClasses} bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105`;
  };

  return (
    <div className="space-y-4">
      {/* Payment Summary */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
        <h3 className="font-bold text-gray-800 mb-2">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Property:</span>
            <span className="font-medium">{propertyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guest:</span>
            <span className="font-medium">{guestName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-in:</span>
            <span className="font-medium">{new Date(checkInDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{duration} month{duration > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sharing:</span>
            <span className="font-medium">{sharingType}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount:</span>
              <span className="text-orange-600">{formatAmountForDisplay(amount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={disabled || loading}
        className={getButtonClasses()}
      >
        {getButtonContent()}
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {paymentStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
          <div className="flex items-center">
            <FaCheck className="mr-2 flex-shrink-0" />
            <span>Payment completed successfully! Your booking is confirmed.</span>
          </div>
        </div>
      )}

      {/* Payment Security Info */}
      <div className="text-xs text-gray-500 text-center">
        <p>🔒 Secure payment powered by Razorpay</p>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
}