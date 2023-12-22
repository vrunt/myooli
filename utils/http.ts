import { RedirectStatus, STATUS_CODE } from "$std/http/status.ts";

export function redirect(
  location: string,
  status: typeof STATUS_CODE.Created | RedirectStatus = STATUS_CODE.SeeOther,
) {
  return new Response(null, {
    headers: {
      location,
    },
    status,
  });
}

export function youtube_parser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
}
