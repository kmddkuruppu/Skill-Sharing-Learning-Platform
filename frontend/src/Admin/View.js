import { useState, useEffect } from 'react';
import { Trash2, Edit, AlertCircle } from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Fetch courses from your Spring Boot backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/learnings'); // Adjust URL to your API endpoint
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle edit course - Replace with your implementation
  const handleEdit = (courseId) => {
    console.log('Edit course with ID:', courseId);
    // Navigate to edit page or open edit modal
    // Example: navigate(`/courses/edit/${courseId}`);
  };

  // Open delete confirmation modal
  const openDeleteModal = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  // Handle delete course
  const handleDelete = async () => {
    if (!courseToDelete) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/learnings/${courseToDelete.courseId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete course! Status: ${response.status}`);
      }
      
      // Remove the deleted course from state
      setCourses(courses.filter(course => course.courseId !== courseToDelete.courseId));
      setShowDeleteModal(false);
      setCourseToDelete(null);
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Failed to delete course. Please try again.');
    }
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 text-gray-200">
        <div className="text-xl">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex items-center text-red-500 mb-4">
          <AlertCircle className="mr-2" />
          <h2 className="text-xl font-bold">Error</h2>
        </div>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-white">Course Management</h1>
      
      {courses.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No courses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Course Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Fee</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Job Opportunities</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {courses.map((course) => (
                <tr key={course.courseId} className="hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-300">{course.courseId}</td>
                  <td className="px-4 py-3 text-gray-300">{course.courseName}</td>
                  <td className="px-4 py-3 text-gray-300">${course.courseFee.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-300">{course.duration}</td>
                  <td className="px-4 py-3 text-gray-300">
                    <div className="max-w-xs truncate" title={course.description}>
                      {course.description}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <div className="max-w-xs truncate" title={course.jobOpportunities}>
                      {course.jobOpportunities}
                    </div>
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEdit(course.courseId)}
                      className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                      title="Edit course"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(course)}
                      className="p-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
                      title="Delete course"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the course "{courseToDelete?.courseName}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;