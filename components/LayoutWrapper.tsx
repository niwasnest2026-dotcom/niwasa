'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useSidebar } from '@/hooks/useSidebar';

interface LayoutWrapperProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function LayoutWrapper({ children, showSidebar = false }: LayoutWrapperProps) {
  const { isOpen, toggle } = useSidebar();

  if (!showSidebar) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} onToggle={toggle} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header onSidebarToggle={toggle} showSidebarToggle={true} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}