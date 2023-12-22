import { FreshConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import kvOAuthPlugin from "./utils/kv_oauth.ts";

export default {
  plugins: [tailwind(), kvOAuthPlugin()],
} as FreshConfig;
