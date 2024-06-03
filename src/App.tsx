import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import BlogList from "./components/BlogList";
import SearchBar from "./components/SearchBar";
import BlogForm from "./components/BlogForm";
import { BlogPost } from "./types";

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<{ blogs: BlogPost[] }>(
        "http://localhost:5001/api/blogs/all"
      );
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // Ensure blogs is set to an empty array in case of error
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<BlogPost[]>(
        `http://localhost:5001/api/blogs/search?title=${query}`
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error searching blogs:", error);
      setBlogs([]); // Ensure blogs is set to an empty array in case of error
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Blog App</h1>
      <nav className="mb-4">
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/manage" className="mr-4">
          Manage Blogs
        </Link>
        <Link to="/create" className="mr-4">
          Create Blog
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              <BlogList blogs={blogs} />
            </>
          }
        />
        <Route
          path="/manage"
          element={<h2 className="text-xl font-bold mb-4">Manage Blogs</h2>}
        />
        <Route
          path="/create"
          element={
            <>
              <h2 className="text-xl font-bold mb-4">Create Blog</h2>
              <BlogForm onSuccess={handleRefresh} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
