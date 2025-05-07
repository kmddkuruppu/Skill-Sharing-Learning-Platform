import { useState, useEffect } from 'react';
import { X, Loader2, BookOpen, CheckCircle, Clock, FileText, Video, Award, ArrowRight, ChevronDown, ChevronUp, Play, Lock } from 'lucide-react';

export default function CourseContentModal({ isOpen, onClose, courseId }) {
  const [courseContent, setCourseContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  
  useEffect(() => {
    // Only fetch when the modal is open and we have a courseId
    if (isOpen && courseId) {
      fetchCourseContent(courseId);
      // Reset expanded sections state
      setExpandedSections({});
    }
  }, [isOpen, courseId]);
  
  // Auto-expand the first module when content loads
  useEffect(() => {
    if (courseContent && courseContent.modules && courseContent.modules.length > 0) {
      const firstModuleId = courseContent.modules[0].id;
      setExpandedSections(prev => ({
        ...prev,
        [firstModuleId]: true
      }));
    }
  }, [courseContent]);
  
  const fetchCourseContent = async (courseId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch the course data from the existing API endpoint
      // We'll get all course details including course content
      const response = await fetch(`http://localhost:8080/api/learnings`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }
      
      const courses = await response.json();
      
      // Find the specific course by courseId
      const course = courses.find(c => c.courseId === courseId);
      
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      
      // Transform the data to match our component's structure
      const formattedContent = {
        courseId: course.courseId,
        courseName: course.courseName,
        description: course.description,
        instructor: "Expert Instructor", // Not in the data model, using default
        totalDuration: course.duration,
        totalModules: course.courseContent ? course.courseContent.length : 0,
        totalLessons: course.courseContent ? 
          course.courseContent.reduce((sum, module) => sum + (module.topics ? module.topics.length : 0), 0) : 0,
        completionCertificate: true, // Not in the data model, using default
        modules: course.courseContent ? course.courseContent.map((content, index) => ({
          id: `module-${index + 1}`,
          title: content.module,
          description: `Module ${index + 1}: ${content.module}`,
          duration: calculateModuleDuration(content.topics ? content.topics.length : 0),
          lessons: content.topics ? content.topics.map((topic, i) => ({
            id: `lesson-${index + 1}-${i + 1}`,
            title: topic,
            // Randomly assign types for visualization
            type: getRandomLessonType(),
            duration: getRandomDuration(),
            isLocked: index > 0 // First module unlocked, others locked for demo
          })) : []
        })) : []
      };
      
      setCourseContent(formattedContent);
    } catch (err) {
      console.error("Error fetching course content:", err);
      setError(err.message);
      // For demo purposes, still generate sample content on error
      setCourseContent(generateSampleContent(courseId));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to calculate estimated module duration
  const calculateModuleDuration = (topicsCount) => {
    const hours = Math.ceil(topicsCount * 0.75);
    return `${hours} hours`;
  };
  
  // Helper function to get random lesson type for visualization
  const getRandomLessonType = () => {
    const types = ['video', 'document', 'quiz', 'project'];
    return types[Math.floor(Math.random() * types.length)];
  };
  
  // Helper function to get random duration for lessons
  const getRandomDuration = () => {
    const minutes = Math.floor(Math.random() * 56) + 5; // 5-60 minutes
    return `${minutes} min`;
  };
  
  // Sample content generator for demonstration - matches backend model structure
  const generateSampleContent = (courseId) => {
    // Make sample content based on courseId to make it seem more realistic
    const courseName = getCourseNameById(courseId);
    
    let sampleModules = [];
    
    // Generate different modules based on course type
    if (courseId.includes("FE") || courseName.toLowerCase().includes("front") || courseName.toLowerCase().includes("react")) {
      // Frontend course
      sampleModules = [
        {
          id: "module-1",
          title: "HTML & CSS Fundamentals",
          description: "Master the building blocks of web development",
          duration: "8 hours",
          lessons: createLessons([
            "Introduction to HTML5", 
            "Semantic HTML Elements", 
            "CSS Selectors and Properties",
            "Responsive Design Principles",
            "CSS Flexbox and Grid"
          ], 1, false)
        },
        {
          id: "module-2",
          title: "JavaScript Essentials",
          description: "Learn core JavaScript programming concepts",
          duration: "10 hours",
          lessons: createLessons([
            "JavaScript Syntax and Variables", 
            "Functions and Scope", 
            "Working with Arrays and Objects",
            "DOM Manipulation",
            "Event Handling"
          ], 2, true)
        },
        {
          id: "module-3",
          title: "React Fundamentals",
          description: "Build interactive UIs with React",
          duration: "12 hours",
          lessons: createLessons([
            "Introduction to React", 
            "Components and Props", 
            "State and Lifecycle",
            "Handling Events",
            "Conditional Rendering",
            "Lists and Keys"
          ], 3, true)
        }
      ];
    } else if (courseId.includes("BE") || courseName.toLowerCase().includes("back") || courseName.toLowerCase().includes("node")) {
      // Backend course
      sampleModules = [
        {
          id: "module-1",
          title: "Backend Development Basics",
          description: "Understand server-side programming concepts",
          duration: "6 hours",
          lessons: createLessons([
            "Introduction to Backend Development", 
            "Client-Server Architecture", 
            "APIs and Web Services",
            "RESTful API Design"
          ], 1, false)
        },
        {
          id: "module-2",
          title: "Node.js Fundamentals",
          description: "Build server-side applications with Node.js",
          duration: "10 hours",
          lessons: createLessons([
            "Getting Started with Node.js", 
            "Node.js Modules System", 
            "Asynchronous Programming with Node.js",
            "Building a Simple Web Server",
            "Working with npm"
          ], 2, true)
        },
        {
          id: "module-3",
          title: "Database Integration",
          description: "Work with databases in your applications",
          duration: "8 hours",
          lessons: createLessons([
            "Database Fundamentals", 
            "MongoDB Basics", 
            "CRUD Operations",
            "Data Modeling",
            "Authentication and Authorization"
          ], 3, true)
        }
      ];
    } else if (courseId.includes("DS") || courseName.toLowerCase().includes("data") || courseName.toLowerCase().includes("science")) {
      // Data Science course
      sampleModules = [
        {
          id: "module-1",
          title: "Python for Data Science",
          description: "Learn Python programming for data analysis",
          duration: "8 hours",
          lessons: createLessons([
            "Python Basics", 
            "Data Structures in Python", 
            "NumPy Fundamentals",
            "Data Manipulation with Pandas",
            "Data Visualization with Matplotlib"
          ], 1, false)
        },
        {
          id: "module-2",
          title: "Statistical Analysis",
          description: "Apply statistical methods to data",
          duration: "10 hours",
          lessons: createLessons([
            "Descriptive Statistics", 
            "Probability Distributions", 
            "Hypothesis Testing",
            "Regression Analysis",
            "Statistical Inference"
          ], 2, true)
        },
        {
          id: "module-3",
          title: "Machine Learning Fundamentals",
          description: "Build predictive models using machine learning",
          duration: "12 hours",
          lessons: createLessons([
            "Introduction to Machine Learning", 
            "Supervised Learning Algorithms", 
            "Unsupervised Learning",
            "Model Evaluation and Validation",
            "Feature Engineering",
            "Introduction to Neural Networks"
          ], 3, true)
        }
      ];
    } else {
      // Default course structure
      sampleModules = [
        {
          id: "module-1",
          title: "Getting Started",
          description: "Learn the fundamentals and set up your environment",
          duration: "5 hours",
          lessons: createLessons([
            "Course Introduction", 
            "Setting Up Your Environment", 
            "Core Concepts Overview",
            "Best Practices"
          ], 1, false)
        },
        {
          id: "module-2",
          title: "Intermediate Concepts",
          description: "Build on the fundamentals with more advanced topics",
          duration: "8 hours",
          lessons: createLessons([
            "Advanced Techniques", 
            "Performance Optimization", 
            "Error Handling",
            "Testing Strategies",
            "Debugging Methods"
          ], 2, true)
        },
        {
          id: "module-3",
          title: "Real-world Projects",
          description: "Apply your knowledge to practical scenarios",
          duration: "12 hours",
          lessons: createLessons([
            "Project Planning", 
            "Implementation", 
            "Deployment Strategies",
            "Monitoring and Maintenance",
            "Case Studies"
          ], 3, true)
        }
      ];
    }
    
    return {
      courseId: courseId,
      courseName: courseName || `Course ${courseId}`,
      description: "Master the fundamentals and advanced concepts with hands-on projects and real-world applications.",
      instructor: "Expert Instructor",
      totalDuration: `${sampleModules.reduce((sum, module) => {
        const hours = parseInt(module.duration.split(' ')[0]);
        return sum + hours;
      }, 0)} hours`,
      totalModules: sampleModules.length,
      totalLessons: sampleModules.reduce((sum, module) => sum + module.lessons.length, 0),
      completionCertificate: true,
      modules: sampleModules
    };
  };

  // Helper function to create lessons array
  const createLessons = (titles, moduleIndex, isLocked) => {
    return titles.map((title, index) => ({
      id: `lesson-${moduleIndex}-${index + 1}`,
      title: title,
      type: getRandomLessonType(),
      duration: getRandomDuration(),
      isLocked: isLocked
    }));
  };
  
  // Helper function to generate a course name based on courseId
  const getCourseNameById = (courseId) => {
    if (!courseId) return "Sample Course";
    
    // Map common course ID prefixes to names
    if (courseId.includes("FE")) return "Frontend Development Masterclass";
    if (courseId.includes("BE")) return "Backend Development with Node.js";
    if (courseId.includes("FS")) return "Full Stack Web Development";
    if (courseId.includes("UI")) return "UI/UX Design Principles";
    if (courseId.includes("DS")) return "Data Science Fundamentals";
    if (courseId.includes("ML")) return "Machine Learning Essentials";
    if (courseId.includes("JAVA")) return "Java Programming";
    if (courseId.includes("PY")) return "Python for Developers";
    
    return `Course ${courseId}`;
  };
  
  // Toggle expanding/collapsing a module
  const toggleExpandSection = (moduleId) => {
    setExpandedSections(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  // Get icon based on lesson type
  const getLessonIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video size={16} className="text-blue-400" />;
      case 'document':
        return <FileText size={16} className="text-purple-400" />;
      case 'quiz':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'project':
        return <Award size={16} className="text-amber-400" />;
      default:
        return <BookOpen size={16} className="text-gray-400" />;
    }
  };
  
  // Calculate progress (for a real app, this would come from user data)
  const calculateProgress = () => {
    return {
      completedLessons: 5,
      totalLessons: courseContent?.totalLessons || 0,
      percentage: courseContent?.totalLessons ? Math.round((5 / courseContent.totalLessons) * 100) : 0
    };
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">
        {/* Modal Header with gradient */}
        <div className="border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-5 flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white">
            {courseContent ? courseContent.courseName : 'Course Content'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700/50 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 size={32} className="animate-spin text-blue-500 mr-3" />
              <span>Loading course content...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 inline-block max-w-md mx-auto">
                <div className="text-red-400 mb-4">
                  <p className="font-medium text-lg mb-2">Failed to load course content</p>
                  <p className="text-sm">{error}</p>
                  <p className="text-sm mt-2 text-gray-400">This could be due to the API connection or the course data not being available.</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => fetchCourseContent(courseId)}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Retry
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : courseContent ? (
            <div>
              {/* Course Overview Section */}
              <div className="p-6 border-b border-gray-700/70 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium text-white mb-2">{courseContent.courseName}</h4>
                    <p className="text-gray-300 mb-4">{courseContent.description}</p>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Clock size={16} className="text-blue-400 mr-2" />
                        <span>{courseContent.totalDuration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen size={16} className="text-purple-400 mr-2" />
                        <span>{courseContent.totalModules} modules • {courseContent.totalLessons} lessons</span>
                      </div>
                      {courseContent.completionCertificate && (
                        <div className="flex items-center">
                          <Award size={16} className="text-amber-400 mr-2" />
                          <span>Includes certificate</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Card */}
                  <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg p-4 w-full md:w-auto">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Your Progress</h5>
                    
                    {(() => {
                      const progress = calculateProgress();
                      return (
                        <>
                          <div className="flex items-center mb-2">
                            <div className="text-2xl font-bold text-white mr-2">{progress.percentage}%</div>
                            <div className="text-sm text-gray-400">
                              ({progress.completedLessons}/{progress.totalLessons} lessons)
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${progress.percentage}%` }}
                            ></div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              
              {/* Course Modules & Lessons */}
              <div className="p-6">
                <div className="space-y-4">
                  {courseContent.modules.map((module, index) => (
                    <div 
                      key={module.id}
                      className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/40 hover:border-gray-600 transition-colors"
                    >
                      {/* Module Header - Clickable to expand/collapse */}
                      <div 
                        className="p-4 cursor-pointer flex justify-between items-center bg-gradient-to-r from-gray-800/80 to-gray-700/50"
                        onClick={() => toggleExpandSection(module.id)}
                      >
                        <div className="flex items-center">
                          <div className="bg-blue-900/50 border border-blue-800/50 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center font-medium mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{module.title}</h3>
                            <p className="text-sm text-gray-400">{module.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-400 mr-3">{module.duration}</span>
                          {expandedSections[module.id] ? (
                            <ChevronUp size={20} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* Module Content - Lessons */}
                      {expandedSections[module.id] && (
                        <div className="border-t border-gray-700/50">
                          <ul className="divide-y divide-gray-700/50">
                            {module.lessons.map(lesson => (
                              <li 
                                key={lesson.id}
                                className={`p-4 ${lesson.isLocked ? 'opacity-60' : 'hover:bg-gray-700/30'} transition-colors`}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="mr-3">
                                      {getLessonIcon(lesson.type)}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-200">
                                        {lesson.title}
                                      </h4>
                                      <div className="flex items-center mt-1 text-xs text-gray-400">
                                        <span className="capitalize">{lesson.type}</span>
                                        <span className="mx-2">•</span>
                                        <Clock size={12} className="mr-1" />
                                        <span>{lesson.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button 
                                    className={`p-2 rounded-full ${
                                      lesson.isLocked 
                                        ? 'bg-gray-700/50 cursor-not-allowed' 
                                        : 'bg-blue-600/20 hover:bg-blue-600/40 transition-colors'
                                    }`}
                                    disabled={lesson.isLocked}
                                    aria-label={lesson.isLocked ? "Lesson locked" : "Start lesson"}
                                  >
                                    {lesson.isLocked ? (
                                      <Lock size={16} className="text-gray-400" />
                                    ) : (
                                      <Play size={16} className="text-blue-400" />
                                    )}
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md mx-auto">
                <BookOpen size={40} className="text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-300 font-medium text-lg mb-2">No course content available</p>
                <p className="text-sm text-gray-400 mb-4">This course doesn't have any content modules defined yet.</p>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="border-t border-gray-700 p-5 flex justify-between items-center bg-gray-800/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}