import { remark } from 'remark';
import html from 'remark-html';

const htmlCache = new Map<string, string>();

export function markdownToHtml(markdown: string): string {
  const cached = htmlCache.get(markdown);
  if (cached) return cached;

  const result = remark().use(html, { sanitize: true }).processSync(markdown);
  const output = result.toString();
  htmlCache.set(markdown, output);
  return output;
}
