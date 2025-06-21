'use server';

import axios from 'axios';

const BASE_URL = 'http://10.108.149.211';

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
    await axios.post(`${BASE_URL}/services/posts/${postId}/comments`, {
      content,
      author,
      username,
    }, {
      headers: {
        'Host': 'posts.com'
      }
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
