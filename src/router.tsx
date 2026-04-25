import { createRouter } from "@tanstack/solid-router";
import { ErrorBoundary } from "#components/common/error-boundary";
import { NotFound } from "#components/common/not-found";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultErrorComponent: ErrorBoundary,
    defaultNotFoundComponent: () => <NotFound />,
  });
