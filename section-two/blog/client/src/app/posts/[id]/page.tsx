import CommentCard from '@/components/comment/comment-card';
import CommentForm from '@/components/comment/comment-form';
import PostCard from '@/components/post/post-card';
import { buttonVariants } from '@/components/ui/button';
import { getComments } from '@/lib/actions/comment.actions';
import { getPost } from '@/lib/actions/post.actions';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
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
        <h1 className="text-base font-medium">Media Post</h1>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center gap-2 h-32">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        }
      >
        <PageContent postId={postId} />
      </Suspense>
    </main>
  );
};

const PageContent = async ({ postId }: { postId: string }) => {
  const [{ data: postData }, { data: commentsData }] = await Promise.all([
    getPost(postId),
    getComments(postId),
  ]);
  const post = postData?.post || null;
  const comments = commentsData?.comments || [];

  if (!post) {
    return (
      <div className="text-center text-lg font-semibold">Post not found</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PostCard post={post} element="div" />
      <CommentForm postId={postId} />
      <div className="flex flex-col gap-2">
        {comments.map((comment: BlogPostComment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Page;
