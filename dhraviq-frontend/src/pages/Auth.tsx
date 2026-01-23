import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mail, Lock, User, Eye, EyeOff, Chrome, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { signInWithGoogle, signInWithEmail, registerWithEmail } from '@/lib/auth';
import { saveUserToFirestore } from '@/lib/user';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState({
    google: false,
    email: false
  });
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speedX: number, speedY: number}>>([]);
  
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating particles for background
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2
    }));
    setParticles(newParticles);

    // Animation loop for particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX) % 100,
        y: (p.y + p.speedY) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));
    setError('');

    try {
      const result = isLogin
        ? await signInWithEmail(formData.email, formData.password)
        : await registerWithEmail(formData.email, formData.password);

      const user = result.user;

      await saveUserToFirestore(user, formData.name);

      setUser({
        id: user.uid,
        name: user.displayName || formData.name || user.email?.split("@")[0] || 'User',
        email: user.email || '',
        photoURL: user.photoURL || ''
      });

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Auth error:", err.message);
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(prev => ({ ...prev, google: true }));
    setError('');
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await saveUserToFirestore(user);

      setUser({
        id: user.uid,
        name: user.displayName || user.email?.split("@")[0] || 'User',
        email: user.email || '',
        photoURL: user.photoURL || ''
      });

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      {/* Floating particles background */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-indigo-100 opacity-40"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, particle.speedX * 100],
            y: [0, particle.speedY * 100],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      <div className="w-full max-w-md z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-10"
        >
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 sm:space-x-3 mb-6 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                rotate: isHovered ? [0, 10, -10, 0] : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
            </motion.div>
            <motion.span 
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: isHovered ? '100% 50%' : '0% 50%'
              }}
              transition={{ duration: 1.5, ease: 'linear' }}
              style={{
                backgroundSize: isHovered ? '400% 400%' : '200% 200%'
              }}
            >
              Dhraviq
            </motion.span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xs mx-auto">
              {isLogin 
                ? 'Sign in to continue your journey' 
                : 'Join us to start achieving your goals'
              }
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100/50"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-50/90 text-red-600 rounded-lg text-sm flex items-start border border-red-100"
            >
              <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading.google}
            className="w-full mb-4 sm:mb-6 py-3 sm:py-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200 font-medium text-slate-700 flex items-center justify-center space-x-3 relative overflow-hidden"
          >
            {loading.google ? (
              <>
                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-sm z-0"></div>
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin z-10" />
                <span className="z-10">Signing in with Google</span>
              </>
            ) : (
              <>
                <Chrome className="w-5 h-5 text-slate-600" />
                <span>Continue with Google</span>
              </>
            )}
          </motion.button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/90 text-slate-500 text-sm">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 pl-10 sm:pl-12 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/80 hover:bg-white"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 pl-10 sm:pl-12 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/80 hover:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/80 hover:bg-white"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-slate-500">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading.email}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-80 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center relative overflow-hidden"
            >
              {loading.email && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="absolute bottom-0 left-0 h-1 bg-indigo-300/50"
                />
              )}
              {loading.email ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          <motion.div 
            className="mt-6 sm:mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-slate-600 text-sm sm:text-base">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-slate-400">
            By continuing, you agree to our <a href="#" className="text-indigo-500 hover:underline">Terms</a> and <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;