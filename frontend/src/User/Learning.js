import { useState, useEffect } from 'react';
import { Search, BookOpen, Calendar, Camera, Award, TrendingUp, Star, ArrowRight, Users, Filter, Share2 } from 'lucide-react';

// Progress Template options component
const ProgressTemplates = ({ onSelectTemplate }) => {
  const templates = [
    { id: 1, title: "Today I learned...", category: "learning" },
    { id: 2, title: "Achievement unlocked: ...", category: "achievement" },
    { id: 3, title: "Project milestone: ...", category: "milestone" },
    { id: 4, title: "Skill practice: ...", category: "practice" }
  ];
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 absolute top-full mt-2 w-full z-50">
      <h4 className="text-gray-300 text-sm mb-3 font-medium">Select a template</h4>
      <div className="space-y-2">
        {templates.map(template => (
          <button 
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors flex items-center"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            {template.title}
          </button>
        ))}
      </div>
    </div>
  );
};

// Progress Timeline component
const ProgressTimeline = ({ updates }) => {
  return (
    <div className="relative pl-6 mt-6 space-y-6">
      {/* Vertical line */}
      <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
      
      {updates.map((update, index) => (
        <div key={index} className="relative">
          {/* Timeline node */}
          <div 
            className={`absolute -left-6 w-5 h-5 rounded-full ${
              update.category === 'coding' ? 'bg-blue-500' : 
              update.category === 'cooking' ? 'bg-red-500' :
              update.category === 'photography' ? 'bg-purple-500' : 'bg-green-500'
            } shadow-glow flex items-center justify-center`}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Content */}
          <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm mr-3`}>
                  {update.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{update.author}</h4>
                  <span className="text-xs text-gray-400">{update.date}</span>
                </div>
              </div>
              {update.badge && (
                <div className="px-2 py-1 bg-gradient-to-r from-yellow-600/30 to-yellow-500/30 rounded text-xs font-medium text-yellow-300 flex items-center">
                  <Award size={12} className="mr-1" />
                  {update.badge}
                </div>
              )}
            </div>
            
            <p className="text-gray-300 mb-3">{update.content}</p>
            
            {update.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img src={update.image} alt="Progress update" className="w-full h-auto" />
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                  {update.category}
                </span>
                {update.reminder && (
                  <span className="text-xs text-gray-400 flex items-center">
                    <Calendar size={12} className="mr-1.5 text-purple-400" />
                    {update.reminder}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-gray-300 transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ProgressUpdatesComponent() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderText, setReminderText] = useState('');
  
  // Sample user progress updates
  const [updates, setUpdates] = useState([
    {
      author: "Alex Johnson",
      date: "Today at 2:30 PM",
      content: "Just completed Module 3 of React Fundamentals! Learning hooks was challenging but worth it.",
      category: "coding",
      badge: "Skill Master"
    },
    {
      author: "Maria Romano",
      date: "Yesterday at 5:45 PM",
      content: "My first homemade pasta! Recipe from the Italian Cuisine course worked perfectly.",
      category: "cooking",
      image: "/api/placeholder/500/300",
      reminder: "Next lesson: Apr 30"
    },
    {
      author: "Sam Wilson",
      date: "Apr 25, 2025",
      content: "Applied the rule of thirds technique from the Photography Basics course. What do you think?",
      category: "photography",
      image: "/api/placeholder/500/300"
    }
  ]);
  
  const categories = [
    { id: 'coding', name: 'Coding', color: 'bg-blue-500' },
    { id: 'cooking', name: 'Cooking', color: 'bg-red-500' },
    { id: 'photography', name: 'Photography', color: 'bg-purple-500' },
    { id: 'diy', name: 'DIY Crafts', color: 'bg-green-500' }
  ];
  
  const handleTemplateSelect = (template) => {
    setContent(template.title);
    setShowTemplates(false);
  };
  
  const handlePostUpdate = () => {
    if (!content.trim()) return;
    
    const newUpdate = {
      author: "You",
      date: "Just now",
      content: content,
      category: selectedCategory || "coding",
    };
    
    if (hasReminder && reminderText) {
      newUpdate.reminder = reminderText;
    }
    
    setUpdates([newUpdate, ...updates]);
    setContent('');
    setSelectedCategory('');
    setHasReminder(false);
    setReminderText('');
  };

  const filteredUpdates = categoryFilter === 'all' 
    ? updates 
    : updates.filter(update => update.category === categoryFilter);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Progress Updates</h2>
          <p className="text-gray-400 mt-2 md:mt-0">Share your learning journey with the community</p>
        </div>
        
        {/* Create update section */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-10">
          <div className="mb-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 mr-3 flex items-center justify-center font-bold">Y</div>
            <h3 className="font-medium">What did you learn today?</h3>
          </div>
          
          <div className="mb-4 relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your progress, achievements, or questions..."
              className="w-full p-4 bg-gray-900/60 rounded-lg border border-gray-700 focus:border-blue-400 focus:outline-none text-gray-200 min-h-24"
            />
            
            <div className="absolute top-2 right-2">
              <button 
                onClick={() => setShowTemplates(!showTemplates)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-colors"
                title="Use template"
              >
                <BookOpen size={16} />
              </button>
            </div>
            
            {showTemplates && <ProgressTemplates onSelectTemplate={handleTemplateSelect} />}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-between">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Category:</span>
                <div className="relative inline-block w-32">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-400 focus:outline-none text-sm appearance-none"
                  >
                    <option value="">Select...</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <div className="border-t-4 border-l-3 border-r-3 border-transparent border-t-gray-400 h-0 w-0 transform"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={() => setHasReminder(!hasReminder)}
                  className={`p-2 rounded-md ${hasReminder ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-700 text-gray-400'} transition-colors`}
                >
                  <Calendar size={16} />
                </button>
              </div>
              
              <div className="flex items-center">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-400 hover:text-gray-300 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
            </div>
            
            <button 
              onClick={handlePostUpdate}
              disabled={!content.trim()}
              className={`px-6 py-2.5 rounded-lg ${content.trim() ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gray-700 cursor-not-allowed'} transition-all flex items-center justify-center font-medium sm:w-auto w-full`}
            >
              Post Update
            </button>
          </div>
          
          {hasReminder && (
            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center">
              <Calendar size={16} className="text-purple-400 mr-2" />
              <input
                type="text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                placeholder="Add a reminder (e.g., Complete Module 4 by Friday)"
                className="bg-transparent border-none focus:outline-none text-sm text-purple-200 flex-grow"
              />
            </div>
          )}
        </div>
        
        {/* Filters section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative flex-grow max-w-md w-full sm:w-auto">
            <Search className="absolute left-4 top-3 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search updates..."
              className="w-full py-2.5 pl-11 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:outline-none text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${showFilters ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <Filter size={14} className="mr-2" />
              Filters
            </button>
            
            <div className="relative inline-block">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-2 px-4 bg-gray-700 rounded-full border border-gray-600 focus:border-blue-400 focus:outline-none text-sm appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <div className="border-t-4 border-l-3 border-r-3 border-transparent border-t-gray-400 h-0 w-0 transform"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress timeline */}
        <ProgressTimeline updates={filteredUpdates} />
        
        {/* Load more */}
        <div className="mt-10 flex justify-center">
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-all text-sm font-medium">
            Load more updates
          </button>
        </div>
      </div>
    </div>
  );
}