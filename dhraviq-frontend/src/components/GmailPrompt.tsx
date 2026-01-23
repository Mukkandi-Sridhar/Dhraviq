import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Sparkles, Clock, Zap } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface GmailPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
}

const GmailPrompt: React.FC<GmailPromptProps> = ({ isOpen, onClose, onEnable }) => {
  const { setGmailEnabled } = useAppContext();

  const handleEnable = () => {
    setGmailEnabled(true);
    onEnable();
    onClose();
  };

  const features = [
    { icon: CheckCircle, text: 'Personalized daily insights', color: 'text-indigo-600' },
    { icon: Clock, text: 'Perfect timing reminders', color: 'text-emerald-600' },
    { icon: Zap, text: 'AI-powered motivation', color: 'text-purple-600' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              staggerChildren: 0.1,
              delayChildren: 0.2
            }}
            className="bg-white border border-white/40 rounded-3xl p-5 sm:p-8 w-full max-w-md relative shadow-xl"
          >
            {/* Gradient decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full translate-y-12 -translate-x-12 pointer-events-none z-0" />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-xl transition-all duration-200 z-50"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </motion.button>

            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md"
              >
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-2xl font-bold text-neutral-900 mb-2 sm:mb-3"
              >
                Enable Gmail Reminders?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
              >
                Get daily motivational reminders based on this session's insights. Stay on track with your goals through personalized email support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <Icon className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-sm sm:text-base font-medium text-slate-800">
                        {feature.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-2xl transition-all duration-200 font-medium"
                >
                  Maybe Later
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnable}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-md"
                >
                  Enable Reminders
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GmailPrompt;
