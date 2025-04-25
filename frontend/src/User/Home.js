import { useState } from 'react';
import { Search, Book, Users, Award, ChevronRight, Compass, ArrowRight, Star, Play } from 'lucide-react';

export default function SkillSharingPlatform() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Design', 'Development', 'Business', 'Marketing', 'Photography', 'Music'];
  
  const featuredCourses = [
    {
      id: 1,
      title: "UX/UI Design Fundamentals",
      instructor: "Alex Morgan",
      image: "/api/placeholder/400/250",
      rating: 4.9,
      students: 2340,
      category: "Design"
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      instructor: "Jamie Rivera",
      image: "/api/placeholder/400/250",
      rating: 4.8,
      students: 1890,
      category: "Development"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Samira Khan",
      image: "/api/placeholder/400/250",
      rating: 4.7,
      students: 1540,
      category: "Marketing"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Compass size={24} />
            </div>
            <span className="text-xl font-bold text-gray-800">SkillForge</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Explore</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Teach</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Community</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">About</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-2 px-4 border border-indigo-600 rounded-lg">
              Log In
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg">
              Sign Up Free
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Share Knowledge.<br />
              <span className="text-indigo-600">Grow Together.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our vibrant community where passionate individuals teach and learn valuable skills. Discover courses, connect with experts, and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="What do you want to learn?" 
                  className="pl-10 pr-4 py-3 w-full sm:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center">
                <span>Find Courses</span>
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">10,000+</span> people joined last month
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4">
              <img src="/api/placeholder/600/400" alt="Learning Platform" className="rounded-lg shadow-lg" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active learners</p>
                  <p className="font-bold text-gray-800">45.7k+</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Book size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total courses</p>
                  <p className="font-bold text-gray-800">1,200+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SkillForge?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl">
              <div className="bg-indigo-100 inline-block p-3 rounded-lg mb-4">
                <Book size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Learn Real Skills</h3>
              <p className="text-gray-600">
                Access high-quality courses created by real experts and practitioners in various fields.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <div className="bg-purple-100 inline-block p-3 rounded-lg mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vibrant Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals, participate in discussions, and collaborate on projects.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
              <div className="bg-green-100 inline-block p-3 rounded-lg mb-4">
                <Award size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Earn While Learning</h3>
              <p className="text-gray-600">
                Share your expertise, teach courses, and earn income while helping others grow.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Featured Courses</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold text-indigo-600">
                  {course.category}
                </div>
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity">
                  <div className="bg-indigo-600 text-white p-3 rounded-full opacity-0 hover:opacity-100 transform scale-95 hover:scale-100 transition-all">
                    <Play size={20} />
                  </div>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="ml-1 text-gray-700 font-medium">{course.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">{course.students.toLocaleString()} students</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
            Explore all courses
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/48/48" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Emily Chen</h4>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've tried many learning platforms, but SkillForge stands out with its community approach. I've not only learned new skills but also made valuable connections."
              </p>
              <div className="flex text-yellow-500 mt-4">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/48/48" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Marcus Johnson</h4>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The quality of courses here is exceptional. I went from basic JavaScript knowledge to building full-stack applications in just a few months."
              </p>
              <div className="flex text-yellow-500 mt-4">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm lg:block hidden">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/48/48" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sophia Rodriguez</h4>
                  <p className="text-sm text-gray-500">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an instructor, I love how easy it is to share my knowledge. The platform provides all the tools I need to create engaging courses."
              </p>
              <div className="flex text-yellow-500 mt-4">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="text-indigo-100 mb-8 md:pr-12">
                Join thousands of learners and experts on SkillForge. Whether you want to learn new skills or share your expertise, our platform is the perfect place to grow.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg">
                  Join Now - It's Free
                </button>
                <button className="bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-6 rounded-lg">
                  Become an Instructor
                </button>
              </div>
            </div>
            <div className="md:w-1/3 relative hidden md:block">
              <img 
                src="/api/placeholder/400/400" 
                alt="Learning" 
                className="absolute bottom-0 right-0 h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white p-1 rounded">
                  <Compass size={20} className="text-indigo-600" />
                </div>
                <span className="text-xl font-bold">SkillForge</span>
              </div>
              <p className="text-gray-400 mb-4">
                Share knowledge. Grow together. Learn from the best and become the best.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.5h-2.512v-3.937c0-.939-.016-2.14-1.296-2.14-1.305 0-1.5 1.025-1.5 2.078v3.999H9.196V8.975h2.438v1.093h.031c.331-.64 1.14-1.312 2.35-1.312 2.487 0 2.947 1.631 2.947 3.765v5.979h.054zM6.393 7.886c-.837 0-1.524-.68-1.524-1.516 0-.837.683-1.524 1.524-1.524.846 0 1.524.687 1.524 1.524 0 .84-.678 1.516-1.524 1.516zm1.296 10.614h-2.55V8.975h2.55v9.525z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Popular Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">New Releases</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Live Workshops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Career Paths</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Forums</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Events</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Become an Instructor</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400">© 2025 SkillForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}