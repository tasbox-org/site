// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

// noinspection HtmlRequiredTitleElement
export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="/img/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
          <link rel="shortcut icon" href="/img/favicon.ico" />
          <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" sizes="180x180" />
          <meta name="apple-mobile-web-app-title" content="TASBox" />
          <link rel="manifest" href="/site.webmanifest" />
          <style>
            @import url(
            "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
            );
          </style>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
