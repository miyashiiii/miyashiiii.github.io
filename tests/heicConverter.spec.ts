import { expect, test, vi } from "vitest";
import { convertHeicToPng } from "../utils/heicConverter";

vi.mock("heic-to", () => ({
  heicTo: vi.fn(async ({ blob }) => {
    if (blob.size === 0) {
      throw new Error("Invalid HEIC file");
    }
    return new Blob(["fake-png-data"], { type: "image/png" });
  }),
}));

test("HEICをPNGに変換できる", async () => {
  const heicBlob = new Blob(["fake-heic-data"], { type: "image/heic" });
  const pngBlob = await convertHeicToPng(heicBlob, 1);

  expect(pngBlob).toBeInstanceOf(Blob);
  expect(pngBlob.type).toBe("image/png");
});

test("変換エラーを適切に処理できる", async () => {
  const invalidBlob = new Blob([], { type: "image/heic" });

  await expect(convertHeicToPng(invalidBlob, 1)).rejects.toThrow(
    "Invalid HEIC file"
  );
});

test("指定された品質を使用できる", async () => {
  const { heicTo } = await import("heic-to");
  const heicBlob = new Blob(["fake-heic-data"], { type: "image/heic" });

  await convertHeicToPng(heicBlob, 0.8);

  expect(heicTo).toHaveBeenCalledWith({
    blob: heicBlob,
    type: "image/png",
    quality: 0.8,
  });
});
