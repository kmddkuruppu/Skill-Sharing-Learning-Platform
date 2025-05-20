import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Filter,
  BarChart2,
  Search,
  Trash2,
  RefreshCw,
  X,
  Edit2,
  CheckCircle,
  User,
  FileText,
  List
} from "lucide-react";

const SkillProgressTracker = () => {
  // Navigation
  const navigate = useNavigate();
  
  // State
  const [progressRecords, setProgressRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("All");
  const [users, setUsers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAction, setSuccessAction] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    courseId: "",
    completedModules: [],
    totalModules: 0,
    progressPercentage: 0,
    isCertificateEligible: false,
    badgesEarned: [],
    feedback: ""
  });

  // Fetch progress data from API
  const fetchProgress = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/progress');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (Array.isArray(result)) {
        setProgressRecords(result);
        setFilteredRecords(result);
        
        // Extract unique users for filter
        const uniqueUsers = [...new Set(result.map(record => record.userId))];
        setUsers(uniqueUsers);
      } else {
        throw new Error('Failed to fetch progress data');
      }
    } catch (err) {
      console.error('Error fetching progress data:', err);
      setError(err.message);
      setProgressRecords([]);
      setFilteredRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchProgress();
  }, []);

  // Filter records based on search term and user selection
  useEffect(() => {
    let result = progressRecords;
    
    if (searchTerm) {
      result = result.filter(record => 
        record.courseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.feedback?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedUser && selectedUser !== "All") {
      result = result.filter(record => record.userId === selectedUser);
    }
    
    setFilteredRecords(result);
  }, [searchTerm, selectedUser, progressRecords]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'progressPercentage') {
      // Ensure progressPercentage is a number between 0-100
      const numValue = Math.min(Math.max(parseFloat(value) || 0, 0), 100);
      setFormData({
        ...formData,
        [name]: numValue
      });
    } else if (name === 'totalModules') {
      // Ensure totalModules is a positive number
      const numValue = Math.max(parseInt(value) || 0, 0);
      setFormData({
        ...formData,
        [name]: numValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle adding a completed module
  const handleAddModule = () => {
    const newModule = document.getElementById('newModule').value.trim();
    
    if (newModule && !formData.completedModules.includes(newModule)) {
      setFormData({
        ...formData,
        completedModules: [...formData.completedModules, newModule]
      });
      document.getElementById('newModule').value = '';
    }
  };

  // Handle removing a completed module
  const handleRemoveModule = (index) => {
    const updatedModules = [...formData.completedModules];
    updatedModules.splice(index, 1);
    
    setFormData({
      ...formData,
      completedModules: updatedModules
    });
  };

  // Handle adding a badge
  const handleAddBadge = () => {
    const newBadge = document.getElementById('newBadge').value.trim();
    
    if (newBadge && !formData.badgesEarned.includes(newBadge)) {
      setFormData({
        ...formData,
        badgesEarned: [...formData.badgesEarned, newBadge]
      });
      document.getElementById('newBadge').value = '';
    }
  };

  // Handle removing a badge
  const handleRemoveBadge = (index) => {
    const updatedBadges = [...formData.badgesEarned];
    updatedBadges.splice(index, 1);
    
    setFormData({
      ...formData,
      badgesEarned: updatedBadges
    });
  };

  // Open edit modal
  const openEditModal = (record) => {
    setCurrentRecord(record);
    setFormData({
      id: record.id,
      userId: record.userId,
      courseId: record.courseId,
      completedModules: record.completedModules || [],
      totalModules: record.totalModules || 0,
      progressPercentage: record.progressPercentage || 0,
      isCertificateEligible: record.isCertificateEligible || false,
      badgesEarned: record.badgesEarned || [],
      feedback: record.feedback || ""
    });
    setIsModalOpen(true);
  };

  // Handle form submission (update progress)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/api/progress/${currentRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      // Show success message
      setSuccessAction("updated");
      setSuccessInfo(`Progress for ${formData.courseId}`);
      setShowSuccess(true);
      
      // Refresh data
      fetchProgress();
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Error updating progress:', err);
      alert(`Failed to update progress: ${err.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle progress deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this progress record?")) {
      try {
        // Find the record being deleted for success message
        const recordToDelete = progressRecords.find(r => r.id === id);
        
        const response = await fetch(`http://localhost:8080/api/progress/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        // Show success message
        if (recordToDelete) {
          setSuccessAction("deleted");
          setSuccessInfo(`Progress for ${recordToDelete.courseId}`);
          setShowSuccess(true);
        }
        
        // Refresh data
        fetchProgress();
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        
      } catch (err) {
        console.error('Error deleting progress:', err);
        alert(`Failed to delete progress: ${err.message}`);
      }
    }
  };

  // Success Alert Component
  const SuccessAlert = ({ showSuccess, successAction, successInfo, onHide }) => {
    if (!showSuccess) return null;
    
    return (
      <div className="fixed top-6 right-6 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
        <CheckCircle className="mr-2" size={20} />
        <p>Successfully {successAction} {successInfo}</p>
        <button onClick={onHide} className="ml-4 text-white">
          <X size={16} />
        </button>
      </div>
    );
  };

  // Progress Item Component
  const ProgressItem = ({ record }) => {
    // Hover state
    const [isHovered, setIsHovered] = useState(false);
    
    // Calculate progress as percentage
    const progressPercent = record.progressPercentage || 0;
    
    return (
      <div 
        className={`flex flex-col md:flex-row md:items-center justify-between p-4 mb-3 rounded-xl transition-all duration-300 ${
          isHovered ? 'bg-gray-800/60' : 'bg-gray-900/80'
        } backdrop-blur-sm border border-gray-800`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center mb-3 md:mb-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500/20 to-blue-600/10 flex items-center justify-center mr-3">
            <BarChart2 className="text-green-400" size={18} />
          </div>
          <div>
            <h3 className="font-medium text-gray-200">Course ID: {record.courseId}</h3>
            <div className="flex items-center mt-1">
              <span className="flex items-center text-sm text-gray-400 mr-3">
                <User size={14} className="mr-1" /> {record.userId}
              </span>
              {record.isCertificateEligible && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                  Certificate Eligible
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
          {/* Progress Bar */}
          <div className="mr-6 flex items-center w-40">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-300 whitespace-nowrap">{progressPercent}%</span>
          </div>
          
          {/* Badges Count */}
          <div className="flex items-center mr-6">
            <Award size={16} className="text-yellow-400 mr-1" />
            <span className="text-gray-300">{record.badgesEarned?.length || 0}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={() => openEditModal(record)}
              className="group p-2 rounded-lg bg-blue-500/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-300 flex items-center"
            >
              <Edit2 size={16} className="mr-1" />
              <span className={`${isHovered ? 'opacity-100 max-w-24' : 'opacity-0 max-w-0'} overflow-hidden transition-all duration-300`}>
                Edit
              </span>
            </button>
            
            <button 
              onClick={() => handleDelete(record.id)}
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
      {/* Success Alert */}
      <SuccessAlert 
        showSuccess={showSuccess}
        successAction={successAction}
        successInfo={successInfo}
        onHide={() => setShowSuccess(false)}
      />
      
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="absolute top-0 right-0 text-green-500/10 text-9xl font-bold select-none z-0">
            PROGRESS
          </div>
          
          <div className="text-sm font-medium text-green-400 mb-2 tracking-widest text-center">
            SKILL DEVELOPMENT
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Progress Tracker
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-8 rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-green-400">Total Records</h3>
                <p className="text-3xl font-bold">{filteredRecords.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <BarChart2 className="text-green-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-green-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-green-400">Certificate Eligible</h3>
                <p className="text-3xl font-bold">
                  {filteredRecords.filter(record => record.isCertificateEligible).length}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Award className="text-green-400" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-blue-600/10 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-green-400">Avg. Progress</h3>
                <p className="text-3xl font-bold">
                  {filteredRecords.length > 0 
                    ? Math.round(filteredRecords.reduce((sum, record) => sum + (record.progressPercentage || 0), 0) / filteredRecords.length)
                    : 0}%
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Clock className="text-green-400" size={20} />
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
                placeholder="Search records..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/80 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="bg-transparent text-gray-300 appearance-none focus:outline-none cursor-pointer pr-8"
                  >
                    <option value="All">All Users</option>
                    {users.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="text-gray-400 absolute right-3" />
                </div>
              </div>
              
              <button 
                onClick={fetchProgress}
                className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-2 border border-gray-700"
              >
                <RefreshCw size={20} className={`text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Records List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Progress Records</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <RefreshCw size={32} className="text-green-400 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <X size={32} className="mx-auto mb-2 opacity-70" />
              <p>Error loading progress data: {error}</p>
              <button 
                onClick={fetchProgress}
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="p-12 text-center text-gray-400 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl">
              <FileText size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg">No progress records found</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredRecords.map((record) => (
                <ProgressItem key={record.id} record={record} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Progress Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-4xl shadow-2xl shadow-green-500/10 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-green-400 mb-6">
              Edit Progress Record
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">User ID</label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Course ID</label>
                  <input
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Total Modules</label>
                  <input
                    type="number"
                    name="totalModules"
                    value={formData.totalModules}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Progress (%)</label>
                  <input
                    type="number"
                    name="progressPercentage"
                    value={formData.progressPercentage}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    max="100"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer mt-6">
                    <input
                      type="checkbox"
                      name="isCertificateEligible"
                      checked={formData.isCertificateEligible}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`h-6 w-6 rounded border ${formData.isCertificateEligible ? 'bg-green-500 border-green-500' : 'bg-gray-800 border-gray-600'} flex items-center justify-center mr-3`}>
                      {formData.isCertificateEligible && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="text-gray-300">Certificate Eligible</span>
                  </label>
                </div>
              </div>
              
              {/* Completed Modules */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-400 text-sm font-medium">Completed Modules</label>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-4">
                  <div className="flex mb-3">
                    <input
                      type="text"
                      id="newModule"
                      placeholder="Add a completed module"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddModule}
                      className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.completedModules.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.completedModules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle size={16} className="text-green-400 mr-2" />
                            <span className="text-gray-200">{module}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3 text-gray-500">
                      No completed modules added yet
                    </div>
                  )}
                </div>
              </div>
              
              {/* Badges Earned */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-400 text-sm font-medium">Badges Earned</label>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-4">
                  <div className="flex mb-3">
                    <input
                      type="text"
                      id="newBadge"
                      placeholder="Add a badge"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddBadge}
                      className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.badgesEarned.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.badgesEarned.map((badge, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-lg">
                          <div className="flex items-center">
                            <Award size={16} className="text-yellow-400 mr-2" />
                            <span className="text-gray-200">{badge}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBadge(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3 text-gray-500">
                      No badges added yet
                    </div>
                  )}
                </div>
              </div>
              
              {/* Feedback */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 min-h-24"
                  placeholder="Add feedback about progress..."
                ></textarea>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg flex items-center"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
                >
                  <Check size={16} className="mr-2" />
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

export default SkillProgressTracker;