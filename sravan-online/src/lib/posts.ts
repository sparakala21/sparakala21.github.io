import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogPostWithContent } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: BlogPost[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
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
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getPostData(slug: string): Promise<BlogPostWithContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    excerpt: matterResult.data.excerpt || '',
    author: matterResult.data.author,
    tags: matterResult.data.tags,
  };
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  try {
    return getPostData(slug);
  } catch (error) {
    return null;
  }
}