import React from 'react';
import { Wallet, Calculator, ArrowRight } from 'lucide-react';

interface Props {
  cost: number;
  balance: number;
  onStartClick: () => void;
  isProcessing: boolean;
}

export const CreditCalculator: React.FC<Props> = ({ cost, balance, onStartClick, isProcessing }) => {
  const canAfford = balance >= cost && balance > 0;
  const remainingBalance = balance - cost;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-slate-400" size={20} />
        <h3 className="text-lg font-bold text-slate-800">Cost Summary</h3>
      </div>

      {/* BALANCE LEDGER BOX (Fixed Colors: Clean Slate) */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3 mb-6">

        {/* Row 1: Current Balance */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
            <Wallet size={14} /> Current Balance
          </span>
          <span className="font-mono font-bold text-slate-700">
            {balance}
          </span>
        </div>

        {/* Row 2: Cost */}
        <div className="flex justify-between items-center text-red-600">
          <span className="text-sm font-medium">Processing Cost</span>
          <span className="font-mono font-bold">-{cost}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-2"></div>

        {/* Row 3: Net Result */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium">Remaining</span>
          <span className={`font-mono font-bold ${remainingBalance < 0 ? 'text-red-500' : 'text-green-600'}`}>
            {remainingBalance}
          </span>
        </div>
      </div>

      {/* ERROR MESSAGE (Only shows if too poor) */}
      {!canAfford && (
        <div className="mb-4 text-center bg-red-50 border border-red-100 rounded-lg p-2 animate-in fade-in">
           <p className="text-red-600 text-xs font-bold">
             Insufficient balance. You need {cost - balance} more credits.
           </p>
        </div>
      )}

      {/* ACTION BUTTON */}
      <button
        onClick={onStartClick}
        disabled={!canAfford || isProcessing}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          !canAfford || isProcessing
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-black text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-95'
        }`}
      >
        {isProcessing ? (
          'Processing...'
        ) : (
          <>Start Processing <ArrowRight size={18}/></>
        )}
      </button>
    </div>
  );
};
