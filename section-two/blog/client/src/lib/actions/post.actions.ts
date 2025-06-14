'use server';

import axios from 'axios';

const POSTS_BASE_URL = 'http://localhost:4000';

export const createPost = async (
  title: string
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await axios.post(`${POSTS_BASE_URL}/posts`, {
      title,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post',
    };
  }
};

export const getPosts = async (): Promise<{
  success: boolean;
  error?: string;
  data?: {
    posts: BlogPost[];
  };
}> => {
  try {
    const { data } = await axios.get(`${POSTS_BASE_URL}/posts`);

    return {
      success: true,
      data: {
        posts: Object.values(data),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get posts',
    };
  }
};

export const getPost = async (
  id: string
): Promise<{
  success: boolean;
  error?: string;
  data?: {
    post: BlogPost;
  };
}> => {
  try {
    const { data } = await axios.get(`${POSTS_BASE_URL}/posts/${id}`);

    return {
      success: true,
      data: {
        post: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get post',
    };
  }
};
