export type Post = {
  id: string;
  title: string;
  url: string;
  date: string;
  img?: string | null;
  tags: string[];
  created_at?: string;
  updated_at?: string;
};

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at">;
