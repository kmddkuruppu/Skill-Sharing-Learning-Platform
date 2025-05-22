import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Award,
  BookOpen,
  ChevronRight,
  Check,
  Clock,
  Filter,
  GraduationCap,
  Loader2,
  Search,
  Sparkles,
  TrendingUp,
  RefreshCw,
  AlertTriangle,
  BadgeCheck,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function SkillProgressDashboard() {
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Filter options
  const filters = [
    { id: 'all', name: 'All Progress', icon: <Sparkles size={16} className="mr-1.5" /> },
    { id: 'certificate', name: 'Certificate Eligible', icon: <Award size={16} className="mr-1.5" /> },
    { id: 'in-progress', name: 'In Progress', icon: <Clock size={16} className="mr-1.5" /> },
    { id: 'completed', name: 'Completed', icon: <Check size={16} className="mr-1.5" /> }
  ];

  // Random color generator for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  // Format percentage for display
  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
  };

  // Fetch progress data from the API
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/progress');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform data for our component
        const transformedData = data.map(progress => ({
          id: progress.id,
          userId: progress.userId,
          courseId: progress.courseId,
          completedModules: progress.completedModules || [],
          totalModules: progress.totalModules,
          progressPercentage: progress.progressPercentage,
          isCertificateEligible: progress.isCertificateEligible,
          badgesEarned: progress.badgesEarned || [],
          feedback: progress.feedback || 'No feedback available yet.',
          // Add visual properties for the cards
          colorClass: getRandomColorClass(),
          status: getProgressStatus(progress.progressPercentage)
        }));
        
        setProgressData(transformedData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch progress data: ${err.message}`);
        console.error("Error fetching progress data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProgressData();
    setIsVisible(true);
  }, []);

  // Generate random color class for cards (matching the theme)
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
  };

  // Determine progress status based on percentage
  const getProgressStatus = (percentage) => {
    if (percentage >= 100) return 'completed';
    if (percentage >= 80) return 'advanced';
    if (percentage >= 50) return 'intermediate';
    return 'beginner';
  };

  // Filter the progress data based on selected filter and search
  const filteredProgressData = progressData.filter(progress => {
    // Apply filter
    if (activeFilter === 'certificate' && !progress.isCertificateEligible) return false;
    if (activeFilter === 'completed' && progress.progressPercentage < 100) return false;
    if (activeFilter === 'in-progress' && progress.progressPercentage >= 100) return false;
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        progress.courseId.toLowerCase().includes(query) ||
        progress.userId.toLowerCase().includes(query) ||
        (progress.feedback && progress.feedback.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Handle view details
  const handleViewDetails = (progress) => {
    setSelectedProgress(progress);
  };

  // Close details panel
  const handleCloseDetails = () => {
    setSelectedProgress(null);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/progress');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      
      const transformedData = data.map(progress => ({
        id: progress.id,
        userId: progress.userId,
        courseId: progress.courseId,
        completedModules: progress.completedModules || [],
        totalModules: progress.totalModules,
        progressPercentage: progress.progressPercentage,
        isCertificateEligible: progress.isCertificateEligible,
        badgesEarned: progress.badgesEarned || [],
        feedback: progress.feedback || 'No feedback available yet.',
        colorClass: getRandomColorClass(),
        status: getProgressStatus(progress.progressPercentage)
      }));
      
      setProgressData(transformedData);
      setError(null);
    } catch (err) {
      setError(`Failed to refresh: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate module data for chart
  const getModuleChartData = (progress) => {
    if (!progress) return [];
    
    return [
      { name: 'Completed', value: progress.completedModules.length },
      { name: 'Remaining', value: progress.totalModules - progress.completedModules.length }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100">
      {/* Header Section */}
      <header className="py-12 relative overflow-hidden">
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
            <div className="mb-6 flex justify-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <TrendingUp size={32} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Skills Progress Dashboard
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Track your learning journey, monitor progress, and earn badges as you master new skills
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by course ID, user ID or feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-0 focus:outline-none text-base shadow-lg transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Overall Stats */}
            {!isLoading && !error && progressData.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
                  <div className="mr-3">
                    <BookOpen size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Courses</p>
                    <p className="text-lg font-bold">{new Set(progressData.map(p => p.courseId)).size}</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
                  <div className="mr-3">
                    <Star size={24} className="text-yellow-400" fill="#FBBF24" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg. Completion</p>
                    <p className="text-lg font-bold">
                      {(progressData.reduce((sum, p) => sum + p.progressPercentage, 0) / progressData.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
                  <div className="mr-3">
                    <GraduationCap size={24} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Certificate Eligible</p>
                    <p className="text-lg font-bold">
                      {progressData.filter(p => p.isCertificateEligible).length}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
                  <div className="mr-3">
                    <Award size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Badges</p>
                    <p className="text-lg font-bold">
                      {progressData.reduce((sum, p) => sum + (p.badgesEarned?.length || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="py-4 bg-gray-800/30 backdrop-blur-md sticky top-0 z-10 border-y border-gray-700/50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter size={18} className="text-blue-400 mr-3" />
              <span className="text-gray-300 mr-4 hidden md:block font-medium">Filter by:</span>
            </div>
            
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide flex-grow">
              {filters.map(filter => (
                <button 
                  key={filter.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center ${
                    activeFilter === filter.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50'
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.icon}
                  {filter.name}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleRefresh}
              className="ml-2 p-2 rounded-full bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-gradient-to-b from-gray-900 to-gray-900/50">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-lg animate-pulse"></div>
                <Loader2 size={40} className="animate-spin text-white relative" />
              </div>
              <span className="ml-4 text-xl">Loading progress data...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-red-700">
                <AlertTriangle size={32} className="mx-auto mb-4 text-red-400" />
                <h3 className="text-xl font-semibold mb-3">Error Loading Data</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredProgressData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProgressData.map((progress, index) => (
                <div 
                  key={progress.id}
                  className={`relative rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/80 transition-all duration-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } hover:-translate-y-2 group`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Progress Card Top Gradient Bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${progress.colorClass}`}></div>
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gray-800/90 backdrop-blur-sm z-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${progress.colorClass} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* Progress Content */}
                  <div className="p-6 space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          Course ID: {progress.courseId}
                        </h3>
                        <p className="text-gray-400 text-sm">User: {progress.userId}</p>
                      </div>
                      
                      <div className={`text-white font-bold py-1 px-3 rounded-full text-sm bg-gradient-to-r ${progress.colorClass}`}>
                        {formatPercentage(progress.progressPercentage)}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${progress.colorClass}`}
                        style={{ width: `${progress.progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="bg-gray-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center">
                        <BookOpen size={14} className="text-blue-400 mr-1.5" />
                        {progress.completedModules.length}/{progress.totalModules} modules
                      </div>
                      
                      {progress.isCertificateEligible && (
                        <div className="bg-green-500/20 text-green-300 px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center border border-green-500/30">
                          <ShieldCheck size={14} className="mr-1.5" />
                          Certificate Eligible
                        </div>
                      )}
                      
                      <div className={`px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center
                        ${progress.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                          progress.status === 'advanced' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          progress.status === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'}
                      `}>
                        <Sparkles size={14} className="mr-1.5" />
                        {progress.status.charAt(0).toUpperCase() + progress.status.slice(1)}
                      </div>
                    </div>
                    
                    {/* Badges */}
                    {progress.badgesEarned && progress.badgesEarned.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center mb-2">
                          <BadgeCheck size={16} className="text-blue-400 mr-2" />
                          <h4 className="text-sm font-medium text-gray-300">Badges Earned</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {progress.badgesEarned.map((badge, i) => (
                            <span 
                              key={i} 
                              className="bg-gray-700/60 backdrop-blur-sm border border-gray-600/30 px-3 py-1 rounded-full text-xs text-gray-300"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Feedback */}
                    <div className="pt-2">
                      <p className="text-sm text-gray-400 italic line-clamp-2">
                        "{progress.feedback}"
                      </p>
                    </div>
                    
                    {/* View Details Button */}
                    <div className="pt-3">
                      <button 
                        className="w-full py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg hover:bg-gray-600/80 transition-colors flex items-center justify-center font-medium group"
                        onClick={() => handleViewDetails(progress)}
                      >
                        View Details
                        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-gray-700">
                <h3 className="text-xl font-semibold mb-3">No progress data found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria to find more data.</p>
                <button 
                  onClick={() => {setActiveFilter('all'); setSearchQuery('');}}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Details Modal */}
      {selectedProgress && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`h-2 w-full bg-gradient-to-r ${selectedProgress.colorClass}`}></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Course Progress Details</h2>
                  <p className="text-gray-400">Course ID: {selectedProgress.courseId}</p>
                </div>
                <button 
                  onClick={handleCloseDetails}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Overall Progress</p>
                      <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                        <div 
                          className={`h-4 rounded-full bg-gradient-to-r ${selectedProgress.colorClass}`}
                          style={{ width: `${selectedProgress.progressPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-sm mt-1 text-gray-300">
                        {formatPercentage(selectedProgress.progressPercentage)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Modules Completed</p>
                      <p className="text-xl font-bold text-white">
                        {selectedProgress.completedModules.length} / {selectedProgress.totalModules}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Status</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${selectedProgress.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                          selectedProgress.status === 'advanced' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          selectedProgress.status === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'}
                      `}>
                        <Sparkles size={14} className="mr-1.5" />
                        {selectedProgress.status.charAt(0).toUpperCase() + selectedProgress.status.slice(1)}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Certificate Eligibility</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${selectedProgress.isCertificateEligible ? 
                          'bg-green-500/20 text-green-300 border border-green-500/30' : 
                          'bg-red-500/20 text-red-300 border border-red-500/30'}
                      `}>
                        {selectedProgress.isCertificateEligible ? (
                          <>
                            <ShieldCheck size={14} className="mr-1.5" />
                            Eligible
                          </>
                        ) : (
                          <>
                            <AlertTriangle size={14} className="mr-1.5" />
                            Not Eligible Yet
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Completion Analysis</h3>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getModuleChartData(selectedProgress)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getModuleChartData(selectedProgress).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#4F46E5' : '#1F2937'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Completed Modules */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Completed Modules</h3>
                {selectedProgress.completedModules && selectedProgress.completedModules.length > 0 ? (
                  <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-700/50">
                      {selectedProgress.completedModules.map((module, index) => (
                        <li key={index} className="px-4 py-3 flex items-center">
                          <div className="p-1.5 bg-green-500/20 rounded-full mr-3">
                            <Check size={14} className="text-green-400" />
                          </div>
                          <span className="text-gray-300">{module}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400">No modules have been completed yet.</p>
                  </div>
                )}
              </div>
              
              {/* Badges */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Badges Earned</h3>
                {selectedProgress.badgesEarned && selectedProgress.badgesEarned.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProgress.badgesEarned.map((badge, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-700/30 rounded-lg p-4 text-center hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="mb-2 flex justify-center">
                          <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                            <Award size={24} className="text-white" />
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-300">{badge}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400">No badges have been earned yet.</p>
                  </div>
                )}
              </div>
              
              {/* Feedback */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Feedback</h3>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <p className="text-gray-300 italic">
                    "{selectedProgress.feedback}"
                  </p>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-800 border-t border-gray-700 p-4 flex justify-end">
              <button 
                onClick={handleCloseDetails}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 bg-gray-900/50 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Skills Progress Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}