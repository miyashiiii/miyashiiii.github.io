import { supabase } from "~/server/utils/supabase";
import type { Post } from "~/types/post";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const tag = query.tag as string | undefined;

  let queryBuilder = supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (tag) {
    queryBuilder = queryBuilder.contains("tags", [tag]);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "記事の取得に失敗しました",
      data: error,
    });
  }

  return data as Post[];
});
