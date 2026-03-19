import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BlogCard } from '@/components/ui/BlogCard';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, updates, and reflections from the Shambhala Bangkok community.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container-content py-8">
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog & News</h1>
      <p className="text-lg text-text-secondary mb-12">
        Updates, reflections, and news from our community.
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary py-12 text-center">
          No posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
