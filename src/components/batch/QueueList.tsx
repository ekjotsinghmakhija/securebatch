import { VideoFile } from "@/types";
import { Trash2, Download } from "lucide-react";

interface QueueListProps {
  queue: VideoFile[];
  removeFile: (id: string) => void;
}

export const QueueList = ({ queue, removeFile }: QueueListProps) => {
  if (queue.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm text-slate-400 font-bold">
        Queue ({queue.length})
      </h2>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {queue.map((video) => (
          <div
            key={video.id}
            className="bg-slate-900 p-4 rounded border border-slate-800 flex justify-between items-center group transition-colors hover:border-slate-700"
          >
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate max-w-[200px] text-slate-200">
                {video.name}
              </p>
              <p className="text-xs text-slate-500">
                {(video.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="text-right flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded min-w-[80px] text-center font-bold ${
                  video.status === "done"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : video.status === "processing"
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : video.status === "error"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {video.status === "processing"
                  ? "PROCESSING..."
                  : video.status.toUpperCase()}
              </span>

              {video.outputURL && (
                <a
                  href={video.outputURL}
                  download={`processed_${video.name}`}
                  className="p-2 text-blue-400 hover:text-white hover:bg-blue-600 rounded transition-colors"
                  title="Download"
                >
                  <Download size={18} />
                </a>
              )}

              <button
                onClick={() => removeFile(video.id)}
                disabled={video.status === "processing"}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Remove video"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
