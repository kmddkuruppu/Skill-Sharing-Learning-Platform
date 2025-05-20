import { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Plus, 
  User,
  Mail,
  FileText,
  Tag,
  Clock,
  Calendar,
  Sparkles,
  Check,
  AlertCircle,
  Star,
  Briefcase,
  Handshake
} from 'lucide-react';
import ParticlesTheme from "../Components/Theme";
import SuccessAlert from "../Components/SuccessAlert";

export default function SkillForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [tags, setTags] = useState(['']);
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    skillTitle: '',
    skillDescription: '',
    experienceLevel: '',
    howYouUseIt: '',
    tags: [],
    availabilityForCollaboration: false,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5)
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Experience level options
  const experienceLevelOptions = [
    'Beginner', 'Intermediate', 'Advanced', 'Expert'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
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

  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
    
    // Update formData with the filtered tags
    setFormData({
      ...formData,
      tags: updatedTags.filter(tag => tag.trim() !== '')
    });
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    
    // Update formData with the filtered tags
    setFormData({
      ...formData,
      tags: updatedTags.filter(tag => tag.trim() !== '')
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.emailAddress.trim()) newErrors.emailAddress = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.emailAddress)) newErrors.emailAddress = "Invalid email format";
    if (!formData.skillTitle.trim()) newErrors.skillTitle = "Skill title is required";
    if (!formData.skillDescription.trim()) newErrors.skillDescription = "Description is required";
    if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required";
    if (!formData.howYouUseIt.trim()) newErrors.howYouUseIt = "How you use it is required";
    if (tags.filter(tag => tag.trim() !== '').length === 0) {
      newErrors.tags = "At least one tag is required";
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
    
    // Prepare skill data for submission
    const skillData = {
      ...formData
    };
    
    try {
      // Send data to backend
      const response = await fetch('http://localhost:8080/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save skill');
      }
      
      const result = await response.json();
      
      // Show success message in the banner
      setSuccessMessage(`Skill "${formData.skillTitle}" successfully added!`);
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
            name: '',
            emailAddress: '',
            skillTitle: '',
            skillDescription: '',
            experienceLevel: '',
            howYouUseIt: '',
            tags: [],
            availabilityForCollaboration: false,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().split(' ')[0].slice(0, 5)
          });
          setTags(['']);
        }, 500);
      }, 3000);
    } catch (error) {
      setErrorMessage('Failed to save skill: ' + error.message);
      setSuccessMessage('');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      emailAddress: '',
      skillTitle: '',
      skillDescription: '',
      experienceLevel: '',
      howYouUseIt: '',
      tags: [],
      availabilityForCollaboration: false,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].slice(0, 5)
    });
    setTags(['']);
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
          successCourseName={formData.skillTitle} 
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
                    Skill Management
                  </span>
                </h1>
              </div>
              <p className="text-lg text-gray-300 ml-11">
                Share your skills and find collaboration opportunities
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
                    Add New Skill
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
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <User size={16} className="mr-2 text-blue-400" />
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.name ? 'border-red-500' : 'border-gray-700/50'} focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Mail size={16} className="mr-2 text-green-400" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.emailAddress ? 'border-red-500' : 'border-gray-700/50'} focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.emailAddress && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.emailAddress}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Skill Title - Full width */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Tag size={16} className="mr-2 text-purple-400" />
                        Skill Title
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="skillTitle"
                          value={formData.skillTitle}
                          onChange={handleInputChange}
                          placeholder="e.g., React Development, UX Design, Project Management"
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.skillTitle ? 'border-red-500' : 'border-gray-700/50'} focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.skillTitle && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.skillTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Star size={16} className="mr-2 text-amber-400" />
                        Experience Level
                      </label>
                      <div className="relative">
                        <select
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleInputChange}
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.experienceLevel ? 'border-red-500' : 'border-gray-700/50'} focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 focus:outline-none text-base transition-all`}
                        >
                          <option value="">Select experience level</option>
                          {experienceLevelOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {errors.experienceLevel && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.experienceLevel}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Skill Description - Full width */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <FileText size={16} className="mr-2 text-teal-400" />
                        Skill Description
                      </label>
                      <div className="relative">
                        <textarea
                          name="skillDescription"
                          value={formData.skillDescription}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Describe your skill in detail..."
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.skillDescription ? 'border-red-500' : 'border-gray-700/50'} focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.skillDescription && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.skillDescription}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* How You Use It - Full width */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Briefcase size={16} className="mr-2 text-indigo-400" />
                        How You Use It
                      </label>
                      <div className="relative">
                        <textarea
                          name="howYouUseIt"
                          value={formData.howYouUseIt}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Explain how you apply this skill in your work or projects..."
                          className={`w-full p-3 rounded-lg bg-gray-900/80 border ${errors.howYouUseIt ? 'border-red-500' : 'border-gray-700/50'} focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:outline-none text-base transition-all`}
                        />
                        {errors.howYouUseIt && (
                          <p className="mt-1 text-xs text-red-400 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.howYouUseIt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tags - Full width */}
                    <div className="space-y-3 md:col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-300 flex items-center">
                          <Tag size={16} className="mr-2 text-rose-400" />
                          Tags (Categories)
                        </label>
                        <button
                          type="button"
                          onClick={addTag}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center bg-blue-500/10 px-2 py-1 rounded-md transition-colors"
                        >
                          <Plus size={16} className="mr-1" />
                          Add Tag
                        </button>
                      </div>
                      
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            placeholder={`e.g., Development, Design, ${index > 0 ? 'Marketing' : 'Management'}`}
                            className={`flex-1 p-3 rounded-lg bg-gray-900/80 border ${errors.tags && index === 0 ? 'border-red-500' : 'border-gray-700/50'} focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30 focus:outline-none text-base transition-all`}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeTag(index)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                            >
                              <X size={16} className="text-red-400" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      {errors.tags && (
                        <p className="mt-1 text-xs text-red-400 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.tags}
                        </p>
                      )}
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Calendar size={16} className="mr-2 text-blue-400" />
                        Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-lg bg-gray-900/80 border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-base transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <Clock size={16} className="mr-2 text-purple-400" />
                        Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-lg bg-gray-900/80 border border-gray-700/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none text-base transition-all"
                        />
                      </div>
                    </div>

                    {/* Availability for Collaboration */}
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="availabilityForCollaboration"
                          name="availabilityForCollaboration"
                          checked={formData.availabilityForCollaboration}
                          onChange={handleInputChange}
                          className="h-5 w-5 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-2 focus:ring-blue-400/30"
                        />
                        <label htmlFor="availabilityForCollaboration" className="ml-2 block text-sm font-medium text-gray-300 flex items-center">
                          <Handshake size={16} className="mr-2 text-green-400" />
                          Available for Collaboration
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button - Full width */}
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 flex items-center font-medium"
                    >
                      <Save size={18} className="mr-2" />
                      Save Skill
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