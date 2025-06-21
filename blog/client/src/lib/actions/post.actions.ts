'use server';

import axios from 'axios';

const POSTS_BASE_URL = 'http://posts-ci-srv:4000';
const QUERY_BASE_URL = 'http://query-ci-srv:4002';

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
    await axios.post(`${POSTS_BASE_URL}/posts/create`, {
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
  posts?: BlogContentPost[];
}> => {
  try {
    const { data } = await axios.get(`${QUERY_BASE_URL}/posts`);

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
  post?: BlogContentPost;
}> => {
  try {
    const { data } = await axios.get(`${QUERY_BASE_URL}/posts/${id}`);

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
