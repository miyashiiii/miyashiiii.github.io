import exifr from "exifr";

export interface ExifEntry {
  key: string;
  value: string;
}

function formatValue(value: unknown): string {
  if (value instanceof Date) return value.toLocaleString();
  if (value instanceof Uint8Array) return `[${value.length} bytes]`;
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}

export async function readExif(file: File): Promise<ExifEntry[]> {
  const tags = await exifr.parse(file, true);
  if (!tags) return [];

  return Object.entries(tags)
    .filter(([key]) => key !== "MakerNote" && key !== "UserComment")
    .map(([key, value]) => ({
      key,
      value: formatValue(value),
    }));
}
