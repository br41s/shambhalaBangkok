import { remark } from 'remark';
import html from 'remark-html';

export function markdownToHtml(markdown: string): string {
  const result = remark().use(html, { sanitize: true }).processSync(markdown);
  return result.toString();
}
