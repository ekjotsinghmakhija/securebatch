export type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error';

export interface VideoFile {
  id: string;
  file: File;
  name: string;
  size: number;
  duration: number; // ✅ NEW: Duration in seconds
  status: ProcessingStatus;
  progress: number;
  outputURL?: string;
  outputSize?: number;
  outputBlob?: Blob;
  outputExtension?: string;
}

export interface VideoSettings {
  quality: 'high' | 'medium' | 'low';
  resolution: 'original' | '1080p' | '720p' | '4k'; // ✅ Added 4K
  watermarkType: 'none' | 'text' | 'image';
  watermarkText?: string;
  watermarkImage?: File;
  format: 'mp4' | 'gif' | 'mp3';
  removeAudio: boolean;
}
