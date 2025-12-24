'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaHome, FaCalendar, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import PaymentButton from '@/components/PaymentButton';
import { supabase } from '@/lib/supabase';

interface PropertyDetails {
  id: string;
  name: string;
  city: string;
  area: string;
  price: number;
  property_type: string;
}

interface RoomDetails {
  id: string;
  room_number: string;
  sharing_type: string;
  price_per_person: number;
  security_deposit_per_person: number;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get URL parameters
  const propertyId = searchParams.get('propertyId');
  const roomId = searchParams.get('roomId');
  const guestName = searchParams.get('guestName') || '';
  const guestEmail = searchParams.get('guestEmail') || '';
  const guestPhone = searchParams.get('guestPhone') || '';
  const checkInDate = searchParams.get('checkInDate') || '';
  const checkOutDate = searchParams.get('checkOutDate') || '';
  const duration = parseInt(searchParams.get('duration') || '1');
  const sharingType = searchParams.get('sharingType') || '';
  const totalAmount = parseFloat(searchParams.get('amount') || '0');

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setError('Property ID is required');
      setLoading(false);
      return;
    }

    fetchPropertyDetails();
  }, [propertyId, roomId]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);

      // Fetch property details
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('id, name, city, area, price, property_type')
        .eq('id', propertyId)
        .single();

      if (propertyError) throw propertyError;
      setProperty(propertyData);

      // Fetch room details if roomId is provided
      if (roomId) {
        const { data: roomData, error: roomError } = await supabase
          .from('property_rooms')
          .select('id, room_number, sharing_type, price_per_person, security_deposit_per_person')
          .eq('id', roomId)
          .single();

        if (roomError) throw roomError;
        setRoom(roomData);
      }

    } catch (error) {
      console.error('Error fetching details:', error);
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (response: any) => {
    // Redirect to success page or show success message
    router.push(`/payment/success?paymentId=${response.paymentId}&orderId=${response.orderId}`);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    setError('Payment failed. Please try again.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Property not found'}</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Validate required booking information
  if (!guestName || !guestEmail || !guestPhone || !checkInDate || !totalAmount) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Incomplete Information</h1>
          <p className="text-gray-600 mb-6">
            Some required booking information is missing. Please go back and fill in all required fields.
          </p>
          <Link
            href={`/property/${propertyId}`}
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Property
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/property/${propertyId}`}
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Property
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">
            Review your booking details and proceed with secure payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <div className="space-y-6">
            {/* Property Information */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaHome className="mr-2 text-orange-500" />
                Property Details
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-sm" />
                    {property.area}, {property.city}
                  </p>
                  <p className="text-sm text-gray-500">{property.property_type}</p>
                </div>
                {room && (
                  <div className="border-t pt-3">
                    <p className="font-medium">Room: {room.room_number}</p>
                    <p className="text-gray-600">Sharing: {room.sharing_type}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Guest Information */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaUsers className="mr-2 text-orange-500" />
                Guest Information
              </h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {guestName}</p>
                <p><span className="font-medium">Email:</span> {guestEmail}</p>
                <p><span className="font-medium">Phone:</span> {guestPhone}</p>
              </div>
            </div>

            {/* Booking Information */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCalendar className="mr-2 text-orange-500" />
                Booking Information
              </h2>
              <div className="space-y-2">
                <p><span className="font-medium">Check-in:</span> {new Date(checkInDate).toLocaleDateString()}</p>
                {checkOutDate && (
                  <p><span className="font-medium">Check-out:</span> {new Date(checkOutDate).toLocaleDateString()}</p>
                )}
                <p><span className="font-medium">Duration:</span> {duration} month{duration > 1 ? 's' : ''}</p>
                <p><span className="font-medium">Sharing Type:</span> {sharingType}</p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Secure Payment
              </h2>
              
              <PaymentButton
                amount={totalAmount}
                propertyId={propertyId}
                roomId={roomId || undefined}
                propertyName={property.name}
                guestName={guestName}
                guestEmail={guestEmail}
                guestPhone={guestPhone}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate || undefined}
                duration={duration}
                sharingType={sharingType}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}