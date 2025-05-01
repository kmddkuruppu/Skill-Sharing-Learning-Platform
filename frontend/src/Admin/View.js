import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Search, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LearningManagement() {
  const [learnings, setLearnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    courseFee: 0,
    description: "",
    duration: "",
    jobOpportunities: ""
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [successCourseName, setSuccessCourseName] = useState("");

  const API_URL = "http://localhost:8080/api/learnings";

  const particleColors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
    "from-cyan-400 to-cyan-600"
  ];

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
      jobOpportunities: learning.jobOpportunities
    });
    setIsEditing(true);
    setIsAdding(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "courseFee" ? parseFloat(value) || 0 : value
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
      jobOpportunities: ""
    });
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
    learning.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learning.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learning.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Success confetti animation component
  const SuccessConfetti = () => (
    <>
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-md bg-gradient-to-r ${
            particleColors[Math.floor(Math.random() * particleColors.length)]
          }`}
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1, 0.8]
          }}
          transition={{
            duration: Math.random() * 3 + 1.5,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
        />
      ))}
    </>
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Learning Plan Management</h1>
      
      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative z-10 w-full max-w-md px-6 py-10 flex flex-col items-center bg-gray-900/90 shadow-xl rounded-xl"
            >
              <SuccessConfetti />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-5 mb-8 shadow-xl shadow-emerald-600/30"
              >
                <svg 
                  className="w-14 h-14 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </svg>
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold mb-2 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Success!
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-gray-300/90 text-lg mb-6">
                  Course <span className="text-green-400 font-semibold">"{successCourseName}"</span> has been {successAction} successfully!
                </p>
                <p className="text-indigo-300/90">
                  Updating learning plan...
                </p>
              </motion.div>
              
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 2.5 }}
                className="w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-green-500 rounded-full mt-8"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            placeholder="Search courses..."
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
            <span>Add Course</span>
          </button>
          
          <button
            onClick={fetchLearnings}
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
          <h2 className="text-xl font-semibold mb-4">{isAdding ? "Add New Course" : "Edit Course"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Course ID</label>
              <input
                type="text"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Course Fee</label>
              <input
                type="number"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Job Opportunities</label>
              <textarea
                name="jobOpportunities"
                value={formData.jobOpportunities}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            
            <div className="md:col-span-2 flex gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isAdding ? createLearning : updateLearning}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            {error}
          </div>
        ) : filteredLearnings.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            {searchTerm ? "No courses match your search." : "No courses available."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th onClick={() => requestSort('courseId')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Course ID
                      {sortConfig.key === 'courseId' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('courseName')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Course Name
                      {sortConfig.key === 'courseName' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('courseFee')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Fee
                      {sortConfig.key === 'courseFee' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('duration')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Duration
                      {sortConfig.key === 'duration' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => requestSort('jobOpportunities')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center">
                      Job Opportunities
                      {sortConfig.key === 'jobOpportunities' && (
                        sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLearnings.map((learning) => (
                  <motion.tr 
                    key={learning.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {learning.courseId}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {learning.courseName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      LKR.{learning.courseFee.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {learning.duration}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      <div className="max-w-xs overflow-hidden" title={learning.jobOpportunities}>
                        {truncateText(learning.jobOpportunities, 100)}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 text-right">
                      <div className="inline-flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(learning)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit course"
                        >
                          <Edit size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteLearning(learning.id, learning.courseName)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete course"
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