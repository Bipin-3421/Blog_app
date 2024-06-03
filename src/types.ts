// src/types.ts
export interface BlogPost {
  _id: string;
  title: string;
  overview: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
