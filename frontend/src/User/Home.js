import { useState, useEffect } from 'react';
import { Search, BookOpen, Code, Camera, TrendingUp, Star, ArrowRight, Users } from 'lucide-react';

// Custom icon for ChefHat since it might be causing issues
const ChefHat = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
    <line x1="6" x2="18" y1="17" y2="17"></line>
  </svg>
);

// Custom icon for Tool to replace the unsupported lucide-react import
const Tool = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'coding', name: 'Coding', icon: <Code size={20} />, color: 'bg-blue-500' },
    { id: 'cooking', name: 'Cooking', icon: <ChefHat size={20} />, color: 'bg-red-500' },
    { id: 'photography', name: 'Photography', icon: <Camera size={20} />, color: 'bg-purple-500' },
    { id: 'diy', name: 'DIY Crafts', icon: <Tool size={20} />, color: 'bg-green-500' }
  ];

  const trendingSkills = [
    { id: 1, title: 'React Fundamentals', category: 'coding', instructor: 'Alex Johnson', students: 2483, rating: 4.9, image: '/../assets/images/react.jpg' },
    { id: 2, title: 'Italian Cuisine Mastery', category: 'cooking', instructor: 'Maria Romano', students: 1872, rating: 4.8, image: '/../assets/images/cook.jpg' },
    { id: 3, title: 'Portrait Photography', category: 'photography', instructor: 'Sam Wilson', students: 1456, rating: 4.7, image: '/../assets/images/im2.jpg' },
    { id: 4, title: 'DIY Home Decor', category: 'diy', instructor: 'Emma Davis', students: 1293, rating: 4.6, image: '/../assets/images/diy.jpg' }
  ];

  const testimonials = [
    { id: 1, text: "This platform completely transformed my coding skills. The interactive lessons and supportive community made learning enjoyable!", author: "Chris T.", role: "Software Developer" },
    { id: 2, text: "I started my photography journey here and now I'm working professionally. The expert guidance was invaluable.", author: "Michelle K.", role: "Photographer" }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? trendingSkills 
    : trendingSkills.filter(skill => skill.category === selectedCategory);

  // Helper function to get appropriate border color class based on category
  const getBorderColorClass = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      if (category.color === 'bg-blue-500') return 'border-blue-400';
      if (category.color === 'bg-red-500') return 'border-red-400';
      if (category.color === 'bg-purple-500') return 'border-purple-400';
      if (category.color === 'bg-green-500') return 'border-green-400';
    }
    return 'border-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section - Modernized with full background image */}
      <header className={`relative min-h-screen flex items-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/70 z-10"></div>
          <img 
            src="../assets/images/banner.jpg" 
            alt="Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Animated particles/gradient effect */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent z-20"></div>
        
        <div className="container mx-auto px-6 py-20 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full mb-4">
                <p className="text-blue-300 text-sm font-medium flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  Learn from the best experts worldwide
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block mb-2">Learn Any Skill.</span>
                <span className="block mb-2">Share Your Knowledge.</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Grow Together.</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg">
                Join our community of passionate learners and experts sharing skills across coding, cooking, photography, DIY crafts, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="What do you want to learn today?"
                    className="w-full py-3.5 pl-12 pr-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base shadow-lg"
                  />
                </div>
                <button className="py-3.5 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium shadow-lg shadow-blue-500/20">
                  Start Learning <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
              
              <div className="flex items-center pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-800" />
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm">Join <span className="text-blue-400 font-bold">2M+</span> active learners</p>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              {/* 3D-style card display */}
              <div className={`bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 rotate-1' : 'translate-y-20 rotate-0'}`}>
                <img src="" alt="Learning Platform Preview" className="w-full h-auto" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">React Fundamentals</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 flex items-center">
                      <Users size={14} className="mr-1" />
                      2,483 students
                    </span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400" fill="#FACC15" />
                      <span className="ml-1 text-sm">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-lg transform rotate-3 shadow-xl">
                <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded">
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={18} className="text-green-400" />
                    <span className="text-sm font-medium">Skills in demand</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-purple-500 to-pink-600 p-1 rounded-lg transform -rotate-6 shadow-xl">
                <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded">
                  <div className="flex items-center space-x-2">
                    <Users size={18} className="text-blue-400" />
                    <span className="text-sm font-medium">Expert instructors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-75 hover:opacity-100 transition-opacity">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <p className="text-gray-400 max-w-md mt-4 md:mt-0">Discover a wide range of skills taught by industry experts</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="group p-6 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className={`${category.color} w-14 h-14 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                <p className="text-gray-400 text-sm">Master {category.name.toLowerCase()} skills with our expert-led courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Skills Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Skills</h2>
            
            <div className="flex mt-6 md:mt-0 space-x-2 overflow-x-auto pb-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.id} 
                className={`bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border ${getBorderColorClass(skill.category)} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-${skill.category === 'coding' ? 'blue' : skill.category === 'cooking' ? 'red' : skill.category === 'photography' ? 'purple' : 'green'}-500/20`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative">
                  <img src={skill.image} alt={skill.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center">
                    <Star size={14} className="text-yellow-400 mr-1.5" fill="#FACC15" />
                    {skill.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {categories.find(cat => cat.id === skill.category).icon}
                    <span className="ml-2 text-xs text-gray-400">{categories.find(cat => cat.id === skill.category).name}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">By {skill.instructor}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Users size={14} className="mr-1.5" />
                      {skill.students.toLocaleString()} students
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-medium flex items-center transition-colors">
                      Learn more <ArrowRight size={14} className="ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">2M+</h3>
              <p className="text-gray-400">Active Learners</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">5K+</h3>
              <p className="text-gray-400">Expert Instructors</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">1K+</h3>
              <p className="text-gray-400">Courses Available</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">10M+</h3>
              <p className="text-gray-400">Skills Learned</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Community Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 mr-1" fill="#FACC15" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 mr-4 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-12 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to master new skills or share your expertise?</h2>
              <p className="text-gray-300 mb-8 text-lg">Join our community today and transform your learning journey. Whether you want to learn or teach, we have the perfect platform for you.</p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20">
                  Join Now
                </button>
                <button className="px-8 py-4 bg-transparent border border-gray-400 rounded-full hover:border-white transition-all font-medium">
                  Explore Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}