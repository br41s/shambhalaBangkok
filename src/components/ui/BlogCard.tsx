import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost & { slug: string };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image && (
          <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-surface-muted">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags?.[0] && (
              <>
                <span>·</span>
                <span className="text-brand-blue">{post.tags[0]}</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-semibold group-hover:text-brand-blue transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
