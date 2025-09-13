//src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostWithContent } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: BlogPost[] = fileNames
    .filter(fileName => fileName.endsWith('.mdx')) // Only process .mdx files
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        slug,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        author: matterResult.data.author,
        tags: matterResult.data.tags,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx')) // Only process .mdx files
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export async function getPostData(slug: string): Promise<BlogPostWithContent> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content, // Raw MDX content instead of processed HTML
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    excerpt: matterResult.data.excerpt || '',
    author: matterResult.data.author,
    tags: matterResult.data.tags,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  try {
    return await getPostData(slug);
  } catch (error) {
    return null;
  }
}