'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendar, FaUsers, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

interface BookingFormProps {
  propertyId: string;
  propertyName: string;
  roomId?: string;
  sharingType?: string;
  pricePerPerson: number;
  securityDeposit?: number;
  onSubmit?: (bookingData: any) => void;
}

export default function BookingForm({
  propertyId,
  propertyName,
  roomId,
  sharingType,
  pricePerPerson,
  securityDeposit = 0,
  onSubmit
}: BookingFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '',
    duration: 1,
    sharingType: sharingType || 'Single',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Full name is required';
    }

    if (!formData.guestEmail.trim()) {
      newErrors.guestEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
      newErrors.guestEmail = 'Please enter a valid email';
    }

    if (!formData.guestPhone.trim()) {
      newErrors.guestPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.guestPhone.replace(/\D/g, ''))) {
      newErrors.guestPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    } else {
      const selectedDate = new Date(formData.checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.checkInDate = 'Check-in date cannot be in the past';
      }
    }

    if (formData.duration < 1) {
      newErrors.duration = 'Duration must be at least 1 month';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const monthlyRent = pricePerPerson * formData.duration;
    const deposit = securityDeposit || pricePerPerson * 2;
    return monthlyRent + deposit;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const bookingData = {
      ...formData,
      propertyId,
      roomId,
      totalAmount: calculateTotal(),
    };

    if (onSubmit) {
      onSubmit(bookingData);
    } else {
      // Default behavior: redirect to payment page
      const params = new URLSearchParams({
        propertyId,
        ...(roomId && { roomId }),
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        checkInDate: formData.checkInDate,
        duration: formData.duration.toString(),
        sharingType: formData.sharingType,
        amount: calculateTotal().toString(),
      });

      router.push(`/payment?${params.toString()}`);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Stay</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Guest Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Guest Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUser className="inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                errors.guestName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.guestName && (
              <p className="mt-1 text-sm text-red-600">{errors.guestName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              name="guestEmail"
              value={formData.guestEmail}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                errors.guestEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.guestEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.guestEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaPhone className="inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="guestPhone"
              value={formData.guestPhone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                errors.guestPhone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.guestPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.guestPhone}</p>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Booking Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendar className="inline mr-2" />
              Check-in Date *
            </label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleInputChange}
              min={getMinDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                errors.checkInDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.checkInDate && (
              <p className="mt-1 text-sm text-red-600">{errors.checkInDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUsers className="inline mr-2" />
              Duration (Months) *
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {[1, 2, 3, 6, 12, 18, 24].map(month => (
                <option key={month} value={month}>
                  {month} Month{month > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {!sharingType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sharing Type
              </label>
              <select
                name="sharingType"
                value={formData.sharingType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Single">Single Occupancy</option>
                <option value="Double">Double Sharing</option>
                <option value="Triple">Triple Sharing</option>
                <option value="Quad">Quad Sharing</option>
              </select>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Price Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Monthly Rent × {formData.duration} month{formData.duration > 1 ? 's' : ''}:</span>
              <span>₹{(pricePerPerson * formData.duration).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Security Deposit:</span>
              <span>₹{(securityDeposit || pricePerPerson * 2).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-orange-600">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Proceed to Payment
        </button>

        <p className="text-xs text-gray-500 text-center">
          By proceeding, you agree to our terms and conditions. 
          Your booking will be confirmed after successful payment.
        </p>
      </form>
    </div>
  );
}