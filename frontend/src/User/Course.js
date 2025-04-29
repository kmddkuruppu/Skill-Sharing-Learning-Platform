import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';

export default function CoursesDisplayWall() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'mobile', name: 'Mobile Dev' },
    { id: 'cloud', name: 'Cloud Computing' }
  ];

  // Function to add a new course (will be called from addCourse.js)
  const addCourse = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  // Add this function to window so it can be accessed from addCourse.js
  useEffect(() => {
    window.addCourse = addCourse;
    
    // Animation for initial load
    setIsVisible(true);
    
    // Cleanup function
    return () => {
      delete window.addCourse;
    };
  }, []);

  // Filter courses based on selected category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Course Catalog
              </span>
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 rounded-full bg-gray-800/80 border border-gray-700 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Filter */}
      <section className="py-4 bg-gray-800/50 sticky top-0 z-10 backdrop-blur-sm border-y border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-400 mr-3" />
              <span className="text-gray-400 mr-4 hidden md:block">Filter by:</span>
            </div>
            
            <div className="flex overflow-x-auto pb-2 space-x-2 flex-grow">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid - Simplified to show only requested fields */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.courseId || index}
                  className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Course Content - Only showing requested fields */}
                  <div className="p-6">
                    <div className="mb-4 flex justify-between items-start">
                      <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded text-xs font-medium">
                        ID: {course.courseId || `COURSE-${index}`}
                      </div>
                      <div className="text-blue-400 font-bold">
                        {course.courseFee || "Free"}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">
                      {course.courseName || "Untitled Course"}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {course.description || "No description available."}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-300 mb-4">
                      <span className="font-medium">Duration:</span>
                      <span className="ml-2 text-gray-400">{course.duration || "Not specified"}</span>
                    </div>
                    
                    {/* Job Opportunities */}
                    <div className="pt-2">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Job Opportunities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.jobOpportunities && course.jobOpportunities.length > 0 ? 
                          course.jobOpportunities.map((job, i) => (
                            <span 
                              key={i} 
                              className="bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300"
                            >
                              {job}
                            </span>
                          )) : 
                          <span className="text-xs text-gray-400">None specified</span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-800 rounded-lg p-8 max-w-lg mx-auto border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">No courses found</h3>
                <p className="text-gray-400 mb-6">
                  {courses.length === 0 ? 
                    "Use the form in addCourse.js to add your first course." : 
                    "Try adjusting your search or filter criteria to find more courses."}
                </p>
                {courses.length > 0 && (
                  <button 
                    onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                    className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}