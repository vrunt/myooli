import { youtube_parser } from "../../utils/http.ts";

export default async function SongPage (req, ctx) {
  const { video_id } = ctx.params;
  const videoReq = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${video_id}&key=${Deno.env.get("YT_API_KEY")}`
  );

  if (!videoReq.ok) {
    throw new Error("Unable to fetch YT data");
  }

  const videoData = (await videoReq.json()).items[0];
  const duration = videoData.contentDetails.duration.replace(/^PT(\d*?)H?(\d*?)M?(\d+)S?$/g, "$1h$2m$3s");

  if (videoData.snippet.categoryId !== "10") {
    return (
      <>
        Not a song.
      </>
    )
  };

  const renderListOfTags = (tags) => {
    return tags.map(tag => <li>{tag}</li>)
  };

  return (
    <>
    <div>Title: { videoData.snippet.title }</div>
    <div>
      <label>Tag(s):</label>
      <ul>
        { renderListOfTags(videoData.snippet.tags) }
      </ul>
    </div>
    <div>Duration: { duration } </div>
    <img src={ videoData.snippet.thumbnails.default.url } />
    <div>Channel: { videoData.snippet.channelTitle }</div>
    <div>Description: <pre>{ videoData.snippet.description }</pre></div>
    </>
  );
}

