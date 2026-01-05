'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser'; // Ensure you created this file

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState<any>(null); // Store real user
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          router.push('/login'); // Redirect if not logged in
          return;
        }

        setUser(user);
        fetchBalance(user.id);
      } catch (e) {
        console.error("Auth check failed", e);
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBalance = async (userId: string) => {
    try {
      // Pass the REAL user ID to the API
      const res = await fetch(`/api/balance?userId=${userId}`);
      const data = await res.json();
      setBalance(data.balance || 0);
    } catch (e) {
      console.error("Failed to fetch balance");
    }
  };

  const handlePayment = async (amountInRupees: number) => {
    if (!user) return; // Safety check
    setLoading(true);

    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 1. Create Order (Backend)
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInRupees }),
      });

      const order = await response.json();

      if (!order.id) {
        alert("Server Error: No order ID returned.");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay Popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "SecureBatch Credits",
        description: `Add ₹${amountInRupees} to wallet`,
        order_id: order.id,

        handler: async function (response: any) {
          // 3. Verify & Save to DB (Using REAL User ID)
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: order.amount,
              userId: user.id // <--- CRITICAL: Using the real user ID
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.status === 'success') {
            alert(`Success! ₹${amountInRupees} added to your balance.`);
            fetchBalance(user.id); // Refresh UI immediately
          } else {
            alert("Payment successful but verification failed.");
          }
        },

        prefill: {
          name: user.email?.split('@')[0] || "User",
          email: user.email,
          contact: "", // You can add a phone field to your auth metadata if needed
        },
        theme: { color: "#2563eb" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-lg flex items-center gap-2">
            <CreditCard className="text-blue-500" /> Billing & Credits
          </div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-8 rounded-2xl mb-12 flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Available Balance</p>
                <h2 className="text-5xl font-extrabold text-white">₹ {balance}</h2>
                <p className="text-gray-400 text-xs mt-2">Account: {user?.email}</p>
            </div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50">
                <Zap className="text-blue-400 w-8 h-8 fill-current" />
            </div>
        </div>

        <h3 className="text-xl font-bold mb-6">Top Up Wallet</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PlanCard amount={100} label="Starter" onClick={() => handlePayment(100)} loading={loading} />
            <PlanCard amount={500} label="Pro Pack" onClick={() => handlePayment(500)} loading={loading} popular />
            <PlanCard amount={2000} label="Enterprise" onClick={() => handlePayment(2000)} loading={loading} />
        </div>
      </main>
    </div>
  );
}

function PlanCard({ amount, label, onClick, loading, popular }: any) {
  return (
    <div className={`relative p-6 rounded-xl border flex flex-col items-center text-center transition-all ${popular ? 'bg-gray-900 border-blue-500 shadow-xl shadow-blue-900/20 transform scale-105' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}>
      {popular && <span className="absolute -top-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>}
      <p className="text-gray-400 font-medium mb-3">{label}</p>
      <p className="text-3xl font-bold text-white mb-6">₹{amount}</p>
      <ul className="text-sm text-gray-400 space-y-2 mb-8 text-left w-full px-4">
         <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> Instant Credit</li>
         <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500"/> No Expiry</li>
      </ul>
      <button
        onClick={onClick}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-bold transition-colors ${popular ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
      >
        {loading ? 'Processing...' : `Add ₹${amount}`}
      </button>
    </div>
  )
}
