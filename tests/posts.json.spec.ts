import { expect, test } from "vitest";
import { z } from "zod";
import posts from "../assets/posts.json";

const PostSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  url: z.string().url().startsWith("https://", "URLはhttps://で始まる必要があります"),
  date: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, "日付の形式はYYYY/MM/DDである必要があります"),
  tags: z.array(z.string()),
  img: z.string().optional(),
});

test("posts.jsonの形式が正しいか", () => {
  let lastTimeStamp = new Date("3000-01-01").getTime();
  
  for (const post of posts) {
    PostSchema.parse(post);

    const timestamp = new Date(post.date).getTime();
    expect(timestamp).toBeLessThanOrEqual(lastTimeStamp);
    lastTimeStamp = timestamp;
  }
});
