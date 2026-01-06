import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

export const useFFmpeg = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

    if (!ffmpegRef.current) {
        ffmpegRef.current = new FFmpeg();
    }

    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
      console.log(message);
      if (messageRef.current) messageRef.current.innerHTML = message;
    });

    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      // Load Font
      const fontURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/arial.ttf";
      await ffmpeg.writeFile("arial.ttf", await fetchFile(fontURL));

      setLoaded(true);
    } catch (error) {
      console.error("Failed to load FFmpeg", error);
      setLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ NEW: Terminate Function
  const terminate = () => {
    if (ffmpegRef.current) {
        ffmpegRef.current.terminate();
        ffmpegRef.current = null;
        setLoaded(false);
    }
  };

  return { ffmpeg: ffmpegRef.current, loaded, load, terminate, isLoading };
};
