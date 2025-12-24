'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaBuilding, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaEnvelope, 
  FaTimes, 
  FaBars,
  FaChevronRight,
  FaBed,
  FaCity,
  FaUserFriends
} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: FaHome,
    description: 'Back to homepage'
  },
  {
    label: 'Browse Properties',
    href: '/listings',
    icon: FaBuilding,
    description: 'View all listings'
  },
  {
    label: 'About Us',
    href: '/about',
    icon: FaInfoCircle,
    description: 'Learn more about us'
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: FaEnvelope,
    description: 'Get in touch'
  }
];

const categoryItems = [
  {
    label: 'PG & Hostels',
    href: '/listings?type=pg',
    icon: FaBed,
    count: '150+ properties'
  },
  {
    label: 'Apartments',
    href: '/listings?type=apartment',
    icon: FaBuilding,
    count: '200+ properties'
  },
  {
    label: 'Co-living Spaces',
    href: '/listings?type=coliving',
    icon: FaUserFriends,
    count: '80+ properties'
  },
  {
    label: 'Studios',
    href: '/listings?type=studio',
    icon: FaCity,
    count: '120+ properties'
  }
];

const popularLocations = [
  { name: 'Bangalore', count: '200+' },
  { name: 'Mumbai', count: '180+' },
  { name: 'Delhi', count: '150+' },
  { name: 'Pune', count: '120+' },
  { name: 'Hyderabad', count: '100+' },
  { name: 'Chennai', count: '90+' }
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onToggle();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, onToggle]);

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
              <FaHome className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Niwas</span> Nest
              </h2>
              <p className="text-xs text-gray-400">Find your perfect stay</p>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Main Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
            <div className="w-4 h-0.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mr-2"></div>
            Navigation
          </h3>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && onToggle()}
                  className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-white border border-orange-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`mr-3 text-lg transition-colors ${
                    isActive ? 'text-orange-400' : 'text-gray-400 group-hover:text-orange-400'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <FaChevronRight className="text-orange-400 text-sm" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
            <div className="w-4 h-0.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mr-2"></div>
            Categories
          </h3>
          <div className="space-y-2">
            {categoryItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && onToggle()}
                  className="group flex items-center px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Icon className="mr-3 text-lg text-gray-400 group-hover:text-orange-400 transition-colors" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400">
                      {item.count}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Popular Locations */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
            <div className="w-4 h-0.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mr-2"></div>
            Popular Cities
          </h3>
          <div className="space-y-1">
            {popularLocations.map((location) => (
              <Link
                key={location.name}
                href={`/listings?city=${location.name}`}
                onClick={() => isMobile && onToggle()}
                className="group flex items-center justify-between px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-sm text-gray-500 group-hover:text-orange-400 transition-colors" />
                  <span className="text-sm font-medium">{location.name}</span>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-400">
                  {location.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Serving customers since 2024</span>
          </div>
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Niwas Nest. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" />
        )}
        
        {/* Mobile Sidebar */}
        <div
          id="sidebar"
          className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent />
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div
      className={`hidden md:flex flex-col h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-80' : 'w-16'
      } sticky top-0`}
    >
      {isOpen ? (
        <SidebarContent />
      ) : (
        // Collapsed Desktop Sidebar
        <div className="p-4 space-y-4">
          <button
            onClick={onToggle}
            className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <FaBars size={20} />
          </button>
          
          <div className="space-y-2">
            {navigationItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block p-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={item.label}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}