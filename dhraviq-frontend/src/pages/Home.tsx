import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, Target, Users, Mail, ArrowRight, CheckCircle, 
  Sparkles, Zap, Shield, MessageSquare, TrendingUp, 
  Lock, Star, BarChart2, Globe, Award, Clock, Calendar
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Home: React.FC = () => {
  const { user } = useAppContext();

  const features = [
    {
      icon: Target,
      title: 'Intelligent Goal Setting',
      description: 'AI-powered goal refinement with strategic planning and milestone tracking.',
      gradient: 'from-indigo-500 to-purple-600',
      delay: 0.1
    },
    {
      icon: Users,
      title: 'Multi-Agent System',
      description: 'Five specialized AI agents working in harmony to provide comprehensive guidance.',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: Mail,
      title: 'Smart Reminders',
      description: 'Personalized reminders that adapt to your progress and motivation needs.',
      gradient: 'from-teal-500 to-cyan-500',
      delay: 0.3
    }
  ];

  const roadmapItems = [
    { 
      version: 'v1.1', 
      title: 'Enhanced Analytics', 
      status: 'In Development',
      description: 'Advanced progress tracking and insights dashboard',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      version: 'v1.2', 
      title: 'Team Collaboration', 
      status: 'Planning',
      description: 'Shared goals and collaborative achievement tracking',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      version: 'v2.0', 
      title: 'Mobile Experience', 
      status: 'Research',
      description: 'Native mobile app with offline capabilities',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const stats = [
    { number: '100+', label: 'Goals Achieved', icon: Target },
    { number: '90%', label: 'Success Rate', icon: Zap },
    { number: '24/7', label: 'AI Support', icon: Shield }
  ];

  const testimonials = [
    {
      quote: "Dhraviq transformed how I approach my goals. The AI guidance is like having a personal coach available anytime.",
      author: "Bhanu",
      role: "Entrepreneur",
      rating: 5
    },
    {
      quote: "The multi-agent system provides perspectives I wouldn't have considered. My productivity has doubled!",
      author: "Vamsi",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "Finally a tool that actually helps me follow through on my ambitions. The reminders are perfectly timed.",
      author: "Charan",
      role: "Marketing Director",
      rating: 4
    }
  ];

  const floatingIcons = [
    { icon: Target, position: 'top-20 left-20', size: 'w-8 h-8' },
    { icon: TrendingUp, position: 'top-32 right-32', size: 'w-6 h-6' },
    { icon: Zap, position: 'top-64 left-1/4', size: 'w-7 h-7' },
    { icon: Lock, position: 'top-80 right-20', size: 'w-5 h-5' },
    { icon: MessageSquare, position: 'top-96 left-1/3', size: 'w-6 h-6' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className={`absolute ${item.position} ${item.size} text-slate-200`}
              animate={{
                y: [0, -15, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-full h-full" />
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-4 sm:px-6 py-4 flex items-center justify-between relative z-10 max-w-7xl mx-auto"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dhraviq
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          {user ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Get Started
            </Link>
          )}
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 text-center max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/80 backdrop-blur-sm rounded-full mb-6 sm:mb-8 border border-indigo-200/50 shadow-sm"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">AI-Powered Goal Achievement</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block"
            >
              Clarity.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Autonomy.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="block"
            >
              Progress.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto text-balance"
          >
            Transform your goals into reality with our revolutionary multi-agent AI system. 
            Experience personalized guidance that adapts to your unique journey and accelerates your success.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-white text-slate-800 font-medium text-lg rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Why Choose Dhraviq?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto text-balance">
              Experience the future of goal achievement with our sophisticated AI ecosystem 
              designed for ambitious individuals and teams.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300"
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Trusted by Achievers
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from people who transformed their productivity with Dhraviq
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                    />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Product Roadmap
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 text-balance">
              Exciting innovations and features coming to Dhraviq
            </p>
          </motion.div>
          
          <div className="space-y-4 sm:space-y-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <span className="text-white font-bold text-sm sm:text-lg">{item.version}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{item.title}</h3>
                      <span className={`text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-full ${
                        item.status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-12 sm:py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">Dhraviq</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-6 max-w-md">
                Empowering individuals and teams to achieve their most ambitious goals 
                through intelligent AI collaboration and personalized guidance.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 sm:mb-6 text-base sm:text-lg">Learn</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
                <li>
                  <Link 
                    to={user ? "/dashboard" : "/auth"}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Features
                  </Link>
                </li>
                <li>
                  <Link 
                    to={user ? "/dashboard" : "/auth"}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link 
                    to={user ? "/dashboard" : "/auth"}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 sm:mb-6 text-base sm:text-lg">Connect</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
                <li>
                  <Link 
                    to={user ? "/dashboard" : "/auth"}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to={user ? "/dashboard" : "/auth"}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Support
                  </Link>
                </li>
                <li>
                  <Link 
                    to={user ? "/dashboard" : "/auth"}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 mt-8 sm:mt-12 text-center text-slate-400 text-sm sm:text-base">
            <p>&copy; {new Date().getFullYear()} Dhraviq. All rights reserved. Built with ❤️ for ambitious achievers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
