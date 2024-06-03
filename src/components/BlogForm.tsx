// src/components/BlogForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface BlogFormProps {
  onSuccess: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("overview", overview);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5001/api/blogs/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Overview
        </label>
        <input
          type="text"
          value={overview}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOverview(e.target.value)
          }
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
      >
        Create Blog
      </button>
    </form>
  );
};

export default BlogForm;
