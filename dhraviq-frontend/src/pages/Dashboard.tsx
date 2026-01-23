import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthProvider';

const Dashboard: React.FC = () => {
  const [totalSessions, setTotalSessions] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
  const { user, loading: authLoading } = useAuthContext();





  useEffect(() => {
    if (user === undefined) return;
    if (!user || !user.uid) {
      setIsLoadingData(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const sessionCount = parseInt(data.totalSessions ?? 0);
        const streakCount = parseInt(data.streakDays ?? 0);
        setTotalSessions(isNaN(sessionCount) ? 0 : sessionCount);
        setStreakDays(isNaN(streakCount) ? 0 : streakCount);
      } else {
        setTotalSessions(0);
        setStreakDays(0);
      }
      setIsLoadingData(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (isLoadingData) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        duration: 0.5
      }
    }
  };

  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-emerald-100 text-emerald-800',
    'bg-purple-100 text-purple-800',
    'bg-amber-100 text-amber-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800'
  ];

  const skillData = [
    {
      title: "AI Engineering",
      growth: "+38%",
      icon: "🤖",
      tags: ["Python", "LLMs", "ML Ops"],
      description: "Specialized in developing and implementing AI solutions using cutting-edge technologies."
    },
    {
      title: "Cybersecurity",
      growth: "+31%",
      icon: "🔒",
      tags: ["Network", "Cloud", "SIEM"],
      description: "Protecting systems and networks from digital attacks and vulnerabilities."
    },
    {
      title: "Data Analytics",
      growth: "+29%",
      icon: "📊",
      tags: ["SQL", "Power BI", "Tableau"],
      description: "Transforming raw data into meaningful insights for business decisions."
    },
    {
      title: "Prompt Engineering",
      growth: "+27%",
      icon: "💬",
      tags: ["NLP", "Generative AI"],
      description: "Crafting effective prompts to optimize AI model outputs."
    },
    {
      title: "Full Stack Web Dev",
      growth: "+24%",
      icon: "🌐",
      tags: ["React", "Node.js", "Firebase"],
      description: "Building complete web applications from frontend to backend."
    }
  ];

  const toggleSkill = (index: number) => {
    setExpandedSkill(expandedSkill === index ? null : index);
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    );
  }



  if (!user) {
    return <Navigate to="/auth" replace />;
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-indigo-600">{user?.name || user?.displayName || "User"}</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Here's your personalized dashboard with progress and recommendations.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
      >
        <motion.div 
          variants={itemVariants} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Sessions</p>
          <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${Math.min(totalSessions * 5, 100)}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              Achieved
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Goals Completed</p>
          <p className="text-2xl font-bold text-gray-900">{Math.floor(totalSessions * 0.7)}</p>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${Math.min(Math.floor(totalSessions * 0.7) * 5, 100)}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              Success
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Success Rate</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalSessions === 0 ? '0%' : `${Math.round((Math.floor(totalSessions * 0.7) / totalSessions) * 100)}%`}
          </p>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full" 
              style={{ width: `${totalSessions === 0 ? 0 : Math.round((Math.floor(totalSessions * 0.7) / totalSessions) * 100)}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              Streak
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Current Mark</p>
          <p className="text-2xl font-bold text-gray-900">{streakDays}</p>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full" 
              style={{ width: `${Math.min(streakDays * 5, 100)}%` }}
            ></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Start New Chat Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="relative"
        >
          <Link
            to="/chat"
            className="block group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-95"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Start New Chat</h2>
                  <p className="text-white/90 text-sm leading-relaxed max-w-md">
                    Begin a conversation with our AI agents to work on your goals and create actionable plans.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 shadow-inner">
                  <Plus className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex items-center mt-6">
                <span className="text-white/90 text-sm font-medium">Get started now</span>
                <ArrowRight className="w-4 h-4 text-white ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Trending Skills Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Trending Skills</h2>
            </div>
          </div>

          <div className="space-y-4">
            {skillData.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-50 hover:bg-white border border-gray-100 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleSkill(index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-0.5">{skill.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {skill.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {skill.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              tagColors[tagIndex % tagColors.length]
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full mr-3">
                      {skill.growth}
                    </span>
                    {expandedSkill === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedSkill === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 text-gray-600 text-sm border-t border-gray-100">
                        {skill.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Pro Tip</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              For the best results, be specific about your goals and current situation.
              Our AI agents work better when they understand your context, challenges,
              and desired outcomes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;