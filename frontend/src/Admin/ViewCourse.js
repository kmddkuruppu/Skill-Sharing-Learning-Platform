import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Search, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import SuccessAlert from "../Components/SuccessAlert";

export default function LearningManagement() {
  const [learnings, setLearnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    courseFee: 0,
    description: "",
    duration: "",
    jobOpportunities: "",
    courseContent: []
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [successCourseName, setSuccessCourseName] = useState("");
  const [moduleInput, setModuleInput] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);

  const API_URL = "http://localhost:8080/api/learnings";

  // Fetch all learnings
  const fetchLearnings = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLearnings(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch courses: " + err.message);
      setLearnings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearnings();
  }, []);

  // Success alert handling
  const showSuccessAlert = (action, courseName) => {
    setSuccessAction(action);
    setSuccessCourseName(courseName);
    setShowSuccess(true);
    
    // Hide success after 3.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3500);
  };

  // Create new learning
  const createLearning = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const message = await response.text();
      showNotification(message, "success");
      showSuccessAlert("added", formData.courseName);
      fetchLearnings();
      resetForm();
      setIsAdding(false);
    } catch (err) {
      showNotification("Failed to create course: " + err.message, "error");
    }
  };

  // Update learning
  const updateLearning = async () => {
    try {
      const response = await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const message = await response.text();
      showNotification(message, "success");
      showSuccessAlert("updated", formData.courseName);
      fetchLearnings();
      resetForm();
      setIsEditing(false);
    } catch (err) {
      showNotification("Failed to update course: " + err.message, "error");
    }
  };

  // Delete learning
  const deleteLearning = async (id, courseName) => {
    if (window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const message = await response.text();
        showNotification(message, "success");
        showSuccessAlert("deleted", courseName);
        fetchLearnings();
      } catch (err) {
        showNotification("Failed to delete course: " + err.message, "error");
      }
    }
  };

  // Handle edit button click
  const handleEdit = (learning) => {
    setFormData({
      id: learning.id,
      courseId: learning.courseId,
      courseName: learning.courseName,
      courseFee: learning.courseFee,
      description: learning.description,
      duration: learning.duration,
      jobOpportunities: learning.jobOpportunities,
      courseContent: learning.courseContent || []
    });
    setIsEditing(true);
    setIsAdding(false);
  };

  // Handle view details
  const toggleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "courseFee" ? parseFloat(value) || 0 : value
    });
  };

  // Add new module to course content
  const addModule = () => {
    if (!moduleInput.trim()) return;
    
    setFormData({
      ...formData,
      courseContent: [
        ...formData.courseContent || [],
        { module: moduleInput, topics: [] }
      ]
    });
    setModuleInput("");
  };

  // Add new topic to a module
  const addTopic = () => {
    if (selectedModuleIndex === null || !topicInput.trim()) return;
    
    const updatedContent = [...formData.courseContent];
    updatedContent[selectedModuleIndex].topics = [
      ...updatedContent[selectedModuleIndex].topics || [],
      topicInput
    ];
    
    setFormData({
      ...formData,
      courseContent: updatedContent
    });
    setTopicInput("");
  };

  // Remove module
  const removeModule = (indexToRemove) => {
    setFormData({
      ...formData,
      courseContent: formData.courseContent.filter((_, index) => index !== indexToRemove)
    });
    
    if (selectedModuleIndex === indexToRemove) {
      setSelectedModuleIndex(null);
    } else if (selectedModuleIndex > indexToRemove) {
      setSelectedModuleIndex(selectedModuleIndex - 1);
    }
  };

  // Remove topic
  const removeTopic = (moduleIndex, topicIndex) => {
    const updatedContent = [...formData.courseContent];
    updatedContent[moduleIndex].topics = updatedContent[moduleIndex].topics.filter((_, index) => index !== topicIndex);
    
    setFormData({
      ...formData,
      courseContent: updatedContent
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      courseId: "",
      courseName: "",
      courseFee: 0,
      description: "",
      duration: "",
      jobOpportunities: "",
      courseContent: []
    });
    setModuleInput("");
    setTopicInput("");
    setSelectedModuleIndex(null);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedLearnings = [...learnings].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'courseFee') {
        return sortConfig.direction === 'ascending' 
          ? aValue - bValue 
          : bValue - aValue;
      } else {
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

  // Filter learnings based on search term
  const filteredLearnings = sortedLearnings.filter(learning => 
    learning.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learning.courseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learning.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (learning.jobOpportunities && learning.jobOpportunities.toLowerCase().includes(searchTerm.toLowerCase()))
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

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto p-4 max-w-6xl relative">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Learning Plan Management</h1>
        
        {/* Import the SuccessAlert component */}
        <SuccessAlert 
          showSuccess={showSuccess}
          successAction={successAction}
          successCourseName={successCourseName}
          onHide={() => setShowSuccess(false)}
        />

        {/* Regular Notification */}
        {notification.show && (
          <div className={`p-4 mb-4 rounded-lg flex items-center ${
            notification.type === "success" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
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
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => { setIsAdding(true); setIsEditing(false); resetForm(); }}
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Plus size={20} />
              <span>Add Course</span>
            </button>
            
            <button
              onClick={fetchLearnings}
              className="flex items-center gap-2 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
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
            className="mb-8 p-6 bg-gray-900 rounded-lg shadow-md border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-100">{isAdding ? "Add New Course" : "Edit Course"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Course ID</label>
                <input
                  type="text"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Course Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Course Fee</label>
                <input
                  type="number"
                  name="courseFee"
                  value={formData.courseFee}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                  rows="3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1">Job Opportunities</label>
                <textarea
                  name="jobOpportunities"
                  value={formData.jobOpportunities}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                  rows="3"
                />
              </div>
              
              {/* Course Content Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-3 text-gray-200">Course Content</h3>
                
                {/* Add Module Section */}
                <div className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Enter module name"
                      value={moduleInput}
                      onChange={(e) => setModuleInput(e.target.value)}
                      className="flex-1 p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                    />
                    <button
                      onClick={addModule}
                      className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800"
                    >
                      Add Module
                    </button>
                  </div>
                  
                  {/* List of Modules */}
                  {formData.courseContent && formData.courseContent.length > 0 ? (
                    <div className="space-y-3">
                      {formData.courseContent.map((content, moduleIndex) => (
                        <div key={moduleIndex} className="p-3 bg-gray-900 rounded border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium text-gray-200">Module: {content.module}</div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedModuleIndex(moduleIndex)}
                                className={`px-3 py-1 text-sm rounded ${
                                  selectedModuleIndex === moduleIndex
                                    ? "bg-blue-700 text-white"
                                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                }`}
                              >
                                Add Topics
                              </button>
                              <button
                                onClick={() => removeModule(moduleIndex)}
                                className="px-3 py-1 text-sm bg-red-900 text-red-200 rounded hover:bg-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          
                          {/* Topics List */}
                          {content.topics && content.topics.length > 0 && (
                            <div className="ml-4 mt-2">
                              <p className="text-sm text-gray-400 mb-1">Topics:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {content.topics.map((topic, topicIndex) => (
                                  <li key={topicIndex} className="flex items-center justify-between text-sm text-gray-300">
                                    <span>{topic}</span>
                                    <button
                                      onClick={() => removeTopic(moduleIndex, topicIndex)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">No course content added yet.</p>
                  )}
                </div>
                
                {/* Add Topics Section */}
                {selectedModuleIndex !== null && (
                  <div className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <h4 className="text-md font-medium mb-2 text-gray-200">
                      Adding topics to: {formData.courseContent[selectedModuleIndex].module}
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter topic"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        className="flex-1 p-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                      />
                      <button
                        onClick={addTopic}
                        className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800"
                      >
                        Add Topic
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 flex gap-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isAdding ? createLearning : updateLearning}
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {isAdding ? "Add Course" : "Update Course"}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="bg-gray-700 text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table */}
        <div className="bg-gray-900 rounded-lg shadow overflow-hidden border border-gray-800">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400">
              {error}
            </div>
          ) : filteredLearnings.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              {searchTerm ? "No courses match your search." : "No courses available."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800">
                  <tr>
                    <th onClick={() => requestSort('courseId')} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700">
                      <div className="flex items-center">
                        Course ID
                        {sortConfig.key === 'courseId' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => requestSort('courseName')} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700">
                      <div className="flex items-center">
                        Course Name
                        {sortConfig.key === 'courseName' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => requestSort('courseFee')} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700">
                      <div className="flex items-center">
                        Fee
                        {sortConfig.key === 'courseFee' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th onClick={() => requestSort('duration')} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700">
                      <div className="flex items-center">
                        Duration
                        {sortConfig.key === 'duration' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Overview
                      </div>
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {filteredLearnings.map((learning) => (
                    <>
                      <motion.tr 
                        key={learning.id} 
                        className="hover:bg-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-200">
                          {learning.courseId}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-200">
                          {learning.courseName}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-200">
                          LKR.{learning.courseFee?.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-200">
                          {learning.duration}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-200">
                          <button
                            onClick={() => toggleDetails(learning.id)}
                            className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs hover:bg-blue-800"
                          >
                            {showDetails === learning.id ? "Hide Details" : "View Details"}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-200 text-right">
                          <div className="inline-flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(learning)}
                              className="text-blue-400 hover:text-blue-300"
                              title="Edit course"
                            >
                              <Edit size={20} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteLearning(learning.id, learning.courseName)}
                              className="text-red-400 hover:text-red-300"
                              title="Delete course"
                            >
                              <Trash2 size={20} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                      
                      {/* Expanded Details Row */}
                      {showDetails === learning.id && (
                        <tr className="bg-gray-900">
                          <td colSpan="6" className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2 text-gray-100">Description:</h4>
                                <p className="text-sm text-gray-300 whitespace-pre-line mb-4">
                                  {learning.description || "No description available."}
                                </p>
                                
                                <h4 className="font-medium mb-2 text-gray-100">Job Opportunities:</h4>
                                <p className="text-sm text-gray-300 whitespace-pre-line">
                                  {learning.jobOpportunities || "No job opportunities listed."}
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2 text-gray-100">Course Content:</h4>
                                {learning.courseContent && learning.courseContent.length > 0 ? (
                                  <div className="space-y-3">
                                    {learning.courseContent.map((content, index) => (
                                      <div key={index} className="border border-gray-700 rounded p-3 bg-gray-800">
                                        <h5 className="font-medium text-blue-400">{content.module}</h5>
                                        {content.topics && content.topics.length > 0 ? (
                                          <ul className="list-disc list-inside mt-1 ml-2">
                                            {content.topics.map((topic, tIndex) => (
                                              <li key={tIndex} className="text-sm text-gray-300">{topic}</li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <p className="text-sm text-gray-400 italic mt-1">No topics listed.</p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-400 italic">No course content available.</p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}