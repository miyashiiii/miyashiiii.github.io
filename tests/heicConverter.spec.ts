import { expect, test, vi } from "vitest";
import { convertHeicToPng, isHeicFile } from "../utils/heicConverter";

vi.mock("heic-to", () => ({
  heicTo: vi.fn(async ({ blob }) => {
    if (blob.size === 0) {
      throw new Error("Invalid HEIC file");
    }
    return new Blob(["fake-png-data"], { type: "image/png" });
  }),
  isHeic: vi.fn(async (file) => {
    return file.type === "image/heic" || file.type === "image/heif";
  }),
}));

test("convertHeicToPng should convert HEIC blob to PNG", async () => {
  const heicBlob = new Blob(["fake-heic-data"], { type: "image/heic" });
  const pngBlob = await convertHeicToPng(heicBlob, 1);

  expect(pngBlob).toBeInstanceOf(Blob);
  expect(pngBlob.type).toBe("image/png");
});

test("convertHeicToPng should handle conversion errors", async () => {
  const invalidBlob = new Blob([], { type: "image/heic" });

  await expect(convertHeicToPng(invalidBlob, 1)).rejects.toThrow(
    "Invalid HEIC file"
  );
});

test("isHeicFile should detect HEIC files correctly", async () => {
  const heicFile = new File(["fake-heic-data"], "test.heic", { type: "image/heic" });
  const jpegFile = new File(["fake-jpeg-data"], "test.jpg", { type: "image/jpeg" });

  expect(await isHeicFile(heicFile)).toBe(true);
  expect(await isHeicFile(jpegFile)).toBe(false);
});

test("convertHeicToPng should use specified quality", async () => {
  const { heicTo } = await import("heic-to");
  const heicBlob = new Blob(["fake-heic-data"], { type: "image/heic" });

  await convertHeicToPng(heicBlob, 0.8);

  expect(heicTo).toHaveBeenCalledWith({
    blob: heicBlob,
    type: "image/png",
    quality: 0.8,
  });
});
