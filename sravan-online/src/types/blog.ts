export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
}

export interface BlogPostWithContent extends BlogPost {
  contentHtml: string;
}