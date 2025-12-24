'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaDownload, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Redirect to home after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (!paymentId || !orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Payment</h1>
          <p className="text-gray-600 mb-6">
            Payment information is missing or invalid.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 text-lg">
            Your booking has been confirmed successfully
          </p>
        </div>

        {/* Payment Details */}
        <div className="glass-card rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Payment Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {paymentId}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment Date:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Status:</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-card rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            What's Next?
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaEnvelope className="text-blue-600 text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Confirmation Email</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a booking confirmation email with all details within 5 minutes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaPhone className="text-green-600 text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Property Contact</h3>
                <p className="text-gray-600 text-sm">
                  The property owner will contact you within 24 hours to coordinate your check-in.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaDownload className="text-orange-600 text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Download Receipt</h3>
                <p className="text-gray-600 text-sm">
                  Your payment receipt is available in the confirmation email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-blue-800 mb-3">Important Notes:</h3>
          <ul className="text-blue-700 text-sm space-y-2 text-left">
            <li>• Keep your Payment ID and Order ID safe for future reference</li>
            <li>• Contact us immediately if you don't receive confirmation email</li>
            <li>• Carry a valid ID proof during check-in</li>
            <li>• Review the property rules and regulations before moving in</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          
          <Link
            href="/listings"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold rounded-lg transition-all"
          >
            Browse More Properties
          </Link>
        </div>

        {/* Auto Redirect Notice */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Automatically redirecting to home in {countdown} seconds...</p>
        </div>

        {/* Support Contact */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Need help? Contact our support team:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a
              href="mailto:niwasnest2026@gmail.com"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              niwasnest2026@gmail.com
            </a>
            <a
              href="tel:+916304809598"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              +91 63048 09598
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}