import { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Plus, 
  Image, 
  Upload, 
  ChevronDown, 
  Check, 
  AlertCircle,
  Briefcase,
  Clock,
  DollarSign,
  Hash,
  User,
  FileText,
  Tag
} from 'lucide-react';

export default function CourseAdminForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [jobOpportunities, setJobOpportunities] = useState(['']);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    courseFee: '',
    description: '',
    duration: '',
    category: '',
    instructor: '',
    rating: 5.0,
    students: 0,
    image: null,
    jobOpportunities: ['']
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Categories
  const categories = [
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'devops', name: 'DevOps' },
    { id: 'security', name: 'Cybersecurity' },
    { id: 'blockchain', name: 'Blockchain' }
  ];

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

  const handleCategorySelect = (categoryId) => {
    setFormData({
      ...formData,
      category: categoryId
    });
    setIsCategoryDropdownOpen(false);
    
    // Clear error for category if it exists
    if (errors.category) {
      setErrors({
        ...errors,
        category: null
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

  const handleImageChange = (e) => {
    // In a real application, you would handle file uploads.
    // For this demo, we'll just store the file name
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0].name
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.courseId.trim()) newErrors.courseId = "Course ID is required";
    if (!formData.courseName.trim()) newErrors.courseName = "Course name is required";
    if (!formData.courseFee.trim()) newErrors.courseFee = "Course fee is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.instructor.trim()) newErrors.instructor = "Instructor name is required";
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
    
    // Here you would normally send the data to your API
    console.log("Form submitted:", formData);
    
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
        category: '',
        instructor: '',
        rating: 5.0,
        students: 0,
        image: null,
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
      category: '',
      instructor: '',
      rating: 5.0,
      students: 0,
      image: null,
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
                Admin Course Management
              </span>
            </h1>
            <p className="text-lg text-gray-300">
              Add new courses to your learning platform with comprehensive details
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

                  {/* Course Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <Tag size={16} className="mr-2 text-gray-400" />
                      Category
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.category ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base flex justify-between items-center`}
                      >
                        {formData.category 
                          ? categories.find(cat => cat.id === formData.category)?.name 
                          : 'Select category'}
                        <ChevronDown size={16} className={`transform transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isCategoryDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full rounded-lg bg-gray-800 shadow-lg border border-gray-700 py-1 max-h-64 overflow-auto">
                          {categories.map(category => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => handleCategorySelect(category.id)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center"
                            >
                              {formData.category === category.id && (
                                <Check size={16} className="mr-2 text-blue-400" />
                              )}
                              <span className={formData.category === category.id ? 'text-blue-400' : ''}>
                                {category.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {errors.category && (
                        <p className="mt-1 text-xs text-red-400 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
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

                  {/* Instructor */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      Instructor
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleInputChange}
                        placeholder="e.g., Alex Johnson"
                        className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.instructor ? 'border-red-500' : 'border-gray-700'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base`}
                      />
                      {errors.instructor && (
                        <p className="mt-1 text-xs text-red-400 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.instructor}
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

                  {/* Course Image Upload */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <Image size={16} className="mr-2 text-gray-400" />
                      Course Image
                    </label>
                    <div className="border border-dashed border-gray-700 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Upload size={32} className="text-gray-400" />
                        <p className="text-sm text-gray-400">Drag and drop an image or click to browse</p>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                          id="course-image"
                          accept="image/*"
                        />
                        <label
                          htmlFor="course-image"
                          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          Select Image
                        </label>
                        {formData.image && (
                          <p className="text-sm text-gray-300 mt-2">Selected: {formData.image}</p>
                        )}
                      </div>
                    </div>
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
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                {/* Course Image */}
                <div className="relative">
                  <img src="/api/placeholder/800/300" alt="Course Preview" className="w-full h-48 object-cover" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    ID: {formData.courseId || 'TBD'}
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {formData.courseName}
                    </h3>
                    <div className="text-blue-400 font-bold">
                      {formData.courseFee || '$0.00'}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {formData.description || 'Course description will appear here...'}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-400 space-x-4 mb-4">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1.5" />
                      {formData.duration || 'TBD'}
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-1.5" />
                      {formData.instructor || 'Instructor name'}
                    </div>
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
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-8 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <AlertCircle size={18} className="text-blue-400 mr-2" />
                Admin Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Use unique course IDs that reflect the category (e.g., FE001 for Frontend)</li>
                <li>• Keep course names concise but descriptive</li>
                <li>• Ensure descriptions highlight key learning outcomes</li>
                <li>• Include realistic job opportunities that graduates can pursue</li>
                <li>• Optimize course images for better performance (recommended: 800×450px)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}