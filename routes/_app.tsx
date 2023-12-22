import { defineApp, AppProps } from "$fresh/server.ts";

export default defineApp((req, ctx) => {
  return (
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Myooli</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <ctx.Component />
    </body>
  </html>
  );
});
