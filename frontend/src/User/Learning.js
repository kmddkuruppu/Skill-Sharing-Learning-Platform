import { useState } from 'react';
import { 
  Search, BookOpen, Calendar, Camera, Award, TrendingUp, 
  Star, ArrowRight, Users, Filter, Share2, X, ChevronDown,
  Edit3, FileImage, AlertTriangle, Heart, MessageCircle, Plus
} from 'lucide-react';

// Enhanced Progress Node with subtle animation
const ProgressNode = ({ category }) => {
  const colorMap = {
    coding: 'bg-blue-500',
    cooking: 'bg-red-500',
    photography: 'bg-purple-500',
    diy: 'bg-green-500',
    default: 'bg-blue-500'
  };

  return (
    <div className={`absolute -left-6 w-5 h-5 rounded-full ${colorMap[category] || colorMap.default} flex items-center justify-center animate-pulse`}>
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  );
};

// Modal template selector with hover effects
const ProgressTemplates = ({ onSelectTemplate, onClose }) => {
  const templates = [
    { id: 1, title: "Today I learned...", category: "learning", icon: <BookOpen size={16} /> },
    { id: 2, title: "Achievement unlocked: ...", category: "achievement", icon: <Award size={16} /> },
    { id: 3, title: "Project milestone: ...", category: "milestone", icon: <TrendingUp size={16} /> },
    { id: 4, title: "Skill practice: ...", category: "practice", icon: <Star size={16} /> }
  ];
  
  return (
    <div className="bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-700 p-4 absolute top-full mt-2 w-full z-50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-gray-200 text-sm font-medium">Select a template</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {templates.map(template => (
          <button 
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-700/80 transition-all flex items-center group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-gray-600 flex items-center justify-center mr-3 transition-colors">
              {template.icon}
            </div>
            <span className="text-gray-300 group-hover:text-white transition-colors">{template.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Modern category badge with pulse effect
const CategoryBadge = ({ category }) => {
  const categoryMap = {
    coding: { label: 'Coding', color: 'bg-blue-500', textColor: 'text-blue-200' },
    cooking: { label: 'Cooking', color: 'bg-red-500', textColor: 'text-red-200' },
    photography: { label: 'Photography', color: 'bg-purple-500', textColor: 'text-purple-200' },
    diy: { label: 'DIY Crafts', color: 'bg-green-500', textColor: 'text-green-200' },
    default: { label: 'Other', color: 'bg-blue-500', textColor: 'text-blue-200' }
  };

  const { label, color, textColor } = categoryMap[category] || categoryMap.default;
  
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${color}/20 ${textColor} flex items-center`}>
      <span className={`w-2 h-2 rounded-full ${color} mr-1.5`}></span>
      {label}
    </span>
  );
};

// Update Card with hover effects and animations
const UpdateCard = ({ update, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  return (
    <div className="relative">
      <ProgressNode category={update.category} />
      
      <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl border border-gray-700 hover:border-gray-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-sm font-medium mr-3">
              {update.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-medium text-gray-100">{update.author}</h4>
              <span className="text-xs text-gray-400">{update.date}</span>
            </div>
          </div>
          {update.badge && (
            <div className="px-2.5 py-1 bg-gradient-to-r from-amber-600/20 to-amber-500/20 rounded-full text-xs font-medium text-amber-300 flex items-center">
              <Award size={12} className="mr-1.5" />
              {update.badge}
            </div>
          )}
        </div>
        
        <p className={`text-gray-300 mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>{update.content}</p>
        
        {update.content.length > 150 && !isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="text-blue-400 hover:text-blue-300 text-sm mb-4 flex items-center"
          >
            Read more <ChevronDown size={14} className="ml-1" />
          </button>
        )}
        
        {update.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={update.image} 
              alt="Progress update" 
              className="w-full h-auto transition-transform hover:scale-105 duration-500" 
            />
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-3">
            <CategoryBadge category={update.category} />
            
            {update.reminder && (
              <span className="text-xs text-purple-300 flex items-center px-2 py-1 bg-purple-500/10 rounded-full">
                <Calendar size={12} className="mr-1.5" />
                {update.reminder}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onLike(update.id)}
              className={`flex items-center text-sm ${update.liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'} transition-colors`}
            >
              <Heart size={16} className="mr-1" fill={update.liked ? "currentColor" : "none"} />
              {update.likes || 0}
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <MessageCircle size={16} />
            </button>
            
            <button className="text-gray-400 hover:text-gray-200 transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
        
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h5 className="text-sm font-medium text-gray-300 mb-3">Comments</h5>
            <div className="flex items-center">
              <input 
                type="text" 
                placeholder="Add a comment..."
                className="flex-grow bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Progress Timeline with animated line
const ProgressTimeline = ({ updates, onLike }) => {
  return (
    <div className="relative pl-6 mt-6 space-y-8">
      {/* Animated vertical line */}
      <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"></div>
      
      {updates.map((update) => (
        <UpdateCard key={update.id} update={update} onLike={onLike} />
      ))}
    </div>
  );
};

export default function ModernProgressApp() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderText, setReminderText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  
  // Sample updates data
  const [updates, setUpdates] = useState([
    {
      id: 1,
      author: "Alex Johnson",
      date: "Today at 2:30 PM",
      content: "Just completed Module 3 of React Fundamentals! Learning hooks was challenging but worth it. I struggled with useEffect dependencies at first, but after reviewing the documentation and practicing with different examples, I finally got the concept.",
      category: "coding",
      badge: "Skill Master",
      likes: 7,
      liked: false
    },
    {
      id: 2,
      author: "Maria Romano",
      date: "Yesterday at 5:45 PM",
      content: "My first homemade pasta! Recipe from the Italian Cuisine course worked perfectly. The dough consistency was just right and the rolling technique we learned made a huge difference.",
      category: "cooking",
      image: "/api/placeholder/500/300",
      reminder: "Next lesson: Apr 30",
      likes: 12,
      liked: true
    },
    {
      id: 3,
      author: "Sam Wilson",
      date: "Apr 25, 2025",
      content: "Applied the rule of thirds technique from the Photography Basics course. What do you think? I'm still working on getting the lighting right, but I feel like my composition has improved significantly.",
      category: "photography",
      image: "/api/placeholder/500/300",
      likes: 5,
      liked: false
    }
  ]);
  
  const categories = [
    { id: 'coding', name: 'Coding', color: 'bg-blue-500', icon: <Edit3 size={14} /> },
    { id: 'cooking', name: 'Cooking', color: 'bg-red-500', icon: <Users size={14} /> },
    { id: 'photography', name: 'Photography', color: 'bg-purple-500', icon: <Camera size={14} /> },
    { id: 'diy', name: 'DIY Crafts', color: 'bg-green-500', icon: <Star size={14} /> }
  ];

  // Handle like functionality
  const handleLikeUpdate = (updateId) => {
    setUpdates(prevUpdates => prevUpdates.map(update => {
      if (update.id === updateId) {
        const newLiked = !update.liked;
        return {
          ...update,
          liked: newLiked,
          likes: newLiked ? (update.likes || 0) + 1 : (update.likes || 1) - 1
        };
      }
      return update;
    }));
  };
  
  const handleTemplateSelect = (template) => {
    setContent(template.title);
    setShowTemplates(false);
    setIsComposing(true);
  };
  
  const handlePostUpdate = () => {
    if (!content.trim()) return;
    
    const newUpdate = {
      id: updates.length + 1,
      author: "You",
      date: "Just now",
      content: content,
      category: selectedCategory || "coding",
      likes: 0,
      liked: false
    };
    
    if (hasReminder && reminderText) {
      newUpdate.reminder = reminderText;
    }
    
    setUpdates([newUpdate, ...updates]);
    setContent('');
    setSelectedCategory('');
    setHasReminder(false);
    setReminderText('');
    setIsComposing(false);
  };

  // Filter updates based on category and search
  const filteredUpdates = updates.filter(update => {
    const matchesCategory = categoryFilter === 'all' || update.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      update.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Progress Updates</h2>
            <p className="text-gray-400 mt-1">Share your learning journey</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-sm font-medium flex items-center">
              <Users size={16} className="mr-2" />
              Explore community
            </button>
          </div>
        </div>
        
        {/* Create update section */}
        <div className={`bg-gray-800/80 backdrop-blur-md rounded-xl p-5 border ${isComposing ? 'border-blue-500/50' : 'border-gray-700'} mb-8 transition-all duration-300`}>
          <div className="mb-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mr-3 flex items-center justify-center font-bold">Y</div>
            <h3 className="font-medium text-gray-200">What did you learn today?</h3>
          </div>
          
          <div className="mb-3 relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsComposing(true)}
              placeholder="Share your progress, achievements, or questions..."
              className={`w-full p-4 bg-gray-900/70 rounded-lg border ${isComposing ? 'border-blue-400/50' : 'border-gray-700'} focus:outline-none text-gray-200 min-h-20 transition-all`}
            />
            
            <div className="absolute top-2 right-2 flex space-x-2">
              <button 
                onClick={() => setShowTemplates(!showTemplates)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-colors"
                title="Use template"
              >
                <BookOpen size={16} />
              </button>
            </div>
            
            {showTemplates && <ProgressTemplates onSelectTemplate={handleTemplateSelect} onClose={() => setShowTemplates(false)} />}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative inline-block">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="py-2 pl-3 pr-8 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-sm appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
              
              <button 
                onClick={() => setHasReminder(!hasReminder)}
                className={`p-2 rounded-lg ${hasReminder ? 'bg-purple-500/30 text-purple-300 border border-purple-500/30' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'} transition-all`}
                title="Add reminder"
              >
                <Calendar size={16} />
              </button>
              
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-gray-300 transition-colors">
                <FileImage size={16} />
              </button>
            </div>
            
            <button 
              onClick={handlePostUpdate}
              disabled={!content.trim()}
              className={`px-5 py-2 rounded-lg ${content.trim() ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gray-700 cursor-not-allowed'} transition-all flex items-center justify-center font-medium sm:w-auto w-full`}
            >
              Post Update
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
          
          {hasReminder && (
            <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center">
              <Calendar size={16} className="text-purple-400 mr-2" />
              <input
                type="text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                placeholder="Add a reminder (e.g., Complete Module 4 by Friday)"
                className="bg-transparent border-none focus:outline-none text-sm text-purple-200 flex-grow"
              />
              <button onClick={() => setHasReminder(false)} className="text-purple-400 hover:text-purple-300">
                <X size={16} />
              </button>
            </div>
          )}
        </div>
        
        {/* Search and filter section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
          <div className="relative flex-grow max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search updates..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:outline-none text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-2 rounded-full text-sm font-medium flex items-center ${showFilters ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-colors`}
            >
              <Filter size={14} className="mr-2" />
              {showFilters ? 'Hide' : 'Filters'}
            </button>
            
            <div className="relative inline-block">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-2 pl-3 pr-8 bg-gray-700 rounded-full border border-gray-600 focus:border-blue-400 focus:outline-none text-sm appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Advanced filters panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Date Range</label>
                <select className="w-full py-2 px-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-sm">
                  <option>All time</option>
                  <option>Today</option>
                  <option>This week</option>
                  <option>This month</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Sort By</label>
                <select className="w-full py-2 px-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-sm">
                  <option>Newest first</option>
                  <option>Oldest first</option>
                  <option>Most liked</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Show</label>
                <select className="w-full py-2 px-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-sm">
                  <option>All updates</option>
                  <option>With reminders</option>
                  <option>With images</option>
                  <option>With badges</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* No results state */}
        {filteredUpdates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle size={32} className="text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No updates found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search criteria</p>
            <button 
              onClick={() => {setCategoryFilter('all'); setSearchQuery('');}} 
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Progress timeline */}
        {filteredUpdates.length > 0 && (
          <ProgressTimeline updates={filteredUpdates} onLike={handleLikeUpdate} />
        )}
        
        {/* Load more button */}
        {filteredUpdates.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-all text-sm font-medium flex items-center">
              <Plus size={16} className="mr-2" />
              Load more updates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}