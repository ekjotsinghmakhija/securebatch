"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, CreditCard, LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

import { DropZone } from "@/components/batch/DropZone";
import { QueueList } from "@/components/batch/QueueList";
import { Header } from "@/components/batch/Header";
import { SettingsPanel } from "@/components/batch/SettingsPanel";
import { ActionButtons } from "@/components/batch/ActionButtons";
import { CreditCalculator } from "@/components/dashboard/CreditCalculator";
import { ConfirmProcessModal } from "@/components/dashboard/ConfirmProcessModal";

import { useFFmpeg } from "@/hooks/useFFmpeg";
import { useProcessor } from "@/hooks/useProcessor";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { VideoSettings } from "@/types";
import { downloadAllAsZip } from "@/utils/zip-helper";
import { calculateCreditCost } from "@/lib/pricing";

const DEFAULT_SETTINGS: VideoSettings = {
  quality: "medium",
  resolution: "original",
  watermarkType: "none",
  format: "mp4",
  removeAudio: false
};

export default function DashboardPage() {
  const { ffmpeg, loaded, load, terminate } = useFFmpeg();
  const { queue, addFiles, removeFile, startProcessing, cancelProcessing, isProcessing } = useProcessor(ffmpeg, terminate, load);
  const [settings, setSettings] = useLocalStorage<VideoSettings>("sb-settings", DEFAULT_SETTINGS);

  const [balance, setBalance] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculatedCost, setCalculatedCost] = useState(0);

  const supabase = createClient();
  const router = useRouter();

  // --- COST ENGINE ---
  useEffect(() => {
    if (queue.length === 0) {
      setCalculatedCost(0);
      return;
    }

    // 1. Sum precise duration from all files
    const totalSeconds = queue.reduce((acc, file) => acc + (file.duration || 0), 0);
    const fileCount = queue.length;

    // 2. Pass all variables to Pricing Engine
    const cost = calculateCreditCost(totalSeconds, fileCount, settings);
    setCalculatedCost(cost);

  }, [queue, settings]);
  // -------------------

  useEffect(() => {
    load();
    const initData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/login");
        return;
      }
      setUser(user);
      fetch(`/api/balance?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setBalance(data.balance || 0))
        .catch(err => console.error(err));
      setIsAuthChecking(false);
    };
    initData();
  }, []);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleStartRequest = () => {
    if (balance < calculatedCost) {
        alert(`Insufficient balance. You need ${calculatedCost - balance} more credits.`);
        return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmAndStart = async () => {
    setIsModalOpen(false);
    const oldBalance = balance;

    // Optimistic Update
    setBalance(prev => prev - calculatedCost);

    try {
        const res = await fetch('/api/deduct-credits', {
            method: 'POST',
            body: JSON.stringify({ userId: user.id, amount: calculatedCost }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            setBalance(oldBalance);
            alert("Transaction failed");
            return;
        }

        startProcessing(settings);

    } catch (e) {
        setBalance(oldBalance);
        console.error(e);
        alert("Network error");
    }
  };

  if (isAuthChecking) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans pb-10">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Shield className="text-blue-600" />
             <span className="font-bold text-lg hidden xs:block">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/dashboard/billing" className="text-sm font-medium bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
                <CreditCard size={14} className="text-blue-400" />
                <span>Credits: {balance}</span>
             </Link>
             <button onClick={handleSignOut} className="text-sm text-red-400 hover:text-red-300 px-3 py-2"><LogOut size={16}/></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Header loaded={loaded} />
            {!isProcessing && <DropZone onFilesSelected={handleFilesSelected} />}
            <QueueList queue={queue} removeFile={removeFile} />
          </div>

          <div className="space-y-6">
            <SettingsPanel settings={settings} setSettings={setSettings} />

            {/* The "Lucrative" Calculator */}
            {queue.length > 0 && !isProcessing && (
                <CreditCalculator
                    cost={calculatedCost}
                    balance={balance}
                    onStartClick={handleStartRequest}
                    isProcessing={isProcessing}
                />
            )}

            <ActionButtons
              queue={queue}
              settings={settings}
              isProcessing={isProcessing}
              isEngineLoaded={loaded}
              onStart={() => {}} // Disabled (Use Calculator button)
              onCancel={cancelProcessing}
              onDownloadZip={() => downloadAllAsZip(queue)}
            />
          </div>
        </div>

        <ConfirmProcessModal
            isOpen={isModalOpen}
            cost={calculatedCost}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmAndStart}
        />
      </main>
    </div>
  );
}
