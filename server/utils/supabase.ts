import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URLとSUPABASE_KEYが環境変数に設定されていません");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
