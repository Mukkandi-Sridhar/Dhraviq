import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Target,
  TrendingUp,
  Zap,
  Sparkles,
  BookOpen,
  Lightbulb,
  Mail,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { db, auth } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

interface UserData {
  name: string;
  email: string;
  totalSessions?: number;
  streakDays?: number;
  createdAt?: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUserData(data as UserData);
          setTotalSessions(data.totalSessions || 0);
          setStreakDays(data.streakDays || 0);
        }
      });
      return unsubscribe;
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  // Calculate derived stats
  const goalsAchieved = Math.floor(totalSessions * 0.7);
  const successRate = totalSessions > 0 
    ? Math.round((goalsAchieved / totalSessions) * 100)
    : 0;

  const stats = [
    { 
      label: 'Total Sessions', 
      value: totalSessions, 
      icon: MessageSquare, 
      color: 'from-blue-500 to-indigo-600',
      badge: 'Active Today'
    },
    { 
      label: 'Goals Achieved', 
      value: goalsAchieved, 
      icon: Target, 
      color: 'from-green-500 to-emerald-600',
      badge: 'Goal Boost'
    },
    { 
      label: 'Success Rate', 
      value: `${successRate}%`, 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-600',
      badge: 'Rising Focus'
    },
    { 
      label: 'Streak Days', 
      value: streakDays, 
      icon: Zap, 
      color: 'from-orange-500 to-red-600',
      badge: 'Daily Spark'
    }
  ];

  const techniques = [
    "Break down big goals into daily habits",
    "Track your small wins regularly",
    "Reflect weekly and adapt your approach",
    "Visualize your success daily",
    "Celebrate every milestone"
  ];

  const quote = {
    text: "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
    author: "Marie Forleo",
    emoji: "✨"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header - Fixed email container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6 w-full">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-medium">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 truncate">
                  {userData?.name || "User"}
                </h1>
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-neutral-600">
                  <div className="flex items-center min-w-0 max-w-full">
                    <Mail className="w-4 h-4 flex-shrink-0 mr-2" />
                    <span className="truncate text-ellipsis overflow-hidden">
                      {userData?.email || "No email"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium self-start md:self-center"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Rest of the component remains the same */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-medium`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {stat.badge}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-neutral-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-neutral-900">Techniques to Achieve Goals</h2>
            </div>
            <div className="space-y-4">
              {techniques.map((technique, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-indigo-50/50 rounded-xl"
                >
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-neutral-800">{technique}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col"
          >
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-neutral-900">Quote of the Day</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl mb-4">{quote.emoji}</span>
              <blockquote className="text-xl md:text-2xl font-medium text-neutral-800 mb-4">
                "{quote.text}"
              </blockquote>
              <p className="text-neutral-600">— {quote.author}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
