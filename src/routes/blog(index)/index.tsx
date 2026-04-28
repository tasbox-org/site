import { type Component, For } from "solid-js";
import { Metadata } from "#components/common/metadata";
import { blogPosts } from "#data/blog-posts";

const BlogList: Component = () => (
  <>
    <Metadata
      type="website"
      title="Blog"
      description="TASBox progress updates, sneak peaks, technical deep dives and more."
      url="/blog"
    />
    <For each={blogPosts}>{(post) => <a href={`/blog/${post.slug}`}>{post.title}</a>}</For>
  </>
);

export default BlogList;
