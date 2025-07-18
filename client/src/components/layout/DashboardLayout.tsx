import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="crypto-dashboard-theme">
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          
          <div className="flex-1 flex flex-col min-h-screen">
            <TopBar />
            
            <main className="flex-1 p-6 space-y-6">
              {children}
            </main>
          </div>
        </div>
        
        {/* Theme toggle positioned globally */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}