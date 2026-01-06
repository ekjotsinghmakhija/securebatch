import React from 'react';
import { CreditCard, AlertTriangle, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  cost: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmProcessModal: React.FC<Props> = ({ isOpen, cost, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 scale-100 animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Confirm Transaction</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* COST BOX (Fixed Colors: Professional Blue) */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Estimated Cost</p>
                <p className="text-sm text-blue-800">Deducted from wallet</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-blue-700">-{cost}</span>
          </div>

          {/* WARNING BOX (Amber for Caution) */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex gap-3">
            <div className="mt-0.5">
              <AlertTriangle size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800 mb-1">Non-Refundable</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Credits are deducted <strong>immediately</strong>. Stopping the process midway will <strong>not</strong> refund these credits.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Pay & Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
