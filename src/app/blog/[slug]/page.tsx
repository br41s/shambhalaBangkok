import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { blogPostSchema, breadcrumbSchema, generatePageMeta } from '@/lib/schema';
import { formatDate } from '@/lib/utils';
import { JsonLd } from '@/components/ui/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return generatePageMeta({
    title: post.title,
    description: post.excerpt,
    ogImage: post.image,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />

      <article className="container-content py-8 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-text-tertiary">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author && <span>· {post.author}</span>}
          </div>
        </header>

        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[2/1] object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-black/[0.06]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-surface-muted rounded-full text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
