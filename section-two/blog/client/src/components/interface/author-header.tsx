import { cn } from '@/lib/utils';

const AuthorHeader = ({
  author,
  username,
  type = 'post',
}: {
  author: string;
  username: string;
  type?: 'post' | 'comment';
}) => {
  const typeClass = {
    post: 'flex-col',
    comment: 'flex-row items-center gap-1',
  };

  return (
    <div className={cn('flex', typeClass[type])}>
      <span className="text-sm font-medium">{author}</span>
      <span className="text-sm text-muted-foreground">@{username}</span>
    </div>
  );
};

export default AuthorHeader;
