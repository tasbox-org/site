import JsonPosts from "./blog-posts.json" with { type: "json" };

export interface BlogPost {
  filesystemPath: string;
  slug: string;
  title: string;
  description: string;
  thumbnailAltText: string;
  authors: string[];
  tags: string[];
  date: Date;
}

export const blogPosts: BlogPost[] = JsonPosts.map((post) => ({ ...post, date: new Date(post.date) })).sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
