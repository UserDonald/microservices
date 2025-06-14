type BlogContent = {
  id: string;
  content: string;
  author: string;
  username: string;
  createdAt: string;
};

type BlogContentComment = {
  id: string;
  content: string;
  author: string;
  username: string;
  createdAt: string;
  comments: BlogContent[];
};

interface PageParams {
  params: Promise<{ id: string }>;
}

interface PageSearchParams {
  searchParams: Promise<{ id: string }>;
}
