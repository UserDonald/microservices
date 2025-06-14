import { cn, formatDate } from '@/lib/utils';
import AuthorHeader from '../interface/author-header';
import Avatar from '../interface/avatar';

const PostCard = ({
  author,
  username,
  content,
  createdAt,
  className,
}: BlogContent & { className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-3 border rounded-md p-4', className)}>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Avatar name={author} size="lg" />
          <AuthorHeader author={author} username={username} type="post" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
      <p className="text-base">{content}</p>
    </div>
  );
};

export default PostCard;
