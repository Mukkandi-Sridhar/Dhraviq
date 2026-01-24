import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  LayoutDashboard,
  BookOpen,
  Mail,
  Settings,
  User,
  LogOut,
  Brain,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, user, setUser, gmailEnabled } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', gradient: 'from-blue-500 to-indigo-600' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', gradient: 'from-purple-500 to-pink-600' },
    { icon: MessageSquare, label: 'New Chat', path: '/chat', gradient: 'from-indigo-500 to-purple-600' },
    { icon: BookOpen, label: 'Learn', path: '/learn', gradient: 'from-green-500 to-emerald-600' },
    { icon: Mail, label: 'Contact', path: '/contact', gradient: 'from-orange-500 to-red-600' },
    { icon: Settings, label: 'Settings', path: '/settings', gradient: 'from-slate-500 to-slate-600' },
    { icon: User, label: 'Profile', path: '/profile', gradient: 'from-cyan-500 to-blue-600' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: {
      x: -320,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed left-0 top-0 h-full w-80 glass border-r border-white/20 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between p-6 border-b border-slate-200/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">Dhraviq</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 lg:hidden tap-scale"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </motion.div>

            {/* User Info */}
            {user && (
              <motion.div
                variants={itemVariants}
                className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-sm text-slate-600 truncate">{user.email}</p>
                  </div>
                </div>
                {gmailEnabled && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 inline-flex items-center px-3 py-1.5 bg-teal-100 text-teal-800 text-xs rounded-full font-medium"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
                    Gmail reminders active
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div key={item.path} variants={itemVariants}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        // Auto-close sidebar after 5 seconds on all devices
                        setTimeout(() => {
                          setSidebarOpen(false);
                        }, 5000);
                      }}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 hover-lift tap-scale ${isActive
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-lg border border-indigo-200/50'
                          : 'text-slate-700 hover:bg-white hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive
                            ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                            : 'bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-slate-200 group-hover:to-slate-300'
                          }`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'}`} />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <ChevronRight className="w-4 h-4 text-indigo-600" />
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Logout */}
            {user && (
              <motion.div
                variants={itemVariants}
                className="p-4 border-t border-slate-200/50"
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3.5 text-slate-700 hover:bg-red-50 hover:text-red-700 rounded-2xl transition-all duration-300 hover-lift tap-scale group"
                >
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-red-100 rounded-2xl flex items-center justify-center transition-all duration-300">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;