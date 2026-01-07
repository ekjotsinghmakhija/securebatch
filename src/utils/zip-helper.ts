import JSZip from "jszip";
import { VideoFile } from "@/types";

export const downloadAllAsZip = async (queue: VideoFile[]) => {
  const zip = new JSZip();
  const folder = zip.folder("secure-batch-processed");

  const completedVideos = queue.filter(
    (v) => v.status === "done" && v.outputBlob
  );

  if (completedVideos.length === 0) {
    alert("No processed videos to zip!");
    return;
  }

  completedVideos.forEach((video) => {
    if (!video.outputBlob) return;

    // ✅ Use the stored extension or default to mp4
    const ext = video.outputExtension || "mp4";
    const fileName = `processed_${video.name.replace(/\.[^/.]+$/, "")}.${ext}`;

    folder?.file(fileName, video.outputBlob);
  });

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);

  const a = document.createElement("a");
  a.href = url;
  a.download = `secure-batch-export-${new Date().getTime()}.zip`;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
