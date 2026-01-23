import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion } from 'framer-motion';

const Topbar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, user } = useAppContext();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass border-b border-white/20 px-4 py-3 flex items-center justify-between relative z-30 safe-top"
    >
      {/* Left: Toggle + Logo */}
      <div className="flex items-center space-x-3 mt-1 sm:mt-2">
        {/* Sidebar Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/70 hover:bg-white text-slate-700 shadow-sm transition-all duration-200 border border-slate-200"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5 transition-all duration-200" />
          ) : (
            <Menu className="w-5 h-5 transition-all duration-200" />
          )}
        </motion.button>

        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text block">Dhraviq</span>
        </Link>
      </div>

      {/* Marquee */}
      <div className="flex-1 min-w-0 overflow-hidden pt-3 sm:pt-4">
        <div className="relative w-full h-9 sm:h-10">
          {/* Fades */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="whitespace-nowrap animate-marquee text-[14px] sm:text-[15px] text-slate-700 font-semibold tracking-wide px-2 sm:px-4 leading-7 sm:leading-8">
            ✨ Empowering You to Achieve More 🚀 Multi-Agent AI Guidance 📬 Personalized Email Coaching 🎯 Precision Goal Planning 🧠 Smarter Decisions Daily 🌱 Progress with Purpose 📊 Clarity Through Systems 🔥 Consistency Over Chaos 📈 Daily Micro-Wins 💡 Insight-Driven Choices 🧭 Navigate Life Better 🎓 Learn. Reflect. Improve. 🎉 Celebrate Small Wins 💬 Clear Thoughts, Clear Actions 🪄 AI-Powered Guidance 🧘 Balanced Progression 🧬 Evolution with Intention 📌 Purpose-Centered Design 🎨 Architect Your Life 📥 Strategic Reminders, No Overload 🌐 Growth with Global Insight 💎 Sharpen Your Focus 📚 Knowledge in Motion 🛠️ Tools for Self-Leadership 🌟 Achieve What Matters 📍 Systems for Success 🌤️ Vision Into Action 🧩 Modular Thinking, Seamless Execution 🔑 Unlock Flow State 📅 Align Your Time & Energy 🏆 Built for Achievers 🛤️ Clarity in Complexity 📖 Reflective Insights that Guide 🧠 Context-Aware Intelligence ⚙️ Discipline Meets Innovation 📈 Drive with Direction 💬 Intention-Focused Conversations 🌱 Sustainable Performance 🛎️ Motivated by Meaning 💬 Progress Through Pattern 🧭 Precision in Every Step 📐 Measure What Matters ✨ Empowered, Not Overwhelmed 🚀 Launch Life Goals, Faster 🎯 Your Goals, AI-Aligned 📍 Results with Responsibility 💼 AI That Works With You 📬 Mental Clarity, Delivered 💥 High-Impact Focus Tools 🧠 Strategic Self-Tuning 📣 Feedback for Growth 📆 Plan. Track. Win. 🧰 Build Habits That Scale 🔭 Think Long-Term, Act Daily 🎓 Master Your Routine 🧬 Grow One Day at a Time 📌 Small Tasks, Big Wins 🏗️ Build Your Momentum 🔓 Unlock Your Best Self 🧘‍♂️ AI for Personal Balance 📊 Visualize Progress Realistically 💭 From Thinking to Doing 🌟 Smart Reminders, Deep Work 🎨 Design Your Journey 💻 AI Co-Pilot for Life 🧠 Intelligence that Adapts to You 📈 Reflect, Refine, Rise 🧠 Calm Clarity, Every Day 🏁 Achieve with Flow, Not Force 💡 Empowered Execution, Simplified.
          </div>
        </div>
      </div>

      {/* Right Section: Profile */}
      {user && (
        <div className="flex items-center space-x-3">
          <Link
            to="/profile"
            className="flex items-center space-x-3 px-3 py-2 hover:bg-white/60 rounded-xl transition-all duration-200 hover-lift tap-scale group"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-medium text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-teal-500 rounded-full border border-white"></div>
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 hidden sm:block transition-colors duration-200">
              {user.name}
            </span>
          </Link>
        </div>
      )}
    </motion.header>
  );
};

export default Topbar;
