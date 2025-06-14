'use server';

import axios from 'axios';

const POSTS_BASE_URL = 'http://localhost:4000';

export const createPost = async ({
  content,
  author,
  username,
}: {
  content: string;
  author: string;
  username: string;
}): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await axios.post(`${POSTS_BASE_URL}/posts`, {
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
      error: error instanceof Error ? error.message : 'Failed to create post',
    };
  }
};

export const getPosts = async (): Promise<{
  success: boolean;
  error?: string;
  posts?: BlogContent[];
}> => {
  try {
    const { data } = await axios.get(`${POSTS_BASE_URL}/posts`);

    return {
      success: true,
      posts: Object.values(data),
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
  post?: BlogContent;
}> => {
  try {
    const { data } = await axios.get(`${POSTS_BASE_URL}/posts/${id}`);

    return {
      success: true,
      post: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get post',
    };
  }
};
