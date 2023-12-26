import type { Plugin } from "$fresh/server.ts";

import { createFacebookOAuthConfig, createHelpers } from "kv_oauth/mod.ts";

import { getAuthenticatedUser } from "./fb_user_info.ts";
import { User } from "./types.ts";
import { setUserWithSession } from "./db.ts";

const callbackUri = !Deno.env.get("DENO_REGION")
  ? "http://localhost:8000/callback"
  : "https://myooli.deno.dev/callback";

const { signIn, signOut, handleCallback } = createHelpers(
  createFacebookOAuthConfig({
    redirectUri: callbackUri,
    scope: "email",
  }),
);

export default function kvOAuthPlugin(): Plugin {
  return {
    name: "kv-oauth",
    routes: [
      {
        path: "/signin",
        handler: async (req) => {
          return await signIn(req);
        },
      },
      {
        path: "/signout",
        handler: async (req) => {
          return await signOut(req);
        },
      },
      {
        path: "/callback",
        handler: async (req) => {
          const { response, tokens, sessionId } = await handleCallback(req);
          const fbUser = await getAuthenticatedUser(tokens!.accessToken);

          const user: User = {
            id: String(fbUser.id),
            name: fbUser.name,
            avatarUrl: fbUser.picture.data.url,
          };
          await setUserWithSession(user, sessionId);

          return response;
        },
      },
    ],
  };
}
