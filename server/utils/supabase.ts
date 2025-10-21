import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URLとSUPABASE_KEYが環境変数に設定されていません");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
