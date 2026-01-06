import { FileVideo } from "lucide-react";

interface HeaderProps {
  loaded: boolean;
}

export const Header = ({ loaded }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
      <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
        <FileVideo className="text-blue-500" /> SecureBatch Video
      </h1>
      <div className="text-xs">
        {loaded ? (
          <span className="text-green-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Engine Ready
          </span>
        ) : (
          <span className="text-yellow-400">● Loading Engine...</span>
        )}
      </div>
    </div>
  );
};
