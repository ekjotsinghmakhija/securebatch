import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, amount } = await request.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
    }

    // 1. Fetch Current Balance
    const { data: userData, error: fetchError } = await supabaseAdmin
      .from('user_balances')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (fetchError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentBalance = userData.balance;

    // 2. Check Funds
    if (currentBalance < amount) {
      return NextResponse.json({ error: 'Insufficient Funds' }, { status: 402 });
    }

    // 3. Deduct (Transaction)
    const newBalance = currentBalance - amount;

    const { error: updateError } = await supabaseAdmin
      .from('user_balances')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (updateError) {
      return NextResponse.json({ error: 'Transaction Failed' }, { status: 500 });
    }

    // 4. Log Usage (Optional but recommended)
    // await supabaseAdmin.from('usage_logs').insert({ user_id: userId, credits_used: amount, ... });

    return NextResponse.json({ success: true, newBalance });

  } catch (error) {
    console.error("Deduction Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
