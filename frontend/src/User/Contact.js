import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      await response.json(); // Parse the response if needed
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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
            src="../assets/images/contact.jpg" 
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
                  
                  {error && (
                    <div className="bg-red-900/30 backdrop-blur-sm border border-red-500 rounded-lg p-4 text-red-300">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center font-medium shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
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
                src="../assets/images/map.jpg" 
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
      <h2 className="text-2xl font-bold mb-6 text-white">Connect With Us</h2>
      <p className="text-gray-400 mb-8">Follow us on social media for daily tips, updates, and inspiration</p>
      
      <div className="flex justify-center space-x-6">
        {[
          { name: 'facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
          { name: 'twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
          { name: 'instagram', path: 'M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.275-.061-1.65-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
          { name: 'linkedin', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
          { name: 'youtube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
        ].map((platform) => (
          <a 
            key={platform.name}
            href="#"
            className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all border border-gray-700 hover:border-blue-400 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg 
              className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d={platform.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}