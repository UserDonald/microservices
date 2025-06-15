import CommentCard from '@/components/comment/comment-card';
import CommentForm from '@/components/comment/comment-form';
import ContentLoading from '@/components/loading/content-loading';
import PostCard from '@/components/post/post-card';
import { buttonVariants } from '@/components/ui/button';
import { getPost } from '@/lib/actions/post.actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const Page = async ({ params }: PageParams) => {
  const { id: postId } = await params;

  return (
    <main className="flex flex-col gap-4 max-w-5xl mx-auto pt-16 pb-12 px-4">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-base font-medium">Blog Post</h1>
      </div>
      <Suspense fallback={<ContentLoading className="h-40" />}>
        <PageContent postId={postId} />
      </Suspense>
    </main>
  );
};

const PageContent = async ({ postId }: { postId: string }) => {
  const { post } = await getPost(postId);

  if (!post) {
    redirect('/');
  }

  return (
    <>
      <PostCard {...post} />
      <CommentForm postId={postId} />
      <div className="flex flex-col gap-2">
        {post?.comments?.map((comment: BlogContentComment) => (
          <CommentCard key={comment.id} {...comment} />
        ))} 
      </div>
    </>
  );
};

export default Page;
