import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Search } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface Agent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  specialty: string;
  color: string;
  role: string;
}

const MAX_AGENTS = 2;


const agents: Agent[] = [
  {
    id: 'goal-clarifier',
    name: 'GoalClarifier',
    emoji: '🧠',
    description: 'Helps clarify and refine your goals with precision and strategic thinking',
    specialty: 'Strategic Planning',
    role: 'Strategic Mentor',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'skill-map',
    name: 'SkillMap',
    emoji: '📚',
    description: 'Maps skills needed to achieve your objectives with learning pathways',
    specialty: 'Skill Development',
    role: 'Learning Guide',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'timeline-wizard',
    name: 'TimelineWizard',
    emoji: '⏳',
    description: 'Creates realistic timelines and milestones for sustainable progress',
    specialty: 'Project Management',
    role: 'Time Strategist',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'progress-coach',
    name: 'ProgressCoach',
    emoji: '🪜',
    description: 'Tracks progress and provides accountability with motivational support',
    specialty: 'Performance Tracking',
    role: 'Accountability Partner',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'mindset-mentor',
    name: 'MindsetMentor',
    emoji: '💬',
    description: 'Develops growth mindset and mental resilience for lasting success',
    specialty: 'Mental Wellness',
    role: 'Mindset Coach',
    color: 'from-cyan-500 to-blue-600'
  }
];

interface AgentSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ isOpen, onClose }) => {
  const { selectedAgents, setSelectedAgents } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAgent = (agent: string) => {
    if (selectedAgents.includes(agent)) {
      // If already selected, deselect it
      setSelectedAgents(selectedAgents.filter(a => a !== agent));
    } else {
      // If not selected, only add if less than max
      if (selectedAgents.length >= MAX_AGENTS) {
        // silently ignore or show tooltip if needed
        return;
      }
      setSelectedAgents([...selectedAgents, agent]);
    }
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Bottom Sheet */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 glass rounded-t-3xl p-6 z-50 max-h-[85vh] overflow-y-auto safe-bottom"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Select AI Agents</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 tap-scale"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </motion.button>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 mb-6"
              >
              {filteredAgents.map((agent) => {
                const isSelected = selectedAgents.includes(agent.id);
                const isDisabled = !isSelected && selectedAgents.length >= MAX_AGENTS;

                return (
                  <motion.div key={agent.id} variants={itemVariants}>
                    <AgentCard
                      agent={agent}
                      isSelected={isSelected}
                      isDisabled={isDisabled}  // Pass this prop here!
                      onToggle={toggleAgent}
                    />
                  </motion.div>
                );
              })}


              </motion.div>

              {/* Search Bar at Bottom */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agents..."
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-400 text-sm"
                  autoFocus
                />
              </div>
            </motion.div>
          </div>

          {/* Desktop Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden lg:block fixed right-0 top-0 h-full w-96 glass border-l border-white/20 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Select AI Agents</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 tap-scale"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </motion.button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {filteredAgents.map((agent) => (
                    <motion.div key={agent.id} variants={itemVariants}>
                      <AgentCard
                        agent={agent}
                        isSelected={selectedAgents.includes(agent.id)}
                        onToggle={toggleAgent}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Search Bar at Bottom */}
              <div className="p-6 border-t border-slate-200/50">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search agents..."
                    className="w-full pl-12 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-400 text-sm"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onToggle: (agentId: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, onToggle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(agent.id)}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg group ${
        isSelected
          ? 'border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg ring-2 ring-indigo-500/20'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${agent.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <span className="text-2xl">{agent.emoji}</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">{agent.name}</h4>
              <p className="text-sm text-indigo-600 font-medium">{agent.role}</p>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full mt-1 inline-block">
                {agent.specialty}
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{agent.description}</p>
        </div>
        
        <motion.div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 transition-all duration-300 ${
            isSelected
              ? 'border-indigo-500 bg-indigo-500 shadow-lg'
              : 'border-slate-300 group-hover:border-indigo-300'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Selection glow effect */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default AgentSelector;