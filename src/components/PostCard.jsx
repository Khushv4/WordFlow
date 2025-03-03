import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block transform transition-transform hover:scale-105">
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-auto max-h-60 object-cover"
          />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-center truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
