import { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Plus, 
  Clock,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Briefcase,
  AlertCircle,
  Check,
  Layers,
  Calendar,
  Sparkles
} from 'lucide-react';
import ParticlesTheme from "../Components/Theme";
import SuccessAlert from "../Components/SuccessAlert";

export default function CourseAdminForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [jobOpportunities, setJobOpportunities] = useState(['']);
  const [courseModules, setCourseModules] = useState([{ module: '', topics: [''] }]);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    courseFee: '',
    description: '',
    duration: '',
    jobOpportunities: '',
    courseContent: []
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Updated duration options as requested
  const durationOptions = [
    '6 months', '12 months', '24 months', '36 months'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for courseName to prevent numbers
    if (name === 'courseName') {
      const textOnlyValue = value.replace(/[0-9]/g, '');
      setFormData({
        ...formData,
        [name]: textOnlyValue
      });
    }
    // Handle special case for courseFee to ensure it's a number
    else if (name === 'courseFee') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleJobOpportunityChange = (index, value) => {
    const updatedOpportunities = [...jobOpportunities];
    updatedOpportunities[index] = value;
    setJobOpportunities(updatedOpportunities);
    
    // Join job opportunities into a comma-separated string for backend
    setFormData({
      ...formData,
      jobOpportunities: updatedOpportunities.filter(job => job.trim() !== '').join(', ')
    });
  };

  const addJobOpportunity = () => {
    setJobOpportunities([...jobOpportunities, '']);
  };

  const removeJobOpportunity = (index) => {
    const updatedOpportunities = [...jobOpportunities];
    updatedOpportunities.splice(index, 1);
    setJobOpportunities(updatedOpportunities);
    
    // Update formData with the filtered and joined opportunities
    setFormData({
      ...formData,
      jobOpportunities: updatedOpportunities.filter(job => job.trim() !== '').join(', ')
    });
  };

  // Course Content/Modules Management
  const handleModuleChange = (index, value) => {
    const updatedModules = [...courseModules];
    updatedModules[index].module = value;
    setCourseModules(updatedModules);
    updateCourseContent();
  };

  const handleTopicChange = (moduleIndex, topicIndex, value) => {
    const updatedModules = [...courseModules];
    updatedModules[moduleIndex].topics[topicIndex] = value;
    setCourseModules(updatedModules);
    updateCourseContent();
  };

  const addTopic = (moduleIndex) => {
    const updatedModules = [...courseModules];
    updatedModules[moduleIndex].topics.push('');
    setCourseModules(updatedModules);
  };

  const removeTopic = (moduleIndex, topicIndex) => {
    const updatedModules = [...courseModules];
    updatedModules[moduleIndex].topics.splice(topicIndex, 1);
    setCourseModules(updatedModules);
    updateCourseContent();
  };

  const addModule = () => {
    setCourseModules([...courseModules, { module: '', topics: [''] }]);
  };

  const removeModule = (index) => {
    const updatedModules = [...courseModules];
    updatedModules.splice(index, 1);
    setCourseModules(updatedModules);
    updateCourseContent();
  };

  const updateCourseContent = () => {
    // Filter out empty modules and topics
    const validModules = courseModules
      .filter(mod => mod.module.trim() !== '')
      .map(mod => ({
        module: mod.module,
        topics: mod.topics.filter(topic => topic.trim() !== '')
      }))
      .filter(mod => mod.topics.length > 0);

    setFormData({
      ...formData,
      courseContent: validModules
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.courseId.trim()) newErrors.courseId = "Course ID is required";
    if (!formData.courseName.trim()) newErrors.courseName = "Course name is required";
    if (!formData.courseFee.toString().trim()) newErrors.courseFee = "Course fee is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (jobOpportunities.filter(job => job.trim() !== '').length === 0) {
      newErrors.jobOpportunities = "At least one job opportunity is required";
    }
    if (formData.courseContent.length === 0) {
      newErrors.courseContent = "At least one module with a topic is required";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validate();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Prepare course data for submission
    const courseData = {
      ...formData,
      courseFee: parseFloat(formData.courseFee)
    };
    
    try {
      // Send data to backend
      const response = await fetch('http://localhost:8080/api/learnings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save course');
      }
      
      const result = await response.text();
      
      // Show success message in the banner
      setSuccessMessage(result);
      setErrorMessage('');
      
      // Show animated success alert
      setShowSuccessAlert(true);
      
      // Reset form after success alert is dismissed
      setTimeout(() => {
        setShowSuccessAlert(false);
        setSuccessMessage('');
        
        // Additional delay before resetting the form
        setTimeout(() => {
          setFormData({
            courseId: '',
            courseName: '',
            courseFee: '',
            description: '',
            duration: '',
            jobOpportunities: '',
            courseContent: []
          });
          setJobOpportunities(['']);
          setCourseModules([{ module: '', topics: [''] }]);
        }, 500);
      }, 3000);
    } catch (error) {
      setErrorMessage('Failed to save course: ' + error.message);
      setSuccessMessage('');
    }
  };

  const handleReset = () => {
    setFormData({
      courseId: '',
      courseName: '',
      courseFee: '',
      description: '',
      duration: '',
      jobOpportunities: '',
      courseContent: []
    });
    setJobOpportunities(['']);
    setCourseModules([{ module: '', topics: [''] }]);
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <ParticlesTheme>
      <div className={`min-h-screen transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Success Alert Component */}
        <SuccessAlert 
          showSuccess={showSuccessAlert} 
          successAction="added" 
          successCourseName={formData.courseName} 
          onHide={handleCloseSuccessAlert} 
        />

        {/* Header */}
        <header className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Sparkles className="text-blue-400 mr-3 h-8 w-8" />
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500">
                    Course Management
                  </span>
                </h1>
              </div>
              <p className="text-lg text-gray-300 ml-11">
                Create and manage your educational offerings
              </p>
            </div>
          </div>
        </header>

        {/* Form Section */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl">
                {/* Form Header */}
                <div className="px-6 py-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-gray-700/70 flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Plus size={20} className="mr-2 text-blue-400" />
                    Add New Course
                  </h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleReset}
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors"
                      title="Reset form"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="mx-6 mt-6 px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center">
                    <Check size={18} className="text-green-400 mr-2" />
                    <p className="text-green-400">{successMessage}</p>
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="mx-6 mt-6 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center">
                    <AlertCircle size={18} className="text-red-400 mr-2" />
                    <p className="text-red-400">{errorMessage}</p>
                  </div>
                )}

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course ID */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Hash size={16} className="mr-2 text-blue-400" />
                        Course ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="courseId"
                          value={formData.courseId}
                          onChange={handleInputChange}
                          placeholder="e.g., FE001"
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.courseId ? 'border-red-500' : 'border-gray-700/50'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.courseId && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.courseId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Course Fee */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <DollarSign size={16} className="mr-2 text-green-400" />
                        Course Fee
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="courseFee"
                          value={formData.courseFee}
                          onChange={handleInputChange}
                          placeholder="e.g., 149.99"
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.courseFee ? 'border-red-500' : 'border-gray-700/50'} focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.courseFee && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.courseFee}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Course Name - Full width */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Tag size={16} className="mr-2 text-purple-400" />
                        Course Name (no numbers allowed)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="courseName"
                          value={formData.courseName}
                          onChange={handleInputChange}
                          placeholder="e.g., Advanced React Development"
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.courseName ? 'border-red-500' : 'border-gray-700/50'} focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.courseName && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.courseName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Calendar size={16} className="mr-2 text-amber-400" />
                        Duration
                      </label>
                      <div className="relative">
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.duration ? 'border-red-500' : 'border-gray-700/50'} focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 focus:outline-none text-base transition-all`}
                        >
                          <option value="">Select duration</option>
                          {durationOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {errors.duration && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.duration}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description - Full width */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <FileText size={16} className="mr-2 text-teal-400" />
                        Description
                      </label>
                      <div className="relative">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Enter a detailed course description..."
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.description ? 'border-red-500' : 'border-gray-700/50'} focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.description && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Job Opportunities - Full width */}
                    <div className="space-y-3 md:col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-300 flex items-center">
                          <Briefcase size={16} className="mr-2 text-indigo-400" />
                          Job Opportunities
                        </label>
                        <button
                          type="button"
                          onClick={addJobOpportunity}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center bg-blue-500/10 px-2 py-1 rounded-md transition-colors"
                        >
                          <Plus size={16} className="mr-1" />
                          Add More
                        </button>
                      </div>
                      
                      {jobOpportunities.map((job, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={job}
                            onChange={(e) => handleJobOpportunityChange(index, e.target.value)}
                            placeholder={`e.g., Frontend Developer`}
                            className={`flex-1 p-3 rounded-lg bg-gray-900/80 border ${errors.jobOpportunities && index === 0 ? 'border-red-500' : 'border-gray-700/50'} focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:outline-none text-base transition-all`}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeJobOpportunity(index)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                            >
                              <X size={16} className="text-red-400" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      {errors.jobOpportunities && (
                        <p className="mt-1 text-xs text-red-400 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.jobOpportunities}
                        </p>
                      )}
                    </div>

                    {/* Course Content/Modules - Full width */}
                    <div className="space-y-4 md:col-span-2 border border-gray-700/50 rounded-lg p-4 bg-gray-800/30">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-300 flex items-center">
                          <Layers size={16} className="mr-2 text-rose-400" />
                          Course Content
                        </label>
                        <button
                          type="button"
                          onClick={addModule}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center bg-blue-500/10 px-2 py-1 rounded-md transition-colors"
                        >
                          <Plus size={16} className="mr-1" />
                          Add Module
                        </button>
                      </div>
                      
                      {errors.courseContent && (
                        <p className="mt-1 text-xs text-red-400 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.courseContent}
                        </p>
                      )}
                      
                      {courseModules.map((moduleItem, moduleIndex) => (
                        <div key={moduleIndex} className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-lg p-4 border border-gray-700/50 mb-4 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={moduleItem.module}
                                onChange={(e) => handleModuleChange(moduleIndex, e.target.value)}
                                placeholder="Module name (e.g., Introduction to React)"
                                className="w-full p-2 rounded-lg bg-gray-800/70 border border-gray-700/50 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30 focus:outline-none text-base transition-all"
                              />
                            </div>
                            {moduleIndex > 0 && (
                              <button
                                type="button"
                                onClick={() => removeModule(moduleIndex)}
                                className="ml-2 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                              >
                                <X size={16} className="text-red-400" />
                              </button>
                            )}
                          </div>
                          
                          <div className="pl-4 border-l-2 border-blue-500/40">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium text-gray-400">Topics</h4>
                              <button
                                type="button"
                                onClick={() => addTopic(moduleIndex)}
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center bg-blue-500/10 px-2 py-1 rounded-md transition-colors"
                              >
                                <Plus size={12} className="mr-1" />
                                Add Topic
                              </button>
                            </div>
                            
                            {moduleItem.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center space-x-2 mb-2">
                                <input
                                  type="text"
                                  value={topic}
                                  onChange={(e) => handleTopicChange(moduleIndex, topicIndex, e.target.value)}
                                  placeholder="Topic name (e.g., Components and Props)"
                                  className="flex-1 p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-sm transition-all"
                                />
                                {topicIndex > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => removeTopic(moduleIndex, topicIndex)}
                                    className="p-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                                  >
                                    <X size={14} className="text-red-400" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button - Full width */}
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 flex items-center font-medium"
                    >
                      <Save size={18} className="mr-2" />
                      Save Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ParticlesTheme>
  );
}