import { useState } from 'react';
import { 
  Save, X, Plus, Trash2, HelpCircle, Clock, BookOpen, 
  FileText, List, Check, ChevronDown
} from 'lucide-react';

export default function CreatePlanForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    sections: [{ title: '', content: '', resources: [{ title: '', url: '' }] }]
  });
  
  const categories = [
    { id: 'coding', name: 'Coding' },
    { id: 'cooking', name: 'Cooking' },
    { id: 'photography', name: 'Photography' },
    { id: 'diy', name: 'DIY Crafts' },
    { id: 'language', name: 'Languages' }
  ];
  
  const difficulties = [
    { id: 'beginner', name: 'Beginner', color: 'bg-green-500' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-blue-500' },
    { id: 'advanced', name: 'Advanced', color: 'bg-purple-500' },
    { id: 'expert', name: 'Expert', color: 'bg-red-500' }
  ];
  
  const durations = [
    '1-2 days', '1 week', '2 weeks', '3 weeks', 
    '1 month', '2 months', '3 months', '6 months'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleResourceChange = (sectionIndex, resourceIndex, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].resources[resourceIndex][field] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: '', content: '', resources: [{ title: '', url: '' }] }]
    });
  };

  const removeSection = (index) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData({ ...formData, sections: updatedSections });
  };

  const addResource = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].resources.push({ title: '', url: '' });
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeResource = (sectionIndex, resourceIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].resources.splice(resourceIndex, 1);
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Learning plan created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Create Learning Plan
          </h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors"
            >
              <X size={18} className="inline mr-2" />
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
            >
              <Save size={18} className="inline mr-2" />
              Save Plan
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center border-b border-gray-700 pb-2">
              <FileText size={20} className="mr-2 text-blue-400" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Plan Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                  placeholder="E.g., Complete Guide to Digital Photography"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                  placeholder="Provide a detailed description of what learners will gain from this plan..."
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
                    Difficulty Level*
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select difficulty</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
                    Estimated Duration*
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select duration</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sections */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center border-b border-gray-700 pb-2">
              <List size={20} className="mr-2 text-blue-400" />
              Learning Plan Sections
            </h2>
            
            {formData.sections.map((section, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-750 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Section {index + 1}</h3>
                  {formData.sections.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeSection(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Section Title*
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                      className="w-full p-2.5 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                      placeholder="E.g., Introduction to Lighting"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Section Content*
                    </label>
                    <textarea
                      value={section.content}
                      onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                      rows="3"
                      className="w-full p-2.5 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                      placeholder="Describe what will be covered in this section..."
                      required
                    ></textarea>
                  </div>
                  
                  {/* Resources */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Resources</h4>
                    
                    {section.resources.map((resource, rIndex) => (
                      <div key={rIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={resource.title}
                          onChange={(e) => handleResourceChange(index, rIndex, 'title', e.target.value)}
                          className="flex-1 p-2 bg-gray-700 rounded-lg border border-gray-600"
                          placeholder="Resource title"
                        />
                        <input
                          type="url"
                          value={resource.url}
                          onChange={(e) => handleResourceChange(index, rIndex, 'url', e.target.value)}
                          className="flex-1 p-2 bg-gray-700 rounded-lg border border-gray-600"
                          placeholder="URL"
                        />
                        <button 
                          type="button" 
                          onClick={() => removeResource(index, rIndex)}
                          className="p-2 text-red-400 hover:text-red-300"
                          disabled={section.resources.length <= 1}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => addResource(index)}
                      className="mt-2 text-sm text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Resource
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addSection}
              className="w-full p-3 bg-gray-750 border border-dashed border-gray-600 rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" />
              Add Section
            </button>
          </div>
          
          <div className="flex justify-end mt-8 space-x-3">
            <button 
              type="button" 
              onClick={() => window.history.back()}
              className="px-4 py-2.5 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Learning Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}