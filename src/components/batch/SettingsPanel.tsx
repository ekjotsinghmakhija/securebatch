import { Settings2, VolumeX } from "lucide-react";
import { VideoSettings } from "@/types";

interface SettingsPanelProps {
  settings: VideoSettings;
  setSettings: (s: VideoSettings) => void;
}

export const SettingsPanel = ({ settings, setSettings }: SettingsPanelProps) => {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <div className="flex items-center gap-2 mb-4 text-slate-300 border-b border-slate-800 pb-2">
        <Settings2 size={18} />
        <h3 className="font-bold">Batch Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Format Selection (New) */}
        <div>
          <label className="block text-xs mb-2 text-slate-400 font-bold uppercase">
            Output Format
          </label>
          <select
            className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700 text-sm focus:border-blue-500 outline-none"
            value={settings.format}
            onChange={(e) =>
              setSettings({ ...settings, format: e.target.value as any })
            }
          >
            <option value="mp4">MP4 (Video)</option>
            <option value="gif">GIF (Animated)</option>
            <option value="mp3">MP3 (Audio Only)</option>
          </select>
        </div>

        {/* Quality */}
        <div>
          <label className="block text-xs mb-2 text-slate-400 font-bold uppercase">
            Compression Level
          </label>
          <select
            className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700 text-sm focus:border-blue-500 outline-none"
            value={settings.quality}
            onChange={(e) =>
              setSettings({ ...settings, quality: e.target.value as any })
            }
            disabled={settings.format !== 'mp4'} // Disable for GIF/MP3
          >
            <option value="high">High Quality (Larger File)</option>
            <option value="medium">Balanced (Standard)</option>
            <option value="low">Max Compression (Smallest)</option>
          </select>
        </div>

        {/* Resolution */}
        <div>
          <label className="block text-xs mb-2 text-slate-400 font-bold uppercase">
            Resolution
          </label>
          <select
            className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700 text-sm focus:border-blue-500 outline-none"
            value={settings.resolution}
            onChange={(e) =>
              setSettings({ ...settings, resolution: e.target.value as any })
            }
            disabled={settings.format === 'mp3'} // Disable for Audio
          >
            <option value="original">Original (No Resize)</option>
            <option value="720p">720p (HD)</option>
            <option value="1080p">1080p (Full HD)</option>
          </select>
        </div>

        {/* Audio Toggle (New) */}
        <div className="flex items-center gap-3 h-full pt-6">
          <label className="flex items-center gap-2 cursor-pointer group">
             <input
                type="checkbox"
                className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                checked={settings.removeAudio}
                onChange={(e) => setSettings({...settings, removeAudio: e.target.checked})}
                disabled={settings.format === 'mp3'}
             />
             <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-white transition-colors">
                <VolumeX size={16} /> Mute Audio
             </div>
          </label>
        </div>

        {/* Watermark Section (Only show if video) */}
        {settings.format !== 'mp3' && (
          <>
            <div className="col-span-1 md:col-span-2 border-t border-slate-800 my-2"></div>

            <div className="md:col-span-1">
              <label className="block text-xs mb-2 text-slate-400 font-bold uppercase">
                Watermark
              </label>
              <select
                className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700 text-sm focus:border-blue-500 outline-none"
                value={settings.watermarkType}
                onChange={(e) =>
                  setSettings({ ...settings, watermarkType: e.target.value as any })
                }
              >
                <option value="none">No Watermark</option>
                <option value="text">Text Overlay</option>
                <option value="image">Logo Image (PNG)</option>
              </select>
            </div>

            <div className="md:col-span-1">
              {settings.watermarkType === "text" && (
                <>
                  <label className="block text-xs mb-2 text-slate-400 font-bold uppercase">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700 text-sm focus:border-blue-500 outline-none"
                    value={settings.watermarkText || ""}
                    placeholder="e.g. DRAFT"
                    onChange={(e) =>
                      setSettings({ ...settings, watermarkText: e.target.value })
                    }
                  />
                </>
              )}
              {settings.watermarkType === "image" && (
                <>
                  <label className="block text-xs mb-2 text-slate-400 font-bold uppercase">
                    Upload Logo (PNG)
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSettings({
                          ...settings,
                          watermarkImage: e.target.files[0],
                        });
                      }
                    }}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
