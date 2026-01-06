import { Package, XCircle } from "lucide-react";
import { VideoFile, VideoSettings } from "@/types";

interface ActionButtonsProps {
  queue: VideoFile[];
  settings: VideoSettings;
  isProcessing: boolean;
  isEngineLoaded: boolean;
  onStart: () => void; // Kept to prevent TypeScript errors in parent, but unused here
  onCancel: () => void;
  onDownloadZip: () => void;
}

export const ActionButtons = ({
  queue,
  settings,
  isProcessing,
  onCancel,
  onDownloadZip,
}: ActionButtonsProps) => {
  const hasCompletedVideos = queue.some((v) => v.status === "done");

  return (
    <div className="space-y-4 pt-4">

      {/* Settings Summary (Sanity Check) */}
      {!isProcessing && queue.length > 0 && (
         <div className="text-xs text-center text-slate-500 mb-2">
            Process <strong>{queue.length}</strong> videos @
            <strong> {settings.resolution}</strong> with
            <strong> {settings.watermarkType === 'none' ? 'NO' : 'Active'} Watermark</strong>
         </div>
      )}

      {/* DOWNLOAD ZIP BUTTON (Only appears when items are done) */}
      {hasCompletedVideos && (
        <button
          onClick={onDownloadZip}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
        >
          <Package size={20} /> Download All as ZIP
        </button>
      )}

      {/* ❌ REMOVED: The old "Start Batch Processing" button is gone.
          Now users must use the "Credit Calculator" button above to start.
      */}

      {/* CANCEL BUTTON (Only appears during processing) */}
      {isProcessing && (
        <button
          onClick={onCancel}
          className="w-full py-4 bg-red-900/50 hover:bg-red-900/80 border border-red-800 text-red-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2 animate-in fade-in"
        >
          <XCircle size={20} /> Stop Processing (No Refund)
        </button>
      )}
    </div>
  );
};
