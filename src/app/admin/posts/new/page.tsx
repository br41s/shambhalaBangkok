import { requireAuth } from '@/lib/auth';
import { PostForm } from '@/components/admin/PostForm';

export default async function NewPostPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Post</h1>
        <p className="text-sm text-gray-500">Create a new blog post. It will be saved to GitHub and the site will rebuild.</p>
      </div>
      <PostForm />
    </div>
  );
}
