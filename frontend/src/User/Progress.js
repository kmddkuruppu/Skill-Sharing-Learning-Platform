 import { useState, useEffect } from 'react';
import { PlusCircle, Save, Trash2, RefreshCw, Pencil, X, CheckCircle, BookOpen, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';

// Topic Module Component
const TopicModule = ({ module, onModuleUpdate, onModuleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [moduleData, setModuleData] = useState(module);
  const [moduleNameError, setModuleNameError] = useState('');
  
  // Update moduleData when the module prop changes
  useEffect(() => {
    setModuleData(module);
  }, [module]);
  
  // Auto-capitalize first letter
  const autoCapitalize = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  const handleUpdate = () => {
    // Validate module name
    if (!moduleData.name) {
      setModuleNameError('Module name is required');
      return;
    }
    
    if (moduleData.name[0] !== moduleData.name[0].toUpperCase()) {
      setModuleData({...moduleData, name: autoCapitalize(moduleData.name)});
    }
    
    onModuleUpdate(moduleData);
    setIsEditing(false);
    setModuleNameError('');
  };
  
  return (
    <div className="bg-gray-700 p-3 rounded-md shadow-sm mb-2">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={moduleData.name}
            onChange={(e) => setModuleData({...moduleData, name: autoCapitalize(e.target.value)})}
            className="border rounded px-3 py-2 bg-gray-600 text-white w-full"
          />
          {moduleNameError && <p className="text-red-400 text-xs">{moduleNameError}</p>}
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={moduleData.progress}
              onChange={(e) => setModuleData({...moduleData, progress: parseInt(e.target.value) || 0})}
              className="border rounded px-3 py-2 bg-gray-600 text-white w-full"
            />
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setModuleNameError('');
                }}
                className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                <Save size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="font-medium">{module.name}</p>
            <div className="w-full bg-gray-600 rounded h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-300 mt-1">{module.progress}% complete</p>
          </div>
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
              title="Edit Module"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onModuleDelete(module.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
              title="Delete Module"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function LearningProgressUpdate() {
  // Initial topic data with modules
  const [topics, setTopics] = useState([
    { 
      id: 1, 
      name: 'React fundamentals', 
      progress: 85, 
      createdAt: new Date(Date.now() - 86400000 * 7),
      expanded: false,
      modules: [
        { id: 101, name: 'JSX Syntax', progress: 100 },
        { id: 102, name: 'Component Lifecycle', progress: 90 },
        { id: 103, name: 'Hooks Introduction', progress: 75 },
        { id: 104, name: 'State Management', progress: 70 }
      ]
    },
    {
      id: 2, 
      name: 'CSS Grid layouts', 
      progress: 65, 
      createdAt: new Date(Date.now() - 86400000 * 5),
      expanded: false,
      modules: [
        { id: 201, name: 'Grid Basics', progress: 100 },
        { id: 202, name: 'Responsive Layouts', progress: 80 },
        { id: 203, name: 'Grid Template Areas', progress: 40 },
        { id: 204, name: 'Advanced Grid Techniques', progress: 20 }
      ]
    },
    {
      id: 3, 
      name: 'TypeScript basics', 
      progress: 40, 
      createdAt: new Date(Date.now() - 86400000 * 2),
      expanded: false,
      modules: [
        { id: 301, name: 'Types and Interfaces', progress: 75 },
        { id: 302, name: 'Type Inference', progress: 50 },
        { id: 303, name: 'Generics', progress: 25 },
        { id: 304, name: 'Advanced Types', progress: 10 }
      ]
    }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: '', progress: 0, modules: [] });
  const [editId, setEditId] = useState(null);
  const [nameError, setNameError] = useState('');
  const [progressError, setProgressError] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const [notification, setNotification] = useState({message: '', visible: false});
  const [isAddingModule, setIsAddingModule] = useState(null);
  const [newModule, setNewModule] = useState({ name: '', progress: 0 });
  
  // Calculate overall progress based on modules
  useEffect(() => {
    // Use functional update to avoid stale state issues
    setTopics(currentTopics => 
      currentTopics.map(topic => {
        if (topic.modules && topic.modules.length > 0) {
          const totalProgress = topic.modules.reduce((sum, module) => sum + module.progress, 0);
          const averageProgress = Math.round(totalProgress / topic.modules.length);
          
          // Only update if the progress has actually changed
          if (averageProgress !== topic.progress) {
            return { ...topic, progress: averageProgress };
          }
        }
        return topic;
      })
    );
  }, [topics]); // Use a simpler dependency that won't cause infinite loops

  // Auto-capitalize first letter on first touch
  const autoCapitalize = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  // Validate topic name
  const validateName = (name) => {
    if (!name) {
      setNameError('Topic name is required');
      return false;
    }
    
    if (name[0] !== name[0].toUpperCase()) {
      setNameError('Topic name must start with a capital letter');
      return false;
    }
    
    setNameError('');
    return true;
  };
  
  // Validate progress
  const validateProgress = (progress) => {
    const progressNum = Number(progress);
    if (isNaN(progressNum)) {
      setProgressError('Progress must be a number');
      return false;
    }
    
    if (progressNum < 0 || progressNum > 100) {
      setProgressError('Progress must be between 0 and 100');
      return false;
    }
    
    setProgressError('');
    return true;
  };
  
  // Add new topic
  const handleAddTopic = () => {
    const isNameValid = validateName(newTopic.name);
    
    if (!isNameValid) return;
    
    // Find the highest existing ID and add 1
    const id = topics.length > 0 
      ? Math.max(...topics.map(t => t.id)) + 1 
      : 1;
    
    // Create default modules for new topic
    const defaultModules = [
      { id: id * 100 + 1, name: 'Introduction', progress: 0 },
      { id: id * 100 + 2, name: 'Fundamentals', progress: 0 },
      { id: id * 100 + 3, name: 'Advanced Concepts', progress: 0 }
    ];
    
    // Create a new topic with all required properties
    const topicToAdd = { 
      ...newTopic, 
      id, 
      progress: 0,
      modules: defaultModules,
      expanded: false,
      createdAt: new Date() 
    };
    
    // Use functional update to ensure we're working with the latest state
    setTopics(currentTopics => [...currentTopics, topicToAdd]);
    setNewTopic({ name: '', progress: 0, modules: [] });
    setIsAdding(false);
    showSavedNotification("Topic added successfully!");
  };
  
  // Toggle topic expanded state
  const toggleExpand = (id) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, expanded: !topic.expanded } : topic
    ));
  };
  
  // Handle updating topic
  const handleUpdateTopic = (id) => {
    const topicToUpdate = topics.find(t => t.id === id);
    
    const isNameValid = validateName(topicToUpdate.name);
    
    if (!isNameValid) return;
    
    // Make a copy to ensure proper state update
    const updatedTopics = topics.map(topic => 
      topic.id === id ? { ...topic } : topic
    );
    
    setTopics(updatedTopics);
    setEditId(null);
    showSavedNotification("Topic updated successfully!");
  };
  
  // Handle deleting topic
  const handleDeleteTopic = (id) => {
    // Use functional update to ensure we're working with the latest state
    setTopics(currentTopics => currentTopics.filter(topic => topic.id !== id));
    // If we were editing this topic, exit edit mode
    if (editId === id) {
      setEditId(null);
    }
    // If we were adding a module to this topic, cancel that operation
    if (isAddingModule === id) {
      setIsAddingModule(null);
    }
    showSavedNotification("Topic deleted successfully!");
  };
  
  // Handle adding module to a topic
  const handleAddModule = (topicId) => {
    if (!newModule.name) {
      setProgressError("Module name is required");
      return;
    }
    
    // Find the highest module ID across all topics and add 1
    const allModuleIds = topics.flatMap(t => t.modules?.map(m => m.id) || []);
    const moduleId = allModuleIds.length > 0 ? Math.max(...allModuleIds) + 1 : 1;
    
    // Use functional update to ensure we're working with the latest state
    setTopics(currentTopics => 
      currentTopics.map(topic => {
        if (topic.id === topicId) {
          const moduleToAdd = {
            id: moduleId,
            name: autoCapitalize(newModule.name),
            progress: parseInt(newModule.progress) || 0
          };
          
          return {
            ...topic,
            modules: [...(topic.modules || []), moduleToAdd]
          };
        }
        return topic;
      })
    );
    
    setNewModule({ name: '', progress: 0 });
    setIsAddingModule(null);
    showSavedNotification("Module added successfully!");
  };
  
  // Handle updating a module
  const handleModuleUpdate = (topicId, updatedModule) => {
    // Use functional update to ensure we're working with the latest state
    setTopics(currentTopics => 
      currentTopics.map(topic => {
        if (topic.id === topicId) {
          const updatedModules = topic.modules.map(module => 
            module.id === updatedModule.id ? updatedModule : module
          );
          
          return { ...topic, modules: updatedModules };
        }
        return topic;
      })
    );
    
    showSavedNotification("Module updated successfully!");
  };
  
  // Handle deleting a module
  const handleModuleDelete = (topicId, moduleId) => {
    // Use functional update to ensure we're working with the latest state
    setTopics(currentTopics => 
      currentTopics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            modules: topic.modules.filter(module => module.id !== moduleId)
          };
        }
        return topic;
      })
    );
    
    showSavedNotification("Module deleted successfully!");
  };
  
  // Force refresh to prevent stale state on fast clicks
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const refreshState = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  // Show notification
  const showSavedNotification = (message = "Changes saved successfully!") => {
    setNotification({message, visible: true});
    setTimeout(() => {
      setNotification({message: '', visible: false});
      refreshState();
    }, 2500);
  };
  
  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // This key will help React re-render the list items when needed
  const topicsKey = topics.map(t => `${t.id}-${t.modules?.length || 0}`).join('-');

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 pb-16 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_rgba(29,78,216,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(17,24,39,0.7),rgba(17,24,39,1)_70%)]" style={{ overflowY: 'auto' }}>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 mb-16">
        <div className="flex items-center gap-3 mb-8 pt-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BarChart2 size={24} />
          </div>
          <h1 className="text-3xl font-bold text-white">Learning Progress Update</h1>
        </div>
        
        {/* Fixed position for error messages */}
        {(nameError || progressError) && (
          <div className="bg-red-900/30 border border-red-800 rounded p-3 mb-4">
            <p className="text-red-400">{nameError || progressError}</p>
          </div>
        )}
        
        <div className="flex gap-2">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-blue-800 transition-all mb-6 shadow-md"
            >
              <PlusCircle size={18} />
              <span>Add Topic</span>
            </button>
          )}
        </div>
        
        {/* Fixed central notification */}
        {notification.visible && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-700 text-white p-4 rounded-lg shadow-xl flex items-center gap-2 z-50 transition-all">
            <CheckCircle size={20} />
            <span className="font-medium">{notification.message}</span>
          </div>
        )}
        
        {isAdding && (
          <div className="mb-6 p-5 border border-gray-700 rounded-lg bg-gray-700/50 backdrop-blur-sm shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-white">Add New Learning Topic</h2>
              <button 
                onClick={() => {
                  setIsAdding(false);
                  setNewTopic({ name: '', progress: 0 });
                  setNameError('');
                  setProgressError('');
                }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Topic name"
                value={newTopic.name}
                onChange={(e) => setNewTopic({ ...newTopic, name: autoCapitalize(e.target.value) })}
                className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
              
              <button
                onClick={handleAddTopic}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-colors"
              >
                Add
              </button>
            </div>
            <p className="text-gray-400 text-sm">Topic will be created with default modules</p>
          </div>
        )}
        
        <ul key={topicsKey} className="space-y-4">
          {topics.length === 0 ? (
            <div className="p-8 text-center text-gray-400 border border-dashed border-gray-700 rounded-lg">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>No learning topics yet. Add your first topic to start tracking!</p>
            </div>
          ) : (
            topics.map((topic) => (
              <li key={topic.id} className="bg-gradient-to-br from-gray-700 to-gray-800 p-5 rounded-lg shadow-md border border-gray-700">
                {editId === topic.id ? (
                  <div className="w-full flex flex-col gap-4">
                    <input
                      type="text"
                      value={topic.name}
                      onChange={(e) => setTopics(topics.map(t => 
                        t.id === topic.id ? { ...t, name: autoCapitalize(e.target.value) } : t
                      ))}
                      className="border rounded-md px-3 py-2 w-full bg-gray-600 text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditId(null);
                          setNameError('');
                          setProgressError('');
                        }}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => handleUpdateTopic(topic.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center gap-1"
                      >
                        <Save size={16} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{topic.name}</h3>
                          <button 
                            onClick={() => toggleExpand(topic.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {topic.expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                        <p className="text-sm text-gray-300">Added on {formatDate(topic.createdAt)}</p>
                        <div className="w-full bg-gray-600 rounded-full h-3 mt-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-inner transition-all duration-500"
                            style={{ width: `${topic.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-300">{topic.progress}% complete</p>
                          <p className="text-sm text-gray-300">{topic.modules?.length || 0} modules</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setEditId(topic.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTopic(topic.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Modules Section */}
                    {topic.expanded && (
                      <div className="mt-4 border-t border-gray-600 pt-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-300">Modules</h4>
                          
                          {isAddingModule !== topic.id && (
                            <button
                              onClick={() => setIsAddingModule(topic.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
                            >
                              <PlusCircle size={14} />
                              <span>Add Module</span>
                            </button>
                          )}
                        </div>
                        
                        {isAddingModule === topic.id && (
                          <div className="bg-gray-700/70 p-3 rounded-md mb-3 flex gap-2">
                            <input
                              type="text"
                              placeholder="Module name"
                              value={newModule.name}
                              onChange={(e) => setNewModule({...newModule, name: autoCapitalize(e.target.value)})}
                              className="border rounded-md px-3 py-1 bg-gray-600 text-white text-sm flex-1"
                            />
                            <input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Progress"
                              value={newModule.progress}
                              onChange={(e) => setNewModule({...newModule, progress: e.target.value})}
                              className="border rounded-md px-3 py-1 bg-gray-600 text-white text-sm w-20"
                            />
                            <div className="flex gap-1">
                              <button
                                onClick={() => setIsAddingModule(null)}
                                className="bg-gray-500 hover:bg-gray-400 text-white px-2 py-1 rounded-md"
                              >
                                <X size={14} />
                              </button>
                              <button
                                onClick={() => handleAddModule(topic.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md"
                              >
                                <Save size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-1 mt-2">
                          {topic.modules?.length > 0 ? (
                            topic.modules.map(module => (
                              <TopicModule
                                key={module.id}
                                module={module}
                                onModuleUpdate={(updatedModule) => handleModuleUpdate(topic.id, updatedModule)}
                                onModuleDelete={(moduleId) => handleModuleDelete(topic.id, moduleId)}
                              />
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm py-2">No modules yet.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))
          )}
        </ul>
        
        <div className="mt-6 flex justify-between text-sm text-gray-400 p-2 border-t border-gray-700 pt-4">
          <div className="flex items-center gap-1">
            <RefreshCw size={14} className="animate-spin-slow" />
            <span>Progress auto-calculated from modules</span>
          </div>
          <div>Total topics: {topics.length}</div>
        </div>
      </div>
    </div>
  );
}