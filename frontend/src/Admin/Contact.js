import { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Mail, MessageCircle, Calendar, Download, ChevronLeft, ChevronRight, X, Check, AlertCircle } from 'lucide-react';

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [actionStatus, setActionStatus] = useState({ type: null, message: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    // Apply filters, search, and sorting
    let result = [...messages];
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(message => message.status === filterStatus);
    }
    
    // Search functionality
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(message => 
        message.name.toLowerCase().includes(search) || 
        message.email.toLowerCase().includes(search) || 
        message.subject.toLowerCase().includes(search) || 
        message.message.toLowerCase().includes(search)
      );
    }
    
    // Sort messages
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'a-z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredMessages(result);
  }, [messages, searchTerm, filterStatus, sortOrder]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/contacts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      let data = await response.json();
      
      // Add timestamps and status if they're not in the API response
      data = data.map(message => ({
        ...message,
        createdAt: message.createdAt || new Date().toISOString(),
        status: message.status || 'unread'
      }));
      
      setMessages(data);
      setFilteredMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      // In a real app, you would update the status in the backend
      // await fetch(`http://localhost:8080/api/contacts/${id}/read`, { method: 'PUT' });
      
      // For now, we'll just update it locally
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, status: 'read' } : msg
      );
      
      setMessages(updatedMessages);
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
      
      setActionStatus({ 
        type: 'success', 
        message: 'Message marked as read' 
      });
      
      setTimeout(() => setActionStatus({ type: null, message: '' }), 3000);
    } catch (err) {
      console.error('Error marking message as read:', err);
      setActionStatus({ 
        type: 'error', 
        message: 'Failed to update message status' 
      });
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      // In a real app, you would delete from the backend
      // await fetch(`http://localhost:8080/api/contacts/${id}`, { method: 'DELETE' });
      
      // For now, we'll just remove it locally
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      
      setActionStatus({ 
        type: 'success', 
        message: 'Message deleted successfully' 
      });
      
      setTimeout(() => setActionStatus({ type: null, message: '' }), 3000);
    } catch (err) {
      console.error('Error deleting message:', err);
      setActionStatus({ 
        type: 'error', 
        message: 'Failed to delete message' 
      });
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    
    // If message is unread, mark it as read
    if (message.status === 'unread') {
      markAsRead(message.id);
    }
  };

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const exportCSV = () => {
    // Create CSV string
    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date'];
    const csvRows = [headers.join(',')];
    
    for (const message of messages) {
      const row = [
        `"${message.name.replace(/"/g, '""')}"`,
        `"${message.email.replace(/"/g, '""')}"`,
        `"${message.subject.replace(/"/g, '""')}"`,
        `"${message.message.replace(/"/g, '""')}"`,
        `"${formatDate(message.createdAt)}"`
      ];
      csvRows.push(row.join(','));
    }
    
    const csvString = csvRows.join('\n');
    
    // Create a download link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contact_messages_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 py-6 border-b border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Contact Messages Admin</h1>
            <button 
              onClick={exportCSV}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download size={18} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      {/* Status message */}
      {actionStatus.type && (
        <div className={`fixed top-6 right-6 p-4 rounded-lg shadow-lg z-50 flex items-center ${
          actionStatus.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {actionStatus.type === 'success' ? (
            <Check size={20} className="mr-2" />
          ) : (
            <AlertCircle size={20} className="mr-2" />
          )}
          <span>{actionStatus.message}</span>
          <button 
            onClick={() => setActionStatus({ type: null, message: '' })}
            className="ml-4 text-gray-200 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Messages List */}
          <div className="lg:w-2/3 space-y-6">
            {/* Search and filters */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="relative">
                    <Filter size={20} className="absolute left-3 top-3 text-gray-400" />
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                  
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="a-z">Name A-Z</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 text-gray-400 text-sm">
                Showing {currentMessages.length} of {filteredMessages.length} messages
              </div>
            </div>
            
            {/* Messages list */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading messages...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-400">
                  <AlertCircle size={32} className="mx-auto mb-4" />
                  <p>{error}</p>
                  <button 
                    onClick={fetchMessages}
                    className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  >
                    Try Again
                  </button>
                </div>
              ) : currentMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <MessageCircle size={32} className="mx-auto mb-4" />
                  <p>No messages found</p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <ul className="divide-y divide-gray-700">
                    {currentMessages.map((message) => (
                      <li 
                        key={message.id} 
                        onClick={() => handleSelectMessage(message)}
                        className={`p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
                          selectedMessage && selectedMessage.id === message.id ? 'bg-gray-700' : ''
                        } ${message.status === 'unread' ? 'border-l-4 border-blue-500' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{message.name}</h3>
                              {message.status === 'unread' && (
                                <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">New</span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{message.email}</p>
                            <p className="font-medium mt-1">{message.subject}</p>
                            <p className="text-gray-300 text-sm mt-1 line-clamp-1">
                              {message.message}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-gray-400 mb-2">
                              {formatDate(message.createdAt)}
                            </p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message.id);
                              }}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Delete message"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center p-4 border-t border-gray-700">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Message details */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-6">
              {selectedMessage ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                    <button 
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="uppercase font-bold">
                        {selectedMessage.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{selectedMessage.name}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <Mail size={14} className="mr-1" />
                        <a href={`mailto:${selectedMessage.email}`} className="hover:text-blue-400">
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(selectedMessage.createdAt)}</span>
                    </div>
                    
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <p className="whitespace-pre-line">{selectedMessage.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => markAsRead(selectedMessage.id)}
                      disabled={selectedMessage.status === 'read'}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:bg-gray-600"
                    >
                      <Check size={18} className="mr-2" />
                      {selectedMessage.status === 'read' ? 'Already Read' : 'Mark as Read'}
                    </button>
                    
                    <button 
                      onClick={() => {
                        window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                      }}
                      className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Mail size={18} className="mr-2" />
                      Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle size={48} className="mx-auto mb-4 text-gray-500" />
                  <h3 className="text-lg font-medium mb-2">No message selected</h3>
                  <p className="text-gray-400">
                    Select a message from the list to view its contents
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}