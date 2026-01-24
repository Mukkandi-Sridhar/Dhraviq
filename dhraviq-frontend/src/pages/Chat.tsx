import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Zap, X, ChevronDown, Loader2, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import ChatMessage from '../components/ChatMessage';
import AgentSelector from '../components/AgentSelector';
import GmailPrompt from '../components/GmailPrompt';
import { auth } from '../lib/firebase';
import { updateUserProgress } from '@/lib/firestoreHelpers';
import { useAuthContext } from "@/contexts/AuthProvider";
import { Navigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  agentName?: string;
  agentEmoji?: string;
  timestamp: Date;
  isError?: boolean;
}
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const agentIdMap: Record<string, string> = {
  "goal-clarifier": "GoalClarifier",
  "skill-map": "SkillMap",
  "timeline-wizard": "TimelineWizard",
  "progress-coach": "ProgressCoach",
  "mindset-mentor": "MindsetMentor"
};

const Chat: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const {
    selectedAgents,
    gmailEnabled,
    setSelectedAgents,
    setSidebarOpen
  } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [showGmailPrompt, setShowGmailPrompt] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [hasUpdatedProgress, setHasUpdatedProgress] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const agentsContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const agents = {
    GoalClarifier: { name: "Goal Clarifier", emoji: "🎯", color: "bg-blue-100 text-blue-800" },
    SkillMap: { name: "Skill Map", emoji: "📚", color: "bg-green-100 text-green-800" },
    TimelineWizard: { name: "Timeline Wizard", emoji: "⏳", color: "bg-purple-100 text-purple-800" },
    ProgressCoach: { name: "Progress Coach", emoji: "📈", color: "bg-amber-100 text-amber-800" },
    MindsetMentor: { name: "Mindset Mentor", emoji: "🧠", color: "bg-pink-100 text-pink-800" }
  };

  // Generate unique message IDs
  const generateMessageId = (prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      // Reset height to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Calculate the height (max 3 lines)
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const maxHeight = lineHeight * 3;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    };

    // Adjust height when input changes
    adjustHeight();

    // Add event listener for window resize (for font size changes)
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, [inputValue]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check backend connection and authentication
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${BASE_URL}/health`);
        if (!res.ok) throw new Error("Backend not available");
        setConnectionError(false);
      } catch (error) {
        console.error("Backend connection error:", error);
        setConnectionError(true);
        addSystemMessage("⚠️ Backend service unavailable. Please try again later.", true);
      }
    };

    checkBackend();

    if (!loading && !user && messages.length === 0) {
      addSystemMessage("🔒 Please sign in to access the chat");
    }

  }, [user]);

  // Show Gmail prompt if needed
  useEffect(() => {
    if (!sessionId && !gmailEnabled && user) {
      setTimeout(() => setShowGmailPrompt(true), 1500);
    }
  }, [sessionId, gmailEnabled, user]);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-scroll agents container when new agents are added
  useEffect(() => {
    if (agentsContainerRef.current) {
      agentsContainerRef.current.scrollLeft = agentsContainerRef.current.scrollWidth;
    }
  }, [selectedAgents]);

  const addSystemMessage = (content: string, isError = false) => {
    const newMessage = {
      id: generateMessageId("sys"),
      content,
      isUser: false,
      agentName: "System",
      agentEmoji: isError ? "⚠️" : "🔒",
      timestamp: new Date(),
      isError
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (connectionError) {
      addSystemMessage("❌ Cannot connect to server. Please try again later.", true);
      return;
    }

    if (!inputValue.trim()) {
      addSystemMessage("❌ Please enter a message", true);
      return;
    }

    if (selectedAgents.length === 0) {
      addSystemMessage("❌ Please select at least one AI agent", true);
      return;
    }

    const userMessage: Message = {
      id: generateMessageId("user"),
      content: inputValue,
      isUser: true,
      agentName: "You",
      agentEmoji: "👤",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Auto-close sidebar on first message for better screen space
    if (messages.length === 0) {
      setSidebarOpen(false);
    }

    try {
      const token = await auth.currentUser?.getIdToken();
      const backendAgents = selectedAgents.map(agent => agentIdMap[agent] || agent);

      const payload = {
        userId: user?.uid,
        question: inputValue.trim(),
        agents: backendAgents,
        email: user?.email || undefined,
        send_email: gmailEnabled
      };

      const response = await fetch(`${BASE_URL}/run_agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || ''}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.responses) {
        throw new Error("Invalid response format from server");
      }

      const agentMessages = Object.entries(data.responses).map(([agentId, content], index) => {
        const agent = agents[agentId as keyof typeof agents] || {
          name: agentId,
          emoji: '💡',
          color: 'bg-gray-100 text-gray-800'
        };

        return {
          id: generateMessageId(agentId),
          content: content as string,
          isUser: false,
          agentName: agent.name,
          agentEmoji: agent.emoji,
          timestamp: new Date()
        };
      });

      setMessages(prev => [...prev, ...agentMessages]);

      if (!hasUpdatedProgress && auth.currentUser?.uid) {
        try {
          await updateUserProgress(auth.currentUser.uid, {
            totalSessions: 1,
            goalsAchieved: 1,
            successRate: 100,
            streakDays: 1,
            hoursSaved: 1
          });
          setHasUpdatedProgress(true);
        } catch (err) {
          console.error("Firestore progress update failed", err);
        }
      }

    } catch (error) {
      console.error("Message sending failed:", error);
      addSystemMessage(`❌ Error: ${error instanceof Error ? error.message : 'Failed to send message'}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const removeAgent = (agentId: string) => {
    setSelectedAgents(prev => prev.filter(id => id !== agentId));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Responsive Header */}
      <header
        ref={headerRef}
        className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 w-full"
      >
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center">
            <div className={`${windowWidth >= 768 ? 'w-10 h-10' : 'w-8 h-8'} bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center`}>
              <Sparkles className={`${windowWidth >= 768 ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
            </div>
            <span className={`ml-2 ${windowWidth >= 768 ? 'text-xl' : 'text-lg'} font-semibold text-gray-900`}>Dhraviq</span>
          </Link>
        </div>

        {/* Responsive Agents Display */}
        <div className="flex-1 min-w-0 mx-2">
          {selectedAgents.length > 0 ? (
            <div
              ref={agentsContainerRef}
              className={`flex items-center ${windowWidth >= 768 ? 'space-x-2' : 'space-x-1'} overflow-x-auto scrollbar-hide`}
            >
              {selectedAgents.map((agentId) => {
                const mappedId = agentIdMap[agentId] || agentId;
                const agent = agents[mappedId as keyof typeof agents] || {
                  name: mappedId,
                  emoji: "💡",
                  color: "bg-gray-100 text-gray-800"
                };

                return (
                  <motion.div
                    key={agentId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-shrink-0 relative group"
                  >
                    <div className={`inline-flex items-center ${windowWidth >= 768 ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'} ${agent.color} rounded-full font-medium shadow-sm`}>
                      <span className="mr-1">{agent.emoji}</span>
                      <span className={`truncate ${windowWidth >= 768 ? 'max-w-[120px]' : 'max-w-[80px]'}`}>
                        {windowWidth >= 768 ? agent.name : agent.name.split(' ')[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => removeAgent(agentId)}
                      className={`absolute ${windowWidth >= 768 ? '-top-2 -right-2 w-5 h-5' : '-top-1.5 -right-1.5 w-4 h-4'} bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm`}
                    >
                      <X className={`${windowWidth >= 768 ? 'w-3 h-3' : 'w-2 h-2'} text-white`} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 mx-auto max-w-md">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-yellow-700">
                Choose agents to begin
              </span>
            </div>
          )}
        </div>

        {/* Responsive Action Button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => user ? setShowAgentSelector(true) : navigate('/auth')}
            className={`${windowWidth >= 768 ? 'p-3' : 'p-2'} rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors`}
          >
            <Sparkles className={`${windowWidth >= 768 ? 'w-6 h-6' : 'w-5 h-5'}`} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`${windowWidth >= 768 ? 'w-32 h-32' : 'w-24 h-24'} bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl`}
              >
                <Zap className={`${windowWidth >= 768 ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`${windowWidth >= 768 ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-3`}
              >
                {user ? "Start Your Goal Journey" : "Welcome to AI Chat"}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-gray-600 ${windowWidth >= 768 ? 'text-lg' : 'text-base'} max-w-md mb-6`}
              >
                {user
                  ? "Select AI agents and ask about career goals, skills, or technical challenges."
                  : "Sign in to chat with our specialized AI agents."}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => user ? setShowAgentSelector(true) : navigate('/auth')}
                className={`px-6 py-3 ${windowWidth >= 768 ? 'text-lg' : ''} bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md flex items-center`}
              >
                <Sparkles className={`${windowWidth >= 768 ? 'w-6 h-6 mr-3' : 'w-5 h-5 mr-2'}`} />
                {user ? "Select AI Agents" : "Sign In"}
              </motion.button>
            </div>
          ) : (
            <div className={`${windowWidth >= 768 ? 'max-w-4xl' : 'max-w-3xl'} mx-auto space-y-6`}>
              {messages
                .filter((message, index, self) =>
                  index === self.findIndex(m => m.id === message.id)
                )
                .map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatMessage
                      message={message.content}
                      isUser={message.isUser}
                      agentName={message.agentName}
                      agentEmoji={message.agentEmoji}
                      isError={message.isError}
                      timestamp={message.timestamp}
                    />
                  </motion.div>
                ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-6"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">AI agents are thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 safe-bottom">
          <div className={`${windowWidth >= 768 ? 'max-w-4xl' : 'max-w-3xl'} mx-auto`}>
            {!user ? (
              <div className="text-center py-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/auth')}
                  className={`px-6 py-3 ${windowWidth >= 768 ? 'text-lg' : ''} bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm`}
                >
                  Sign In to Enable Chat
                </motion.button>
              </div>
            ) : connectionError ? (
              <div className="text-center py-3 text-red-500 bg-red-50 rounded-lg">
                ⚠️ Connection error. Please check your network and try again.
              </div>
            ) : (
              <motion.div
                layout
                className="flex items-end space-x-3"
              >
                <motion.div
                  layout
                  className="flex-1 relative bg-gray-50 rounded-xl transition-all"
                  style={{
                    boxShadow: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      selectedAgents.length === 0
                        ? "Select AI agents first, then ask about career goals or technical questions..."
                        : "Ask about career goals, skills, or technical challenges..."
                    }
                    className="w-full px-4 py-3 pr-12 bg-transparent border-0 focus:ring-0 resize-none placeholder-gray-400 text-gray-800 outline-none overflow-hidden"
                    rows={1}
                    disabled={selectedAgents.length === 0 || isLoading}
                    style={{
                      minHeight: '56px',
                      maxHeight: '84px' // Approximately 3 lines (assuming line-height of 1.5 * 16px base)
                    }}
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || selectedAgents.length === 0 || isLoading}
                  className={`p-3 rounded-xl flex-shrink-0 transition-all ${!inputValue.trim() || selectedAgents.length === 0 || isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md'}`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Agent Selector Modal */}
      <AnimatePresence>
        {showAgentSelector && (
          <AgentSelector
            isOpen={showAgentSelector}
            onClose={() => setShowAgentSelector(false)}
            onSelect={(agents) => setSelectedAgents(agents)}
          />
        )}
      </AnimatePresence>

      {/* Gmail Prompt Modal */}
      <AnimatePresence>
        {showGmailPrompt && (
          <GmailPrompt
            isOpen={showGmailPrompt}
            onClose={() => setShowGmailPrompt(false)}
            onEnable={() => console.log('Gmail integration enabled')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
