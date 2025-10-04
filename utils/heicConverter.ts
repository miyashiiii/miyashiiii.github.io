import { heicTo } from "heic-to";

export interface HeicConversionOptions {
  blob: Blob;
  type?: "image/png" | "image/jpeg";
  quality?: number;
}

export async function convertHeicToPng(
  blob: Blob,
  quality: number = 1
): Promise<Blob> {
  const result = await heicTo({
    blob,
    type: "image/png",
    quality,
  });

  return Array.isArray(result) ? result[0] : result;
}
