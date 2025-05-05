import { useState, useEffect } from 'react';
import { 
  User, Mail, CreditCard, Phone, BookOpen, 
  GraduationCap, ArrowRight, Check, Loader2, AlertCircle
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// Backend API base URL - adjust this to match your environment
const API_BASE_URL = 'http://localhost:8080';

export default function CourseEnrollmentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '', // Changed from 'email' to match backend field
    nicNumber: '',    // Changed from 'nic' to match backend field
    phoneNumber: '',
    courseId: queryParams.get('courseId') || '',
    courseName: queryParams.get('courseName') || '',
    learningMode: 'online'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Email is invalid';
    }
    
    if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC is required';
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    
    if (!formData.courseId) newErrors.courseId = 'Course ID is missing';
    
    if (!formData.learningMode) newErrors.learningMode = 'Please select a learning mode';
    
    return newErrors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset any previous errors
    setApiError(null);
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit the form
    setIsSubmitting(true);
    
    try {
      // Call the backend API
      const response = await fetch(`${API_BASE_URL}/api/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error: ${response.status}`);
      }
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form after 3 seconds and navigate back to course listing
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      setApiError(error.message || 'Failed to submit enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <GraduationCap size={36} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Course Enrollment
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Complete the form below to enroll in your selected course
          </p>
          
          {formData.courseName && (
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg py-2 px-4 inline-flex items-center mt-2">
              <BookOpen size={18} className="text-blue-400 mr-2" />
              <span className="text-lg font-medium">{formData.courseName}</span>
            </div>
          )}
        </header>
        
        {/* Form Card */}
        <div 
          className={`bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl overflow-hidden transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Top Gradient Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* API Error Message */}
          {apiError && (
            <div className="mx-8 mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start">
              <AlertCircle size={20} className="text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-200 text-sm">{apiError}</p>
            </div>
          )}
          
          {/* Form Content */}
          <div className="p-8">
            {isSuccess ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/20 border border-green-500/50">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Enrollment Successful!</h3>
                <p className="text-gray-300 mb-8">
                  Thank you for enrolling in <span className="font-medium text-blue-400">{formData.courseName}</span>. You will receive a confirmation email shortly with further instructions.
                </p>
                <div className="inline-block">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 rounded-lg">
                    <button 
                      type="button"
                      onClick={() => navigate('/course')}
                      className="px-6 py-2.5 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Browse More Courses
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 group-focus-within:opacity-100 transition-all duration-300 blur"></div>
                      <div className="relative flex items-center">
                        <User size={18} className="absolute left-3 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.fullName ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 group-focus-within:opacity-100 transition-all duration-300 blur"></div>
                      <div className="relative flex items-center">
                        <Mail size={18} className="absolute left-3 text-gray-400" />
                        <input
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.emailAddress ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors`}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    {errors.emailAddress && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.emailAddress}</p>
                    )}
                  </div>

                  {/* NIC */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      NIC Number
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 group-focus-within:opacity-100 transition-all duration-300 blur"></div>
                      <div className="relative flex items-center">
                        <CreditCard size={18} className="absolute left-3 text-gray-400" />
                        <input
                          type="text"
                          name="nicNumber"
                          value={formData.nicNumber}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.nicNumber ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors`}
                          placeholder="Enter your NIC number"
                        />
                      </div>
                    </div>
                    {errors.nicNumber && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.nicNumber}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 group-focus-within:opacity-100 transition-all duration-300 blur"></div>
                      <div className="relative flex items-center">
                        <Phone size={18} className="absolute left-3 text-gray-400" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.phoneNumber ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Course ID - Read Only */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      Course ID
                    </label>
                    <div className="relative">
                      <BookOpen size={18} className="absolute left-3 top-3 text-blue-400" />
                      <input
                        type="text"
                        name="courseId"
                        value={formData.courseId}
                        readOnly
                        className="w-full py-3 pl-10 pr-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Course Name - Read Only */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      Course Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        readOnly
                        className="w-full py-3 pl-3 pr-3 bg-gray-800/60 border border-gray-700 rounded-lg text-white cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Learning Mode */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-3 ml-1">
                      Learning Mode
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'online', label: 'Online' },
                        { id: 'physical', label: 'Physical' },
                        { id: 'hybrid', label: 'Hybrid' }
                      ].map((mode) => (
                        <div key={mode.id} className="relative">
                          <input
                            type="radio"
                            id={mode.id}
                            name="learningMode"
                            value={mode.id}
                            checked={formData.learningMode === mode.id}
                            onChange={handleChange}
                            className="peer absolute opacity-0"
                          />
                          <label
                            htmlFor={mode.id}
                            className={`
                              flex items-center justify-center py-3 px-4 rounded-lg border transition-all
                              ${formData.learningMode === mode.id ? 
                                'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white' :
                                'bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-800'
                              }
                              cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-500/50 peer-focus:ring-offset-0
                            `}
                          >
                            {mode.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.learningMode && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.learningMode}</p>
                    )}
                  </div>
                </div>

                {/* Animated Submit Button */}
                <div className="mt-8">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-70 group-hover:opacity-100 transition-all duration-300 blur"></div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full flex items-center justify-center py-3 bg-gray-900 rounded-md transition-all group-hover:bg-gray-800 text-white font-medium text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin mr-2" />
                          Processing Enrollment...
                        </>
                      ) : (
                        <>
                          Complete Enrollment
                          <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="mt-6 text-center text-xs text-gray-400">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  Your personal information will be handled securely.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}