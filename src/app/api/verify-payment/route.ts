import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, userId } =
      await request.json();

    // 1. Verify Signature (Security Check)
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { status: 'failure', message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // 2. Log the Transaction in Supabase
    const { error: payError } = await supabaseAdmin.from('payments').insert({
      user_id: userId,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      amount: amount / 100, // Store as Rupees (received in paise)
      status: 'success'
    });

    if (payError) {
      console.error("Payment Log Error:", payError);
      return NextResponse.json({ error: 'Database error logging payment' }, { status: 500 });
    }

    // 3. Update User Balance (Add money)
    // First, get current balance
    const { data: currentData } = await supabaseAdmin
      .from('user_balances')
      .select('balance')
      .eq('user_id', userId)
      .single();

    const currentBalance = currentData?.balance || 0;
    const newBalance = currentBalance + (amount / 100);

    // Upsert (Insert if new, Update if exists)
    const { error: balanceError } = await supabaseAdmin
      .from('user_balances')
      .upsert({
        user_id: userId,
        balance: newBalance,
        updated_at: new Date().toISOString()
      });

    if (balanceError) {
      console.error("Balance Update Error:", balanceError);
      return NextResponse.json({ error: 'Failed to update wallet balance' }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', message: 'Payment verified & Balance Updated' });

  } catch (error) {
    console.error('Verify Error:', error);
    return NextResponse.json(
      { error: 'Error verifying payment' },
      { status: 500 }
    );
  }
}
