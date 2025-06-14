const CommentCard = ({ comment }: { comment: BlogPostComment }) => {
  return (
    <div className="flex flex-col gap-3 border rounded-md p-4">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <div className="bg-accent rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xs text-primary font-medium">DN</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-sm font-medium">Donald Nash</span>
            <span className="text-sm text-muted-foreground">
              @thedonaldnash
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">2 hours ago</span>
        </div>
      </div>
      <p className="text-sm">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
