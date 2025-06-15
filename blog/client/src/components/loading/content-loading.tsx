import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const ContentLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('flex justify-center items-center gap-2 h-full', className)}
    >
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  );
};

export default ContentLoading;
