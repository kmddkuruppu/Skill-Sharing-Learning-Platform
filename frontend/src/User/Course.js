import { useState, useEffect } from 'react';
import { 
  TrendingUp, Clock, Briefcase, User, Star, 
  ChevronRight, Filter, Search, Loader2, 
  BookOpen, Sparkles, ArrowRight, GraduationCap
} from 'lucide-react';

export default function CoursesDisplayWall() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'frontend', name: 'Frontend', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'backend', name: 'Backend', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'design', name: 'UI/UX Design', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'datascience', name: 'Data Science', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'mobile', name: 'Mobile Dev', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'cloud', name: 'Cloud Computing', icon: <Sparkles size={16} className="mr-1.5" /> }
  ];

  // Fetch courses from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/learnings');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our component's expected format
        const transformedData = data.map(course => ({
          // Use MongoDB ID for React key
          id: course.id,
          courseId: course.courseId,
          courseName: course.courseName,
          courseFee: `$${course.courseFee}`,
          description: course.description,
          duration: course.duration,
          // Parse job opportunities from string to array
          jobOpportunities: course.jobOpportunities ? course.jobOpportunities.split(',').map(job => job.trim()) : [],
          // Default values for fields not in the MongoDB model
          category: inferCategoryFromCourseName(course.courseName),
          rating: 4.8,
          students: Math.floor(Math.random() * 3000) + 1000,
          instructor: "Expert Instructor",
          // Add a vibrant color for each course
          colorClass: getRandomColorClass()
        }));
        
        setCourses(transformedData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch courses: ${err.message}`);
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
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

  // Helper function to infer category from course name
  const inferCategoryFromCourseName = (courseName) => {
    const name = courseName.toLowerCase();
    if (name.includes('react') || name.includes('frontend') || name.includes('javascript') || name.includes('html')) 
      return 'frontend';
    if (name.includes('node') || name.includes('java') || name.includes('spring') || name.includes('backend'))
      return 'backend';
    if (name.includes('ui') || name.includes('ux') || name.includes('design'))
      return 'design';
    if (name.includes('data') || name.includes('python') || name.includes('machine learning'))
      return 'datascience';
    if (name.includes('mobile') || name.includes('android') || name.includes('ios') || name.includes('flutter'))
      return 'mobile';
    if (name.includes('cloud') || name.includes('aws') || name.includes('azure'))
      return 'cloud';
    return 'all';
  };

  // Filter courses based on selected category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <GraduationCap size={36} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Elevate Your Skills
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Discover expert-led courses designed to help you master in-demand skills 
              and transform your career trajectory
            </p>
            
            {/* Search Bar with Animated Focus */}
            <div className="relative max-w-xl mx-auto mb-12 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-0 focus:outline-none text-base shadow-lg transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                { icon: <Star size={24} className="text-amber-400" />, label: "Course Rating", value: "4.9/5" },
                { icon: <User size={24} className="text-blue-400" />, label: "Active Students", value: "20,000+" },
                { icon: <GraduationCap size={24} className="text-purple-400" />, label: "Graduates", value: "87,000+" },
                { icon: <TrendingUp size={24} className="text-green-400" />, label: "Job Placement", value: "94%" }
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

      {/* Courses Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-900/50">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-lg animate-pulse"></div>
                <Loader2 size={40} className="animate-spin text-white relative" />
              </div>
              <span className="ml-4 text-xl">Loading courses...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-red-700">
                <h3 className="text-xl font-semibold mb-3">Error Loading Courses</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.id}
                  className={`relative rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/80 transition-all duration-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } hover:-translate-y-2 group`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  {/* Course Card Top Gradient Bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${course.colorClass}`}></div>
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gray-800/90 backdrop-blur-sm z-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.colorClass} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-6 space-y-5 relative z-10">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {course.courseName}
                      </h3>
                      <div className={`text-white font-bold py-1 px-3 rounded-full text-sm bg-gradient-to-r ${course.colorClass}`}>
                        {course.courseFee}
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="bg-gray-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1.5" fill="#FACC15" />
                        {course.rating} ({course.students.toLocaleString()})
                      </div>
                      <div className="bg-blue-500/20 text-blue-300 px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center border border-blue-500/30">
                        ID: {course.courseId}
                      </div>
                      <div className="bg-purple-500/20 text-purple-300 px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center border border-purple-500/30">
                        {course.category}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1.5 text-blue-400" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-1.5 text-purple-400" />
                        {course.instructor}
                      </div>
                    </div>
                    
                    {/* Job Opportunities */}
                    <div className="pt-2">
                      <div className="flex items-center mb-2">
                        <Briefcase size={16} className="text-blue-400 mr-2" />
                        <h4 className="text-sm font-medium text-gray-300">Job Opportunities</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.jobOpportunities.slice(0, 3).map((job, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-700/60 backdrop-blur-sm border border-gray-600/30 px-3 py-1 rounded-full text-xs text-gray-300"
                          >
                            {job}
                          </span>
                        ))}
                        {course.jobOpportunities.length > 3 && (
                          <span className="bg-gray-700/60 px-3 py-1 rounded-full text-xs text-gray-300">
                            +{course.jobOpportunities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Call to Action Buttons */}
                    <div className="pt-5 space-y-3">
                      {/* View Course Content Button */}
                      <button className="w-full py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg hover:bg-gray-600/80 transition-colors flex items-center justify-center font-medium group">
                        <BookOpen size={18} className="mr-2 text-blue-400" />
                        View Course Content
                        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                      
                      {/* Enroll Now Button */}
                      <button className={`w-full py-3 bg-gradient-to-r ${course.colorClass} rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center font-medium group overflow-hidden relative`}>
                        <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                        <span className="relative flex items-center">
                          Enroll Now 
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">No courses found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria to find more courses.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Can't find what you're looking for?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                We're constantly adding new courses based on industry demand and student feedback. 
                Let us know what you'd like to learn next!
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20 group flex items-center justify-center">
                  Request a Course
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3 bg-transparent border border-gray-400 rounded-lg hover:border-white transition-all font-medium group flex items-center justify-center">
                  Become an Instructor
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
            <h2 className="text-3xl font-bold mb-4">Why Students Choose Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <TrendingUp size={32} className="text-blue-400" />, 
                title: "Success Rate",
                value: "94%",
                desc: "Students report career advancement"
              },
              { 
                icon: <Briefcase size={32} className="text-purple-400" />, 
                title: "Job Placement",
                value: "87%",
                desc: "Within 6 months of completion"
              },
              { 
                icon: <User size={32} className="text-green-400" />, 
                title: "Expert Instructors",
                value: "200+",
                desc: "Industry professionals teaching"
              },
              { 
                icon: <Star size={32} className="text-amber-400" fill="#FACC15" />, 
                title: "Satisfaction Rate",
                value: "4.8/5",
                desc: "Average course rating"
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
    </div>
  );
}