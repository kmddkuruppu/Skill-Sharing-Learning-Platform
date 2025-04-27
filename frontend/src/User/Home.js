import { useState, useEffect } from 'react';
import { Search, BookOpen, Code, Camera, TrendingUp, Star, ArrowRight, Users, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

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

export default function HomePage() {
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
    { id: 1, title: 'React Fundamentals', category: 'coding', instructor: 'Alex Johnson', students: 2483, rating: 4.9, image: '/api/placeholder/300/200' },
    { id: 2, title: 'Italian Cuisine Mastery', category: 'cooking', instructor: 'Maria Romano', students: 1872, rating: 4.8, image: '/api/placeholder/300/200' },
    { id: 3, title: 'Portrait Photography', category: 'photography', instructor: 'Sam Wilson', students: 1456, rating: 4.7, image: '/api/placeholder/300/200' },
    { id: 4, title: 'DIY Home Decor', category: 'diy', instructor: 'Emma Davis', students: 1293, rating: 4.6, image: '/api/placeholder/300/200' }
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
      {/* Hero Section */}
      <header className={`relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent"></div>
        
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-blue-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">SkillShare</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Explore</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Categories</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Teach</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-full bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all">
              Log In
            </button>
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all">
              Sign Up
            </button>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Learn Any Skill.</span>
              <span className="block">Share Your Knowledge.</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Grow Together.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Join our community of passionate learners and experts sharing skills across coding, cooking, photography, DIY crafts, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="What do you want to learn today?"
                  className="w-full py-3 pl-10 pr-4 rounded-full bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium">
                Start Learning <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className={`bg-gray-800 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0' : 'translate-y-20'}`}>
              <img src="/api/placeholder/600/400" alt="Learning Platform Preview" className="w-full h-auto" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                <div className="flex items-center">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-800" />
                    ))}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm">Join <span className="text-blue-400 font-bold">2M+</span> learners</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-lg transform rotate-3 shadow-lg">
              <div className="bg-gray-800 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="text-sm font-medium">Skills in demand</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-500 to-pink-600 p-1 rounded-lg transform -rotate-6 shadow-lg">
              <div className="bg-gray-800 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-blue-400" />
                  <span className="text-sm font-medium">Expert instructors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="group p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">Master {category.name.toLowerCase()} skills with our expert-led courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Skills Section */}
      <section className="py-16 bg-gray-800">
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
                className={`bg-gray-900 rounded-xl overflow-hidden border ${getBorderColorClass(skill.category)} transition-all duration-300 transform hover:-translate-y-2`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative">
                  <img src={skill.image} alt={skill.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 bg-gray-900/80 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star size={12} className="text-yellow-400 mr-1" fill="#FACC15" />
                    {skill.rating}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    {categories.find(cat => cat.id === skill.category).icon}
                    <span className="ml-2 text-xs text-gray-400">{categories.find(cat => cat.id === skill.category).name}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">By {skill.instructor}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Users size={12} className="mr-1" />
                      {skill.students.toLocaleString()} students
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-medium flex items-center transition-colors">
                      Learn more <ArrowRight size={12} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
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
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Community Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 mr-1" fill="#FACC15" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
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
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to master new skills or share your expertise?</h2>
              <p className="text-gray-300 mb-8">Join our community today and transform your learning journey. Whether you want to learn or teach, we have the perfect platform for you.</p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                  Join Now
                </button>
                <button className="px-8 py-3 bg-transparent border border-gray-400 rounded-full hover:border-white transition-all font-medium">
                  Explore Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <div className="col-span-2 lg:col-span-1 mb-8 lg:mb-0">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="text-blue-400" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">SkillShare</span>
        </div>
        <p className="text-gray-400 text-sm mb-6">Your platform for learning and sharing skills in an engaging community.</p>
        <div className="flex space-x-4">
          {/* Replace the empty placeholders with actual social icons */}
          <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Twitter size={16} className="text-gray-400 hover:text-white" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Facebook size={16} className="text-gray-400 hover:text-white" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Instagram size={16} className="text-gray-400 hover:text-white" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Linkedin size={16} className="text-gray-400 hover:text-white" />
          </a>
        </div>
      </div>
            
            {['Categories', 'Company', 'Resources'].map((column, index) => (
              <div key={column}>
                <h3 className="text-lg font-semibold mb-4">{column}</h3>
                <ul className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {column} Link {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 text-sm mb-4">Get updates on new courses and features</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-grow py-2 px-4 bg-gray-800 rounded-l-lg border border-gray-700 focus:outline-none focus:border-blue-400"
                />
                <button className="bg-blue-500 hover:bg-blue-600 transition-colors py-2 px-4 rounded-r-lg">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 SkillShare. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}