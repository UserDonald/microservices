type BlogContent = {
  id: string;
  content: string;
  author: string;
  username: string;
  createdAt: string;
};

interface PageParams {
  params: Promise<{ id: string }>;
}

interface PageSearchParams {
  searchParams: Promise<{ id: string }>;
}
