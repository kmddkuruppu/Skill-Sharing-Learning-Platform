import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center space-x-2">
        <BookOpen className="text-blue-400" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">SkillShare</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link to="#" className="hover:text-blue-400 transition-colors">Explore</Link>
        <Link to="#" className="hover:text-blue-400 transition-colors">Categories</Link>
        <Link to="#" className="hover:text-blue-400 transition-colors">Teach</Link>
        <Link to="#" className="hover:text-blue-400 transition-colors">About</Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 rounded-full bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all">
          Log In
        </button>
        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all">
          Sign Up
        </button>
      </div>
    </nav>
  );
}