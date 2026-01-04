import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { randomBytes, createHash } from 'crypto';

// GET: List active keys for the logged-in user
export async function GET(request: Request) {
  // 1. Auth Check (Mocking auth for now, in real app verify session)
  // In production, use supabase.auth.getUser() here
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('api_keys')
    .select('id, key_prefix, name, created_at, is_active')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// POST: Generate a new key
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId; // In real app, get from session
    const keyName = body.name || 'Default Key';

    if (!userId) return NextResponse.json({ error: 'Missing User ID' }, { status: 400 });

    // 1. Generate Secure Key
    // Format: sb_live_<32_random_bytes_hex>
    const randomBits = randomBytes(24).toString('hex');
    const apiKey = `sb_live_${randomBits}`;

    // 2. Create Hash (SHA-256)
    // We strictly store ONLY the hash in the DB
    const keyHash = createHash('sha256').update(apiKey).digest('hex');
    const keyPrefix = apiKey.substring(0, 12) + '...';

    // 3. Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('api_keys')
      .insert({
        user_id: userId,
        key_hash: keyHash,
        key_prefix: keyPrefix,
        name: keyName,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    // 4. Return the FULL key (This is the only time user sees it)
    return NextResponse.json({
      id: data.id,
      name: data.name,
      prefix: data.key_prefix,
      fullKey: apiKey // <--- Crucial
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
