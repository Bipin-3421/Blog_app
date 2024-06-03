// src/components/BlogList.tsx
import React from "react";
import { BlogPost } from "../types";

interface BlogListProps {
  blogs: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="border rounded-md p-4 mb-2">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.overview}</p>
            <img
              src={`http://localhost:5001/${blog.image}`}
              alt={blog.title}
              className="w-full h-auto mt-2"
            />
            <p className="text-gray-500 mt-2">
              Published on: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
