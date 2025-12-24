import { NextRequest, NextResponse } from 'next/server';
import { razorpay, generateReceiptId, formatAmountForRazorpay } from '@/lib/razorpay';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
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
      userId
    } = body;

    // Validate required fields
    if (!amount || !propertyId || !guestName || !guestEmail || !guestPhone || !checkInDate || !duration || !sharingType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate receipt ID
    const receipt = generateReceiptId();

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: formatAmountForRazorpay(amount), // Convert to paise
      currency: 'INR',
      receipt,
      notes: {
        propertyId,
        roomId: roomId || '',
        guestName,
        guestEmail,
        guestPhone,
        checkInDate,
        checkOutDate: checkOutDate || '',
        duration: duration.toString(),
        sharingType,
        userId: userId || '',
      },
    });

    // Store the order in database with pending status
    const { error: dbError } = await supabase
      .from('bookings')
      .insert({
        property_id: propertyId,
        room_id: roomId,
        user_id: userId,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        sharing_type: sharingType,
        price_per_person: amount,
        security_deposit_per_person: 0, // You can calculate this based on your logic
        total_amount: amount,
        amount_paid: 0,
        amount_due: amount,
        payment_method: 'razorpay',
        payment_status: 'pending',
        booking_status: 'pending',
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        booking_date: new Date().toISOString(),
        notes: `Razorpay Order ID: ${order.id}, Receipt: ${receipt}`,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create booking record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}