'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createComment } from '@/lib/actions/comment.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SendHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  comment: z.string().min(1, { message: 'Comment is required' }),
});

const CommentForm = ({ postId }: { postId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { success } = await createComment(postId, data.comment);

    if (success) {
      form.reset();
      toast.success('Comment created successfully');
    } else {
      toast.error('Failed to create comment');
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 border rounded-md p-4"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Add a comment"
              className="flex-1"
              disabled={isLoading}
            />
          )}
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SendHorizontal className="w-4 h-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
