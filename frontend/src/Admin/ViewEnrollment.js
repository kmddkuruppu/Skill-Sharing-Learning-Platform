import { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, Trash2, Edit, Eye, 
  ChevronLeft, ChevronRight, MoreHorizontal, AlertCircle,
  CheckCircle, PieChart, BookOpen, Calendar, ArrowUpRight,
  Loader2, X, RefreshCw, User, Mail, Phone, CreditCard
} from 'lucide-react';

// API URL - adjust to match your environment
const API_BASE_URL = 'http://localhost:8080';

export default function EnrollmentAdminDashboard() {
  // State variables
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'ascending' });
  const [filterOptions, setFilterOptions] = useState({
    learningMode: 'all',
    courseId: 'all'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrollmentStats, setEnrollmentStats] = useState({
    total: 0,
    onlineCount: 0,
    physicalCount: 0,
    hybridCount: 0
  });

  // Fetch enrollments data
  useEffect(() => {
    const fetchEnrollments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/enrollments`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch enrollments: ${response.status}`);
        }
        
        const data = await response.json();
        setEnrollments(data);
        setFilteredEnrollments(data);
        
        // Extract unique courses
        const courses = [...new Set(data.map(item => item.courseId))];
        setAvailableCourses(courses.map(id => {
          const course = data.find(item => item.courseId === id);
          return {
            id,
            name: course ? course.courseName : id
          };
        }));
        
        // Calculate statistics
        setEnrollmentStats({
          total: data.length,
          onlineCount: data.filter(item => item.learningMode === 'online').length,
          physicalCount: data.filter(item => item.learningMode === 'physical').length,
          hybridCount: data.filter(item => item.learningMode === 'hybrid').length
        });
        
      } catch (err) {
        setError(err.message);
        console.error("Error fetching enrollments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnrollments();
  }, [refreshKey]);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...enrollments];
    
    // Apply filters
    if (filterOptions.learningMode !== 'all') {
      result = result.filter(item => item.learningMode === filterOptions.learningMode);
    }
    
    if (filterOptions.courseId !== 'all') {
      result = result.filter(item => item.courseId === filterOptions.courseId);
    }
    
    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(item => 
        item.fullName.toLowerCase().includes(searchLower) ||
        item.emailAddress.toLowerCase().includes(searchLower) ||
        item.nicNumber.toLowerCase().includes(searchLower) ||
        item.phoneNumber.toLowerCase().includes(searchLower) ||
        item.courseName.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredEnrollments(result);
    setCurrentPage(1);
  }, [enrollments, search, filterOptions, sortConfig]);
  
  // Handle sort change
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Handle delete enrollment
  const deleteEnrollment = async () => {
    if (!deleteId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/enrollments/${deleteId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete enrollment: ${response.status}`);
      }
      
      // Refresh data
      setRefreshKey(prevKey => prevKey + 1);
      setShowDeleteModal(false);
      setDeleteId(null);
      
    } catch (err) {
      console.error("Error deleting enrollment:", err);
      setError(err.message);
    }
  };
  
  // Handle view enrollment detail
  const viewEnrollmentDetail = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowViewModal(true);
  };
  
  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'NIC', 'Phone', 'Course Name', 'Learning Mode'];
    const dataToExport = filteredEnrollments.map(item => [
      item.fullName,
      item.emailAddress,
      item.nicNumber,
      item.phoneNumber,
      item.courseName,
      item.learningMode
    ]);
    
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `enrollments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get learning mode badge style
  const getLearningModeBadge = (mode) => {
    switch(mode) {
      case 'online':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'physical':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'hybrid':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnrollments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Refresh data
  const refreshData = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                <Users size={24} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Enrollment Management</h1>
                <p className="text-gray-400">Manage and track all course enrollments</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={refreshData}
                className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              
              <button 
                onClick={exportToCSV}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Download size={16} className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Enrollments */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Total Enrollments</p>
                  <h3 className="text-2xl font-bold mt-1">{enrollmentStats.total}</h3>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users size={20} className="text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-400">
                <ArrowUpRight size={14} className="mr-1" />
                <span>View all enrollments</span>
              </div>
            </div>
            
            {/* Online Students */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Online Students</p>
                  <h3 className="text-2xl font-bold mt-1">{enrollmentStats.onlineCount}</h3>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BookOpen size={20} className="text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-blue-400">
                <span>{Math.round((enrollmentStats.onlineCount / enrollmentStats.total) * 100)}% of total</span>
              </div>
            </div>
            
            {/* Physical Students */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Physical Students</p>
                  <h3 className="text-2xl font-bold mt-1">{enrollmentStats.physicalCount}</h3>
                </div>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Calendar size={20} className="text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-400">
                <span>{Math.round((enrollmentStats.physicalCount / enrollmentStats.total) * 100)}% of total</span>
              </div>
            </div>
            
            {/* Hybrid Students */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Hybrid Students</p>
                  <h3 className="text-2xl font-bold mt-1">{enrollmentStats.hybridCount}</h3>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <PieChart size={20} className="text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-purple-400">
                <span>{Math.round((enrollmentStats.hybridCount / enrollmentStats.total) * 100)}% of total</span>
              </div>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Search by name, email, NIC..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Learning Mode Filter */}
            <div className="w-full lg:w-48">
              <select
                className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={filterOptions.learningMode}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, learningMode: e.target.value }))}
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            {/* Course Filter */}
            <div className="w-full lg:w-64">
              <select
                className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={filterOptions.courseId}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, courseId: e.target.value }))}
              >
                <option value="all">All Courses</option>
                {availableCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main>
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 flex items-center">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Error Loading Data</h4>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 size={36} className="animate-spin mx-auto mb-4 text-blue-400" />
              <p className="text-gray-400">Loading enrollment data...</p>
            </div>
          ) : (
            <>
              {/* Empty State */}
              {filteredEnrollments.length === 0 ? (
                <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-8 text-center">
                  <div className="p-3 bg-blue-500/20 rounded-full inline-flex mb-4">
                    <Users size={24} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No Enrollments Found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {search || filterOptions.learningMode !== 'all' || filterOptions.courseId !== 'all' ? 
                      "No enrollments match your current filters. Try adjusting your search criteria." :
                      "There are no course enrollments in the system yet. Enrollments will appear here once students register for courses."
                    }
                  </p>
                  {(search || filterOptions.learningMode !== 'all' || filterOptions.courseId !== 'all') && (
                    <button
                      onClick={() => {
                        setSearch('');
                        setFilterOptions({ learningMode: 'all', courseId: 'all' });
                      }}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Filter size={16} className="mr-2" />
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                /* Results with Count */
                <>
                  <div className="bg-gray-800/40 rounded-t-xl border-x border-t border-gray-700/50 p-3 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">
                      Showing <span className="font-medium text-white">{currentItems.length}</span> of{' '}
                      <span className="font-medium text-white">{filteredEnrollments.length}</span> enrollments
                    </p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <p className="mr-2">Items per page:</p>
                      <select
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Table */}
                  <div className="overflow-x-auto bg-gray-800/40 border-x border-gray-700/50">
                    <table className="min-w-full divide-y divide-gray-700/50">
                      <thead>
                        <tr className="text-left text-gray-400 text-sm">
                          <th 
                            className="px-6 py-3 cursor-pointer hover:text-white"
                            onClick={() => requestSort('fullName')}
                          >
                            <div className="flex items-center">
                              <span>Full Name</span>
                              {sortConfig.key === 'fullName' && (
                                <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 cursor-pointer hover:text-white"
                            onClick={() => requestSort('emailAddress')}
                          >
                            <div className="flex items-center">
                              <span>Email</span>
                              {sortConfig.key === 'emailAddress' && (
                                <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 cursor-pointer hover:text-white"
                            onClick={() => requestSort('courseName')}
                          >
                            <div className="flex items-center">
                              <span>Course</span>
                              {sortConfig.key === 'courseName' && (
                                <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 cursor-pointer hover:text-white"
                            onClick={() => requestSort('learningMode')}
                          >
                            <div className="flex items-center">
                              <span>Mode</span>
                              {sortConfig.key === 'learningMode' && (
                                <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                              )}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700/50">
                        {currentItems.map((enrollment) => (
                          <tr 
                            key={enrollment.id} 
                            className="hover:bg-gray-700/30 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3">
                                  {enrollment.fullName.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-white">{enrollment.fullName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{enrollment.emailAddress}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <BookOpen size={16} className="text-blue-400 mr-2" />
                                <span>{enrollment.courseName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-lg text-xs border ${getLearningModeBadge(enrollment.learningMode)}`}>
                                {enrollment.learningMode.charAt(0).toUpperCase() + enrollment.learningMode.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => viewEnrollmentDetail(enrollment)}
                                  className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40 transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/40 transition-colors"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteId(enrollment.id);
                                    setShowDeleteModal(true);
                                  }}
                                  className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="bg-gray-800/40 rounded-b-xl border-x border-b border-gray-700/50 p-3 flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg border ${
                          currentPage === 1 ? 
                          'bg-gray-700/30 text-gray-500 border-gray-700 cursor-not-allowed' : 
                          'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 transition-colors'
                        }`}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={i}
                              onClick={() => paginate(pageNum)}
                              className={`h-8 w-8 flex items-center justify-center rounded-lg ${
                                currentPage === pageNum ? 
                                'bg-blue-600 text-white' : 
                                'bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg border ${
                          currentPage === totalPages ? 
                          'bg-gray-700/30 text-gray-500 border-gray-700 cursor-not-allowed' : 
                          'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 transition-colors'
                        }`}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl max-w-md w-full overflow-hidden animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <AlertCircle size={24} className="text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Confirm Deletion</h3>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to delete this enrollment? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteEnrollment}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Enrollment Modal */}
      {showViewModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl max-w-2xl w-full overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold">Student Enrollment Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Student Info */}
                <div className="flex-1">
                  <h4 className="text-lg font-medium mb-4 pb-2 border-b border-gray-700">
                    Personal Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                        <User size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="font-medium">{selectedEnrollment.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                        <Mail size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email Address</p>
                        <p className="font-medium">{selectedEnrollment.emailAddress}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                        <CreditCard size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">NIC Number</p>
                        <p className="font-medium">{selectedEnrollment.nicNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                        <Phone size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone Number</p>
                        <p className="font-medium">{selectedEnrollment.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Info */}
                <div className="flex-1">
                  <h4 className="text-lg font-medium mb-4 pb-2 border-b border-gray-700">
                    Course Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Course Name</p>
                      <div className="flex items-center mt-1">
                        <BookOpen size={18} className="text-blue-400 mr-2" />
                        <p className="font-medium">{selectedEnrollment.courseName}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Course ID</p>
                      <p className="font-medium">{selectedEnrollment.courseId}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Learning Mode</p>
                      <span className={`mt-1 inline-block px-3 py-1 rounded-lg text-sm border ${getLearningModeBadge(selectedEnrollment.learningMode)}`}>
                        {selectedEnrollment.learningMode.charAt(0).toUpperCase() + selectedEnrollment.learningMode.slice(1)}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Enrollment ID</p>
                      <p className="font-medium">{selectedEnrollment.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end space-x-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}