import { useState, useEffect } from 'react';
import { Users, Award, Globe, BookOpen, ChevronRight, Star, Calendar, CheckCircle } from 'lucide-react';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      role: 'CEO & Founder', 
      bio: 'Former education technology leader with a passion for democratizing knowledge and skill-building.',
      image: '/api/placeholder/300/300' 
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      role: 'CTO', 
      bio: 'Tech innovator focused on creating seamless learning experiences through cutting-edge technology.',
      image: '/api/placeholder/300/300' 
    },
    { 
      id: 3, 
      name: 'Aisha Patel', 
      role: 'Head of Content', 
      bio: 'Curriculum expert dedicated to curating high-quality, engaging educational content across disciplines.',
      image: '/api/placeholder/300/300' 
    },
    { 
      id: 4, 
      name: 'David Rodriguez', 
      role: 'Community Manager', 
      bio: 'Community builder passionate about fostering supportive learning environments for all skill levels.',
      image: '/api/placeholder/300/300' 
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded as a small coding tutorial platform' },
    { year: '2021', event: 'Expanded to 10+ skill categories and 100,000 users' },
    { year: '2022', event: 'Launched expert certification program' },
    { year: '2023', event: 'Reached 1 million active learners' },
    { year: '2024', event: 'Expanded globally with localized content in 12 languages' },
    { year: '2025', event: 'Reached 2 million active users and 5,000+ instructors' }
  ];

  const values = [
    { 
      title: 'Accessible Learning', 
      description: 'We believe quality education should be available to everyone, regardless of background or circumstances.',
      icon: <Globe size={24} />
    },
    { 
      title: 'Community Focus', 
      description: 'Our vibrant community of learners and teachers supports each other on every step of the learning journey.',
      icon: <Users size={24} />
    },
    { 
      title: 'Excellence', 
      description: 'We maintain the highest standards for our educational content and platform features.',
      icon: <Award size={24} />
    },
    { 
      title: 'Lifelong Learning', 
      description: 'We empower people to continuously develop their skills and knowledge throughout their lives.',
      icon: <BookOpen size={24} />
    }
  ];

  const partners = [
    { id: 1, name: 'TechCorp Inc.', logo: '/api/placeholder/120/50' },
    { id: 2, name: 'Global Education Alliance', logo: '/api/placeholder/120/50' },
    { id: 3, name: 'Innovate Learning', logo: '/api/placeholder/120/50' },
    { id: 4, name: 'SkillsForward', logo: '/api/placeholder/120/50' },
    { id: 5, name: 'Future Academy', logo: '/api/placeholder/120/50' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <header className="relative py-32 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/80 z-10"></div>
          <img 
            src="/api/placeholder/1920/800" 
            alt="Team collaborating" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full mb-6">
              <p className="text-blue-300 text-sm font-medium">Our Story</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Empowering Learners Worldwide
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're on a mission to democratize skill-building and knowledge sharing through our innovative learning platform.
            </p>
          </div>
        </div>
      </header>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-1">
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <img 
                    src="/api/placeholder/600/500" 
                    alt="Our mission" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-lg transform rotate-3 shadow-xl">
                <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded">
                  <div className="flex items-center space-x-3">
                    <Award size={24} className="text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">Trusted by</p>
                      <p className="text-lg font-bold">2M+ Learners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              
              <p className="text-lg text-gray-300">
                We believe that skills and knowledge should be accessible to everyone. Our platform connects passionate learners with expert instructors across a wide range of disciplines, creating a global community of growth and shared expertise.
              </p>
              
              <p className="text-lg text-gray-300">
                Whether you're looking to advance your career, pursue a passion project, or simply learn something new, our platform provides the resources, community, and expert guidance you need to succeed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {values.slice(0, 2).map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-500/20 p-3 rounded-full">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-gray-400">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-300">
              These principles guide everything we do as we build a platform that empowers learners and instructors worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-400 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-gray-300">
              From a small startup to a global learning platform, explore the key milestones in our growth story.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex flex-col lg:flex-row lg:even:flex-row-reverse items-center mb-12 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="flex-1 lg:pr-12 lg:even:pr-0 lg:even:pl-12 text-center lg:text-right lg:even:text-left">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</h3>
                    <p className="text-gray-300">{milestone.event}</p>
                  </div>
                </div>
                
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 z-10">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                
                <div className="flex-1 lg:pl-12 lg:even:pl-0 lg:even:pr-12 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-300">
              The passionate people behind our mission to democratize learning and skill-building worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all duration-500 transform hover:-translate-y-2 hover:border-blue-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
            <p className="text-lg text-gray-300">
              We collaborate with leading organizations to provide the best learning experience.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map(partner => (
              <div 
                key={partner.id} 
                className="bg-gray-700/30 backdrop-blur-sm p-6 rounded-xl grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img src={partner.logo} alt={partner.name} className="h-12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-12 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join our community?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Become part of our global learning platform today and start your journey toward mastering new skills.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20">
                  Join Now
                </button>
                <button className="px-8 py-4 bg-transparent border border-gray-400 rounded-full hover:border-white transition-all font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}