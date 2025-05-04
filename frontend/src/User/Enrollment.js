import { useState, useEffect } from 'react';
import { 
  User, Mail, CreditCard, Phone, BookOpen, 
  GraduationCap, ArrowRight, Check, Loader2
} from 'lucide-react';

export default function CourseEnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nic: '',
    phoneNumber: '',
    courseId: '',
    courseName: '',
    learningMode: 'online'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect
  useEffect(() => {
    setIsVisible(true);
    
    // Mock API call to fetch courses - replace with your actual API
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch('http://localhost:8080/api/learnings');
        
        // For demo, we'll just set some mock data
        setTimeout(() => {
          setCoursesList([
            { courseId: 'CS101', courseName: 'Introduction to Web Development' },
            { courseId: 'CS102', courseName: 'React.js Fundamentals' },
            { courseId: 'CS103', courseName: 'Backend Development with Node.js' },
            { courseId: 'CS104', courseName: 'UI/UX Design Principles' },
            { courseId: 'CS105', courseName: 'Data Science Fundamentals' },
            { courseId: 'CS106', courseName: 'Mobile App Development' },
          ]);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setIsLoading(false);
      }
    };
    
    fetchCourses();
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
    
    // Auto-fill course name when courseId is selected
    if (name === 'courseId') {
      const selectedCourse = coursesList.find(course => course.courseId === value);
      if (selectedCourse) {
        setFormData(prev => ({
          ...prev,
          courseName: selectedCourse.courseName
        }));
      }
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.nic.trim()) newErrors.nic = 'NIC is required';
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    
    if (!formData.courseId) newErrors.courseId = 'Please select a course';
    
    if (!formData.learningMode) newErrors.learningMode = 'Please select a learning mode';
    
    return newErrors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit the form
    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with your actual API endpoint
      // await fetch('http://localhost:8080/api/enrollments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // For demo purposes, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          nic: '',
          phoneNumber: '',
          courseId: '',
          courseName: '',
          learningMode: 'online'
        });
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
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
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Complete the form below to enroll in your selected course and begin your learning journey
          </p>
        </header>
        
        {/* Form Card */}
        <div 
          className={`bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl overflow-hidden transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Top Gradient Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Form Content */}
          <div className="p-8">
            {isSuccess ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/20 border border-green-500/50">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Enrollment Successful!</h3>
                <p className="text-gray-300 mb-8">
                  Thank you for enrolling. You will receive a confirmation email shortly with further instructions.
                </p>
                <div className="inline-block">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 rounded-lg">
                    <button 
                      type="button"
                      onClick={() => window.location.reload()}
                      className="px-6 py-2.5 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Enroll in Another Course
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
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.email ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors`}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
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
                          name="nic"
                          value={formData.nic}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.nic ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors`}
                          placeholder="Enter your NIC number"
                        />
                      </div>
                    </div>
                    {errors.nic && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.nic}</p>
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

                  {/* Course ID */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                      Course ID
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 group-focus-within:opacity-100 transition-all duration-300 blur"></div>
                      <div className="relative">
                        <BookOpen size={18} className="absolute left-3 top-3 text-gray-400" />
                        <select
                          name="courseId"
                          value={formData.courseId}
                          onChange={handleChange}
                          className={`w-full py-3 pl-10 pr-3 bg-gray-900/90 border ${
                            errors.courseId ? 'border-red-500' : 'border-gray-700'
                          } rounded-lg focus:outline-none focus:border-blue-400 focus:ring-0 text-white transition-colors appearance-none`}
                          disabled={isLoading}
                        >
                          <option value="">Select Course ID</option>
                          {coursesList.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                              {course.courseId} - {course.courseName}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {errors.courseId && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.courseId}</p>
                    )}
                    {isLoading && (
                      <div className="flex items-center mt-1 ml-1">
                        <Loader2 size={12} className="animate-spin mr-1 text-blue-400" />
                        <p className="text-xs text-blue-400">Loading courses...</p>
                      </div>
                    )}
                  </div>

                  {/* Course Name (auto-filled) */}
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
                        className="w-full py-3 pl-3 pr-3 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-400 focus:outline-none cursor-not-allowed"
                        placeholder="Auto-filled from Course ID"
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
                        { id: 'in-person', label: 'In-Person' },
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
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Enrollment
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