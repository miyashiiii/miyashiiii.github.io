import { supabase } from "~/server/utils/supabase";

export default defineEventHandler(async () => {
  const { data, error } = await supabase.from("posts").select("tags");

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "タグの取得に失敗しました",
      data: error,
    });
  }

  const tagsSet = new Set<string>();
  data.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => tagsSet.add(tag));
    }
  });

  const tags = Array.from(tagsSet).sort();

  return tags;
});
