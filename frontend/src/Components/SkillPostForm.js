// src/components/SkillPostForm.jsx
import React, { useState } from 'react';
import { createPost } from '../services/postService';

const SkillPostForm = ({ onPostCreated }) => {
  const [description, setDescription] = useState('');
  const [mediaUrls, setMediaUrls] = useState([]);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const urls = files.map((file) => URL.createObjectURL(file));
    setMediaUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      description,
      mediaUrls, // Note: in production, handle actual uploads
      userId: 1,
      username: 'Dasun'
    };
    await createPost(post);
    setDescription('');
    setMediaUrls([]);
    onPostCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-lg max-w-xl mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Share a Skill</h2>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows="3"
        placeholder="Describe your skill..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*,video/mp4"
        multiple
        className="mb-4"
        onChange={handleMediaChange}
      />
      <div className="flex gap-2 mb-4">
        {mediaUrls.map((url, index) => (
          <div key={index} className="w-24 h-24 overflow-hidden rounded">
            {url.includes('mp4') ? (
              <video src={url} controls className="w-full h-full object-cover" />
            ) : (
              <img src={url} alt="preview" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

export default SkillPostForm;
