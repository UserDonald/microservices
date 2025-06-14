import Link from 'next/link';

type ElementType = 'link' | 'div';

const Elements: Record<
  ElementType,
  React.FC<{ children: React.ReactNode; href?: string }>
> = {
  link: ({ children, href }: { children: React.ReactNode; href?: string }) => {
    return (
      <Link
        href={href || '/'}
        className="border rounded-md p-4 flex flex-col gap-3 hover:bg-accent/50 hover:shadow-xs transition-colors"
      >
        {children}
      </Link>
    );
  },
  div: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="border rounded-md p-4 flex flex-col gap-3">
        {children}
      </div>
    );
  },
};

const PostCard = ({
  post,
  element = 'link',
}: {
  post: BlogPost;
  element?: ElementType;
}) => {
  const content = (
    <>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <div className="bg-accent rounded-full w-9 h-9 flex items-center justify-center">
            <span className="text-sm text-primary font-medium">DN</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium">Donald Nash</span>
            <span className="text-sm text-muted-foreground">
              @thedonaldnash
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">2 hours ago</span>
        </div>
      </div>
      <h2 className="text-base">{post.title}</h2>
    </>
  );

  if (element === 'link') {
    return <Elements.link href={`/posts/${post.id}`}>{content}</Elements.link>;
  }

  return <Elements.div>{content}</Elements.div>;
};

export default PostCard;
