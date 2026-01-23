import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Users, 
  Mail, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Clock,
  TrendingUp,
  BarChart2,
  Smartphone,
  Globe,
  Award,
  Lightbulb,
  PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Learn: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [hoveredUseCase, setHoveredUseCase] = React.useState<number | null>(null);
  const navigate = useNavigate();

  const useCases = [
    {
      title: 'Student Success',
      description: 'Academic goal setting, study planning, and career preparation guidance.',
      icon: <BookOpen className="w-6 h-6" />,
      features: ['Study timeline creation', 'Skill gap analysis', 'Career path planning'],
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Entrepreneur Growth',
      description: 'Business idea validation, growth strategies, and milestone tracking.',
      icon: <TrendingUp className="w-6 h-6" />,
      features: ['Business plan development', 'Market analysis', 'Growth tracking'],
      color: 'from-purple-500 to-fuchsia-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Personal Development',
      description: 'Life goal clarification, habit formation, and personal growth tracking.',
      icon: <Award className="w-6 h-6" />,
      features: ['Goal clarification', 'Habit tracking', 'Progress monitoring'],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100'
    }
  ];

  const roadmapItems = [
    {
      version: 'v1.0',
      title: 'Core Agent System',
      status: 'Live',
      features: ['5 specialized AI agents', 'Gmail integration', 'Basic chat interface'],
      date: 'Q4 2024',
      icon: <Zap className="w-5 h-5" />,
      progress: 100
    },
    {
      version: 'v1.1',
      title: 'Enhanced Analytics',
      status: 'In Development',
      features: ['Progress visualization', 'Goal tracking dashboard', 'Performance insights'],
      date: 'Q1 2025',
      icon: <BarChart2 className="w-5 h-5" />,
      progress: 65
    },
    {
      version: 'v1.2',
      title: 'Team Collaboration',
      status: 'Planning',
      features: ['Shared goals', 'Team challenges', 'Collaborative planning'],
      date: 'Q2 2025',
      icon: <Users className="w-5 h-5" />,
      progress: 15
    },
    {
      version: 'v2.0',
      title: 'Mobile Experience',
      status: 'Research',
      features: ['Native mobile app', 'Offline capability', 'Push notifications'],
      date: 'Q3 2025',
      icon: <Smartphone className="w-5 h-5" />,
      progress: 5
    }
  ];

  const faqs = [
    {
      question: 'How does Dhraviq help achieve goals?',
      answer: 'Dhraviq uses multiple specialized AI agents that work together to provide comprehensive guidance. Each agent focuses on a specific aspect like goal clarification, skill mapping, timeline creation, progress coaching, and mindset development.'
    },
    {
      question: 'What makes the multi-agent approach unique?',
      answer: 'Instead of relying on a single AI, Dhraviq employs five specialized agents that each bring expertise in different areas. This provides more thorough, well-rounded advice that addresses all aspects of goal achievement.'
    },
    {
      question: 'How do Gmail reminders work?',
      answer: 'When enabled, our GmailAgent sends personalized daily reminders based on your session insights. These emails help maintain momentum and provide ongoing motivation tailored to your specific goals.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we prioritize your privacy and security. All conversations are encrypted, and we never share your personal information. You have full control over your data and can delete it at any time.'
    }
  ];

  const stats = [
    { value: '85%', label: 'Goal Achievement Rate', icon: <Target className="w-6 h-6" />, description: 'Higher success rate than traditional methods' },
    { value: '30+', label: 'Minutes Saved Daily', icon: <Clock className="w-6 h-6" />, description: 'Automated planning saves valuable time' },
    { value: '4.9/5', label: 'User Satisfaction', icon: <CheckCircle className="w-6 h-6" />, description: 'Based on user feedback surveys' },
    { value: '3x', label: 'Faster Progress', icon: <TrendingUp className="w-6 h-6" />, description: 'Compared to self-directed approaches' }
  ];

  const features = [
    {
      title: "Multi-Agent System",
      description: "Five specialized AI agents working in harmony",
      icon: <Users className="w-6 h-6" />,
      color: "text-indigo-600 bg-indigo-100"
    },
    {
      title: "Personalized Guidance",
      description: "Tailored to your specific goals and needs",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Progress Tracking",
      description: "Visual metrics and milestone celebration",
      icon: <PieChart className="w-6 h-6" />,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Global Accessibility",
      description: "Available anytime, anywhere",
      icon: <Globe className="w-6 h-6" />,
      color: "text-blue-600 bg-blue-100"
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleScheduleDemo = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20"
          >
            <span className="mr-2">🚀</span> Now with enhanced AI capabilities
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transform Your Goal <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-200">Achievement</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover how Dhraviq's AI-powered platform provides personalized guidance through intelligent multi-agent collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScheduleDemo}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-lg font-medium text-gray-700 mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4"
            >
              Key Features
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Dhraviq</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you achieve your goals effectively
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 rounded-full opacity-10"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                  Our Vision
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Redefining Goal Achievement</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We believe everyone deserves clarity, autonomy, and measurable progress 
                  toward their goals. Dhraviq combines cutting-edge AI technology with 
                  proven goal-achievement methodologies to provide personalized guidance 
                  that adapts to your unique journey.
                </p>
                <div className="space-y-4">
                  {[
                    "Personalized AI guidance",
                    "Multi-agent collaboration",
                    "Continuous support & motivation",
                    "Data-driven insights"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 h-full shadow-inner border border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Goal Achievement Rate
                    </h3>
                    <p className="text-5xl font-bold text-indigo-600 mb-2">85%</p>
                    <p className="text-sm text-gray-600">
                      Users report significant progress within 30 days
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              Applications
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Can Benefit</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dhraviq adapts to various contexts and goals across different life stages
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredUseCase(index)}
                onMouseLeave={() => setHoveredUseCase(null)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group relative"
              >
                <div className={`h-2 bg-gradient-to-r ${useCase.color}`}></div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 ${useCase.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${hoveredUseCase === index ? 'transform scale-110' : ''}`}>
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{useCase.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                  <ul className="space-y-3">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              Future Plans
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Roadmap</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our vision for continuous improvement and innovation
            </p>
          </div>
          
          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.status === 'Live' ? 'bg-green-100 text-green-600' :
                        item.status === 'In Development' ? 'bg-blue-100 text-blue-600' :
                        item.status === 'Planning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            item.status === 'Live' ? 'bg-green-100 text-green-800' :
                            item.status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{item.version}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === 'Live' ? 'bg-green-500' :
                          item.status === 'In Development' ? 'bg-blue-500' :
                          item.status === 'Planning' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`} 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              Need Help?
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Dhraviq
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Goal Achievement?</h2>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
              Join thousands of users who are achieving their goals faster with Dhraviq's AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetStarted}
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-lg"
              >
                Get Started for Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScheduleDemo}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Learn;