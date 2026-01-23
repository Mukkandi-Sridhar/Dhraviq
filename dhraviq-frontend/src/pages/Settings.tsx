import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Moon, 
  Sun, 
  Trash2, 
  Bell, 
  User, 
  Settings as SettingsIcon, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, gmailEnabled, setGmailEnabled } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  const toggleGmail = () => setGmailEnabled(!gmailEnabled);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion would be processed here.');
    }
  };

  const SettingCard = ({ 
    title, 
    description, 
    icon: Icon,
    children 
  }: {
    title: string;
    description: string;
    icon: React.ComponentType<{className?: string}>;
    children: React.ReactNode;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
          <p className="text-sm text-neutral-600 mb-4">{description}</p>
          {children}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-medium">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Settings</h1>
              <p className="text-neutral-600">Manage your account preferences</p>
            </div>
          </div>

          {/* Settings tabs */}
          <div className="flex space-x-2 border-b border-gray-200 pb-2">
            {['account', 'preferences', 'danger'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-neutral-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Account Settings */}
            {activeTab === 'account' && (
              <>
                <SettingCard 
                  title="Account Information" 
                  description="View and manage your account details"
                  icon={User}
                >
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-neutral-500 mb-1">Email</p>
                      <p className="font-medium text-neutral-800">{user?.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-medium text-neutral-700">Personal Information</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Email Preferences" 
                  description="Manage your email notifications"
                  icon={Mail}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-neutral-800">Gmail Reminders</p>
                        <p className="text-xs text-neutral-500">Daily motivational emails</p>
                      </div>
                      <button
                        onClick={toggleGmail}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          gmailEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            gmailEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </SettingCard>
              </>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <>
                <SettingCard 
                  title="Appearance" 
                  description="Customize your theme and display"
                  icon={Moon}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-neutral-800">Dark Mode</p>
                        <p className="text-xs text-neutral-500">Switch between themes</p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                        disabled
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Notifications" 
                  description="Manage your notification preferences"
                  icon={Bell}
                >
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 opacity-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-800">Session Reminders</p>
                          <p className="text-xs text-neutral-500">Get reminded about your goals</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Coming soon</span>
                      </div>
                    </div>
                  </div>
                </SettingCard>
              </>
            )}

            {/* Danger Zone */}
            {activeTab === 'danger' && (
              <div className="lg:col-span-2">
                <SettingCard 
                  title="Danger Zone" 
                  description="Irreversible actions"
                  icon={Zap}
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-600 mb-4">
                        This will permanently erase all your data including chat history and preferences.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Settings;