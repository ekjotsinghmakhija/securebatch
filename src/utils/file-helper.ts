export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    // If audio/video file
    if (!file.type.startsWith('video') && !file.type.startsWith('audio')) {
      resolve(0); // Fallback for safety
      return;
    }

    const media = document.createElement('video');
    media.preload = 'metadata';

    media.onloadedmetadata = () => {
      window.URL.revokeObjectURL(media.src);
      // Returns float seconds (e.g., 10.54321)
      resolve(media.duration);
    };

    media.onerror = () => {
      resolve(0); // Corrupt file or unknown format
    };

    media.src = URL.createObjectURL(file);
  });
};
