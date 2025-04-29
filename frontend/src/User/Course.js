import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Briefcase, User, Star, ChevronRight, Filter, Search } from 'lucide-react';

export default function CoursesDisplayWall() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample course data
  const courses = [
    {
      courseId: "FE001",
      courseName: "Advanced React Development",
      courseFee: "$149.99",
      description: "Master React hooks, context API, Redux, and build production-ready applications with best practices and modern architecture patterns.",
      duration: "10 weeks",
      category: "frontend",
      rating: 4.9,
      students: 3254,
      instructor: "Alex Johnson",
      jobOpportunities: ["Frontend Developer", "React Specialist", "UI Engineer"],
      image: "/api/placeholder/400/250"
    },
    {
      courseId: "BE002",
      courseName: "Node.js Microservices Architecture",
      courseFee: "$179.99",
      description: "Learn to design, develop, and deploy scalable microservices using Node.js, Express, Docker, and Kubernetes.",
      duration: "12 weeks",
      category: "backend",
      rating: 4.8,
      students: 2187,
      instructor: "Sophia Chen",
      jobOpportunities: ["Backend Developer", "Node.js Engineer", "DevOps Specialist"],
      image: "/api/placeholder/400/250"
    },
    {
      courseId: "DS003",
      courseName: "Data Science with Python",
      courseFee: "$199.99",
      description: "Comprehensive training in data analysis, visualization, machine learning, and predictive modeling using Python's powerful libraries.",
      duration: "14 weeks",
      category: "datascience",
      rating: 4.9,
      students: 4120,
      instructor: "Michael Rodriguez",
      jobOpportunities: ["Data Scientist", "ML Engineer", "Data Analyst"],
      image: "/api/placeholder/400/250"
    },
    {
      courseId: "UI004",
      courseName: "UI/UX Design Masterclass",
      courseFee: "$129.99",
      description: "From user research to high-fidelity prototypes, learn the complete design process with Figma, Adobe XD, and design thinking methodologies.",
      duration: "8 weeks",
      category: "design",
      rating: 4.7,
      students: 2876,
      instructor: "Emma Wilson",
      jobOpportunities: ["UI Designer", "UX Researcher", "Product Designer"],
      image: "/api/placeholder/400/250"
    },
    {
      courseId: "MB005",
      courseName: "Flutter Mobile App Development",
      courseFee: "$159.99",
      description: "Build beautiful cross-platform mobile applications for iOS and Android using Flutter and Dart.",
      duration: "11 weeks",
      category: "mobile",
      rating: 4.8,
      students: 1953,
      instructor: "David Park",
      jobOpportunities: ["Flutter Developer", "Mobile App Engineer", "Cross-platform Developer"],
      image: "/api/placeholder/400/250"
    },
    {
      courseId: "CL006",
      courseName: "AWS Cloud Solutions Architect",
      courseFee: "$219.99",
      description: "Learn to design, deploy, and maintain scalable, highly available systems on AWS cloud infrastructure.",
      duration: "12 weeks",
      category: "cloud",
      rating: 4.9,
      students: 3124,
      instructor: "Priya Sharma",
      jobOpportunities: ["Cloud Architect", "AWS Specialist", "DevOps Engineer"],
      image: "/api/placeholder/400/250"
    }
  ];

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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Explore Our Courses
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover expert-led courses designed to help you master in-demand skills and advance your career
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-12">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3.5 pl-12 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Filter */}
      <section className="py-6 bg-gray-800/50 sticky top-0 z-10 backdrop-blur-sm border-y border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-400 mr-3" />
              <span className="text-gray-400 mr-4 hidden md:block">Filter by:</span>
            </div>
            
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide flex-grow">
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

      {/* Courses Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.courseId}
                  className={`bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:-translate-y-2 group`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Course Image */}
                  <div className="relative">
                    <img src={course.image} alt={course.courseName} className="w-full h-48 object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      ID: {course.courseId}
                    </div>
                    <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center">
                      <Star size={14} className="text-yellow-400 mr-1.5" fill="#FACC15" />
                      {course.rating} ({course.students.toLocaleString()})
                    </div>
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {course.courseName}
                      </h3>
                      <div className="text-blue-400 font-bold">
                        {course.courseFee}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1.5" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-1.5" />
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
                        {course.jobOpportunities.map((job, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-700/60 px-3 py-1 rounded-full text-xs text-gray-300"
                          >
                            {job}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Call to Action */}
                    <div className="pt-4">
                      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center justify-center font-medium">
                        Enroll Now <ChevronRight size={16} className="ml-1" />
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
                  className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm border border-gray-700">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
              <p className="text-gray-300 mb-6">
                We're constantly adding new courses based on industry demand and student feedback. 
                Let us know what you'd like to learn next!
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20">
                  Request a Course
                </button>
                <button className="px-6 py-3 bg-transparent border border-gray-400 rounded-lg hover:border-white transition-all font-medium">
                  Become an Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Indicators */}
      <section className="py-12 bg-gray-900/80 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <TrendingUp size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-xl font-bold">94%</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="flex items-center">
                <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                  <Briefcase size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Job Placement</p>
                  <p className="text-xl font-bold">87%</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="flex items-center">
                <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                  <User size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Expert Instructors</p>
                  <p className="text-xl font-bold">200+</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="flex items-center">
                <div className="bg-red-500/20 p-3 rounded-lg mr-4">
                  <Star size={24} className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Satisfaction Rate</p>
                  <p className="text-xl font-bold">4.8/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}