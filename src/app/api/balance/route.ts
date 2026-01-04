import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/lib/supabase-server'; // New Server Client

export async function GET(request: NextRequest) {
  // 1. Authenticate the user securely via Cookies
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch data for THIS user only
  const { data, error } = await supabaseAdmin
    .from('user_balances')
    .select('balance')
    .eq('user_id', user.id) // Use user.id from session, NOT from URL
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ balance: data?.balance || 0 });
}
