// src/pages/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { calculateCreditCost } from '../lib/pricing';
import { CreditCalculator } from '../components/dashboard/CreditCalculator';
import { ConfirmProcessModal } from '../components/dashboard/ConfirmProcessModal';
import { VideoSettings } from '../types'; // Import types

// Mock API calls
const api = {
  deductCredits: async (amount: number) => { return true; },
  startJob: async (settings: any) => { /* start job */ },
  cancelJob: async () => { /* stop job */ }
};

export default function Dashboard() {
  // --- STATE ---
  const [balance, setBalance] = useState(100);
  const [duration, setDuration] = useState(10); // Minutes
  const [resolution, setResolution] = useState<any>("1080p");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Define a settings object to satisfy the new PRICING signature
  const mockSettings: VideoSettings = {
    quality: 'medium',
    resolution: resolution,
    watermarkType: 'none',
    format: 'mp4',
    removeAudio: false
  };

  // FIX: Pass duration (converted to seconds), fileCount (1), and settings object
  const currentCost = calculateCreditCost(duration * 60, 1, mockSettings);

  // --- HANDLERS ---
  const handleStartRequest = () => {
    if (balance <= 0 || balance < currentCost) {
      alert("Insufficient funds");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmDeduction = async () => {
    setIsModalOpen(false);
    setIsProcessing(true);

    try {
      setBalance(prev => prev - currentCost);
      await api.startJob(mockSettings);
      console.log("Job started successfully");
    } catch (error) {
      console.error("Transaction failed", error);
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Stop processing? You will NOT be refunded.")) return;
    await api.cancelJob();
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Video Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 text-black">Configuration</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Duration (Minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              disabled={isProcessing}
              className="w-full border rounded p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Resolution</label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              disabled={isProcessing}
              className="w-full border rounded p-2 text-black"
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4k">4K</option>
            </select>
          </div>
        </div>
        <div>
          <CreditCalculator
            cost={currentCost}
            balance={balance}
            onStartClick={handleStartRequest}
            isProcessing={isProcessing}
          />
          {isProcessing && (
            <button
              onClick={handleCancel}
              className="w-full mt-4 py-3 bg-red-100 text-red-700 font-bold rounded-lg border border-red-300 hover:bg-red-200"
            >
              🛑 Stop Processing (No Refund)
            </button>
          )}
        </div>
      </div>
      <ConfirmProcessModal
        isOpen={isModalOpen}
        cost={currentCost}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDeduction}
      />
    </div>
  );
}
