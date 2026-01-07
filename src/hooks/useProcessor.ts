import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { VideoFile, VideoSettings } from "@/types";
import { buildCommand } from "@/utils/ffmpeg-cmds";
import { getVideoDuration } from "@/utils/file-helper"; // ✅ Import

export const useProcessor = (
  ffmpeg: FFmpeg | null,
  terminate: () => void,
  load: () => Promise<void>
) => {
  const [queue, setQueue] = useState<VideoFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const cancelRef = useRef(false);

  // --- UPDATED: Capture Duration on Add ---
  const addFiles = async (files: File[]) => {
    const newItems: VideoFile[] = [];

    for (const f of files) {
      const duration = await getVideoDuration(f);

      newItems.push({
        id: Math.random().toString(36).substring(7),
        file: f,
        name: f.name,
        size: f.size,
        duration: duration, // ✅ Precise duration stored
        status: "idle",
        progress: 0,
      });
    }

    setQueue((prev) => [...prev, ...newItems]);
  };
  // ----------------------------------------

  const removeFile = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const cancelProcessing = async () => {
    cancelRef.current = true;
    terminate();
    setIsProcessing(false);
    setQueue((prev) =>
      prev.map((item) =>
        item.status === "processing"
          ? { ...item, status: "error", progress: 0 }
          : item
      )
    );
    // Note: No Refund. Builder keeps the credits.
    console.log("⚠️ Processing Cancelled. Credits Retained.");
    await load();
  };

  const startProcessing = async (settings: VideoSettings) => {
    if (!ffmpeg || isProcessing) return;
    setIsProcessing(true);
    cancelRef.current = false;

    for (let i = 0; i < queue.length; i++) {
      if (cancelRef.current) break;
      const item = queue[i];
      if (item.status === "done" || item.status === "error") continue;

      updateStatus(item.id, "processing", 0);

      try {
        if (!ffmpeg) throw new Error("Engine not ready");

        const ext = settings.format;
        const inputName = `input_${item.id}.${item.name.split('.').pop()}`;
        const outputName = `output_${item.id}.${ext}`;
        let watermarkFileName: string | undefined = undefined;

        await ffmpeg.writeFile(inputName, await fetchFile(item.file));

        if (settings.watermarkType === "image" && settings.watermarkImage) {
           watermarkFileName = `watermark_${item.id}.png`;
           await ffmpeg.writeFile(watermarkFileName, await fetchFile(settings.watermarkImage));
        }

        const cmd = buildCommand(inputName, outputName, settings, watermarkFileName);

        await ffmpeg.exec(cmd);

        if (cancelRef.current) throw new Error("Cancelled");

        const data = (await ffmpeg.readFile(outputName)) as any;

        let mimeType = "video/mp4";
        if (ext === "gif") mimeType = "image/gif";
        if (ext === "mp3") mimeType = "audio/mpeg";

        const blob = new Blob([data.buffer], { type: mimeType });
        const outputURL = URL.createObjectURL(blob);

        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
        if (watermarkFileName) {
            try { await ffmpeg.deleteFile(watermarkFileName); } catch(e) {}
        }

        updateStatus(item.id, "done", 100, outputURL, blob.size, blob, ext);

      } catch (error) {
        console.error("Processing failed for", item.name, error);
        updateStatus(item.id, "error", 0);
        if (cancelRef.current) break;
      }
    }

    setIsProcessing(false);
    cancelRef.current = false;
  };

  const updateStatus = (
    id: string,
    status: VideoFile["status"],
    progress: number,
    url?: string,
    size?: number,
    blob?: Blob,
    ext?: string
  ) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
            ? { ...item, status, progress, outputURL: url, outputSize: size, outputBlob: blob, outputExtension: ext }
            : item
      )
    );
  };

  return { queue, addFiles, removeFile, startProcessing, cancelProcessing, isProcessing };
};
