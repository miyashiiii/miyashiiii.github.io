import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();

const supabaseUrl = config.supabaseUrl;
const supabaseServiceKey = config.supabaseServiceKey;
const supabaseKey = config.supabaseKey;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URLが環境変数に設定されていません");
}

if (!supabaseServiceKey && !supabaseKey) {
  throw new Error(
    "SUPABASE_SERVICE_KEYまたはSUPABASE_KEYが環境変数に設定されていません"
  );
}

const key = supabaseServiceKey || supabaseKey;
export const supabase = createClient(supabaseUrl, key as string);
