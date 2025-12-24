import Link from 'next/link';
import { FaLinkedinIn, FaEnvelope, FaPhone, FaHome, FaBuilding, FaMapMarkerAlt, FaUsers, FaChevronRight } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-xl text-neutral-300 mt-auto border-t-2 border-neutral-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <FaHome className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Niwas</span> 
                <span className="text-white ml-1">Nest</span>
              </h2>
            </div>
            <p className="text-neutral-400 leading-relaxed text-base mb-6">
              Your trusted partner in finding the perfect property. Making real estate simple and accessible.
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Serving customers since 2024</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="border-t sm:border-t-0 sm:border-l border-neutral-700/50 pt-8 sm:pt-0 sm:pl-8 lg:pl-10">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base">
                  <FaChevronRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 text-orange-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base">
                  <FaChevronRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 text-orange-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base">
                  <FaChevronRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 text-orange-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base">
                  <FaChevronRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 text-orange-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="border-t sm:border-t-0 lg:border-l border-neutral-700/50 pt-8 sm:pt-0 lg:pl-8 lg:pl-10">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full mr-3"></div>
              Categories
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <Link href="/listings?type=pg" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base hover:bg-white/5 p-2 rounded-lg -ml-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                  <FaBuilding className="text-orange-500 text-sm group-hover:scale-110 transition-transform" />
                </div>
                <span>PG & Hostels</span>
              </Link>
              <Link href="/listings?type=apartment" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base hover:bg-white/5 p-2 rounded-lg -ml-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                  <FaHome className="text-orange-500 text-sm group-hover:scale-110 transition-transform" />
                </div>
                <span>Apartments</span>
              </Link>
              <Link href="/listings?type=coliving" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base hover:bg-white/5 p-2 rounded-lg -ml-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                  <FaUsers className="text-orange-500 text-sm group-hover:scale-110 transition-transform" />
                </div>
                <span>Co-living</span>
              </Link>
              <Link href="/listings?type=studio" className="text-neutral-400 hover:text-white transition-all duration-300 flex items-center group text-base hover:bg-white/5 p-2 rounded-lg -ml-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-orange-500 text-sm group-hover:scale-110 transition-transform" />
                </div>
                <span>Studios</span>
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="border-t sm:border-t-0 sm:border-l lg:border-l border-neutral-700/50 pt-8 sm:pt-0 sm:pl-8 lg:pl-10">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full mr-3"></div>
              Connect With Us
            </h3>
            
            {/* Social Media */}
            <div className="mb-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 group"
              >
                <FaLinkedinIn className="text-white text-xl group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <a 
                href="mailto:niwasnest2026@gmail.com" 
                className="flex items-center text-neutral-400 hover:text-white transition-all duration-300 group text-base hover:bg-white/5 p-2 rounded-lg -ml-2"
              >
                <div className="w-10 h-10 bg-neutral-800/50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-all flex-shrink-0">
                  <FaEnvelope className="text-orange-500 text-sm" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">Email</div>
                  <div className="group-hover:text-orange-400 transition-colors truncate">niwasnest2026@gmail.com</div>
                </div>
              </a>
              
              <a 
                href="tel:+916304809598" 
                className="flex items-center text-neutral-400 hover:text-white transition-all duration-300 group text-base hover:bg-white/5 p-2 rounded-lg -ml-2"
              >
                <div className="w-10 h-10 bg-neutral-800/50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-green-500/20 transition-all flex-shrink-0">
                  <FaPhone className="text-green-500 text-sm" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">Phone</div>
                  <div className="group-hover:text-green-400 transition-colors">+91 63048 09598</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700/50 mt-10 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-500">
              <span className="text-center sm:text-left">&copy; {new Date().getFullYear()} Niwas Nest. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <Link href="/privacy" className="hover:text-neutral-300 transition-colors hover:underline">Privacy Policy</Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/terms" className="hover:text-neutral-300 transition-colors hover:underline">Terms of Service</Link>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
