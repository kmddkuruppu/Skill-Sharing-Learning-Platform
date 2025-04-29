import { useState, useEffect } from 'react';
import { Star, Quote, ArrowRight, BookOpen, Award, Calendar, ChevronRight, TrendingUp } from 'lucide-react';

export default function SuccessStories() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'coding', name: 'Coding' },
    { id: 'cooking', name: 'Cooking' },
    { id: 'photography', name: 'Photography' },
    { id: 'diy', name: 'DIY Crafts' }
  ];

  const featuredStories = [
    {
      id: 1,
      name: "David Chen",
      title: "From Novice to Full-Stack Developer in 6 Months",
      category: "coding",
      image: "/api/placeholder/400/400",
      quote: "I had zero coding experience when I started. The structured learning path and supportive community helped me land my dream job at a tech startup.",
      rating: 5,
      position: "Software Engineer at TechFlow",
      achievements: ["Completed 12 coding courses", "Built 5 full-stack applications", "Received job offer within 2 weeks of completing the program"],
      date: "January 2025"
    },
    {
      id: 2,
      name: "Sophia Rodriguez",
      title: "Turned My Cooking Passion Into a Thriving Business",
      category: "cooking",
      image: "/api/placeholder/400/400",
      quote: "The expert guidance from professional chefs taught me not just recipes, but the science and business of food. Now I run my own catering company.",
      rating: 5,
      position: "Founder of Taste Fusion Catering",
      achievements: ["Mastered 4 international cuisines", "Started a catering business with 20+ regular clients", "Featured in Local Food Magazine"],
      date: "November 2024"
    },
    {
      id: 3,
      name: "Marcus Johnson",
      title: "From Amateur Shots to Professional Photography",
      category: "photography",
      image: "/api/placeholder/400/400",
      quote: "The detailed feedback on my work and advanced techniques taught by industry professionals transformed my photography skills completely.",
      rating: 5,
      position: "Professional Photographer",
      achievements: ["Published in National Geographic", "Won 2 photography contests", "Now teaching workshops of my own"],
      date: "December 2024"
    },
    {
      id: 4,
      name: "Emily Thompson",
      title: "DIY Skills That Launched My Etsy Empire",
      category: "diy",
      image: "/api/placeholder/400/400",
      quote: "I learned everything from woodworking to textile arts, and now my handmade products sell out within hours of listing them.",
      rating: 5,
      position: "Owner of HandcraftedJoy Shop",
      achievements: ["Generated $50K in first year", "Built a community of 15K followers", "Featured in Etsy's Editor Picks"],
      date: "October 2024"
    }
  ];

  const regularStories = [
    {
      id: 5,
      name: "Ryan Kim",
      category: "coding",
      image: "/api/placeholder/100/100",
      quote: "The React courses helped me transition from backend to full-stack development. My salary increased by 40%.",
      position: "Senior Developer"
    },
    {
      id: 6,
      name: "Priya Sharma",
      category: "cooking",
      image: "/api/placeholder/100/100",
      quote: "Learning authentic Indian cooking techniques helped me connect with my heritage and start a popular food blog.",
      position: "Food Blogger"
    },
    {
      id: 7,
      name: "James Wilson",
      category: "photography",
      image: "/api/placeholder/100/100",
      quote: "The night photography course completely transformed my astrophotography skills. Now I sell prints online.",
      position: "Landscape Photographer"
    },
    {
      id: 8,
      name: "Olivia Garcia",
      category: "diy",
      image: "/api/placeholder/100/100",
      quote: "I learned jewelry making from scratch and now my pieces are sold in three local boutiques.",
      position: "Artisan Jeweler"
    },
    {
      id: 9,
      name: "Noah Williams",
      category: "coding",
      image: "/api/placeholder/100/100",
      quote: "The Python data science track helped me pivot careers from marketing to data analysis without getting another degree.",
      position: "Data Analyst"
    },
    {
      id: 10,
      name: "Aisha Johnson",
      category: "cooking",
      image: "/api/placeholder/100/100",
      quote: "The business of baking course gave me the confidence to open my own bakery which is now thriving.",
      position: "Bakery Owner"
    }
  ];

  const filteredFeatured = activeCategory === 'all' 
    ? featuredStories 
    : featuredStories.filter(story => story.category === activeCategory);

  const filteredRegular = activeCategory === 'all'
    ? regularStories
    : regularStories.filter(story => story.category === activeCategory);

  const metrics = [
    { label: "Success Rate", value: "94%", description: "of active learners report career advancement" },
    { label: "Salary Increase", value: "45%", description: "average salary boost after certification" },
    { label: "Career Changes", value: "2,500+", description: "successful career transitions last year" },
    { label: "Businesses Launched", value: "1,200+", description: "new ventures started by our learners" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <header className={`relative py-32 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-gray-900/95 z-10"></div>
          <img 
            src="/api/placeholder/1920/600" 
            alt="Success Stories Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full mb-4">
              <p className="text-blue-300 text-sm font-medium flex items-center justify-center">
                <TrendingUp size={16} className="mr-2" />
                Real results from real learners
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block mb-2">Success Stories</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">From Our Community</span>
            </h1>
            
            <p className="text-xl text-gray-300">
              Discover how people like you transformed their skills, careers, and lives through our learning platform.
            </p>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto pb-4 justify-center space-x-3">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Featured Success Stories</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredFeatured.map((story, index) => (
              <div 
                key={story.id}
                className={`bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all duration-500 transform hover:border-blue-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{transitionDelay: `${index * 150}ms`}}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400" fill="#FACC15" />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">{story.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                    
                    <div className="flex items-start mb-4">
                      <Quote size={20} className="text-blue-400 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-gray-300 italic">{story.quote}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg">{story.name}</h4>
                      <p className="text-sm text-gray-400">{story.position}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {story.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center">
                          <Award size={16} className="text-purple-400 mr-2" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-6 text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium">
                      Read full story <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 text-center"
              >
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                  {metric.value}
                </h3>
                <h4 className="text-xl font-medium mb-2">{metric.label}</h4>
                <p className="text-gray-400 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Success Stories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">More Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRegular.map((story, index) => (
              <div 
                key={story.id}
                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 mr-0.5" fill="#FACC15" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4 text-sm">"{story.quote}"</p>
                    <h4 className="font-semibold">{story.name}</h4>
                    <p className="text-sm text-gray-400">{story.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Write Your Own Success Story?</h2>
            <p className="text-xl text-gray-300">
              Join thousands of learners who transformed their lives through our platform.
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20">
                Start Learning Now
              </button>
              <button className="px-8 py-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-all font-medium">
                Browse All Courses
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}