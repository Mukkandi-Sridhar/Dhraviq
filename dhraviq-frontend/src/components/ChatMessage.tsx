import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  agentName?: string;
  agentEmoji?: string;
  animate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  agentName,
  agentEmoji,
  animate = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimated = useRef(false); // ✅ prevent re-typing on focus

  useEffect(() => {
    if (!animate || isUser || hasAnimated.current) {
      setDisplayedText(message);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        hasAnimated.current = true; // ✅ don't animate again
        clearInterval(interval);
      }
    }, 5); // 💨 adjust typing speed here

    return () => clearInterval(interval);
  }, [message, animate, isUser]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`max-w-4xl ${isUser ? 'ml-12' : 'mr-12'} w-full`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: isUser ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`flex items-center space-x-3 mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
              isUser
                ? 'bg-indigo-200 text-indigo-800'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
            }`}
          >
            {isUser ? (
              <User className="w-5 h-5" />
            ) : agentEmoji ? (
              <span className="text-lg">{agentEmoji}</span>
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-semibold ${
                isUser ? 'text-indigo-700' : 'text-slate-700'
              }`}
            >
              {isUser ? 'You' : agentName || 'Assistant'}
            </span>
            {!isUser && isTyping && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Message Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: isUser ? 0 : 0.2 }}
          className={`relative group ${
            isUser
              ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl'
              : 'glass border border-white/40 text-slate-800 shadow-lg'
          } px-6 py-4 rounded-3xl hover:shadow-2xl transition-all duration-300`}
        >
          {/* Optional user icon */}
          {isUser && (
            <div className="absolute top-3 right-3 opacity-60">
              <User className="w-4 h-4" />
            </div>
          )}

          <div className="prose prose-sm sm:prose-base max-w-none text-[15px] pr-8 prose-headings:font-semibold prose-p:my-1 prose-ul:pl-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayedText}
            </ReactMarkdown>

            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-current ml-1"
              />
            )}
          </div>

          {/* Copy Button */}
          {!isUser && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 hover:bg-white/80 rounded-xl transition-all duration-200 group-hover:opacity-100"
            >
              {copied ? (
                <Check className="w-4 h-4 text-teal-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-500" />
              )}
            </motion.button>
          )}

          {/* Timestamp */}
          <div
            className={`text-xs mt-2 ${
              isUser ? 'text-indigo-100' : 'text-slate-500'
            }`}
          >
            {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
