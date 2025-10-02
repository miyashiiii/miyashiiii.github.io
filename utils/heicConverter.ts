export interface HeicConversionOptions {
  blob: Blob;
  type?: "image/png" | "image/jpeg";
  quality?: number;
}

export async function convertHeicToPng(
  blob: Blob,
  quality: number = 1
): Promise<Blob> {
  const { heicTo } = await import("heic-to");
  const result = await heicTo({
    blob,
    type: "image/png",
    quality,
  });

  return Array.isArray(result) ? result[0] : result;
}

export async function isHeicFile(file: File): Promise<boolean> {
  const { isHeic } = await import("heic-to");
  return await isHeic(file);
}
