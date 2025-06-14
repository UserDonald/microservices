'use server';

import axios from 'axios';

const COMMENTS_BASE_URL = 'http://localhost:4001';

export const createComment = async (
  postId: string,
  comment: string
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await axios.post(`${COMMENTS_BASE_URL}/posts/${postId}/comments`, {
      content: comment,
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

export const getComments = async (
  postId: string
): Promise<{
  success: boolean;
  error?: string;
  data?: {
    comments: BlogPostComment[];
  };
}> => {
  try {
    const { data } = await axios.get(
      `${COMMENTS_BASE_URL}/posts/${postId}/comments`
    );

    return {
      success: true,
      data: {
        comments: Object.values(data),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get comments',
    };
  }
};
