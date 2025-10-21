import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();

const supabaseUrl = config.supabaseUrl;
const supabaseServiceKey = config.supabaseServiceKey;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "SUPABASE_URLとSUPABASE_SERVICE_KEYが環境変数に設定されていません"
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
