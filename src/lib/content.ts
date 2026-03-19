import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getContentDirectory(subdir: string): string {
  return path.join(CONTENT_DIR, subdir);
}

export function getAllSlugs(subdir: string): string[] {
  const dir = getContentDirectory(subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getContentBySlug<T>(
  subdir: string,
  slug: string
): { data: T; content: string } | null {
  const dir = getContentDirectory(subdir);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

export function getAllContent<T>(
  subdir: string
): { data: T; content: string; slug: string }[] {
  const slugs = getAllSlugs(subdir);
  return slugs
    .map((slug) => {
      const result = getContentBySlug<T>(subdir, slug);
      if (!result) return null;
      return { ...result, slug };
    })
    .filter(Boolean) as { data: T; content: string; slug: string }[];
}
