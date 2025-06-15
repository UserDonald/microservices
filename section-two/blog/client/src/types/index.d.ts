type BlogContentPost = {
  id: string;
  content: string;
  author: string;
  username: string;
  createdAt: string;
  comments: BlogContentComment[];
};

type BlogContentComment = {
  id: string;
  content: string;
  author: string;
  username: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
};

interface PageParams {
  params: Promise<{ id: string }>;
}

interface PageSearchParams {
  searchParams: Promise<{ id: string }>;
}
