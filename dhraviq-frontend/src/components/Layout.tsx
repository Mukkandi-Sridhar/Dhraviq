import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const location = useLocation();
  
  // Auto-collapse sidebar on chat page for mobile
  React.useEffect(() => {
    if (location.pathname.startsWith('/chat') && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname, setSidebarOpen]);

  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';
  
  if (isHomePage || isAuthPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : 'ml-0'
        }`}
      >
        <Topbar />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;