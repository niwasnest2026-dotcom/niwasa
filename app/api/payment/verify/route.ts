import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingDetails
    } = body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update booking status in database
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        payment_status: 'completed',
        booking_status: 'confirmed',
        amount_paid: bookingDetails.amount,
        amount_due: 0,
        payment_date: new Date().toISOString(),
        notes: `Payment successful. Razorpay Payment ID: ${razorpay_payment_id}, Order ID: ${razorpay_order_id}`,
      })
      .eq('property_id', bookingDetails.propertyId)
      .eq('guest_email', bookingDetails.guestEmail)
      .eq('payment_status', 'pending');

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update booking status' },
        { status: 500 }
      );
    }

    // Send confirmation email (optional - you can implement this later)
    // await sendBookingConfirmationEmail(bookingDetails);

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      message: 'Payment verified successfully',
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}