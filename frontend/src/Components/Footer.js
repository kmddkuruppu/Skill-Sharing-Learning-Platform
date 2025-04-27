import { BookOpen, Mail, MessageCircle, Instagram, Twitter, Linkedin, Youtube, ChevronRight } from 'lucide-react';

export default function Footer() {
  // Footer navigation structure
  const footerNavigation = {
    product: [
      { name: 'Courses', href: '#courses' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Success Stories', href: '#stories' },
      { name: 'For Teams', href: '#teams' },
      { name: 'Gift Cards', href: '#gifts' }
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'Guides', href: '#guides' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Community', href: '#community' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Contact', href: '#contact' },
      { name: 'Partners', href: '#partners' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Settings', href: '#cookies' },
      { name: 'Accessibility', href: '#accessibility' }
    ]
  };

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: '#' },
    { name: 'YouTube', icon: <Youtube size={20} />, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white">SkillShare</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Join our community of passionate learners and experts sharing skills across various disciplines. Learn, grow, and connect with like-minded individuals.
            </p>
            
            <div className="mb-8">
              <h4 className="text-white font-medium mb-4">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none rounded-l-lg flex-grow"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-r-lg transition-all">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">By subscribing, you agree to our Privacy Policy</p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full"
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerNavigation.product.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center">
                      <ChevronRight size={14} className="mr-1" /> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center">
                      <ChevronRight size={14} className="mr-1" /> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center">
                      <ChevronRight size={14} className="mr-1" /> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center">
                      <ChevronRight size={14} className="mr-1" /> {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SkillShare. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                <Mail size={16} className="mr-2" /> support@skillshare.example
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                <MessageCircle size={16} className="mr-2" /> Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* App Downloads Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>Get our mobile app for a better learning experience</span>
            </div>
            <div className="flex space-x-3 mt-3 md:mt-0">
              <button className="bg-gray-800 py-2 px-4 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.112 11.997c.044-3.139-2.764-4.728-2.897-4.806-1.564-1.48-3.803-1.678-4.627-1.692-1.908-.143-3.804 1.139-4.786 1.139-.962 0-2.548-1.125-4.209-1.092C.54 5.576-1.264 7.095-2 9.383-3.429 14.018-.72 21.033 1.007 24.998c.895 1.264 1.939 2.659 3.301 2.617 1.344-.053 1.833-.85 3.438-.85 1.635 0 2.073.85 3.475.81 1.426-.024 2.346-1.277 3.21-2.548 1.031-1.46 1.439-2.886 1.458-2.963-.032-.011-2.777-1.04-2.807-4.147-.034-2.586 2.139-3.836 2.238-3.899-1.246-1.787-3.16-1.986-3.832-2.021z" />
                  <path d="M13.672 3.723c.731-.863 1.226-2.057 1.088-3.256-.98.054-2.354.674-3.105 1.518-.67.758-1.264 1.998-1.105 3.162 1.126.086 2.281-.562 3.122-1.424z" />
                </svg>
                App Store
              </button>
              <button className="bg-gray-800 py-2 px-4 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.289 1.503v20.994c0 .812.642 1.503 1.454 1.503h14.514c.812 0 1.454-.69 1.454-1.503V1.503C20.711.69 20.069 0 19.257 0H4.743C3.931 0 3.289.69 3.289 1.503zm8.356 20.5c-.685 0-1.24-.556-1.24-1.242 0-.685.555-1.24 1.24-1.24.686 0 1.24.555 1.24 1.24 0 .686-.554 1.241-1.24 1.241zM4.98 18.171h14.04V2.832H4.98v15.339z" />
                </svg>
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}