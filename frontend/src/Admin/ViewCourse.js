import { useState, useEffect } from "react";
import { 
  BookOpen,
  DollarSign, 
  Tag, 
  Calendar, 
  Search,
  Filter,
  ChevronDown,
  Trash2,
  RefreshCw,
  Plus,
  Edit2,
  FileText,
  X,
  Layers,
  List
} from "lucide-react";
import SuccessAlert from "../Components/SuccessAlert"; // Import the SuccessAlert component

const LearningDashboard = () => {
  // State
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    courseFee: "",
    description: "",
    duration: "",
    jobOpportunities: "",
    courseContent: [{ module: "", topics: [""] }]
  });

  // Success alert state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [successCourseName, setSuccessCourseName] = useState("");

  // Get unique durations from courses
  const getDurations = (coursesData) => {
    if (!coursesData || coursesData.length === 0) return [];
    const uniqueDurations = [...new Set(coursesData.map(course => course.duration))];
    return uniqueDurations;
  };
  
  // Initialize durations
  const [durations, setDurations] = useState([]);

  // Fetch courses data from API
  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/learnings');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (Array.isArray(result)) {
        setCourses(result);
        setFilteredCourses(result);
        setDurations(getDurations(result));
      } else {
        throw new Error('Failed to fetch courses data');
      }
    } catch (err) {
      console.error('Error fetching courses data:', err);
      setError(err.message);
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses based on search term and duration
  useEffect(() => {
    let result = courses;
    
    if (searchTerm) {
      result = result.filter(course => 
        course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.jobOpportunities?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDuration && selectedDuration !== "All") {
      result = result.filter(course => course.duration === selectedDuration);
    }
    
    setFilteredCourses(result);
  }, [searchTerm, selectedDuration, courses]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'courseFee') {
      // Ensure courseFee is a number
      const numValue = parseFloat(value) || 0;
      setFormData({
        ...formData,
        [name]: numValue
      });
    } else {
      // For non-numeric fields, update normally
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle course content module change
  const handleModuleChange = (index, value) => {
    const newCourseContent = [...formData.courseContent];
    newCourseContent[index].module = value;
    setFormData({
      ...formData,
      courseContent: newCourseContent
    });
  };

  // Handle course content topic change
  const handleTopicChange = (moduleIndex, topicIndex, value) => {
    const newCourseContent = [...formData.courseContent];
    newCourseContent[moduleIndex].topics[topicIndex] = value;
    setFormData({
      ...formData,
      courseContent: newCourseContent
    });
  };

  // Add a new module
  const addModule = () => {
    setFormData({
      ...formData,
      courseContent: [...formData.courseContent, { module: "", topics: [""] }]
    });
  };

  // Add a new topic to a module
  const addTopic = (moduleIndex) => {
    const newCourseContent = [...formData.courseContent];
    newCourseContent[moduleIndex].topics.push("");
    setFormData({
      ...formData,
      courseContent: newCourseContent
    });
  };

  // Remove a module
  const removeModule = (moduleIndex) => {
    if (formData.courseContent.length > 1) {
      const newCourseContent = formData.courseContent.filter((_, index) => index !== moduleIndex);
      setFormData({
        ...formData,
        courseContent: newCourseContent
      });
    }
  };

  // Remove a topic
  const removeTopic = (moduleIndex, topicIndex) => {
    if (formData.courseContent[moduleIndex].topics.length > 1) {
      const newCourseContent = [...formData.courseContent];
      newCourseContent[moduleIndex].topics = newCourseContent[moduleIndex].topics.filter(
        (_, index) => index !== topicIndex
      );
      setFormData({
        ...formData,
        courseContent: newCourseContent
      });
    }
  };

  // Open modal for adding new course
  const openAddModal = () => {
    setCurrentCourse(null);
    setFormData({
      courseId: generateCourseId(),
      courseName: "",
      courseFee: "",
      description: "",
      duration: "",
      jobOpportunities: "",
      courseContent: [{ module: "", topics: [""] }]
    });
    setIsModalOpen(true);
  };

  // Open modal for editing course
  const openEditModal = (course) => {
    setCurrentCourse(course);
    setFormData({
      id: course.id,
      courseId: course.courseId,
      courseName: course.courseName,
      courseFee: course.courseFee,
      description: course.description || "",
      duration: course.duration || "",
      jobOpportunities: course.jobOpportunities || "",
      courseContent: course.courseContent && course.courseContent.length > 0 
        ? course.courseContent 
        : [{ module: "", topics: [""] }]
    });
    setIsModalOpen(true);
  };

  // Show success alert
  const triggerSuccessAlert = (action, name) => {
    setSuccessAction(action);
    setSuccessCourseName(name);
    setShowSuccess(true);
    
    // Auto-hide the success alert after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Generate a unique course ID
  const generateCourseId = () => {
    return 'COURSE_' + Date.now().toString().slice(-6);
  };

  // Handle form submission (add/update course)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Prepare submission data
      const submissionData = {
        ...formData
      };
      
      let url = currentCourse 
        ? `http://localhost:8080/api/learnings/${currentCourse.id}`
        : 'http://localhost:8080/api/learnings';
      let method = currentCourse ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      // Show success alert
      triggerSuccessAlert(
        currentCourse ? "updated" : "added",
        formData.courseName
      );
      
      // Refresh courses after successful operation
      fetchCourses();
      
    } catch (err) {
      console.error('Error saving course:', err);
      alert(`Failed to save course: ${err.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle course deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // Find the course being deleted to display in success message
        const courseToDelete = courses.find(c => c.id === id);
        
        const response = await fetch(`http://localhost:8080/api/learnings/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        // Show success alert
        if (courseToDelete) {
          triggerSuccessAlert("deleted", courseToDelete.courseName);
        }
        
        // Refresh courses after successful deletion
        fetchCourses();
        
      } catch (err) {
        console.error('Error deleting course:', err);
        alert(`Failed to delete course: ${err.message}`);
      }
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calculate total course value
  const calculateTotalValue = () => {
    return filteredCourses.reduce((total, course) => total + Number(course.courseFee || 0), 0).toFixed(2);
  };

  // Handle hiding success alert
  const handleHideSuccess = () => {
    setShowSuccess(false);
  };

  // Enhanced Course Item Component
  const CourseItem = ({ course }) => {
    // Hover state for item
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className={`flex flex-col md:flex-row md:items-center justify-between p-4 mb-3 rounded-xl transition-all duration-300 ${
          isHovered ? 'bg-gray-800/60' : 'bg-gray-900/80'
        } backdrop-blur-sm border border-gray-800`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center mb-3 md:mb-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/10 flex items-center justify-center mr-3">
            <BookOpen className="text-blue-400" size={18} />
          </div>
          <div>
            <h3 className="font-medium text-gray-200">{course.courseName}</h3>
            <div className="flex items-center mt-1">
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400 mr-2">
                {course.duration}
              </span>
              <span className="text-sm text-gray-400 flex items-center">
                ID: {course.courseId}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
          <div className="flex items-center mr-4">
            <div className="mr-6 md:mr-10">
              <p className="text-xs text-gray-400">Course Fee</p>
              <p className="text-gray-300">{formatCurrency(course.courseFee)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Modules</p>
              <p className="text-gray-300">{course.courseContent?.length || 0}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={() => openEditModal(course)}
              className="group p-2 rounded-lg bg-blue-500/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-300 flex items-center"
            >
              <Edit2 size={16} className="mr-1" />
              <span className={`${isHovered ? 'opacity-100 max-w-24' : 'opacity-0 max-w-0'} overflow-hidden transition-all duration-300`}>
                Edit
              </span>
            </button>
            
            <button 
              onClick={() => handleDelete(course.id)}
              className="group p-2 rounded-lg bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white transition-all duration-300 flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              <span className={`${isHovered ? 'opacity-100 max-w-24' : 'opacity-0 max-w-0'} overflow-hidden transition-all duration-300`}>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Using the imported SuccessAlert component */}
      <SuccessAlert 
        showSuccess={showSuccess}
        successAction={successAction}
        successCourseName={successCourseName}
        onHide={handleHideSuccess}
      />
      
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="absolute top-0 right-0 text-blue-500/10 text-9xl font-bold select-none z-0">
            COURSES
          </div>
          
          <div className="text-sm font-medium text-blue-400 mb-2 tracking-widest text-center">
            LEARNING MANAGEMENT
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Course Dashboard
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-blue-400">Total Courses</h3>
                <p className="text-3xl font-bold">{filteredCourses.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="text-blue-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-blue-400">Total Value</h3>
                <p className="text-3xl font-bold">{formatCurrency(calculateTotalValue())}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="text-blue-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-blue-400">Unique Durations</h3>
                <p className="text-3xl font-bold">{durations.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="text-blue-400" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Interface */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Toolbar */}
          <div className="bg-gray-800/50 p-4 border-b border-gray-800 flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/80 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            {/* Filters & Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative inline-block">
                <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <Filter size={16} className="text-gray-400" />
                  <select 
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="bg-transparent text-gray-300 appearance-none focus:outline-none cursor-pointer pr-8"
                  >
                    <option value="All">All Durations</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="text-gray-400 absolute right-3" />
                </div>
              </div>
              
              <button 
                onClick={fetchCourses}
                className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-2 border border-gray-700"
              >
                <RefreshCw size={20} className={`text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              
              <button 
                onClick={openAddModal}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg px-4 py-2 text-white font-medium shadow-lg shadow-blue-500/20"
              >
                <Plus size={18} />
                <span>Add Course</span>
              </button>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Your Courses</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <RefreshCw size={32} className="text-blue-400 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <X size={32} className="mx-auto mb-2 opacity-70" />
              <p>Error loading courses data: {error}</p>
              <button 
                onClick={fetchCourses}
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <FileText size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg">No courses found</p>
              <button 
                onClick={openAddModal}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium"
              >
                Add Your First Course
              </button>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredCourses.map((course) => (
                <CourseItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-4xl shadow-2xl shadow-blue-500/10 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">
              {currentCourse ? "Edit Course" : "Add New Course"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Course ID</label>
                  <input
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    readOnly={currentCourse !== null}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Course Name</label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Course Fee ($)</label>
                  <input
                    type="number"
                    name="courseFee"
                    value={formData.courseFee}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 6 weeks, 3 months"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                  placeholder="Course description"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Job Opportunities</label>
                <textarea
                  name="jobOpportunities"
                  value={formData.jobOpportunities}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Career paths this course supports"
                  required
                />
              </div>
              
              {/* Course Content Modules */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-400 text-sm font-medium">Course Content</label>
                  <button
                    type="button"
                    onClick={addModule}
                    className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg px-3 py-1 text-blue-400"
                  >
                    <Plus size={14} className="mr-1" /> Add Module
                  </button>
                </div>
                
                {formData.courseContent.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="mb-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <Layers size={16} className="text-blue-400 mr-2" />
                        <h4 className="text-gray-200 font-medium">Module {moduleIndex + 1}</h4>
                      </div>
                      
                      {formData.courseContent.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(moduleIndex)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <input
                        type="text"
                        value={module.module}
                        onChange={(e) => handleModuleChange(moduleIndex, e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Module Title"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center">
                          <div className="flex items-center flex-1">
                            <List size={14} className="text-gray-400 mr-2" />
                            <input
                              type="text"
              value={topic}
              onChange={(e) => handleTopicChange(moduleIndex, topicIndex, e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Topic"
              required
            />
          </div>
          {module.topics.length > 1 && (
            <button
              type="button"
              onClick={() => removeTopic(moduleIndex, topicIndex)}
              className="text-red-400 hover:text-red-300 ml-2 p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addTopic(moduleIndex)}
        className="mt-2 flex items-center text-xs bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg px-2 py-1 text-blue-400"
      >
        <Plus size={12} className="mr-1" /> Add Topic
      </button>
    </div>
  </div>
))}
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium"
                >
                  {currentCourse ? "Update Course" : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningDashboard;