'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentButton from '@/components/PaymentButton';
import { FaCreditCard, FaHome, FaCalendar, FaUsers, FaUser } from 'react-icons/fa';

export default function TestPaymentPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Sample test data
  const testBookingData = {
    amount: 15000,
    propertyId: 'test-property-1',
    roomId: 'test-room-1',
    propertyName: 'Test PG in Koramangala',
    guestName: 'John Doe',
    guestEmail: 'john.doe@example.com',
    guestPhone: '9876543210',
    checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    duration: 3,
    sharingType: 'Double Sharing',
  };

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    setPaymentStatus('success');
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      router.push('/payment/success');
    }, 2000);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentStatus('error');
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Test Payment Integration
          </h1>
          <p className="text-gray-600 text-lg">
            Test the Razorpay payment flow with sample booking data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Booking Details */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaHome className="mr-3 text-orange-500" />
              Test Booking Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 flex items-center">
                  <FaHome className="mr-2 text-sm" />
                  Property:
                </span>
                <span className="font-medium">{testBookingData.propertyName}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 flex items-center">
                  <FaUser className="mr-2 text-sm" />
                  Guest:
                </span>
                <span className="font-medium">{testBookingData.guestName}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 flex items-center">
                  <FaCalendar className="mr-2 text-sm" />
                  Check-in:
                </span>
                <span className="font-medium">
                  {new Date(testBookingData.checkInDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 flex items-center">
                  <FaUsers className="mr-2 text-sm" />
                  Duration:
                </span>
                <span className="font-medium">{testBookingData.duration} months</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Sharing:</span>
                <span className="font-medium">{testBookingData.sharingType}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 pt-4">
                <span className="text-gray-800 font-bold text-lg">Total Amount:</span>
                <span className="font-bold text-2xl text-orange-600">
                  ₹{testBookingData.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaCreditCard className="mr-3 text-green-500" />
              Test Payment
            </h2>
            
            <PaymentButton
              amount={testBookingData.amount}
              propertyId={testBookingData.propertyId}
              roomId={testBookingData.roomId}
              propertyName={testBookingData.propertyName}
              guestName={testBookingData.guestName}
              guestEmail={testBookingData.guestEmail}
              guestPhone={testBookingData.guestPhone}
              checkInDate={testBookingData.checkInDate}
              duration={testBookingData.duration}
              sharingType={testBookingData.sharingType}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>

        {/* Test Cards Information */}
        <div className="mt-8 glass-card rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Test Card Details</h3>
          <p className="text-gray-600 mb-4">
            Use these test card details to simulate different payment scenarios:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">✅ Successful Payment</h4>
              <div className="text-sm space-y-1">
                <p><strong>Card:</strong> 4111 1111 1111 1111</p>
                <p><strong>CVV:</strong> 123</p>
                <p><strong>Expiry:</strong> Any future date</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">❌ Failed Payment</h4>
              <div className="text-sm space-y-1">
                <p><strong>Card:</strong> 4000 0000 0000 0002</p>
                <p><strong>CVV:</strong> 123</p>
                <p><strong>Expiry:</strong> Any future date</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">💳 Alternative Success</h4>
              <div className="text-sm space-y-1">
                <p><strong>Card:</strong> 5555 5555 5555 4444</p>
                <p><strong>CVV:</strong> 123</p>
                <p><strong>Expiry:</strong> Any future date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {paymentStatus === 'success' && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-green-800 font-bold text-lg mb-2">🎉 Payment Test Successful!</div>
            <p className="text-green-700">Redirecting to success page...</p>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-red-800 font-bold text-lg mb-2">❌ Payment Test Failed</div>
            <p className="text-red-700">Please try again with different test card details.</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}