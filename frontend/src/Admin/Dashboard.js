import React, { useState, useEffect } from "react";
import { 
  Users, Brain, Book, Calendar, BarChart, Settings, Coffee, 
  Trophy, Zap, Star, Briefcase, CircleUser, MessageSquare, Clock
} from "lucide-react";

// Modified Card Component - without send message button and with perfect circle profile
const Card = ({ name, title, icon, link, bgColor, accentColor = "purple" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Default images for each team members
  const teamImages = {
    Dinupa: "/api/placeholder/200/200",
    Udesha: "/api/placeholder/200/200",
    Chamodi: "../assets/images/chamodi.jpg",
    Dasun: "../assets/images/dasun.jpg",
  };

  // Use placeholder images
  const displayImage = teamImages[name] || null;

  // Color mapping for different accent colors
  const colorVariants = {
    purple: {
      border: "border-purple-400",
      text: "text-purple-400",
      bg: "bg-purple-400",
      hoverText: "group-hover:text-purple-300",
      hoverBorder: "group-hover:border-purple-400"
    },
    blue: {
      border: "border-blue-400",
      text: "text-blue-400",
      bg: "bg-blue-400",
      hoverText: "group-hover:text-blue-300",
      hoverBorder: "group-hover:border-blue-400"
    },
    emerald: {
      border: "border-emerald-400",
      text: "text-emerald-400",
      bg: "bg-emerald-400",
      hoverText: "group-hover:text-emerald-300",
      hoverBorder: "group-hover:border-emerald-400"
    },
    amber: {
      border: "border-amber-400",
      text: "text-amber-400",
      bg: "bg-amber-400",
      hoverText: "group-hover:text-amber-300",
      hoverBorder: "group-hover:border-amber-400"
    }
  };

  return (
    <div 
      className={`${bgColor} relative group h-80 w-full rounded-xl p-6 overflow-hidden border border-gray-700 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
           style={accentColor === 'purple' ? {background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 70%)"} : 
                  accentColor === 'blue' ? {background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"} :
                  accentColor === 'emerald' ? {background: "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.3) 0%, transparent 70%)"} :
                  {background: "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)"}}></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)'}}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between">
        {/* Profile image with futuristic frame - aspect ratio fixed to be perfectly round */}
        <div className="relative w-32 h-32 mb-4 group-hover:scale-105 transition-transform duration-300">
          <div className={`absolute inset-0 rounded-full border-2 ${colorVariants[accentColor].border} transition-all duration-300`}></div>
          <div className={`absolute inset-0 rounded-full border-4 border-transparent ${colorVariants[accentColor].border}/20 transition-all duration-300`} 
               style={{animation: 'spin 15s linear infinite'}}></div>
          <div className={`absolute inset-0 rounded-full border-4 border-transparent ${colorVariants[accentColor].border}/20 transition-all duration-300`}
               style={{animation: 'spin 10s linear infinite reverse'}}></div>
          
          <div 
            className="w-full h-full rounded-full bg-cover bg-center border-2 border-gray-700 shadow-inner overflow-hidden"
            style={{ 
              backgroundImage: displayImage ? `url(${displayImage})` : 'none',
              aspectRatio: '1/1' // Ensure perfect circle
            }}
          >
            {/* Fallback if image doesn't load */}
            {!displayImage && (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className={`text-4xl font-bold ${colorVariants[accentColor].text}`}>{name.charAt(0)}</span>
              </div>
            )}
          </div>
          
          {/* Icon badge */}
          <div className={`absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-gray-900 border-2 ${colorVariants[accentColor].border} flex items-center justify-center shadow-lg`}>
            {React.cloneElement(icon, { className: `${colorVariants[accentColor].text} w-5 h-5` })}
          </div>
        </div>
        
        {/* Text content */}
        <div className="text-center w-full">
          {/* Name with animated underline */}
          <h3 className="text-2xl font-bold text-white mb-1">
            {name}
            <span className={`block h-0.5 ${colorVariants[accentColor].bg} mt-1 mx-auto transition-all duration-500`} 
                  style={{width: isHovered ? '75%' : '0'}}></span>
          </h3>
          
          {/* Title with subtle animation */}
          <p className={`text-gray-300 text-sm font-medium transition-all duration-300 ${colorVariants[accentColor].hoverText} mb-6`}>
            {title}
          </p>

          {/* Send Message button removed */}
        </div>
        
        {/* Holographic button */}
        <button
          className={`relative px-6 py-2 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-600 overflow-hidden ${colorVariants[accentColor].hoverBorder} transition-all duration-300 w-fit`}
        >
          <span className="relative z-10 text-white font-medium flex items-center">
            View Dashboard
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''} ${colorVariants[accentColor].text}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={accentColor === 'purple' ? {background: "linear-gradient(to right, rgba(168, 85, 247, 0.3), transparent)"} : 
                      accentColor === 'blue' ? {background: "linear-gradient(to right, rgba(59, 130, 246, 0.3), transparent)"} :
                      accentColor === 'emerald' ? {background: "linear-gradient(to right, rgba(52, 211, 153, 0.3), transparent)"} :
                      {background: "linear-gradient(to right, rgba(251, 191, 36, 0.3), transparent)"}}></span>
        </button>
      </div>
      
      {/* Corner accents */}
      <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${colorVariants[accentColor].border} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 ${colorVariants[accentColor].border} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
};

// Sidebar Navigation Item
const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
        active 
          ? 'bg-purple-500/20 text-purple-400 border-l-4 border-purple-500' 
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {active && (
        <div className="ml-auto w-2 h-2 rounded-full bg-purple-400"></div>
      )}
    </div>
  );
};

// Small Stat Card
const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center space-x-4 hover:shadow-lg transition-all duration-300 hover:border-gray-600`}>
      <div className={`p-3 rounded-lg ${color === 'purple' ? 'bg-purple-500/20' : color === 'blue' ? 'bg-blue-500/20' : color === 'emerald' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-gray-400 text-sm">{title}</h4>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Format date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  // Team member data without stats
  const teamMembers = [
    {
      name: "Dinupa",
      title: "Project Leader",
      icon: <Star />,
      link: "/admin/dinupa",
      bgColor: "bg-gray-900",
      accentColor: "purple"
    },
    {
      name: "Dasun",
      title: "Learning Plan Management",
      icon: <Zap />,
      link: "/admin/dasun",
      bgColor: "bg-gray-900",
      accentColor: "blue"
    },
    {
      name: "Chamodi",
      title: "Skill Sharing Management",
      icon: <Book />,
      link: "/admin/chamodi",
      bgColor: "bg-gray-900",
      accentColor: "emerald"
    },
    {
      name: "Udesha",
      title: "UX/UI Designer",
      icon: <Briefcase />,
      link: "/admin/udesha",
      bgColor: "bg-gray-900",
      accentColor: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <Brain className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">SkillShare</h1>
            <p className="text-xs text-gray-400">Learning Platform</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-1">
          <NavItem 
            icon={<BarChart className="w-5 h-5" />} 
            label="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem 
            icon={<Users className="w-5 h-5" />} 
            label="Team Members" 
            active={activeTab === "team"} 
            onClick={() => setActiveTab("team")}
          />
          <NavItem 
            icon={<Book className="w-5 h-5" />} 
            label="Courses" 
            active={activeTab === "courses"} 
            onClick={() => setActiveTab("courses")}
          />
          <NavItem 
            icon={<Calendar className="w-5 h-5" />} 
            label="Schedule" 
            active={activeTab === "schedule"} 
            onClick={() => setActiveTab("schedule")}
          />
          <NavItem 
            icon={<Trophy className="w-5 h-5" />} 
            label="Skills" 
            active={activeTab === "skills"} 
            onClick={() => setActiveTab("skills")}
          />
          <NavItem 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="Messages" 
            active={activeTab === "messages"} 
            onClick={() => setActiveTab("messages")}
          />
        </nav>
        
        <div className="mt-auto">
          <div className="border-t border-gray-800 pt-4 mt-4">
            <NavItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Settings" 
              active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")}
            />
          </div>
          
          {/* User profile - ensuring perfect circle avatar */}
          <div className="flex items-center space-x-3 mt-4 p-3 rounded-lg bg-gray-800/50">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center" style={{aspectRatio: '1/1'}}>
              <CircleUser className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Admin User</h4>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, Admin</h1>
            <p className="text-gray-400">Here's what's happening with your skill sharing platform</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Date and Time Display */}
            <div className="flex items-center space-x-2 pr-4 border-r border-gray-700">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">{formattedTime}</p>
                <p className="text-xs text-gray-400">{formattedDate}</p>
              </div>
            </div>
            
            <button className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 flex items-center space-x-2 hover:bg-purple-500/30 transition-all duration-300">
              <Coffee className="w-4 h-4" />
              <span>Take a Break</span>
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Users className="w-6 h-6 text-blue-400" />}
            title="Total Students"
            value="1,248"
            color="blue"
          />
          <StatCard 
            icon={<Book className="w-6 h-6 text-emerald-400" />}
            title="Active Courses"
            value="42"
            color="emerald"
          />
          <StatCard 
            icon={<Trophy className="w-6 h-6 text-amber-400" />}
            title="Skills Shared"
            value="156"
            color="amber"
          />
          <StatCard 
            icon={<BarChart className="w-6 h-6 text-purple-400" />}
            title="Completion Rate"
            value="78%"
            color="purple"
          />
        </div>
        
        {/* Team Members */}
        <h2 className="text-2xl font-bold mb-6">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              name={member.name}
              title={member.title}
              icon={member.icon}
              link={member.link}
              bgColor={member.bgColor}
              accentColor={member.accentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;