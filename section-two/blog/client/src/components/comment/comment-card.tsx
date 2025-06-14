import AuthorHeader from '@/components/interface/author-header';
import Avatar from '@/components/interface/avatar';
import { cn, formatDate } from '@/lib/utils';

const CommentCard = ({
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
          <Avatar name={author} />
          <AuthorHeader author={author} username={username} type="comment" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default CommentCard;
