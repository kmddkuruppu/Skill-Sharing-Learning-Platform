import { 
  BookOpen, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ChevronUp 
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Coding', href: '#' },
        { name: 'Cooking', href: '#' },
        { name: 'Photography', href: '#' },
        { name: 'DIY Crafts', href: '#' },
        { name: 'View All', href: '#' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Become an Instructor', href: '#' },
        { name: 'Success Stories', href: '#' },
        { name: 'Forums', href: '#' },
        { name: 'Events', href: '#' },
        { name: 'Help Center', href: '#' }
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Youtube size={18} />, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <BookOpen className="text-blue-400 mr-2" size={24} />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">SkillShare</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              We're on a mission to connect passionate experts with eager learners worldwide, creating a community where skills are shared and dreams are achieved.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={16} className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-400 text-sm">123 Learning Street, Knowledge City, 10001</p>
              </div>
              
              <div className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-3 flex-shrink-0" />
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-3 flex-shrink-0" />
                <p className="text-gray-400 text-sm">support@skillshare-example.com</p>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm inline-flex items-center group"
                    >
                      {link.name}
                      <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest courses and community updates.</p>
            
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full py-3 pl-4 pr-12 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none text-sm"
                />
                <button className="absolute right-2 top-2 p-1 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} SkillShare. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
            
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}