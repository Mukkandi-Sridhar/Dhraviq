import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Linkedin, Check, Clock, User, ChevronRight, X } from 'lucide-react';
import { db } from '@/lib/firebase'; // Make sure this path is correct
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Submit to Firestore
      await addDoc(collection(db, 'contactMessages'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: Timestamp.now(),
        status: 'unread'
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "For general inquiries and support",
      details: "support@dhraviq.com",
      color: "bg-blue-100 text-blue-600",
      action: "mailto:support@dhraviq.com"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      details: "Available 9AM-5PM (IST)",
      color: "bg-green-100 text-green-600",
      action: "#chat"
    },
    {
      icon: User,
      title: "Account Help",
      description: "For account-related questions",
      details: "accounts@dhraviq.com",
      color: "bg-purple-100 text-purple-600",
      action: "mailto:accounts@dhraviq.com"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Mukkandi-Sridhar',
      color: 'hover:bg-gray-900 hover:text-white text-gray-700',
      bg: 'bg-gray-100'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sridhar-mukkandi-a40663331/',
      color: 'hover:bg-blue-600 hover:text-white text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: MessageSquare,
      label: 'Telegram',
      href: 'https://t.me/Sridharroyal',
      color: 'hover:bg-blue-500 hover:text-white text-blue-500',
      bg: 'bg-blue-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium mb-6 shadow-sm border border-gray-200"
          >
            <span className="mr-2">💬</span> We're here to help
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or suggestions? We'd love to hear from you. 
            Reach out through any of these channels.
          </p>
        </motion.div>

        {/* Tab Navigation (Mobile) */}
        <div className="lg:hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'form' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Other Options
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${activeTab !== 'form' ? 'lg:block hidden' : 'block'}`}
          >
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">Message sent successfully!</p>
                      <p className="text-green-700 text-sm">We'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-red-800 font-medium">Error submitting form</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pl-11"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pl-11"
                      placeholder="Enter your email address"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none pl-11"
                      placeholder="Tell us about your questions, feedback, or suggestions..."
                    />
                    <div className="absolute top-3 left-3 pl-3 flex items-start pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`space-y-8 ${activeTab !== 'info' ? 'lg:block hidden' : 'block'}`}
          >
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Other ways to reach us</h3>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        className="group"
                      >
                        <a
                          href={method.action}
                          className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all duration-200 group-hover:shadow-sm"
                        >
                          <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center flex-shrink-0 mr-4`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{method.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-1">
                              {method.description}
                            </p>
                            <p className="text-indigo-600 text-sm font-medium">
                              {method.details}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect with us</h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 transition-all duration-300 ${social.color} ${social.bg}`}
                        >
                          <Icon className="w-6 h-6 mb-2" />
                          <span className="text-xs font-medium">{social.label}</span>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Response Time */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-sm border border-indigo-100 p-8"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Quick Response Time
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We typically respond to all inquiries within 24 hours during business days.
                    For urgent matters, please use our live chat option.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;