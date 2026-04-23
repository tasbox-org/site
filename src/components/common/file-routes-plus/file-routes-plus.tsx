import type { RouteDefinition } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { blogPosts } from "#data/blog-posts";

const transformBlogRoute = (route: RouteDefinition): RouteDefinition => {
  const post = blogPosts.find((post) => route.path === `/${post.filesystemPath}/`);

  if (post === undefined) {
    return route;
  }

  return {
    ...route,
    path: `/${post.slug}/`,
  };
};

const transformers = {
  "/blog": (route: RouteDefinition): RouteDefinition => {
    if (route.children === undefined) {
      return route;
    }

    return {
      ...route,
      children: Array.isArray(route.children)
        ? route.children.map(transformBlogRoute)
        : transformBlogRoute(route.children),
    };
  },
} as const;

export const FileRoutesPlus = (): RouteDefinition[] => {
  const routes = (<FileRoutes />) as unknown as RouteDefinition[];

  return routes.map((route) => {
    if (route.path in transformers) {
      return transformers[route.path as keyof typeof transformers](route);
    }

    return route;
  });
};
