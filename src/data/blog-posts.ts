import JsonPosts from "./blog-posts.json" with { type: "json" };

interface BlogPost {
  filesystemPath: string;
  slug: string;
  title: string;
  description: string;
  thumbnailAltText: string;
  authors: string[];
  tags: string[];
}

export const blogPosts: BlogPost[] = JsonPosts;
