import { useState } from "react";
import { X, Plus, Save, User, BookOpen, Award, Target, CheckCircle } from "lucide-react";

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.4,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

const SkillProgressForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    completedModules: [],
    totalModules: 0,
    progressPercentage: 0,
    isCertificateEligible: false,
    badgesEarned: [],
    feedback: ""
  });

  const [newModule, setNewModule] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
    }
    
    if (!formData.courseId.trim()) {
      newErrors.courseId = "Course ID is required";
    }
    
    if (formData.totalModules <= 0) {
      newErrors.totalModules = "Total modules must be greater than 0";
    }
    
    if (formData.progressPercentage < 0 || formData.progressPercentage > 100) {
      newErrors.progressPercentage = "Progress percentage must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const addModule = () => {
    if (newModule.trim() && !formData.completedModules.includes(newModule.trim())) {
      setFormData(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, newModule.trim()]
      }));
      setNewModule("");
    }
  };

  const removeModule = (moduleToRemove) => {
    setFormData(prev => ({
      ...prev,
      completedModules: prev.completedModules.filter(module => module !== moduleToRemove)
    }));
  };

  const addBadge = () => {
    if (newBadge.trim() && !formData.badgesEarned.includes(newBadge.trim())) {
      setFormData(prev => ({
        ...prev,
        badgesEarned: [...prev.badgesEarned, newBadge.trim()]
      }));
      setNewBadge("");
    }
  };

  const removeBadge = (badgeToRemove) => {
    setFormData(prev => ({
      ...prev,
      badgesEarned: prev.badgesEarned.filter(badge => badge !== badgeToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalModules: parseInt(formData.totalModules),
          progressPercentage: parseFloat(formData.progressPercentage)
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Progress created successfully:', result);
        
        setFormData({
          userId: "",
          courseId: "",
          completedModules: [],
          totalModules: 0,
          progressPercentage: 0,
          isCertificateEligible: false,
          badgesEarned: [],
          feedback: ""
        });
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error creating progress:', errorData);
        setErrors({ submit: 'Failed to create progress. Please try again.' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <FloatingParticles />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-full p-2 transition-all duration-300 z-10"
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/40">
              <BookOpen size={32} className="text-purple-300" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Create Skill Progress
              </h2>
              <p className="text-gray-300">Track learning progress and achievements</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-indigo-500/20 text-indigo-300">
                      <User size={14} />
                    </div>
                    User ID *
                  </div>
                </label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.userId 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-purple-500/30 focus:ring-purple-500/50'
                  }`}
                  placeholder="Enter user ID"
                  disabled={isSubmitting}
                />
                {errors.userId && <p className="text-red-300 text-sm mt-1">{errors.userId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-indigo-500/20 text-indigo-300">
                      <BookOpen size={14} />
                    </div>
                    Course ID *
                  </div>
                </label>
                <input
                  type="text"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.courseId 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-purple-500/30 focus:ring-purple-500/50'
                  }`}
                  placeholder="Enter course ID"
                  disabled={isSubmitting}
                />
                {errors.courseId && <p className="text-red-300 text-sm mt-1">{errors.courseId}</p>}
              </div>
            </div>

            {/* Progress Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-indigo-500/20 text-indigo-300">
                      <Target size={14} />
                    </div>
                    Total Modules *
                  </div>
                </label>
                <input
                  type="number"
                  name="totalModules"
                  value={formData.totalModules}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.totalModules 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-purple-500/30 focus:ring-purple-500/50'
                  }`}
                  placeholder="0"
                  disabled={isSubmitting}
                />
                {errors.totalModules && <p className="text-red-300 text-sm mt-1">{errors.totalModules}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Progress Percentage *
                </label>
                <input
                  type="number"
                  name="progressPercentage"
                  value={formData.progressPercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.progressPercentage 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-purple-500/30 focus:ring-purple-500/50'
                  }`}
                  placeholder="0.0"
                  disabled={isSubmitting}
                />
                {errors.progressPercentage && <p className="text-red-300 text-sm mt-1">{errors.progressPercentage}</p>}
              </div>
            </div>

            {/* Progress Bar Visualization */}
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
              <label className="block text-sm font-medium text-purple-200 mb-3">
                Progress Visualization
              </label>
              <div className="w-full bg-gray-800/50 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-4 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/30"
                  style={{ width: `${Math.min(100, Math.max(0, formData.progressPercentage))}%` }}
                ></div>
              </div>
              <p className="text-sm text-purple-200 mt-2 text-center">
                {formData.completedModules.length} of {formData.totalModules} modules completed ({formData.progressPercentage}%)
              </p>
            </div>

            {/* Completed Modules */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-green-500/20 text-green-300">
                    <CheckCircle size={14} />
                  </div>
                  Completed Modules
                </div>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addModule)}
                  className="flex-1 bg-gray-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  placeholder="Enter module name"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={addModule}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-purple-500/20"
                  disabled={isSubmitting}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.completedModules.map((module, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-300 border border-green-500/50 rounded-full text-sm backdrop-blur-sm hover:bg-green-500/30 transition-all duration-300"
                  >
                    <CheckCircle size={12} />
                    {module}
                    <button
                      type="button"
                      onClick={() => removeModule(module)}
                      className="text-green-300 hover:text-red-300 hover:bg-red-500/20 rounded-full p-1 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Badges Earned */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-yellow-500/20 text-yellow-300">
                    <Award size={14} />
                  </div>
                  Badges Earned
                </div>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addBadge)}
                  className="flex-1 bg-gray-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  placeholder="Enter badge name"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={addBadge}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-purple-500/20"
                  disabled={isSubmitting}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.badgesEarned.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-full text-sm backdrop-blur-sm hover:bg-yellow-500/30 transition-all duration-300"
                  >
                    <Award size={12} />
                    {badge}
                    <button
                      type="button"
                      onClick={() => removeBadge(badge)}
                      className="text-yellow-300 hover:text-red-300 hover:bg-red-500/20 rounded-full p-1 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate Eligibility */}
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isCertificateEligible"
                  checked={formData.isCertificateEligible}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 bg-gray-900/50 border-purple-500/50 rounded focus:ring-purple-500/50 focus:ring-2 transition-all duration-300"
                  disabled={isSubmitting}
                />
                <span className="text-sm font-medium text-purple-200 flex items-center gap-2">
                  <Award size={16} />
                  Certificate Eligible
                </span>
              </label>
              {formData.isCertificateEligible && (
                <div className="mt-3 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <p className="text-sm text-green-300 flex items-center gap-2">
                    <CheckCircle size={16} />
                    This learner is eligible for course certification
                  </p>
                </div>
              )}
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Feedback & Notes
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                placeholder="Enter personalized feedback from system or instructor..."
                disabled={isSubmitting}
                maxLength={500}
              />
              <div className="mt-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <p className="text-sm text-purple-300">
                  {formData.feedback.length}/500 characters
                </p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 shadow-lg">
              <h3 className="font-bold text-xl text-purple-200 mb-4 flex items-center gap-2">
                <Target size={20} />
                Progress Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-300">User:</span>
                  <span className="font-medium text-white">{formData.userId || 'Not specified'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-300">Course:</span>
                  <span className="font-medium text-white">{formData.courseId || 'Not specified'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-300">Modules:</span>
                  <span className="font-medium text-white">
                    {formData.completedModules.length}/{formData.totalModules}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-300">Progress:</span>
                  <span className="font-medium text-white">{formData.progressPercentage}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-300">Badges:</span>
                  <span className="font-medium text-white">{formData.badgesEarned.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <span className="text-purple-300">Certificate:</span>
                  <span className={`font-medium ${formData.isCertificateEligible ? 'text-green-300' : 'text-gray-400'}`}>
                    {formData.isCertificateEligible ? 'Eligible' : 'Not eligible'}
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="text-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-red-500/30">
                <p className="text-red-300 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-purple-500/20">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-200 font-medium transition-all duration-300 disabled:opacity-50 border border-gray-500/30"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-t-purple-300 border-r-purple-300 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Create Progress
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSuccess = (createdProgress) => {
    console.log('Progress created successfully:', createdProgress);
    setNotification({
      type: 'success',
      message: `Progress created successfully for user ${createdProgress.userId}`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white relative">
      <FloatingParticles />
      
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 p-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Skill Progress Management
            </h1>
            <p className="text-gray-300 mb-6">Track and manage learning progress for courses and skills</p>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
            >
              <Plus size={20} />
              Create New Progress Record
            </button>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 backdrop-blur-md border transition-all duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                : 'bg-red-500/20 border-red-500/50 text-red-300'
            }`}>
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <X size={20} />
                )}
                {notification.message}
              </div>
            </div>
          )}

          {/* Sample Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full flex items-center justify-center border border-blue-500/40">
                  <BookOpen size={20} className="text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">React Fundamentals</h3>
                  <p className="text-sm text-gray-300">User: john_doe</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span className="text-white font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full shadow-lg shadow-blue-500/30" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>6/8 modules</span>
                  <span className="text-green-300">Certificate eligible</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-full flex items-center justify-center border border-green-500/40">
                  <BookOpen size={20} className="text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Python Basics</h3>
                  <p className="text-sm text-gray-300">User: jane_smith</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span className="text-white font-medium">100%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-lg shadow-green-500/30" style={{ width: '100%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>10/10 modules</span>
                  <span className="text-green-300">Completed</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-full flex items-center justify-center border border-orange-500/40">
                  <BookOpen size={20} className="text-orange-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Data Structures</h3>
                  <p className="text-sm text-gray-300">User: mike_wilson</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span className="text-white font-medium">25%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full shadow-lg shadow-orange-500/30" style={{ width: '25%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>3/12 modules</span>
                  <span className="text-yellow-300">In progress</span>
                </div>
              </div>
            </div>

            {/* Additional sample cards with different progress states */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center border border-purple-500/40">
                  <BookOpen size={20} className="text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Machine Learning</h3>
                  <p className="text-sm text-gray-300">User: sarah_tech</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span className="text-white font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-lg shadow-purple-500/30" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>9/15 modules</span>
                  <span className="text-purple-300">Active</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-full text-xs">
                    <Award size={10} className="inline mr-1" />
                    Quick Learner
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/50 rounded-full text-xs">
                    <Award size={10} className="inline mr-1" />
                    Code Master
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-full flex items-center justify-center border border-cyan-500/40">
                  <BookOpen size={20} className="text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Web Development</h3>
                  <p className="text-sm text-gray-300">User: alex_dev</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span className="text-white font-medium">90%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full shadow-lg shadow-cyan-500/30" style={{ width: '90%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>18/20 modules</span>
                  <span className="text-green-300">Near completion</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded-full text-xs">
                    <Award size={10} className="inline mr-1" />
                    Frontend Expert
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/50 rounded-full text-xs">
                    <Award size={10} className="inline mr-1" />
                    API Master
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/50 rounded-full text-xs">
                    <Award size={10} className="inline mr-1" />
                    Full Stack
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600/30 to-green-600/30 rounded-full flex items-center justify-center border border-teal-500/40">
                  <BookOpen size={20} className="text-teal-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">DevOps Fundamentals</h3>
                  <p className="text-sm text-gray-300">User: chris_ops</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span className="text-white font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 h-3 rounded-full shadow-lg shadow-teal-500/30" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>5/11 modules</span>
                  <span className="text-yellow-300">In progress</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/50 rounded-full text-xs">
                    <Award size={10} className="inline mr-1" />
                    Docker Pro
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                <User size={24} className="text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1,234</h3>
              <p className="text-gray-300 text-sm">Active Learners</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/40">
                <BookOpen size={24} className="text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">89</h3>
              <p className="text-gray-300 text-sm">Available Courses</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/40">
                <Award size={24} className="text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">567</h3>
              <p className="text-gray-300 text-sm">Badges Earned</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/40">
                <CheckCircle size={24} className="text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">78%</h3>
              <p className="text-gray-300 text-sm">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Add Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 z-40 hover:scale-110"
      >
        <Plus size={24} className="text-white" />
      </button>

      <SkillProgressForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default App;