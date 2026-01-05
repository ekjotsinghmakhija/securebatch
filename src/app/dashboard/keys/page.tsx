"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Copy, Trash2, Key, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';


export default function KeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newKey, setNewKey] = useState<string | null>(null);

  // Mock User ID (Replace with real Supabase Auth ID later)
  const MOCK_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

  // 1. Load Keys
  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch(`/api/keys?userId=${MOCK_USER_ID}`);
      const data = await res.json();
      if (Array.isArray(data)) setKeys(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Create Key Handler
  const createKey = async () => {
    const name = prompt("Enter a name for this key (e.g. 'Production Mac')");
    if (!name) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        body: JSON.stringify({ userId: MOCK_USER_ID, name }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (data.fullKey) {
        setNewKey(data.fullKey); // Show the secret!
        fetchKeys(); // Refresh list
      }
    } catch (e) {
      alert("Failed to create key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans pb-10">

      {/* Simple Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-lg">Developer Settings</div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">API Keys</h1>
            <p className="text-gray-400">Manage your secret keys for accessing the SecureBatch SDK.</p>
          </div>
          <button
            onClick={createKey}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Create New Key
          </button>
        </div>

        {/* --- SECRET KEY REVEAL MODAL (Important) --- */}
        {newKey && (
          <div className="bg-green-900/10 border border-green-500/50 p-6 rounded-xl mb-8 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/20 text-green-400 rounded-lg shrink-0">
                <Key size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-400 text-lg mb-1">New Key Generated!</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Please copy this key now. <strong className="text-white">You will not be able to see it again.</strong>
                </p>

                <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 flex items-center justify-between group">
                  <code className="font-mono text-green-300 text-sm break-all">{newKey}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(newKey)}
                    className="text-gray-500 hover:text-white p-2"
                  >
                    <Copy size={18} />
                  </button>
                </div>

                <button
                  onClick={() => setNewKey(null)}
                  className="mt-4 text-sm text-gray-400 hover:text-white underline"
                >
                  I have saved it, close this.
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key List */}
        <div className="space-y-4">
          {isLoading && <p className="text-gray-500">Loading keys...</p>}

          {!isLoading && keys.length === 0 && (
            <div className="text-center py-12 border border-gray-800 border-dashed rounded-xl">
              <Key size={32} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-400">No active API keys found.</p>
            </div>
          )}

          {keys.map((key) => (
            <div key={key.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-white mb-1">{key.name}</p>
                <p className="font-mono text-xs text-gray-500">{key.key_prefix}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-900/50">Active</span>
                <span className="text-xs text-gray-600">Created: {new Date(key.created_at).toLocaleDateString()}</span>
                <button className="text-gray-500 hover:text-red-400 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="mt-12 bg-amber-900/10 border border-amber-900/30 p-4 rounded-lg flex items-center gap-3">
          <ShieldAlert size={20} className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-200/70">
            Never share your API keys in client-side code (browsers) unless domain restrictions are enabled.
            We recommend using keys primarily in server-side environments.
          </p>
        </div>

      </main>
    </div>
  );
}
