import { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, BookOpen, Bell, User } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Explore', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Teach', href: '#' },
    { name: 'Community', href: '#' }
  ];
  
  const categories = [
    { name: 'Coding', href: '#' },
    { name: 'Cooking', href: '#' },
    { name: 'Photography', href: '#' },
    { name: 'DIY Crafts', href: '#' },
    { name: 'Languages', href: '#' },
    { name: 'Business', href: '#' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo with Home Link */}
          <a 
            href="/" 
            className={`flex items-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} cursor-pointer`}
          >
            <BookOpen className="text-blue-400 mr-2" size={24} />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">SkillShare</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => (
              link.name === 'Categories' ? (
                <div key={link.name} className="relative group">
                  <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all flex items-center">
                    {link.name}
                    <ChevronDown size={16} className="ml-1 transform group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-2">
                    {categories.map((category) => (
                      <a 
                        key={category.name} 
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a 
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>
          
          {/* Search and Actions */}
          <div className="flex items-center space-x-2">
            <div className={`relative hidden md:block transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search skills..."
                className="w-48 py-2 pl-10 pr-4 rounded-full bg-gray-800/80 border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none text-sm"
              />
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all">
                <User size={20} />
              </button>
              <button className="hidden md:block ml-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium">
                Sign Up
              </button>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gray-900/95 z-50 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              {/* Mobile Logo with Home Link */}
              <a href="/" className="flex items-center">
                <BookOpen className="text-blue-400 mr-2" size={24} />
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">SkillShare</span>
              </a>
              <button 
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search skills..."
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 rounded-lg text-gray-200 hover:text-white hover:bg-gray-800 transition-all"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="px-4 mb-2 text-sm text-gray-400">Categories</p>
                {categories.map((category) => (
                  <a 
                    key={category.name}
                    href={category.href}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all block"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-auto grid grid-cols-2 gap-4">
              <button className="py-3 bg-transparent border border-gray-700 rounded-xl hover:border-gray-500 transition-all font-medium">
                Log In
              </button>
              <button className="py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}