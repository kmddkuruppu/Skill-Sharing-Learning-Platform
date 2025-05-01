import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Search, ChevronDown, ChevronUp, RefreshCw, Tag } from "lucide-react";
import { motion } from "framer-motion";

//import Success Alert 
import SuccessAlert from "../Components/SuccessAlert";

export default function SkillManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    skillTitle: "",
    skillDescription: "",
    experienceLevel: "Beginner",
    howYouUseIt: "",
    tags: [],
    availabilityForCollaboration: false,
    // Date and time will be automatically set when saving
  });
  const [currentTag, setCurrentTag] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [successSkillName, setSuccessSkillName] = useState("");

  const API_URL = "http://localhost:8080/api/skills";

  // Experience level options
  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSkills(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch skills: " + err.message);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Success alert handling
  const showSuccessAlert = (action, skillName) => {
    setSuccessAction(action);
    setSuccessSkillName(skillName);
    setShowSuccess(true);
    
    // Hide success after 3.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3500);
  };

  // Create new skill with current date and time
  const createSkill = async () => {
    try {
      // Add current date and time to formData before submission
      const submissionData = {
        ...formData,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5)
      };
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      showNotification("Skill added successfully", "success");
      showSuccessAlert("added", formData.skillTitle);
      fetchSkills();
      resetForm();
      setIsAdding(false);
    } catch (err) {
      showNotification("Failed to create skill: " + err.message, "error");
    }
  };

  // Update skill with current date and time
  const updateSkill = async () => {
    try {
      // Update date and time to current values before submission
      const submissionData = {
        ...formData,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5)
      };
      
      const response = await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      showNotification("Skill updated successfully", "success");
      showSuccessAlert("updated", formData.skillTitle);
      fetchSkills();
      resetForm();
      setIsEditing(false);
    } catch (err) {
      showNotification("Failed to update skill: " + err.message, "error");
    }
  };

  // Delete skill
  const deleteSkill = async (id, skillTitle) => {
    if (window.confirm(`Are you sure you want to delete "${skillTitle}"?`)) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        showNotification("Skill deleted successfully", "success");
        showSuccessAlert("deleted", skillTitle);
        fetchSkills();
      } catch (err) {
        showNotification("Failed to delete skill: " + err.message, "error");
      }
    }
  };

  // Handle edit button click
  const handleEdit = (skill) => {
    setFormData({
      id: skill.id,
      name: skill.name || "",
      emailAddress: skill.emailAddress || "",
      skillTitle: skill.skillTitle || "",
      skillDescription: skill.skillDescription || "",
      experienceLevel: skill.experienceLevel || "Beginner",
      howYouUseIt: skill.howYouUseIt || "",
      tags: skill.tags || [],
      availabilityForCollaboration: skill.availabilityForCollaboration || false
      // Date and time will be updated automatically when saving
    });
    setIsEditing(true);
    setIsAdding(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Handle tag input
  const handleTagInput = (e) => {
    setCurrentTag(e.target.value);
  };

  // Add tag
  const addTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      emailAddress: "",
      skillTitle: "",
      skillDescription: "",
      experienceLevel: "Beginner",
      howYouUseIt: "",
      tags: [],
      availabilityForCollaboration: false
      // Date and time will be set when saving
    });
    setCurrentTag("");
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSkills = [...skills].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'availabilityForCollaboration') {
        return sortConfig.direction === 'ascending' 
          ? (aValue === bValue ? 0 : aValue ? -1 : 1)
          : (aValue === bValue ? 0 : aValue ? 1 : -1);
      } else {
        if (!aValue && !bValue) return 0;
        if (!aValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (!bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }
    }
    return 0;
  });

  // Filter skills based on search term
  const filteredSkills = sortedSkills.filter(skill => 
    (skill.skillTitle && skill.skillTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (skill.name && skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (skill.skillDescription && skill.skillDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (skill.tags && skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Skill Management</h1>
      
      {/* Import the SuccessAlert component */}
      <SuccessAlert 
        showSuccess={showSuccess}
        successAction={successAction}
        successCourseName={successSkillName}
        onHide={() => setShowSuccess(false)}
      />

      {/* Regular Notification */}
      {notification.show && (
        <div className={`p-4 mb-4 rounded-lg flex items-center ${
          notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {notification.type === "success" ? 
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg> : 
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          }
          <span>{notification.message}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => { setIsAdding(true); setIsEditing(false); resetForm(); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Skill</span>
          </button>
          
          <button
            onClick={fetchSkills}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <RefreshCw size={20} />
            <span className="hidden md:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">{isAdding ? "Add New Skill" : "Edit Skill"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Skill Title</label>
              <input
                type="text"
                name="skillTitle"
                value={formData.skillTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Skill Description</label>
              <textarea
                name="skillDescription"
                value={formData.skillDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">How You Use It</label>
              <textarea
                name="howYouUseIt"
                value={formData.howYouUseIt}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                    <span className="mr-1">{tag}</span>
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={currentTag}
                  onChange={handleTagInput}
                  placeholder="Add a tag"
                  className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  onClick={addTag}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="text-gray-600 italic mb-2">
                Date and time will be automatically set when saving the skill.
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center text-gray-700 mb-1">
                <input
                  type="checkbox"
                  name="availabilityForCollaboration"
                  checked={formData.availabilityForCollaboration}
                  onChange={handleChange}
                  className="mr-2"
                />
                Available for Collaboration
              </label>
            </div>
            
            <div className="md:col-span-2 flex gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isAdding ? createSkill : updateSkill}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isAdding ? "Add Skill" : "Update Skill"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(false);
                  resetForm();
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading skills...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            {error}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            {searchTerm ? "No skills match your search." : "No skills available."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th onClick={() => requestSort('name')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Name
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('skillTitle')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Skill Title
                      {sortConfig.key === 'skillTitle' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('experienceLevel')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Experience
                      {sortConfig.key === 'experienceLevel' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('availabilityForCollaboration')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Available
                      {sortConfig.key === 'availabilityForCollaboration' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSkills.map((skill) => (
                  <motion.tr 
                    key={skill.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {skill.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {skill.skillTitle}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {skill.experienceLevel}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {skill.availabilityForCollaboration ? 
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Yes</span> : 
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">No</span>
                      }
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      <div className="flex flex-wrap gap-1">
                        {skill.tags && skill.tags.map((tag, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 text-right">
                      <div className="inline-flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(skill)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit skill"
                        >
                          <Edit size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteSkill(skill.id, skill.skillTitle)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete skill"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}