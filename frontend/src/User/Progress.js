import { useState, useEffect } from 'react';
import { 
  TrendingUp, Clock, Briefcase, User, Star, 
  Award, BookOpen, CheckCircle, ChevronRight,
  BarChart2, Loader2, Shield, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SkillProgressDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('inProgress');

  // For demo purpose - In a real app this would come from auth context/state
  const mockUserId = "user123";
  
  // Fetch user's progress data from the backend
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/progress/user/${mockUserId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setProgressData(data);
      } catch (err) {
        setError(`Failed to fetch progress data: ${err.message}`);
        console.error("Error fetching progress data:", err);
        
        // For demo purposes, load mock data if the API call fails
        const mockProgress = [
          {
            id: "prog1",
            userId: "user123",
            courseId: "CS101",
            completedModules: ["mod1", "mod2", "mod3"],
            totalModules: 8,
            progressPercentage: 37.5,
            isCertificateEligible: false,
            badgesEarned: ["Quick Learner", "Perfect Quiz"],
            feedback: "Great progress so far! Focus on completing module 4 this week."
          },
          {
            id: "prog2",
            userId: "user123",
            courseId: "CS102",
            completedModules: ["mod1", "mod2", "mod3", "mod4", "mod5", "mod6", "mod7", "mod8", "mod9", "mod10"],
            totalModules: 10,
            progressPercentage: 100.0,
            isCertificateEligible: true,
            badgesEarned: ["Course Completed", "All Star", "Perfect Attendance"],
            feedback: "Congratulations on completing the course with excellent results!"
          }
        ];
        
        setProgressData(mockProgress);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch courses data (similar to what we had in CoursesDisplayWall)
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/learnings');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data
        const transformedData = data.map(course => ({
          id: course.id,
          courseId: course.courseId,
          courseName: course.courseName,
          description: course.description,
          duration: course.duration,
          colorClass: getRandomColorClass()
        }));
        
        setCourses(transformedData);
      } catch (err) {
        console.error("Error fetching courses:", err);
        
        // Mock data if API fails
        setCourses([
          {
            id: "1",
            courseId: "CS101",
            courseName: "Introduction to Web Development",
            description: "Learn the fundamentals of web development including HTML, CSS and JavaScript.",
            duration: "8 weeks",
            colorClass: getRandomColorClass()
          },
          {
            id: "2",
            courseId: "CS102",
            courseName: "React.js Fundamentals",
            description: "Build modern user interfaces with React, the popular JavaScript library.",
            duration: "10 weeks",
            colorClass: getRandomColorClass()
          }
        ]);
      }
    };
    
    fetchProgressData();
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
  
  // Find course details by courseId
  const getCourseDetails = (courseId) => {
    return courses.find(course => course.courseId === courseId) || {
      courseName: 'Unknown Course',
      description: 'Course details not available',
      colorClass: 'from-gray-500 to-gray-600'
    };
  };
  
  // Filter progress data based on active tab
  const filteredProgressData = progressData.filter(progress => {
    if (activeTab === 'inProgress') {
      return progress.progressPercentage < 100;
    } else if (activeTab === 'completed') {
      return progress.progressPercentage === 100;
    }
    return true; // 'all' tab
  });
  
  // Handle updating module completion status
  const handleModuleCompletion = async (progressId, moduleId, isCompleted) => {
    // Find the current progress item
    const currentProgress = progressData.find(item => item.id === progressId);
    if (!currentProgress) return;
    
    // Create updated list of completed modules
    let updatedModules = [...currentProgress.completedModules];
    
    if (isCompleted && !updatedModules.includes(moduleId)) {
      // Add the module to completed list
      updatedModules.push(moduleId);
    } else if (!isCompleted && updatedModules.includes(moduleId)) {
      // Remove the module from completed list
      updatedModules = updatedModules.filter(mod => mod !== moduleId);
    } else {
      // No change needed
      return;
    }
    
    // Calculate new progress percentage
    const newPercentage = (updatedModules.length / currentProgress.totalModules) * 100;
    
    // Prepare updated progress object
    const updatedProgress = {
      ...currentProgress,
      completedModules: updatedModules,
      progressPercentage: newPercentage,
      isCertificateEligible: newPercentage === 100
    };
    
    try {
      // Send update to the backend
      const response = await fetch(`http://localhost:8080/api/progress/${progressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProgress),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Update local state with the new progress data
      setProgressData(progressData.map(item => 
        item.id === progressId ? updatedProgress : item
      ));
      
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Failed to update your progress. Please try again.');
    }
  };
  
  // Handle certificate download/view
  const handleViewCertificate = (courseId) => {
    alert(`Certificate for course ${courseId} will be displayed in a modal or downloaded`);
    // In a real app, this would open a modal with certificate preview or download
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100">
      {/* Header Section */}
      <header className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <BarChart2 size={36} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Your Learning Journey
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Track your progress, earn certificates, and continue mastering new skills
            </p>
          </div>
        </div>
      </header>

      {/* Progress Tab Navigation */}
      <section className="bg-gray-800/30 backdrop-blur-md sticky top-0 z-10 border-y border-gray-700/50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="flex space-x-2 py-4">
              {[
                { id: 'all', label: 'All Courses', icon: <BookOpen size={16} className="mr-1.5" /> },
                { id: 'inProgress', label: 'In Progress', icon: <TrendingUp size={16} className="mr-1.5" /> },
                { id: 'completed', label: 'Completed', icon: <CheckCircle size={16} className="mr-1.5" /> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-lg animate-pulse"></div>
                <Loader2 size={40} className="animate-spin text-white relative" />
              </div>
              <span className="ml-4 text-xl">Loading your progress...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-red-700">
                <h3 className="text-xl font-semibold mb-3">Error Loading Progress Data</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredProgressData.length > 0 ? (
            <div className="space-y-10">
              {filteredProgressData.map((progress) => {
                const course = getCourseDetails(progress.courseId);
                return (
                  <div key={progress.id} className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                    {/* Course Header */}
                    <div className={`bg-gradient-to-r ${course.colorClass} p-6`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{course.courseName}</h2>
                          <p className="text-gray-200 text-sm">{course.description}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <div className="text-xs text-white/70 mb-1">Progress</div>
                          <div className="text-2xl font-bold">{progress.progressPercentage.toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="px-6 py-4 border-b border-gray-700/50">
                      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${course.colorClass}`}
                          style={{ width: `${progress.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Course Info and Badges */}
                    <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Course Stats */}
                      <div className="col-span-1 space-y-4">
                        <h3 className="text-lg font-semibold mb-3">Course Stats</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                            <div className="flex items-center">
                              <BookOpen size={18} className="text-blue-400 mr-2" />
                              <span>Modules</span>
                            </div>
                            <span className="font-medium">{progress.completedModules.length} / {progress.totalModules}</span>
                          </div>
                          
                          <div className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Award size={18} className="text-purple-400 mr-2" />
                              <span>Badges</span>
                            </div>
                            <span className="font-medium">{progress.badgesEarned.length}</span>
                          </div>
                          
                          <div className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Shield size={18} className="text-green-400 mr-2" />
                              <span>Certificate</span>
                            </div>
                            <span className={`font-medium ${progress.isCertificateEligible ? 'text-green-400' : 'text-gray-400'}`}>
                              {progress.isCertificateEligible ? 'Available' : 'Not Eligible'}
                            </span>
                          </div>
                        </div>
                        
                        {progress.isCertificateEligible && (
                          <button 
                            onClick={() => handleViewCertificate(progress.courseId)}
                            className={`w-full mt-4 py-2 rounded-lg bg-gradient-to-r ${course.colorClass} flex items-center justify-center`}
                          >
                            <Award size={18} className="mr-2" />
                            View Certificate
                          </button>
                        )}
                      </div>
                      
                      {/* Feedback Section */}
                      <div className="col-span-2 space-y-4">
                        {progress.feedback && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Instructor Feedback</h3>
                            <div className="bg-gray-700/30 p-4 rounded-lg border-l-4 border-blue-500">
                              <p className="text-gray-300 italic">{progress.feedback}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Badges Earned</h3>
                          {progress.badgesEarned.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                              {progress.badgesEarned.map((badge, idx) => (
                                <div key={idx} className="bg-gray-800/80 border border-gray-600 px-3 py-2 rounded-lg flex items-center">
                                  <div className="p-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mr-2">
                                    <Award size={14} className="text-white" />
                                  </div>
                                  <span className="text-sm font-medium">{badge}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-gray-700/30 p-4 rounded-lg text-gray-400 text-sm">
                              No badges earned yet. Complete course milestones to earn badges.
                            </div>
                          )}
                        </div>
                        
                        {/* Module Progress */}
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-3">Module Progress</h3>
                          <div className="space-y-2">
                            {/* Generating mock modules for demo */}
                            {Array.from({ length: progress.totalModules }, (_, idx) => {
                              const moduleId = `mod${idx + 1}`;
                              const isCompleted = progress.completedModules.includes(moduleId);
                              
                              return (
                                <div 
                                  key={moduleId}
                                  className={`p-3 rounded-lg flex items-center justify-between 
                                  ${isCompleted ? 'bg-green-900/20 border border-green-700/50' : 'bg-gray-700/30 border border-gray-600/50'}`}
                                >
                                  <div className="flex items-center">
                                    {isCompleted ? (
                                      <CheckCircle size={18} className="text-green-400 mr-2" />
                                    ) : (
                                      <Clock size={18} className="text-gray-400 mr-2" />
                                    )}
                                    <span>Module {idx + 1}: {isCompleted ? 'Completed' : 'Pending'}</span>
                                  </div>
                                  
                                  <button 
                                    onClick={() => handleModuleCompletion(progress.id, moduleId, !isCompleted)}
                                    className={`text-xs px-3 py-1 rounded-full 
                                    ${isCompleted ? 
                                      'bg-gray-700 hover:bg-gray-600 text-gray-300' : 
                                      'bg-green-700 hover:bg-green-600 text-white'}`}
                                  >
                                    {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-gray-700">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-3">No courses found</h3>
                <p className="text-gray-400 mb-6">
                  {activeTab === 'completed' 
                    ? "You haven't completed any courses yet." 
                    : activeTab === 'inProgress'
                    ? "You don't have any courses in progress."
                    : "You aren't enrolled in any courses yet."}
                </p>
                <button 
                  onClick={() => navigate('/courses')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}