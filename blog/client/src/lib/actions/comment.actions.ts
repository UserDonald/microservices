'use server';

import axios from 'axios';

const COMMENTS_BASE_URL = 'http://comments-ci-srv:4001';

export const createComment = async ({
  postId,
  content,
  author,
  username,
}: {
  postId: string;
  content: string;
  author: string;
  username: string;
}): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await axios.post(`${COMMENTS_BASE_URL}/posts/${postId}/comments`, {
      content,
      author,
      username,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create comment',
    };
  }
};
