import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    // 1. Check for keys inside the function to avoid startup crashes
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay keys are missing in .env.local' },
        { status: 500 }
      );
    }

    // 2. Initialize Razorpay with the correct variable names
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Updated to match your .env
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 3. Parse the amount from the frontend
    const { amount } = await request.json();

    const options = {
      amount: amount * 100, // Amount in paise (e.g. 500 INR -> 50000 paise)
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    // 4. Create order
    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
}
