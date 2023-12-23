import { AppProps, defineApp } from "$fresh/server.ts";

export default defineApp((req, ctx) => {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=Paytone+One&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&family=Paytone+One&display=swap" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Myooli</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="yp-4" style="font-family: 'Mulish', sans-serif">
        <h1 class="text-4xl font-bold" style="font-family: 'Paytone One', sans-serif">myooli</h1>
        <ctx.Component />
      </body>
    </html>
  );
});
