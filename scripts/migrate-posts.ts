import { createClient } from "@supabase/supabase-js";
import postsJson from "../assets/posts.json";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("エラー: SUPABASE_URLとSUPABASE_KEYが環境変数に設定されていません");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migratePosts() {
  console.log(`${postsJson.length}件の記事をSupabaseに移行します...`);

  const postsToInsert = postsJson.map((post) => ({
    title: post.title,
    url: post.url,
    date: post.date.replace(/\//g, "-"),
    img: post.img || null,
    tags: post.tags,
  }));

  const { data, error } = await supabase.from("posts").insert(postsToInsert);

  if (error) {
    console.error("エラーが発生しました:", error);
    process.exit(1);
  }

  console.log("移行が完了しました！");
  console.log(`${postsJson.length}件の記事をSupabaseに追加しました`);

  const { count, error: countError } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("件数確認でエラーが発生しました:", countError);
  } else {
    console.log(`現在のpostsテーブルの総件数: ${count}件`);
  }
}

migratePosts();
