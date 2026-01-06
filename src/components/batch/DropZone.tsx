interface DropZoneProps {
  onFilesSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DropZone = ({ onFilesSelected }: DropZoneProps) => {
  return (
    <div className="bg-slate-900 p-8 rounded-xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 transition-colors text-center group">
      <label className="cursor-pointer block">
        <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">
          📂
        </span>
        <span className="text-lg font-bold text-slate-200">
          Click to Upload Videos
        </span>
        <span className="block text-sm text-slate-500 mt-1">
          or drag and drop video files here
        </span>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={onFilesSelected}
          className="hidden"
        />
      </label>
    </div>
  );
};
