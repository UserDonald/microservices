import ContentLoading from '@/components/loading/content-loading';
import PostCard from '@/components/post/post-card';
import PostForm from '@/components/post/post-form';
import { getPosts } from '@/lib/actions/post.actions';
import Link from 'next/link';
import { Suspense } from 'react';

const Page = async () => {
  return (
    <main className="flex flex-col gap-4 max-w-5xl mx-auto pt-16 pb-12 px-4">
      <h1 className="text-2xl font-semibold">Social Media Blog</h1>
      <PostForm />
      <Suspense fallback={<ContentLoading />}>
        <PageContent />
      </Suspense>
    </main>
  );
};

const PageContent = async () => {
  const { success, posts, error } = await getPosts();

  if (!success) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded">
        Error loading posts: {error}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No posts available. Create the first post above!
      </div>
    );
  }

  return (
    <>
      {posts.map((post: BlogContentPost) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <PostCard
            key={post.id}
            {...post}
            className="hover:bg-accent/50 hover:shadow-xs transition-colors"
          />
        </Link>
      ))}
    </>
  );
};

export default Page;
