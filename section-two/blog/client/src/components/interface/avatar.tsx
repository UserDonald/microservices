import { cn, getInitials } from '@/lib/utils';

const Avatar = ({
  name,
  className,
  size = 'md',
}: {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClass = {
    sm: {
      container: 'w-6 h-6',
      text: 'text-xs',
    },
    md: {
      container: 'w-8 h-8',
      text: 'text-xs',
    },
    lg: {
      container: 'w-10 h-10',
      text: 'text-sm',
    },
  };

  return (
    <div
      className={cn(
        'bg-accent rounded-full flex items-center justify-center',
        sizeClass[size].container,
        className
      )}
    >
      <span className={cn('text-primary font-medium', sizeClass[size].text)}>
        {getInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;
