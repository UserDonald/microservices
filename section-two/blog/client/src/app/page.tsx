import PostCard from '@/components/post/post-card';
import PostForm from '@/components/post/post-form';
import { getPosts } from '@/lib/actions/post.actions';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

const Page = async () => {
  return (
    <main className="flex flex-col gap-4 max-w-5xl mx-auto pt-16 pb-12 px-4">
      <h1 className="text-2xl font-semibold">Social Media Blog</h1>
      <PostForm />
      <Suspense
        fallback={
          <div className="flex justify-center items-center gap-2 h-32">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        }
      >
        <PageContent />
      </Suspense>
    </main>
  );
};

const PageContent = async () => {
  const { data } = await getPosts();
  const posts = data?.posts || [];

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post: BlogPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;
