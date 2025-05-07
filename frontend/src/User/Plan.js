import { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, Share2, Heart, BookmarkPlus, Users, Star, ArrowRight, Filter, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LearningPlanSharingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCreatePlan = () => {
    navigate('/createPlan');
  };

  const categories = [
    { id: 'coding', name: 'Coding' },
    { id: 'cooking', name: 'Cooking' },
    { id: 'photography', name: 'Photography' },
    { id: 'diy', name: 'DIY Crafts' },
    { id: 'music', name: 'Music' },
    { id: 'language', name: 'Languages' }
  ];

  const difficultiesData = [
    { id: 'beginner', name: 'Beginner', color: 'bg-green-500' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-blue-500' },
    { id: 'advanced', name: 'Advanced', color: 'bg-purple-500' },
    { id: 'expert', name: 'Expert', color: 'bg-red-500' }
  ];

  // Removed the hardcoded learning plans array
  const learningPlans = [];

  // Removed content from youMightLike array
  const youMightLike = [];

  // Filter empty learning plans array (this will always return an empty array)
  const filteredPlans = learningPlans.filter(plan => {
    if (selectedCategory !== 'all' && plan.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && plan.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    const difficultyData = difficultiesData.find(d => d.id === difficulty);
    return difficultyData ? difficultyData.color : 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className={`relative py-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Learning Plans
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover structured learning paths created by experts or share your own knowledge journey with our community.
            </p>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
              <div className="relative flex-grow max-w-md mx-auto md:mx-0">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for learning plans..."
                  className="w-full py-3.5 pl-12 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-lg"
                />
              </div>
              <button 
                className="py-3.5 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium shadow-lg shadow-blue-500/20 md:ml-4"
                onClick={handleCreatePlan}
              >
                Create Plan <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-gray-800/70 backdrop-blur-sm rounded-full">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'discover' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Discover
              </button>
              <button 
                onClick={() => setActiveTab('my-plans')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'my-plans' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                My Plans
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'saved' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Saved
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-all ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-all ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-all ${selectedDifficulty === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                onClick={() => setSelectedDifficulty('all')}
              >
                All Levels
              </button>
              {difficultiesData.map(difficulty => (
                <button 
                  key={difficulty.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-all ${selectedDifficulty === difficulty.id ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                >
                  {difficulty.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Plans Grid */}
      <section className="py-10 bg-gray-900">
        <div className="container mx-auto px-6">
          {activeTab === 'discover' && (
            <>
              {/* No featured learning plans to display */}
              
              {/* Main Learning Plans Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">All Learning Plans</h2>
                
                {/* Display empty state since there are no learning plans */}
                <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
                  <BookOpen size={48} className="mx-auto mb-6 text-blue-400" />
                  <p className="text-gray-300 text-lg mb-2">No learning plans available.</p>
                  <p className="text-gray-400 mb-6">Be the first to create and share a learning plan!</p>
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium"
                    onClick={handleCreatePlan}
                  >
                    Create New Plan
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'my-plans' && (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-lg">
                <BookOpen size={48} className="mx-auto mb-6 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4">Create your first learning plan</h3>
                <p className="text-gray-400 mb-6">Share your knowledge and help others learn by creating a structured learning plan.</p>
                <button 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
                  onClick={handleCreatePlan}
                >
                  Create New Plan
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-lg">
                <BookmarkPlus size={48} className="mx-auto mb-6 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4">No saved learning plans</h3>
                <p className="text-gray-400 mb-6">Save learning plans to access them later and track your progress.</p>
                <button 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover Plans
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sidebar/You Might Like Section */}
      <section className="py-10 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Learning Plan Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Plans</span>
                  <span className="font-semibold text-lg">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Created Today</span>
                  <span className="font-semibold text-lg">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Completion Rate</span>
                  <span className="font-semibold text-lg">0%</span>
                </div>
              </div>
            </div>
            
            {/* You Might Like - Empty State */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">You Might Like</h3>
              <div className="py-8 text-center">
                <p className="text-gray-400 mb-4">No recommended plans available yet.</p>
                <p className="text-sm text-gray-500">Check back later for personalized recommendations.</p>
              </div>
            </div>
            
            {/* Tips for Creating Plans */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-800/50">
              <h3 className="text-xl font-bold mb-4">Tips for Great Learning Plans</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3 mt-0.5">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300">Define clear learning objectives for each section</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3 mt-0.5">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300">Include practice exercises and real-world projects</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3 mt-0.5">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300">Break down complex topics into manageable chunks</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3 mt-0.5">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300">Provide resource recommendations for each topic</p>
                </li>
              </ul>
              <button className="w-full mt-6 py-2.5 bg-blue-500 hover:bg-blue-600 transition-all rounded-lg text-sm font-medium flex items-center justify-center">
                <BookOpen size={16} className="mr-2" />
                View Creation Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to share your knowledge?</h2>
              <p className="text-gray-300 mb-8">Create a structured learning plan and help others master the skills you've acquired. Share your expertise with our global community.</p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20"
                  onClick={handleCreatePlan}
                >
                  Create Learning Plan
                </button>
                <button className="px-8 py-3.5 bg-transparent border border-gray-400 rounded-full hover:border-white transition-all font-medium">
                  Explore Examples
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}