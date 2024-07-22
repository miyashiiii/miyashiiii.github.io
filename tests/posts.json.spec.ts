import { expect, test } from "vitest";
import posts from "../assets/posts.json";

test("posts.jsonの形式が正しいか", () => {
  let lastTimeStamp = new Date("3000-01-01").getTime();
  for (const post of posts) {
    expect(post.title.length).toBeGreaterThan(0);

    expect(post.url.startsWith("https://")).toBe(true);

    expect(post.date.length).toBeGreaterThan(0);
    expect(post.date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    const timestamp = new Date(post.date).getTime();
    expect(lastTimeStamp).toBeLessThanOrEqual(lastTimeStamp); // 降順チェック
    lastTimeStamp = timestamp;

    expect(Array.isArray(post.tags)).toBe(true);
  }
});
