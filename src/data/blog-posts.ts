import JsonPosts from "./blog-posts.json";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  thumbnailAltText: string;
  authors: string[];
  tags: string[];
}

export const blogPosts: BlogPost[] = JsonPosts;
