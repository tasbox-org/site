import { Title } from "@solidjs/meta";
import { type Component, For } from "solid-js";
import { blogPosts } from "#data/blog-posts";

const BlogList: Component = () => (
  <>
    <Title>TASBox - Blog</Title>
    <For each={blogPosts}>{(post) => <a href={`/blog/${post.slug}`}>{post.title}</a>}</For>
  </>
);

export default BlogList;
