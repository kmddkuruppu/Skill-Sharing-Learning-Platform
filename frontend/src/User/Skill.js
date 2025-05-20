import { useState, useEffect } from 'react';
import { 
  TrendingUp, Clock, Briefcase, User, Star, 
  ChevronRight, Filter, Search, Loader2, 
  BookOpen, Sparkles, ArrowRight, GraduationCap, Code
} from 'lucide-react';
import SkillContentModal from '../Components/SkillContentModal';
import { useNavigate } from 'react-router-dom';

export default function SkillsDisplayWall() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  
  // Categories for filtering - updated for skills
  const categories = [
    { id: 'all', name: 'All Skills', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'programming', name: 'Programming', icon: <Code size={16} className="mr-1.5" /> },
    { id: 'design', name: 'Design', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'management', name: 'Management', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'data', name: 'Data Science', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'creative', name: 'Creative', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'other', name: 'Other Skills', icon: <Sparkles size={16} className="mr-1.5" /> }
  ];

  // Function to handle collaboration button click
  const handleCollaborate = (skill) => {
    // Navigate to the collaboration page with the skill data as URL parameters
    navigate(`/collaborate?skillId=${skill.id}&skillTitle=${encodeURIComponent(skill.skillTitle)}`);
  };

  // Format experience level with appropriate styling
  const getExperienceLevelStyle = (level) => {
    switch(level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'advanced':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'expert':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Fetch skills from the backend API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/skills');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our component's expected format
        const transformedData = data.map(skill => ({
          id: skill.id,
          name: skill.name,
          emailAddress: skill.emailAddress,
          skillTitle: skill.skillTitle,
          skillDescription: skill.skillDescription,
          experienceLevel: skill.experienceLevel,
          howYouUseIt: skill.howYouUseIt,
          tags: skill.tags || [],
          availabilityForCollaboration: skill.availabilityForCollaboration,
          date: skill.date,
          time: skill.time,
          // Add a vibrant color for each skill
          colorClass: getRandomColorClass(),
          // Add a category based on tags
          category: inferCategoryFromTags(skill.tags)
        }));
        
        setSkills(transformedData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch skills: ${err.message}`);
        console.error("Error fetching skills:", err);
        
        // For demo purposes, load mock data if the API call fails
        const mockSkills = [
          {
            id: "1",
            name: "John Smith",
            emailAddress: "john.smith@example.com",
            skillTitle: "React.js Development",
            skillDescription: "Expertise in building modern user interfaces with React, Redux, and related technologies.",
            experienceLevel: "Advanced",
            howYouUseIt: "Building interactive web applications with optimized performance and state management.",
            tags: ["programming", "frontend", "javascript"],
            availabilityForCollaboration: true,
            date: "2025-05-18",
            time: "14:30:00",
            category: "programming",
            colorClass: getRandomColorClass()
          },
          {
            id: "2",
            name: "Sarah Johnson",
            emailAddress: "sarah.j@example.com",
            skillTitle: "UX/UI Design",
            skillDescription: "Creating user-centered interfaces with a focus on usability and aesthetics.",
            experienceLevel: "Expert",
            howYouUseIt: "Design systems, wireframing, prototyping, and visual design for web and mobile applications.",
            tags: ["design", "ux", "ui"],
            availabilityForCollaboration: true,
            date: "2025-05-19",
            time: "10:15:00",
            category: "design",
            colorClass: getRandomColorClass()
          },
          {
            id: "3",
            name: "Michael Chen",
            emailAddress: "michael.c@example.com",
            skillTitle: "Data Analysis with Python",
            skillDescription: "Statistical analysis, data visualization, and predictive modeling using Python.",
            experienceLevel: "Intermediate",
            howYouUseIt: "Building data pipelines, creating visualizations, and generating insights from large datasets.",
            tags: ["data", "python", "analytics"],
            availabilityForCollaboration: false,
            date: "2025-05-17",
            time: "09:45:00",
            category: "data",
            colorClass: getRandomColorClass()
          }
        ];
        
        setSkills(mockSkills);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  // Generate a random tailwind color class for cards
  const getRandomColorClass = () => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-pink-500 to-orange-400',
      'from-green-400 to-teal-500',
      'from-indigo-500 to-purple-500',
      'from-amber-500 to-pink-500',
      'from-sky-400 to-indigo-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Helper function to infer category from tags
  const inferCategoryFromTags = (tags = []) => {
    const flatTags = tags.map(tag => tag.toLowerCase());
    
    if (flatTags.some(tag => ['programming', 'code', 'development', 'javascript', 'python', 'java'].includes(tag))) 
      return 'programming';
    if (flatTags.some(tag => ['design', 'ui', 'ux', 'graphic', 'illustration'].includes(tag)))
      return 'design';
    if (flatTags.some(tag => ['management', 'leadership', 'project', 'agile', 'scrum'].includes(tag)))
      return 'management';
    if (flatTags.some(tag => ['data', 'analysis', 'analytics', 'statistics', 'machine learning'].includes(tag)))
      return 'data';
    if (flatTags.some(tag => ['creative', 'art', 'music', 'writing', 'content'].includes(tag)))
      return 'creative';
    return 'other';
  };

  // Filter skills based on selected category and search query
  const filteredSkills = skills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = 
      skill.skillTitle?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      skill.skillDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to handle opening the skill content modal
  const handleViewSkillContent = (skillId) => {
    setSelectedSkillId(skillId);
    setIsModalOpen(true);
  };

  // Function to handle closing the skill content modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkillId(null);
  };

  // Format date to localized string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    // Animation for initial load
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100">
      {/* Header Section with animated gradient */}
      <header className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient-x"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-500/20 animate-pulse"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 4 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Briefcase size={36} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Discover Amazing Skills
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Connect with talented people and collaborate on projects 
              by exploring their skills and expertise
            </p>
            
            {/* Search Bar with Animated Focus */}
            <div className="relative max-w-xl mx-auto mb-12 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for skills or people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-0 focus:outline-none text-base shadow-lg transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                { icon: <Star size={24} className="text-amber-400" />, label: "Available Skills", value: "1,200+" },
                { icon: <User size={24} className="text-blue-400" />, label: "Active Users", value: "5,000+" },
                { icon: <Briefcase size={24} className="text-purple-400" />, label: "Collaborations", value: "3,500+" },
                { icon: <TrendingUp size={24} className="text-green-400" />, label: "Skill Growth", value: "+25%" }
              ].map((stat, index) => (
                <div key={index} className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
                  <div className="mr-3">{stat.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Categories Filter - Glassmorphism style */}
      <section className="py-6 bg-gray-800/30 backdrop-blur-md sticky top-0 z-10 border-y border-gray-700/50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter size={18} className="text-blue-400 mr-3" />
              <span className="text-gray-300 mr-4 hidden md:block font-medium">Browse:</span>
            </div>
            
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide flex-grow">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-900/50">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-lg animate-pulse"></div>
                <Loader2 size={40} className="animate-spin text-white relative" />
              </div>
              <span className="ml-4 text-xl">Loading skills...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-red-700">
                <h3 className="text-xl font-semibold mb-3">Error Loading Skills</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSkills.map((skill, index) => (
                <div 
                  key={skill.id}
                  className={`relative rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/80 transition-all duration-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } hover:-translate-y-2 group`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Skill Card Top Gradient Bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${skill.colorClass}`}></div>
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gray-800/90 backdrop-blur-sm z-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.colorClass} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* Skill Content */}
                  <div className="p-6 space-y-5 relative z-10">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {skill.skillTitle}
                      </h3>
                      <div className={`text-white font-bold py-1 px-3 rounded-full text-sm bg-gradient-to-r ${skill.colorClass}`}>
                        {skill.availabilityForCollaboration ? "Available" : "Unavailable"}
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="bg-gray-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center">
                        <User size={14} className="text-blue-400 mr-1.5" />
                        {skill.name}
                      </div>
                      <div className={`px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center border ${getExperienceLevelStyle(skill.experienceLevel)}`}>
                        {skill.experienceLevel || "Not Specified"}
                      </div>
                      <div className="bg-purple-500/20 text-purple-300 px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center border border-purple-500/30">
                        {skill.category}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {skill.skillDescription}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1.5 text-blue-400" />
                        Posted: {formatDate(skill.date)}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="pt-2">
                      <div className="flex items-center mb-2">
                        <BookOpen size={16} className="text-blue-400 mr-2" />
                        <h4 className="text-sm font-medium text-gray-300">Tags</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.tags?.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-700/60 backdrop-blur-sm border border-gray-600/30 px-3 py-1 rounded-full text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {skill.tags?.length > 3 && (
                          <span className="bg-gray-700/60 px-3 py-1 rounded-full text-xs text-gray-300">
                            +{skill.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Call to Action Buttons */}
                    <div className="pt-5 space-y-3">
                      {/* View Skill Details Button */}
                      <button 
                        className="w-full py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg hover:bg-gray-600/80 transition-colors flex items-center justify-center font-medium group"
                        onClick={() => handleViewSkillContent(skill.id)}
                      >
                        <BookOpen size={18} className="mr-2 text-blue-400" />
                        View Details
                        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                      
                      {/* Collaborate Button */}
                      {skill.availabilityForCollaboration && (
                        <button 
                          className={`w-full py-3 bg-gradient-to-r ${skill.colorClass} rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center font-medium group overflow-hidden relative`}
                          onClick={() => handleCollaborate(skill)}
                        >
                          <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                          <span className="relative flex items-center">
                            Collaborate Now
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">No skills found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria to find more skills.</p>
                <button 
                  onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-lg border border-gray-700/50 shadow-xl">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-blue-500/20 animate-pulse"
                  style={{
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 4 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Have a skill to share?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Share your expertise with the community and connect with others who might need your skills.
                Collaborate on exciting projects and expand your network!
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20 group flex items-center justify-center">
                  Add Your Skill
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3 bg-transparent border border-gray-400 rounded-lg hover:border-white transition-all font-medium group flex items-center justify-center">
                  Browse Projects
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Indicators */}
      <section className="py-16 bg-gray-950 border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <TrendingUp size={32} className="text-blue-400" />, 
                title: "Collaboration Rate",
                value: "78%",
                desc: "Of skills lead to collaboration"
              },
              { 
                icon: <Briefcase size={32} className="text-purple-400" />, 
                title: "Projects Created",
                value: "3,500+",
                desc: "And growing every day"
              },
              { 
                icon: <User size={32} className="text-green-400" />, 
                title: "Active Users",
                value: "5,000+",
                desc: "Sharing skills and knowledge"
              },
              { 
                icon: <Star size={32} className="text-amber-400" fill="#FACC15" />, 
                title: "Satisfaction Rate",
                value: "4.7/5",
                desc: "From collaboration feedback"
              }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transform transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/30">
                <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-4 rounded-lg inline-block mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Content Modal */}
      <SkillContentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        skillId={selectedSkillId} 
      />
    </div>
  );
}