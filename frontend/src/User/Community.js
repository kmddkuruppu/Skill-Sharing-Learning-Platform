import { useState, useEffect } from 'react';
import { Users, MessageSquare, Award, TrendingUp, ChevronRight, Activity, Globe, Heart } from 'lucide-react';

export default function CommunityOverview() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const communityStats = [
    { icon: <Users size={20} />, label: 'Active Members', value: '18.5K+' },
    { icon: <MessageSquare size={20} />, label: 'Daily Discussions', value: '250+' },
    { icon: <Award size={20} />, label: 'Knowledge Shared', value: '12K+' },
    { icon: <Activity size={20} />, label: 'Projects Completed', value: '5.7K+' }
  ];

  const featuredGroups = [
    { id: 1, name: 'Web Development', members: 4328, discussions: 215, category: 'coding', color: 'bg-blue-500' },
    { id: 2, name: 'Food Photography', members: 2891, discussions: 178, category: 'photography', color: 'bg-purple-500' },
    { id: 3, name: 'Interior Design DIY', members: 3106, discussions: 192, category: 'diy', color: 'bg-green-500' },
    { id: 4, name: 'Global Cuisines', members: 3745, discussions: 203, category: 'cooking', color: 'bg-red-500' }
  ];

  const recentActivities = [
    { id: 1, user: 'Emily Chen', action: 'posted in', target: 'Web Development', time: '10 min ago', avatar: '/api/placeholder/40/40' },
    { id: 2, user: 'Marcus Johnson', action: 'shared a project in', target: 'Interior Design DIY', time: '25 min ago', avatar: '/api/placeholder/40/40' },
    { id: 3, user: 'Sophia Lee', action: 'responded to a thread in', target: 'Food Photography', time: '1 hour ago', avatar: '/api/placeholder/40/40' },
    { id: 4, user: 'David Rivera', action: 'started a new discussion in', target: 'Global Cuisines', time: '2 hours ago', avatar: '/api/placeholder/40/40' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <header className={`relative py-20 flex items-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/70 z-10"></div>
          <img 
            src="/api/placeholder/1600/400" 
            alt="Community Banner" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-30">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full mb-4">
              <p className="text-purple-300 text-sm font-medium flex items-center">
                <Globe size={16} className="mr-2" />
                A global community of learners and experts
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Community</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Connect with passionate individuals, share your knowledge, collaborate on projects, 
              and build meaningful relationships in our diverse learning community.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                Join Community
              </button>
              <button className="px-6 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full hover:border-purple-400 transition-all font-medium">
                Browse Groups
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Stats */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div 
                key={index} 
                className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700"
              >
                <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Groups</h2>
            <button className="mt-4 md:mt-0 text-blue-400 hover:text-blue-300 flex items-center font-medium">
              View All Groups <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGroups.map((group) => (
              <div 
                key={group.id}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 ${group.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{group.name}</h3>
                  
                  <div className="flex justify-between mb-6">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-400">{group.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-400">{group.discussions} discussions</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Community Activity</h2>
            <button className="mt-4 md:mt-0 text-blue-400 hover:text-blue-300 flex items-center font-medium">
              View All Activities <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id}
                className={`p-6 flex items-center ${index !== recentActivities.length - 1 ? 'border-b border-gray-700' : ''}`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-300">
                    <span className="font-semibold text-white">{activity.user}</span> {activity.action} <span className="text-blue-400">{activity.target}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                
                <button className="ml-4 p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <Heart size={18} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-12 text-center relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-gradient-radial from-blue-400 to-transparent"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join our community?</h2>
              <p className="text-gray-300 mb-8">
                Become part of a global network of learners and experts sharing knowledge and growing together.
              </p>
              
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/20">
                Create Your Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}