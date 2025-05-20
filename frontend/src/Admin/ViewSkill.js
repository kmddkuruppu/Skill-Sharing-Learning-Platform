import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen,
  DollarSign, 
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
  List,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  Mail
} from "lucide-react";
import SuccessAlert from "../Components/SuccessAlert";

const SkillDashboard = () => {
  // Add navigation
  const navigate = useNavigate();
  
  // State
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    emailAddress: "",
    skillTitle: "",
    skillDescription: "",
    experienceLevel: "",
    howYouUseIt: "",
    tags: [],
    availabilityForCollaboration: false,
    date: "",
    time: ""
  });

  // Success alert state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [successSkillName, setSuccessSkillName] = useState("");

  // Get unique experience levels from skills
  const getExperienceLevels = (skillsData) => {
    if (!skillsData || skillsData.length === 0) return [];
    const uniqueExperiences = [...new Set(skillsData.map(skill => skill.experienceLevel))];
    return uniqueExperiences;
  };
  
  // Initialize experience levels
  const [experienceLevels, setExperienceLevels] = useState([]);

  // Fetch skills data from API
  const fetchSkills = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/skills');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (Array.isArray(result)) {
        setSkills(result);
        setFilteredSkills(result);
        setExperienceLevels(getExperienceLevels(result));
      } else {
        throw new Error('Failed to fetch skills data');
      }
    } catch (err) {
      console.error('Error fetching skills data:', err);
      setError(err.message);
      setSkills([]);
      setFilteredSkills([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchSkills();
  }, []);

  // Filter skills based on search term and experience level
  useEffect(() => {
    let result = skills;
    
    if (searchTerm) {
      result = result.filter(skill => 
        skill.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.skillTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.skillDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedExperience && selectedExperience !== "All") {
      result = result.filter(skill => skill.experienceLevel === selectedExperience);
    }
    
    setFilteredSkills(result);
  }, [searchTerm, selectedExperience, skills]);

  // Handle form input changes for Edit Skill
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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
  };

  // Handle tags input change
  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setFormData({
      ...formData,
      tags: tagsArray
    });
  };

  // Navigate to Add Skill page
  const goToAddSkill = () => {
    navigate('/AddSkill');
  };

  // Open modal for editing skill
  const openEditModal = (skill) => {
    setCurrentSkill(skill);
    
    // Format the date and time for form inputs
    const formattedDate = skill.date ? skill.date : "";
    const formattedTime = skill.time ? skill.time : "";
    
    setFormData({
      id: skill.id,
      name: skill.name || "",
      emailAddress: skill.emailAddress || "",
      skillTitle: skill.skillTitle || "",
      skillDescription: skill.skillDescription || "",
      experienceLevel: skill.experienceLevel || "",
      howYouUseIt: skill.howYouUseIt || "",
      tags: skill.tags || [],
      availabilityForCollaboration: skill.availabilityForCollaboration || false,
      date: formattedDate,
      time: formattedTime
    });
    
    setIsModalOpen(true);
  };

  // Show success alert
  const triggerSuccessAlert = (action, name) => {
    setSuccessAction(action);
    setSuccessSkillName(name);
    setShowSuccess(true);
    
    // Auto-hide the success alert after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Handle form submission (update skill)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Prepare submission data
      const submissionData = {
        ...formData
      };
      
      let url = `http://localhost:8080/api/skills/${currentSkill.id}`;
      let method = 'PUT';
      
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
      triggerSuccessAlert("updated", formData.skillTitle);
      
      // Refresh skills after successful operation
      fetchSkills();
      
    } catch (err) {
      console.error('Error saving skill:', err);
      alert(`Failed to save skill: ${err.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle skill deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        // Find the skill being deleted to display in success message
        const skillToDelete = skills.find(s => s.id === id);
        
        const response = await fetch(`http://localhost:8080/api/skills/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        // Show success alert
        if (skillToDelete) {
          triggerSuccessAlert("deleted", skillToDelete.skillTitle);
        }
        
        // Refresh skills after successful deletion
        fetchSkills();
        
      } catch (err) {
        console.error('Error deleting skill:', err);
        alert(`Failed to delete skill: ${err.message}`);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Handle hiding success alert
  const handleHideSuccess = () => {
    setShowSuccess(false);
  };

  // Enhanced Skill Item Component
  const SkillItem = ({ skill }) => {
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
            <h3 className="font-medium text-gray-200">{skill.skillTitle}</h3>
            <div className="flex items-center mt-1">
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400 mr-2">
                {skill.experienceLevel}
              </span>
              <span className="text-sm text-gray-400 flex items-center">
                by {skill.name}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
          <div className="flex items-center mr-4">
            <div className="mr-6 md:mr-10">
              <p className="text-xs text-gray-400">Available for Collaboration</p>
              <p className="text-gray-300 flex items-center">
                {skill.availabilityForCollaboration ? 
                  <CheckCircle className="text-green-400 mr-1" size={16} /> : 
                  <XCircle className="text-red-400 mr-1" size={16} />}
                {skill.availabilityForCollaboration ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Date Added</p>
              <p className="text-gray-300">{formatDate(skill.date)}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={() => openEditModal(skill)}
              className="group p-2 rounded-lg bg-blue-500/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-300 flex items-center"
            >
              <Edit2 size={16} className="mr-1" />
              <span className={`${isHovered ? 'opacity-100 max-w-24' : 'opacity-0 max-w-0'} overflow-hidden transition-all duration-300`}>
                Edit
              </span>
            </button>
            
            <button 
              onClick={() => handleDelete(skill.id)}
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
        successCourseName={successSkillName}
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
            SKILLS
          </div>
          
          <div className="text-sm font-medium text-blue-400 mb-2 tracking-widest text-center">
            SKILL SHARING PLATFORM
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Skills Dashboard
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
                <h3 className="text-lg font-medium text-blue-400">Total Skills</h3>
                <p className="text-3xl font-bold">{filteredSkills.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="text-blue-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-blue-400">Available for Collaboration</h3>
                <p className="text-3xl font-bold">{filteredSkills.filter(skill => skill.availabilityForCollaboration).length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <CheckCircle className="text-blue-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-blue-400">Experience Levels</h3>
                <p className="text-3xl font-bold">{experienceLevels.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Layers className="text-blue-400" size={20} />
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
                placeholder="Search skills..." 
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
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="bg-transparent text-gray-300 appearance-none focus:outline-none cursor-pointer pr-8"
                  >
                    <option value="All">All Experience Levels</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="text-gray-400 absolute right-3" />
                </div>
              </div>
              
              <button 
                onClick={fetchSkills}
                className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-2 border border-gray-700"
              >
                <RefreshCw size={20} className={`text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              
              <button 
                onClick={goToAddSkill}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg px-4 py-2 text-white font-medium shadow-lg shadow-blue-500/20"
              >
                <Plus size={18} />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Your Skills</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <RefreshCw size={32} className="text-blue-400 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <X size={32} className="mx-auto mb-2 opacity-70" />
              <p>Error loading skills data: {error}</p>
              <button 
                onClick={fetchSkills}
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <FileText size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg">No skills found</p>
              <button 
                onClick={goToAddSkill}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium"
              >
                Add Your First Skill
              </button>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredSkills.map((skill) => (
                <SkillItem key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Skill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-4xl shadow-2xl shadow-blue-500/10 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">
              Edit Skill
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Skill Title</label>
                  <input
                    type="text"
                    name="skillTitle"
                    value={formData.skillTitle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Skill Description</label>
                <textarea
                  name="skillDescription"
                  value={formData.skillDescription}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                  placeholder="Describe your skill"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">How You Use It</label>
                <textarea
                  name="howYouUseIt"
                  value={formData.howYouUseIt}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain how you use this skill"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags.join(', ')}
                    onChange={handleTagsChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. programming, design, communication"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="availabilityForCollaboration"
                    name="availabilityForCollaboration"
                    checked={formData.availabilityForCollaboration}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="availabilityForCollaboration" className="ml-2 block text-gray-300">
                    Available for Collaboration
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDashboard;