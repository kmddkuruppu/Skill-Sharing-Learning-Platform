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
  Check
} from 'lucide-react';

export default function CourseAdminForm({ onCourseSubmit }) {
  const [isVisible, setIsVisible] = useState(false);
  const [jobOpportunities, setJobOpportunities] = useState(['']);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    courseFee: '',
    description: '',
    duration: '',
    jobOpportunities: ['']
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Duration options
  const durationOptions = [
    '4 weeks', '6 weeks', '8 weeks', '10 weeks', 
    '12 weeks', '16 weeks', '24 weeks', 'Self-paced'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

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
    
    setFormData({
      ...formData,
      jobOpportunities: updatedOpportunities.filter(job => job.trim() !== '')
    });
  };

  const addJobOpportunity = () => {
    setJobOpportunities([...jobOpportunities, '']);
  };

  const removeJobOpportunity = (index) => {
    const updatedOpportunities = [...jobOpportunities];
    updatedOpportunities.splice(index, 1);
    setJobOpportunities(updatedOpportunities);
    
    setFormData({
      ...formData,
      jobOpportunities: updatedOpportunities.filter(job => job.trim() !== '')
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.courseId.trim()) newErrors.courseId = "Course ID is required";
    if (!formData.courseName.trim()) newErrors.courseName = "Course name is required";
    if (!formData.courseFee.trim()) newErrors.courseFee = "Course fee is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (jobOpportunities.filter(job => job.trim() !== '').length === 0) {
      newErrors.jobOpportunities = "At least one job opportunity is required";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validate();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Prepare course data for submission
    const newCourse = {
      ...formData,
      jobOpportunities: jobOpportunities.filter(job => job.trim() !== '')
    };
    
    // Send to parent component
    if (onCourseSubmit) {
      onCourseSubmit(newCourse);
    }
    
    // Show success message
    setSuccessMessage('Course added successfully!');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      setFormData({
        courseId: '',
        courseName: '',
        courseFee: '',
        description: '',
        duration: '',
        jobOpportunities: ['']
      });
      setJobOpportunities(['']);
    }, 3000);
  };

  const handleReset = () => {
    setFormData({
      courseId: '',
      courseName: '',
      courseFee: '',
      description: '',
      duration: '',
      jobOpportunities: ['']
    });
    setJobOpportunities(['']);
    setErrors({});
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Course Management
              </span>
            </h1>
            <p className="text-lg text-gray-300">
              Add new courses with essential details
            </p>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-xl">
              {/* Form Header */}
              <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <Plus size={20} className="mr-2 text-blue-400" />
                  Add New Course
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleReset}
                    className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    title="Reset form"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mx-6 mt-6 px-4 py-3 bg-green-500/20 border border-green-500 rounded-lg flex items-center">
                  <Check size={18} className="text-green-400 mr-2" />
                  <p className="text-green-400">{successMessage}</p>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Course ID */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <Hash size={16} className="mr-2 text-gray-400" />
                      Course ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleInputChange}
                        placeholder="e.g., FE001"
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.courseId ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
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
                      <DollarSign size={16} className="mr-2 text-gray-400" />
                      Course Fee
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="courseFee"
                        value={formData.courseFee}
                        onChange={handleInputChange}
                        placeholder="e.g., $149.99"
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.courseFee ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
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
                      <Tag size={16} className="mr-2 text-gray-400" />
                      Course Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleInputChange}
                        placeholder="e.g., Advanced React Development"
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.courseName ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
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
                      <Clock size={16} className="mr-2 text-gray-400" />
                      Duration
                    </label>
                    <div className="relative">
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.duration ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
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
                      <FileText size={16} className="mr-2 text-gray-400" />
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Enter a detailed course description..."
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.description ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
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
                        <Briefcase size={16} className="mr-2 text-gray-400" />
                        Job Opportunities
                      </label>
                      <button
                        type="button"
                        onClick={addJobOpportunity}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
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
                          className={`flex-1 p-3 rounded-lg bg-gray-900/80 border ${errors.jobOpportunities && index === 0 ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeJobOpportunity(index)}
                            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
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
                </div>

                {/* Submit Button - Full width */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center font-medium"
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

      {/* Preview Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Preview
            </h2>

            {/* Course Preview Card */}
            {formData.courseName && (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-medium text-blue-400 mb-1">
                      ID: {formData.courseId || 'TBD'}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {formData.courseName}
                    </h3>
                  </div>
                  <div className="text-blue-400 font-bold">
                    {formData.courseFee || '$0.00'}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {formData.description || 'Course description will appear here...'}
                </p>
                
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Clock size={16} className="mr-1.5" />
                  <span>{formData.duration || 'Duration: TBD'}</span>
                </div>
                
                {/* Job Opportunities */}
                <div>
                  <div className="flex items-center mb-2">
                    <Briefcase size={16} className="text-blue-400 mr-2" />
                    <h4 className="text-sm font-medium text-gray-300">Job Opportunities</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {jobOpportunities.filter(job => job.trim() !== '').length > 0 ? (
                      jobOpportunities
                        .filter(job => job.trim() !== '')
                        .map((job, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-700/60 px-3 py-1 rounded-full text-xs text-gray-300"
                          >
                            {job}
                          </span>
                        ))
                    ) : (
                      <span className="text-sm text-gray-500">No job opportunities specified</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}