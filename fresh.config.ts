import { FreshConfig } from "$fresh/server.ts";
import kvOAuthPlugin from "./utils/kv_oauth.ts";

export default {
  plugins: [kvOAuthPlugin()],
} as FreshConfig;
