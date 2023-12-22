import { defineApp } from "$fresh/server.ts";

export default defineApp(async (req, ctx) => {
  return (
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Myooli</title>
    </head>
    <body>
      <ctx.Component />
    </body>
  </html>
  );
});
