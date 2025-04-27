import { useState } from 'react';
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
  ChevronUp,
  Send
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulated API call
    try {
      // Replace with actual API call
      await new Promise(r => setTimeout(r, 800));
      setSubmitStatus('success');
      setEmail('');
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
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
    { icon: <Twitter size={18} aria-hidden="true" />, href: '#', label: 'Twitter' },
    { icon: <Facebook size={18} aria-hidden="true" />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={18} aria-hidden="true" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} aria-hidden="true" />, href: '#', label: 'LinkedIn' },
    { icon: <Youtube size={18} aria-hidden="true" />, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-12">
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center mb-6 group">
              <BookOpen className="text-blue-400 mr-2 transition-transform group-hover:scale-110" size={28} />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                SkillShare
              </span>
            </a>
            
            <p className="text-gray-400 mb-6 max-w-md">
              We connect passionate experts with eager learners worldwide, creating a community where skills are shared and dreams are achieved.
            </p>
            
            <div className="space-y-4">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" 
                className="flex items-start group hover:text-blue-400 transition-colors">
                <MapPin size={16} className="text-gray-400 group-hover:text-blue-400 mt-1 mr-3 flex-shrink-0 transition-colors" />
                <p className="text-gray-400 group-hover:text-blue-400 text-sm transition-colors">
                  123 Learning Street, Knowledge City, 10001
                </p>
              </a>
              
              <a href="tel:+15551234567" className="flex items-center group hover:text-blue-400 transition-colors">
                <Phone size={16} className="text-gray-400 group-hover:text-blue-400 mr-3 flex-shrink-0 transition-colors" />
                <p className="text-gray-400 group-hover:text-blue-400 text-sm transition-colors">
                  +1 (555) 123-4567
                </p>
              </a>
              
              <a href="mailto:support@skillshare-example.com" className="flex items-center group hover:text-blue-400 transition-colors">
                <Mail size={16} className="text-gray-400 group-hover:text-blue-400 mr-3 flex-shrink-0 transition-colors" />
                <p className="text-gray-400 group-hover:text-blue-400 text-sm transition-colors">
                  support@skillshare-example.com
                </p>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm inline-flex items-center group"
                    >
                      <span className="border-b border-transparent group-hover:border-blue-400 transition-colors">
                        {link.name}
                      </span>
                      <ArrowRight 
                        size={12} 
                        className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" 
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-lg">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest courses and community updates.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full py-3 pl-4 pr-12 rounded-lg bg-gray-800 border border-gray-700 
                            focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none 
                            text-sm text-white placeholder-gray-500"
                  aria-label="Email for newsletter"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`absolute right-2 top-2 p-2 rounded-md ${
                    isSubmitting ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
                  } transition-colors flex items-center justify-center`}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
                  ) : (
                    <Send size={16} className="text-white" />
                  )}
                </button>
              </div>
              
              {submitStatus === 'success' && (
                <p className="text-green-400 text-xs">Thanks for subscribing!</p>
              )}
              
              {submitStatus === 'error' && (
                <p className="text-red-400 text-xs">Subscription failed. Please try again.</p>
              )}
              
              <div className="flex items-center space-x-3 mt-6">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    aria-label={`Follow us on ${social.label}`}
                    className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} SkillShare. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
            
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 text-gray-400 hover:text-white transition-all duration-300"
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