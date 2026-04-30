import { type Component, For } from "solid-js";
import { BlogPostCard } from "#components/blog/blog-post-card";
import { Metadata } from "#components/common/metadata";
import { Sidebar } from "#components/common/sidebar";
import { blogPosts } from "#data/blog-posts";
import { useBlogSidebarGroups } from "#hooks/use-blog-sidebar-groups";
import styles from "./index.module.css";

const BlogList: Component = () => {
  const blogPostSidebarGroups = useBlogSidebarGroups();

  return (
    <div class={styles.container}>
      <Metadata
        type="website"
        title="Blog"
        description="TASBox progress updates, sneak peaks, technical deep dives and more."
        url="/blog"
      />
      <aside>
        <Sidebar groups={blogPostSidebarGroups} />
      </aside>
      <For each={blogPosts}>{(post) => <BlogPostCard {...post} />}</For>
    </div>
  );
};

export default BlogList;
