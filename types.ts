
export interface INewsEntry {
  id: string;
  title: string;
  summary?: string | null;
  time: string;
  image?: {
    url: string;
  } | null;
  author: {
    avatar?: string | null;
    name: string;
  };
  link: string;
}
