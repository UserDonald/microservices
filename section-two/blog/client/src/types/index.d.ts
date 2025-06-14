type BlogPost = {
  id: string;
  title: string;
};

type BlogPostComment = {
  id: string;
  content: string;
};

interface PageParams {
  params: Promise<{ id: string }>;
}

interface PageSearchParams {
  searchParams: Promise<{ id: string }>;
}
