import { getAllContent, getContentBySlug } from './content';
import { markdownToHtml } from './markdown';
import type { BlogPost } from './types';

export function getAllPosts(): (BlogPost & { slug: string })[] {
  const items = getAllContent<BlogPost>('blog');
  return items
    .map((item) => ({
      ...item.data,
      slug: item.slug,
      content: markdownToHtml(item.content),
    }))
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): (BlogPost & { slug: string }) | null {
  const result = getContentBySlug<BlogPost>('blog', slug);
  if (!result) return null;
  return { ...result.data, slug, content: markdownToHtml(result.content) };
}

export function getRecentPosts(limit = 3): (BlogPost & { slug: string })[] {
  return getAllPosts().slice(0, limit);
}
