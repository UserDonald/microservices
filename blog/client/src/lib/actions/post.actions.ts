'use server';

import axios from 'axios';

const BASE_URL = 'http://10.108.149.211';

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
    await axios.post(`${BASE_URL}/services/posts/create`, {
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
    const { data } = await axios.get(`${BASE_URL}/services/posts`, {
      headers: {
        'Host': 'posts.com'
      }
    });

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
    const { data } = await axios.get(`${BASE_URL}/services/posts/${id}`, {
      headers: {
        'Host': 'posts.com'
      }
    });

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
