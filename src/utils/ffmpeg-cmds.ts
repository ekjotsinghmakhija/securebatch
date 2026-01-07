import { VideoSettings } from "@/types";

export const buildCommand = (
  inputName: string,
  outputName: string,
  settings: VideoSettings,
  watermarkFileName?: string
): string[] => {
  const cmd: string[] = ["-i", inputName];

  // --- SPECIAL CASE: MP3 (Audio Only) ---
  if (settings.format === "mp3") {
    cmd.push("-vn"); // No video
    cmd.push("-c:a", "libmp3lame"); // Try standard MP3 encoder
    cmd.push("-q:a", "2"); // Standard quality
    cmd.push(outputName);
    return cmd;
  }

  // --- IMAGE WATERMARK INPUT ---
  if (settings.watermarkType === "image" && watermarkFileName) {
    cmd.push("-i", watermarkFileName);
  }

  // --- FILTERS (Scale, FPS for GIF, Watermark) ---
  const filters: string[] = [];
  let baseStream = "[0:v]";

  // 1. Resolution / GIF Scaling
  if (settings.format === "gif") {
    // GIFs need to be smaller and lower framerate to be performant
    filters.push(`${baseStream}fps=15,scale=480:-1:flags=lanczos[scaled]`);
    baseStream = "[scaled]";
  } else {
    // Standard MP4 Scaling
    if (settings.resolution === "720p") {
       filters.push(`${baseStream}scale=-2:720[scaled]`);
       baseStream = "[scaled]";
    } else if (settings.resolution === "1080p") {
       filters.push(`${baseStream}scale=-2:1080[scaled]`);
       baseStream = "[scaled]";
    }
  }

  // 2. Watermark
  // Note: We skip watermarking for MP3s obviously
  if (settings.watermarkType === "text" && settings.watermarkText) {
    const text = settings.watermarkText.replace(/:/g, "\\:");
    filters.push(
      `${baseStream}drawtext=fontfile=arial.ttf:text='${text}':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2[outv]`
    );
    baseStream = "[outv]";
  } else if (settings.watermarkType === "image" && watermarkFileName) {
    // For image overlay, input #1 is the image
    const overlayInput = settings.format === "mp4" && settings.watermarkType === "image" && watermarkFileName ? "[1:v]" : "[1:v]";
    // ^ Logic check: input index is 1 if watermark file provided.

    filters.push(`[1:v]scale=150:-1[logo]`);
    filters.push(`${baseStream}[logo]overlay=W-w-20:H-h-20[outv]`);
    baseStream = "[outv]";
  } else {
    // Map final stream if we had filters
    if (filters.length > 0) filters.push(`${baseStream}null[outv]`);
  }

  // Apply Filter Complex
  if (filters.length > 0) {
    cmd.push("-filter_complex", filters.join(";"));
    cmd.push("-map", "[outv]");
  } else {
    cmd.push("-map", "0:v");
  }

  // --- OUTPUT SETTINGS ---

  if (settings.format === "gif") {
    // GIF specific flags
    cmd.push("-f", "gif");
  } else {
    // MP4 specific flags
    cmd.push("-c:v", "mpeg4");
    const qualityMap = { high: "2", medium: "5", low: "10" };
    cmd.push("-q:v", qualityMap[settings.quality]);
  }

  // --- AUDIO HANDLING ---
  if (settings.removeAudio || settings.format === "gif") {
    cmd.push("-an"); // Remove audio
  } else {
    // Copy audio if not mute
    cmd.push("-map", "0:a?");
    cmd.push("-c:a", "copy");
  }

  cmd.push(outputName);

  return cmd;
};
