import { getSessionId } from "kv_oauth/mod.ts";
import { getUserBySession } from "../utils/db.ts";

export default async function HomePage(req: Request) {
  const sessionId = await getSessionId(req);
  const isSignedIn = sessionId !== undefined;
  const activeUser = isSignedIn ? await getUserBySession(sessionId) : null;

  return (
    <>
      <p>Provider: FB</p>
      <p>Session ID: {sessionId || "undefined"}</p>
      <p>User: { activeUser?.name || "(none)" }</p>
      <p>
        <a href="/signin">Sign in</a>
      </p>
      <p>
        <a href="/signout">Sign out</a>
      </p>
    </>
  );
}
