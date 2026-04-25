import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript, Suspense } from "solid-js/web";

const RootShell = () => (
  <html lang="en">
    <head>
      <HeadContent />
      <HydrationScript />
    </head>
    <body>
      <Suspense>
        <Outlet />
        <TanStackRouterDevtools />
      </Suspense>
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "apple-mobile-web-app-title", content: "TASBox" },
      { title: "TASBox" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/img/favicon-96x96.png", sizes: "96x96" },
      { rel: "icon", type: "image/svg+xml", href: "/img/favicon.svg" },
      { rel: "shortcut icon", href: "/img/favicon.ico" },
      { rel: "apple-touch-icon", href: "/img/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
});
