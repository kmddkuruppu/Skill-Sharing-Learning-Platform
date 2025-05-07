import { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, Share2, Heart, BookmarkPlus, Users, Star, ArrowRight, Filter, Download, Eye } from 'lucide-react';

export default function LearningPlanSharingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const learningPlans = [
    {
      id: 1,
      title: 'Full-Stack Web Development Roadmap',
      description: 'A comprehensive guide to becoming a full-stack developer, covering HTML, CSS, JavaScript, React, Node.js, and database technologies.',
      author: 'Alex Johnson',
      authorAvatar: '/api/placeholder/32/32',
      rating: 4.9,
      reviews: 256,
      duration: '12 weeks',
      difficulty: 'intermediate',
      category: 'coding',
      saved: 1243,
      image: '/api/placeholder/400/200',
      featured: true
    },
    {
      id: 2,
      title: 'Italian Cuisine Masterclass',
      description: 'Learn the fundamentals of Italian cooking, from pasta and sauces to classic desserts. Includes meal preparation techniques and flavor profiles.',
      author: 'Maria Romano',
      authorAvatar: '/api/placeholder/32/32',
      rating: 4.8,
      reviews: 187,
      duration: '4 weeks',
      difficulty: 'beginner',
      category: 'cooking',
      saved: 873,
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      title: 'Advanced Portrait Photography',
      description: 'Master portrait photography with advanced lighting techniques, composition strategies, and post-processing skills.',
      author: 'Sam Wilson',
      authorAvatar: '/api/placeholder/32/32',
      rating: 4.7,
      reviews: 134,
      duration: '6 weeks',
      difficulty: 'advanced',
      category: 'photography',
      saved: 762,
      image: '/api/placeholder/400/200'
    },
    {
      id: 4,
      title: 'DIY Home Renovation Projects',
      description: 'A step-by-step guide to handling home renovation projects yourself, including repairs, painting, and basic carpentry.',
      author: 'Emma Davis',
      authorAvatar: '/api/placeholder/32/32',
      rating: 4.6,
      reviews: 112,
      duration: '8 weeks',
      difficulty: 'intermediate',
      category: 'diy',
      saved: 651,
      image: '/api/placeholder/400/200'
    },
    {
      id: 5,
      title: 'Piano From Scratch',
      description: 'Learn to play piano from the very beginning with progressive lessons covering technique, music theory, and popular songs.',
      author: 'Michael Chen',
      authorAvatar: '/api/placeholder/32/32',
      rating: 4.9,
      reviews: 201,
      duration: '16 weeks',
      difficulty: 'beginner',
      category: 'music',
      saved: 943,
      image: '/api/placeholder/400/200'
    },
    {
      id: 6,
      title: 'Machine Learning Fundamentals',
      description: 'Dive into machine learning algorithms, data preprocessing, model evaluation, and practical applications with Python.',
      author: 'Priya Sharma',
      authorAvatar: '/api/placeholder/32/32',
      rating: 4.8,
      reviews: 176,
      duration: '10 weeks',
      difficulty: 'advanced',
      category: 'coding',
      saved: 1087,
      image: '/api/placeholder/400/200'
    }
  ];

  const youMightLike = [
    {
      id: 7,
      title: 'Spanish in 30 Days',
      category: 'language',
      difficulty: 'beginner',
      image: '/api/placeholder/120/80'
    },
    {
      id: 8,
      title: 'Watercolor Painting Techniques',
      category: 'diy',
      difficulty: 'intermediate',
      image: '/api/placeholder/120/80'
    },
    {
      id: 9,
      title: 'Mobile App Development with Flutter',
      category: 'coding',
      difficulty: 'intermediate',
      image: '/api/placeholder/120/80'
    }
  ];

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
              <button className="py-3.5 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium shadow-lg shadow-blue-500/20 md:ml-4">
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
              {/* Featured Learning Plan */}
              {filteredPlans.some(plan => plan.featured) && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Star className="mr-2 text-yellow-400" fill="#FACC15" />
                    Featured Learning Plan
                  </h2>
                  
                  {filteredPlans.filter(plan => plan.featured).map(plan => (
                    <div 
                      key={plan.id}
                      className="bg-gradient-to-r from-gray-800 to-gray-850 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all shadow-lg"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="relative h-48 lg:h-full">
                          <img src={plan.image} alt={plan.title} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)} text-white`}>
                              {difficultiesData.find(d => d.id === plan.difficulty).name}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 lg:col-span-2">
                          <h3 className="text-2xl font-bold mb-3">{plan.title}</h3>
                          <p className="text-gray-300 mb-6">{plan.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex items-center">
                              <img src={plan.authorAvatar} alt={plan.author} className="w-8 h-8 rounded-full mr-2" />
                              <span className="text-sm text-gray-300">By {plan.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2 text-gray-400" />
                              <span className="text-sm text-gray-300">{plan.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Star size={16} className="mr-2 text-yellow-400" fill="#FACC15" />
                              <span className="text-sm text-gray-300">{plan.rating} ({plan.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center">
                              <BookmarkPlus size={16} className="mr-2 text-gray-400" />
                              <span className="text-sm text-gray-300">{plan.saved} saved</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center text-sm font-medium">
                              View Plan
                            </button>
                            <button className="px-6 py-2.5 bg-gray-700 rounded-full hover:bg-gray-600 transition-all flex items-center justify-center text-sm font-medium">
                              <BookmarkPlus size={16} className="mr-2" />
                              Save
                            </button>
                            <button className="px-6 py-2.5 bg-gray-700 rounded-full hover:bg-gray-600 transition-all flex items-center justify-center text-sm font-medium">
                              <Share2 size={16} className="mr-2" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Learning Plans Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">All Learning Plans</h2>
                
                {filteredPlans.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlans.filter(plan => !plan.featured).map((plan, index) => (
                      <div 
                        key={plan.id}
                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        style={{animationDelay: `${index * 100}ms`}}
                      >
                        <div className="relative">
                          <img src={plan.image} alt={plan.title} className="w-full h-48 object-cover" />
                          <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star size={14} className="text-yellow-400 mr-1" fill="#FACC15" />
                            {plan.rating}
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)} text-white`}>
                              {difficultiesData.find(d => d.id === plan.difficulty).name}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <div className="flex items-center mb-3">
                            <span className="text-xs text-gray-400">{categories.find(cat => cat.id === plan.category).name}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{plan.description}</p>
                          
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <img src={plan.authorAvatar} alt={plan.author} className="w-6 h-6 rounded-full mr-2" />
                              <span className="text-xs text-gray-400">{plan.author}</span>
                            </div>
                            <span className="text-xs text-gray-400 flex items-center">
                              <Clock size={14} className="mr-1.5" />
                              {plan.duration}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                              View plan <ArrowRight size={16} className="ml-1.5" />
                            </button>
                            <div className="flex space-x-2">
                              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
                                <BookmarkPlus size={16} />
                              </button>
                              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
                                <Share2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-lg">No learning plans match your filters.</p>
                    <button 
                      className="mt-4 px-6 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all text-sm font-medium"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedDifficulty('all');
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'my-plans' && (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-lg">
                <BookOpen size={48} className="mx-auto mb-6 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4">Create your first learning plan</h3>
                <p className="text-gray-400 mb-6">Share your knowledge and help others learn by creating a structured learning plan.</p>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg">
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
                  <span className="font-semibold text-lg">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Created Today</span>
                  <span className="font-semibold text-lg">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Most Popular</span>
                  <span className="font-semibold text-lg">Coding</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Completion Rate</span>
                  <span className="font-semibold text-lg">76%</span>
                </div>
              </div>
            </div>
            
            {/* You Might Like */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">You Might Like</h3>
              <div className="space-y-4">
                {youMightLike.map(item => (
                  <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-all cursor-pointer">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400">{categories.find(cat => cat.id === item.category).name}</span>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{difficultiesData.find(d => d.id === item.difficulty).name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View More
              </button>
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
                <button className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20">
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