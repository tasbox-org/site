import { createRouter } from "@tanstack/solid-router";
import { NotFound } from "#components/common/not-found";

export const getRouter = () =>
  createRouter({
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  });
