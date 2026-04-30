import type { SidebarGroup, SidebarItem } from "#components/common/sidebar";
import { blogPosts } from "#data/blog-posts";

export const useBlogSidebarGroups = (): SidebarGroup[] =>
  Object.entries(Object.groupBy(blogPosts, (post) => post.date.getFullYear()))
    .sort(([yearA], [yearB]) => (yearA > yearB ? -1 : 1))
    .map(
      ([year, postsForYear]): SidebarGroup => ({
        heading: year,
        items:
          postsForYear?.map(
            (post): SidebarItem => ({
              breadcrumbs: [post.title],
              href: `/blog/${post.slug}`,
            }),
          ) ?? [],
      }),
    );
