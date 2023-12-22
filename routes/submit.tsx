import { FreshContext } from "$fresh/server.ts";
import { getSessionId } from "kv_oauth/mod.ts";
import { getUserBySession } from "../utils/db.ts";
import { redirect, youtube_parser } from "../utils/http.ts";

export const handler = {
  async POST(req: Request, ctx: FreshContext) {
    const form = await req.formData();
    const url = form.get("url");

    console.log(url);

    if (typeof url !== "string" || !URL.canParse(url)) {
      return redirect("/submit?error");
    }

    const videoId = youtube_parser(url);

    if (!videoId) {
      return redirect("/submit?error");
    }

    return redirect(`/song/${videoId}`);
  },
};

export default async function SubmitPage(req: Request, ctx: FreshContext) {
  const sessionId = await getSessionId(req);
  const isSignedIn = sessionId !== undefined;
  const activeUser = isSignedIn ? await getUserBySession(sessionId) : null;

  return (
    <>
      <head title="Submit" />
      <main>
        <div>
          <h1>Submit your song</h1>
          <p>Paste a YouTube URL below.</p>
        </div>
        <form method="post">
          <div>
            <label>URL:</label>
            <input
              id="submission_url"
              type="text"
              name="url"
              required
              placeholder="(paste link here)"
            />
          </div>
          {ctx.url.searchParams.has("error") && (
            <div class="text-red-500">
              Must be a valid URL!
            </div>
          )}
          <div>
            <button>Submit</button>
          </div>
        </form>
      </main>
    </>
  );
}
