import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  const contactInfo = [
    { 
      icon: <Mail size={24} />, 
      title: 'Email Us', 
      details: 'support@skillshareplatform.com',
      description: 'We typically respond within 24 hours'
    },
    { 
      icon: <Phone size={24} />, 
      title: 'Call Us', 
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm EST'
    },
    { 
      icon: <MapPin size={24} />, 
      title: 'Visit Us', 
      details: '123 Innovation Street, Tech City, CA 94107',
      description: 'Book an appointment first'
    }
  ];

  const faqs = [
    {
      question: 'How do I become an instructor?',
      answer: 'To become an instructor, create an account, verify your credentials, and submit a course proposal through your dashboard. Our content team will review it within 5-7 business days.'
    },
    {
      question: 'Do you offer refunds for courses?',
      answer: 'Yes, we offer a 14-day satisfaction guarantee. If you are not satisfied with a course, you can request a full refund within 14 days of purchase.'
    },
    {
      question: 'How do I get a certificate after completing a course?',
      answer: 'Certificates are automatically generated upon 100% course completion. You can download your certificate from your dashboard or share it directly to your social profiles.'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <header className="relative py-32 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/80 z-10"></div>
          <img 
            src="../assets/images/contact-banner.jpg" 
            alt="Contact Us" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full mb-6">
              <p className="text-blue-300 text-sm font-medium">Get In Touch</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Let's Connect
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions about our platform? Want to become an instructor? We're here to help you on your learning journey.
            </p>
          </div>
        </div>
      </header>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-800 relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className={`bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-400 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-blue-400 font-medium mb-2">{item.details}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              {formSubmitted ? (
                <div className="bg-green-900/30 backdrop-blur-sm border border-green-500 rounded-xl p-8 text-center">
                  <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Message Sent Successfully!</h3>
                  <p className="text-gray-300 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)} 
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">Your Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-400 mb-2 text-sm">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">Your Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium shadow-lg shadow-blue-500/20"
                    >
                      Send Message <Send size={18} className="ml-2" />
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* FAQs */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: "150ms"}}>
              <div className="sticky top-10">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <p className="text-gray-300 mb-8">
                  Find quick answers to common questions about our platform.
                </p>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-start">
                          <MessageSquare size={20} className="text-blue-400 mr-3 mt-1 flex-shrink-0" />
                          {faq.question}
                        </h3>
                        <p className="text-gray-400 ml-8">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock size={20} className="mr-3 text-blue-400" />
                    Office Hours
                  </h3>
                  <div className="space-y-3">
                    {officeHours.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-300">{item.day}</span>
                        <span className="text-gray-400">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
            <p className="text-gray-300">
              We're located in the heart of Tech City. Feel free to schedule a visit!
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-1">
            <div className="bg-gray-900 rounded-xl overflow-hidden w-full h-96">
              {/* Placeholder for map - would be replaced with actual map component */}
              <img 
                src="/api/placeholder/1200/500" 
                alt="Office location map" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-12 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
              <p className="text-gray-300 mb-8">
                Subscribe to our newsletter for the latest updates, courses, and learning resources.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-l-full sm:rounded-r-none rounded-r-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-full sm:rounded-l-none rounded-l-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center">
                  Subscribe <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <p className="text-gray-400 mb-8">Follow us on social media for daily tips, updates, and inspiration</p>
            
            <div className="flex justify-center space-x-6">
              {/* Social media icons would go here */}
              {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map(platform => (
                <a 
                  key={platform} 
                  href="#" 
                  className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all border border-gray-700 hover:border-blue-400"
                >
                  <div className="w-5 h-5 bg-blue-400 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}