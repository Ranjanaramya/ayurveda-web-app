export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}
