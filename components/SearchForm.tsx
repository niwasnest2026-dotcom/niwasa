'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaCalendar, 
  FaUsers, 
  FaSearch, 
  FaChevronDown, 
  FaBuilding, 
  FaLocationArrow, 
  FaSpinner, 
  FaCheck, 
  FaExclamationCircle,
  FaMinus,
  FaPlus,
  FaTimes,
  FaFilter,
  FaStar,
  FaRupeeSign,
  FaSort,
  FaSlidersH
} from 'react-icons/fa';

const cities = [
  'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna'
];

const locationData = [
  // Bangalore
  { type: 'city', name: 'Bangalore', fullName: 'Bangalore', city: 'Bangalore', area: '' },
  { type: 'area', name: 'Koramangala', fullName: 'Koramangala, Bangalore', city: 'Bangalore', area: 'Koramangala' },
  { type: 'area', name: 'Indiranagar', fullName: 'Indiranagar, Bangalore', city: 'Bangalore', area: 'Indiranagar' },
  { type: 'area', name: 'Whitefield', fullName: 'Whitefield, Bangalore', city: 'Bangalore', area: 'Whitefield' },
  { type: 'area', name: 'Electronic City', fullName: 'Electronic City, Bangalore', city: 'Bangalore', area: 'Electronic City' },
  { type: 'area', name: 'HSR Layout', fullName: 'HSR Layout, Bangalore', city: 'Bangalore', area: 'HSR Layout' },
  { type: 'area', name: 'BTM Layout', fullName: 'BTM Layout, Bangalore', city: 'Bangalore', area: 'BTM Layout' },
  { type: 'area', name: 'Marathahalli', fullName: 'Marathahalli, Bangalore', city: 'Bangalore', area: 'Marathahalli' },
  { type: 'area', name: 'Jayanagar', fullName: 'Jayanagar, Bangalore', city: 'Bangalore', area: 'Jayanagar' },
  
  // Mumbai
  { type: 'city', name: 'Mumbai', fullName: 'Mumbai', city: 'Mumbai', area: '' },
  { type: 'area', name: 'Andheri', fullName: 'Andheri, Mumbai', city: 'Mumbai', area: 'Andheri' },
  { type: 'area', name: 'Bandra', fullName: 'Bandra, Mumbai', city: 'Mumbai', area: 'Bandra' },
  { type: 'area', name: 'Powai', fullName: 'Powai, Mumbai', city: 'Mumbai', area: 'Powai' },
  { type: 'area', name: 'Thane', fullName: 'Thane, Mumbai', city: 'Mumbai', area: 'Thane' },
  { type: 'area', name: 'Navi Mumbai', fullName: 'Navi Mumbai, Mumbai', city: 'Mumbai', area: 'Navi Mumbai' },
  { type: 'area', name: 'Goregaon', fullName: 'Goregaon, Mumbai', city: 'Mumbai', area: 'Goregaon' },
  { type: 'area', name: 'Malad', fullName: 'Malad, Mumbai', city: 'Mumbai', area: 'Malad' },
  { type: 'area', name: 'Borivali', fullName: 'Borivali, Mumbai', city: 'Mumbai', area: 'Borivali' },
  
  // Delhi
  { type: 'city', name: 'Delhi', fullName: 'Delhi', city: 'Delhi', area: '' },
  { type: 'area', name: 'Connaught Place', fullName: 'Connaught Place, Delhi', city: 'Delhi', area: 'Connaught Place' },
  { type: 'area', name: 'Karol Bagh', fullName: 'Karol Bagh, Delhi', city: 'Delhi', area: 'Karol Bagh' },
  { type: 'area', name: 'Lajpat Nagar', fullName: 'Lajpat Nagar, Delhi', city: 'Delhi', area: 'Lajpat Nagar' },
  { type: 'area', name: 'Dwarka', fullName: 'Dwarka, Delhi', city: 'Delhi', area: 'Dwarka' },
  { type: 'area', name: 'Rohini', fullName: 'Rohini, Delhi', city: 'Delhi', area: 'Rohini' },
  { type: 'area', name: 'Janakpuri', fullName: 'Janakpuri, Delhi', city: 'Delhi', area: 'Janakpuri' },
  { type: 'area', name: 'Saket', fullName: 'Saket, Delhi', city: 'Delhi', area: 'Saket' },
  { type: 'area', name: 'Vasant Kunj', fullName: 'Vasant Kunj, Delhi', city: 'Delhi', area: 'Vasant Kunj' },
  
  // Pune
  { type: 'city', name: 'Pune', fullName: 'Pune', city: 'Pune', area: '' },
  { type: 'area', name: 'Koregaon Park', fullName: 'Koregaon Park, Pune', city: 'Pune', area: 'Koregaon Park' },
  { type: 'area', name: 'Hinjewadi', fullName: 'Hinjewadi, Pune', city: 'Pune', area: 'Hinjewadi' },
  { type: 'area', name: 'Wakad', fullName: 'Wakad, Pune', city: 'Pune', area: 'Wakad' },
  { type: 'area', name: 'Baner', fullName: 'Baner, Pune', city: 'Pune', area: 'Baner' },
  { type: 'area', name: 'Kothrud', fullName: 'Kothrud, Pune', city: 'Pune', area: 'Kothrud' },
  { type: 'area', name: 'Deccan', fullName: 'Deccan, Pune', city: 'Pune', area: 'Deccan' },
  { type: 'area', name: 'Camp', fullName: 'Camp, Pune', city: 'Pune', area: 'Camp' },
  { type: 'area', name: 'Hadapsar', fullName: 'Hadapsar, Pune', city: 'Pune', area: 'Hadapsar' },
  
  // Hyderabad
  { type: 'city', name: 'Hyderabad', fullName: 'Hyderabad', city: 'Hyderabad', area: '' },
  { type: 'area', name: 'Hitech City', fullName: 'Hitech City, Hyderabad', city: 'Hyderabad', area: 'Hitech City' },
  { type: 'area', name: 'Gachibowli', fullName: 'Gachibowli, Hyderabad', city: 'Hyderabad', area: 'Gachibowli' },
  { type: 'area', name: 'Kondapur', fullName: 'Kondapur, Hyderabad', city: 'Hyderabad', area: 'Kondapur' },
  { type: 'area', name: 'Madhapur', fullName: 'Madhapur, Hyderabad', city: 'Hyderabad', area: 'Madhapur' },
  { type: 'area', name: 'Begumpet', fullName: 'Begumpet, Hyderabad', city: 'Hyderabad', area: 'Begumpet' },
  { type: 'area', name: 'Secunderabad', fullName: 'Secunderabad, Hyderabad', city: 'Hyderabad', area: 'Secunderabad' },
  { type: 'area', name: 'Kukatpally', fullName: 'Kukatpally, Hyderabad', city: 'Hyderabad', area: 'Kukatpally' },
  { type: 'area', name: 'Miyapur', fullName: 'Miyapur, Hyderabad', city: 'Hyderabad', area: 'Miyapur' },
  
  // Chennai
  { type: 'city', name: 'Chennai', fullName: 'Chennai', city: 'Chennai', area: '' },
  { type: 'area', name: 'Anna Nagar', fullName: 'Anna Nagar, Chennai', city: 'Chennai', area: 'Anna Nagar' },
  { type: 'area', name: 'T. Nagar', fullName: 'T. Nagar, Chennai', city: 'Chennai', area: 'T. Nagar' },
  { type: 'area', name: 'Velachery', fullName: 'Velachery, Chennai', city: 'Chennai', area: 'Velachery' },
  { type: 'area', name: 'Adyar', fullName: 'Adyar, Chennai', city: 'Chennai', area: 'Adyar' },
  { type: 'area', name: 'Tambaram', fullName: 'Tambaram, Chennai', city: 'Chennai', area: 'Tambaram' },
  { type: 'area', name: 'Chrompet', fullName: 'Chrompet, Chennai', city: 'Chennai', area: 'Chrompet' },
  { type: 'area', name: 'Porur', fullName: 'Porur, Chennai', city: 'Chennai', area: 'Porur' },
  { type: 'area', name: 'OMR', fullName: 'OMR, Chennai', city: 'Chennai', area: 'OMR' }
];

const durations = [
  { label: '1 Month', value: '1', popular: true },
  { label: '3 Months', value: '3', popular: true },
  { label: '6 Months', value: '6', popular: true },
  { label: '12 Months', value: '12', popular: true },
  { label: '18 Months', value: '18', popular: false },
  { label: '24 Months', value: '24', popular: false }
];

const priceRanges = [
  { label: '₹5,000 - ₹10,000', value: '5000-10000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹15,000', value: '10000-15000', min: 10000, max: 15000 },
  { label: '₹15,000 - ₹25,000', value: '15000-25000', min: 15000, max: 25000 },
  { label: '₹25,000 - ₹35,000', value: '25000-35000', min: 25000, max: 35000 },
  { label: '₹35,000 - ₹50,000', value: '35000-50000', min: 35000, max: 50000 },
  { label: '₹50,000+', value: '50000+', min: 50000, max: null }
];

const ratingOptions = [
  { label: '4+ Stars', value: '4+', stars: 4 },
  { label: '3+ Stars', value: '3+', stars: 3 },
  { label: '2+ Stars', value: '2+', stars: 2 },
  { label: 'Any Rating', value: 'any', stars: 0 }
];

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc', icon: FaRupeeSign },
  { label: 'Price: High to Low', value: 'price-desc', icon: FaRupeeSign },
  { label: 'Rating: High to Low', value: 'rating-desc', icon: FaStar },
  { label: 'Newest First', value: 'newest', icon: FaClock },
  { label: 'Most Popular', value: 'popular', icon: FaUsers }
];

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: '', // Combined city and area
    city: '',
    area: '',
    duration: '3',
    moveIn: '',
    guests: 1
  });

  // Filter and Sort States
  const [filters, setFilters] = useState({
    priceRange: '',
    rating: '',
    sortBy: 'price-asc'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [hasAttemptedSearch, setHasAttemptedSearch] = useState(false); // New state to track search attempts
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | null>(null);
  const [isLocationDetected, setIsLocationDetected] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Location search states
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  
  // Refs for click outside detection
  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  // Filtered location suggestions
  const filteredLocations = locationData.filter(location => 
    location.name.toLowerCase().includes(locationSearchTerm.toLowerCase()) ||
    location.fullName.toLowerCase().includes(locationSearchTerm.toLowerCase())
  ).slice(0, 8); // Limit to 8 suggestions for better UX

  useEffect(() => {
    // Check geolocation permissions
    if ('geolocation' in navigator && 'permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
      });
    }
  }, []);

  useEffect(() => {
    // Form validation
    const errors: Record<string, string> = {};
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!formData.moveIn) {
      errors.moveIn = 'Move-in date is required';
    } else {
      const selectedDate = new Date(formData.moveIn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.moveIn = 'Move-in date cannot be in the past';
      }
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0 && !!formData.location && !!formData.moveIn);
  }, [formData]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
      if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
        setShowDurationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: { 'User-Agent': 'NiwasNest Property Search' }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const address = data.address;
        
        if (address) {
          const detectedCity = address.city || address.town || address.village || address.county || address.state_district;
          const detectedArea = address.suburb || address.neighbourhood || address.residential || address.hamlet || address.road;
          
          if (detectedCity) {
            // Find matching location data
            const cityMatch = locationData.find(loc => 
              loc.type === 'city' && loc.name.toLowerCase() === detectedCity.toLowerCase()
            );
            
            if (cityMatch) {
              setFormData(prev => ({ 
                ...prev, 
                location: cityMatch.fullName,
                city: cityMatch.city,
                area: cityMatch.area
              }));
              setLocationSearchTerm(cityMatch.fullName);
              setIsLocationDetected(true);
            } else {
              // Fallback for cities not in our data
              setFormData(prev => ({ 
                ...prev, 
                location: detectedCity,
                city: detectedCity,
                area: ''
              }));
              setLocationSearchTerm(detectedCity);
              setIsLocationDetected(true);
            }
          }
          
          if (detectedArea && detectedCity) {
            // Find matching area data
            const areaMatch = locationData.find(loc => 
              loc.type === 'area' && 
              loc.area.toLowerCase() === detectedArea.toLowerCase() &&
              loc.city.toLowerCase() === detectedCity.toLowerCase()
            );
            
            if (areaMatch) {
              setFormData(prev => ({ 
                ...prev, 
                location: areaMatch.fullName,
                city: areaMatch.city,
                area: areaMatch.area
              }));
              setLocationSearchTerm(areaMatch.fullName);
              setIsLocationDetected(true);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationSearchTerm(e.target.value);
    setShowLocationSuggestions(true);
    // Clear search attempt flag when user starts typing
    if (hasAttemptedSearch && e.target.value.length > 0) {
      setHasAttemptedSearch(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, moveIn: e.target.value }));
    // Clear search attempt flag when user selects a date
    if (hasAttemptedSearch && e.target.value) {
      setHasAttemptedSearch(false);
    }
  };
  const handleLocationSelect = (location: typeof locationData[0]) => {
    setFormData(prev => ({ 
      ...prev, 
      location: location.fullName,
      city: location.city,
      area: location.area
    }));
    setLocationSearchTerm(location.fullName);
    setShowLocationSuggestions(false);
    // Clear search attempt flag when user selects a location
    if (hasAttemptedSearch) {
      setHasAttemptedSearch(false);
    }
  };

  const handleGuestChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      guests: increment 
        ? Math.min(prev.guests + 1, 10) 
        : Math.max(prev.guests - 1, 1)
    }));
  };

  const handleSearch = () => {
    // Set flag to show errors after first search attempt
    setHasAttemptedSearch(true);
    
    // Enhanced validation with professional alerts
    const missingFields = [];
    
    if (!formData.location.trim()) {
      missingFields.push('Location');
    }
    
    if (!formData.moveIn) {
      missingFields.push('Move-in Date');
    }
    
    // If there are missing fields, show professional alert
    if (missingFields.length > 0) {
      // Create a professional alert message
      const alertMessage = missingFields.length === 1 
        ? `Please fill in the ${missingFields[0]} field to search properties.`
        : `Please fill in the following required fields: ${missingFields.join(' and ')}.`;
      
      // Show professional browser alert
      alert(`🏠 Search Incomplete\n\n${alertMessage}\n\nAll required fields must be completed to find your perfect stay.`);
      
      // Focus on the first missing field
      if (!formData.location.trim()) {
        const locationInput = document.querySelector('input[placeholder*="Type your city"]') as HTMLInputElement;
        locationInput?.focus();
      } else if (!formData.moveIn) {
        const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
        dateInput?.focus();
      }
      
      return;
    }
    
    // Additional date validation
    if (formData.moveIn) {
      const selectedDate = new Date(formData.moveIn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        alert(`📅 Invalid Date\n\nThe move-in date cannot be in the past. Please select a future date to continue your search.`);
        const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
        dateInput?.focus();
        return;
      }
    }
    
    // Show success message before navigation
    const successMessage = `🎉 Search Started!\n\nSearching for properties in ${formData.location} for ${formData.guests} ${formData.guests === 1 ? 'guest' : 'guests'}.\n\nMove-in: ${new Date(formData.moveIn).toLocaleDateString()}\nDuration: ${durations.find(d => d.value === formData.duration)?.label}`;
    
    // Optional: Show success alert (comment out if not needed)
    // alert(successMessage);
    
    const params = new URLSearchParams();
    if (formData.city) params.set('city', formData.city);
    if (formData.area) params.set('area', formData.area);
    if (formData.location) params.set('location', formData.location);
    if (formData.duration) params.set('duration', formData.duration);
    if (formData.moveIn) params.set('moveIn', formData.moveIn);
    params.set('guests', formData.guests.toString());

    // Add filter parameters
    if (filters.priceRange) params.set('priceRange', filters.priceRange);
    if (filters.rating) params.set('rating', filters.rating);
    if (filters.sortBy) params.set('sortBy', filters.sortBy);

    router.push(`/listings?${params.toString()}`);
  };

  const getFieldClasses = (field: string, hasError: boolean = false, hasSuccess: boolean = false) => {
    const baseClasses = "w-full pl-9 sm:pl-12 pr-9 sm:pr-4 py-2.5 sm:py-4 border-2 outline-none text-neutral-900 bg-white/90 backdrop-blur-sm text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-300 placeholder-neutral-400";
    
    if (hasError) {
      return `${baseClasses} border-red-200 bg-red-50/50 focus:border-red-300 focus:ring-4 focus:ring-red-50 shadow-sm focus:shadow-md hover:border-red-250`;
    } else if (hasSuccess) {
      return `${baseClasses} border-green-200 bg-green-50/30 focus:border-green-300 focus:ring-4 focus:ring-green-50 shadow-sm focus:shadow-md hover:border-green-250`;
    } else {
      return `${baseClasses} border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 shadow-sm focus:shadow-lg hover:border-neutral-300`;
    }
  };

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl shadow-2xl p-2 sm:p-8 lg:p-10 max-w-6xl mx-auto border border-white/60">
      {/* Header */}
      <div className="mb-3 sm:mb-10 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 mb-2 sm:mb-4">
          <div className="w-7 h-7 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
            <FaSearch className="text-white text-xs sm:text-xl" />
          </div>
          <h3 className="text-lg sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Find Your Perfect Stay
          </h3>
        </div>
        <p className="text-gray-600 text-xs sm:text-lg leading-relaxed px-1 sm:px-2">
          Search by location, duration, and preferences to discover your ideal accommodation
        </p>
      </div>
      
      <div className="space-y-3 sm:space-y-8">
        {/* Location Section - Combined City & Area */}
        <div className="grid grid-cols-1 gap-3 sm:gap-6">
          {/* Combined Location Search */}
          <div ref={locationRef} className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1 sm:mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-blue-500 text-xs sm:text-sm" />
                <span>Search for City or Area *</span>
              </span>
              {locationPermission !== 'denied' && (
                <button
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="flex items-center space-x-0.5 sm:space-x-1 text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50 font-medium px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-all border border-blue-200"
                >
                  {isGettingLocation ? (
                    <FaSpinner className="animate-spin text-xs" />
                  ) : (
                    <FaLocationArrow className="text-xs" />
                  )}
                  <span className="hidden xs:inline text-xs">{isGettingLocation ? 'Detecting...' : 'Use location'}</span>
                </button>
              )}
            </label>
            
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm sm:text-lg z-10" />
              <input
                type="text"
                value={locationSearchTerm}
                onChange={handleLocationChange}
                onFocus={() => setShowLocationSuggestions(true)}
                placeholder="Type your city or neighborhood (e.g., Koramangala, Bangalore)"
                className={getFieldClasses('location', hasAttemptedSearch && !!formErrors.location, !!formData.location && !formErrors.location)}
              />
              {formData.location && !formErrors.location && (
                <FaCheck className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 text-green-500 text-xs sm:text-sm" />
              )}
              {hasAttemptedSearch && formErrors.location && (
                <FaExclamationCircle className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 text-red-500 text-xs sm:text-sm" />
              )}
              
              {/* Location Suggestions Dropdown */}
              {showLocationSuggestions && filteredLocations.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white rounded-lg sm:rounded-xl shadow-xl border border-neutral-200 z-20 max-h-56 sm:max-h-72 overflow-y-auto">
                  {/* Popular Cities Section */}
                  {filteredLocations.some(loc => loc.type === 'city') && (
                    <div className="p-1.5 sm:p-2 border-b border-neutral-100">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-2 py-0.5 sm:py-1 mb-0.5 sm:mb-1">Cities</div>
                      {filteredLocations.filter(loc => loc.type === 'city').map((location) => (
                        <button
                          key={`city-${location.name}`}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-2.5 sm:px-4 py-2 sm:py-3 text-left hover:bg-blue-50 transition-colors flex items-center rounded-lg text-sm sm:text-base"
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <FaMapMarkerAlt className="text-blue-600 text-xs" />
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900">{location.name}</div>
                            <div className="text-xs text-neutral-500">City</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Areas/Neighborhoods Section */}
                  {filteredLocations.some(loc => loc.type === 'area') && (
                    <div className="p-1.5 sm:p-2">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-2 py-0.5 sm:py-1 mb-0.5 sm:mb-1">Areas & Neighborhoods</div>
                      {filteredLocations.filter(loc => loc.type === 'area').map((location) => (
                        <button
                          key={`area-${location.fullName}`}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-2.5 sm:px-4 py-2 sm:py-3 text-left hover:bg-purple-50 transition-colors flex items-center rounded-lg text-sm sm:text-base"
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <FaBuilding className="text-purple-600 text-xs" />
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900">{location.area}</div>
                            <div className="text-xs text-neutral-500">{location.city}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {hasAttemptedSearch && formErrors.location && (
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationCircle className="text-red-500 text-xs" />
                </div>
                <p className="text-red-700 text-xs sm:text-sm font-medium">
                  {formErrors.location}
                </p>
              </div>
            )}
            {isLocationDetected && formData.location && (
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-green-50 border border-green-100 rounded-lg flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <p className="text-green-700 text-xs sm:text-sm font-medium">
                  Location detected automatically
                </p>
              </div>
            )}
            
            {/* Helpful Tooltip */}
            
          </div>
        </div>

        {/* Date and Duration Section */}
        <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2">
          {/* Move-in Date with Calendar Picker */}
          <div ref={dateRef} className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1 sm:mb-3 flex items-center gap-1.5">
              <FaCalendar className="text-green-500 text-sm" />
              <span>Move-in Date *</span>
            </label>
            
            <div className="relative">
              <FaCalendar className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm sm:text-lg z-10" />
              <input
                type="date"
                value={formData.moveIn}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-9 sm:pl-12 pr-9 sm:pr-4 py-2.5 sm:py-4 border-2 outline-none text-neutral-900 bg-white/90 backdrop-blur-sm text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-300 ${getFieldClasses('moveIn', hasAttemptedSearch && !!formErrors.moveIn, !!formData.moveIn && !formErrors.moveIn).split(' ').slice(5).join(' ')}`}
              />
              {formData.moveIn && !formErrors.moveIn && (
                <FaCheck className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 text-green-500 text-xs sm:text-sm" />
              )}
              {hasAttemptedSearch && formErrors.moveIn && (
                <FaExclamationCircle className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 text-red-500 text-xs sm:text-sm" />
              )}
            </div>
            
            {hasAttemptedSearch && formErrors.moveIn && (
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationCircle className="text-red-500 text-xs" />
                </div>
                <p className="text-red-700 text-xs sm:text-sm font-medium">
                  {formErrors.moveIn}
                </p>
              </div>
            )}
          </div>

          {/* Duration Dropdown */}
          <div ref={durationRef} className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1 sm:mb-3 flex items-center gap-1.5">
              <FaClock className="text-orange-500 text-sm" />
              <span>How long will you stay?</span>
            </label>
            
            <div className="relative">
              <FaClock className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm sm:text-lg z-10" />
              <button
                onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                className={`w-full pl-9 sm:pl-12 pr-9 sm:pr-4 py-2.5 sm:py-4 border-2 outline-none text-neutral-900 bg-white/90 backdrop-blur-sm text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-300 text-left ${getFieldClasses('duration', false, true).split(' ').slice(5).join(' ')}`}
              >
                <span>
                  {durations.find(d => d.value === formData.duration)?.label || 'Select duration'}
                </span>
              </button>
              <FaChevronDown className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-xs sm:text-sm" />
              
              {/* Duration Dropdown */}
              {showDurationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white rounded-lg sm:rounded-xl shadow-xl border border-neutral-200 z-20">
                  <div className="p-1 sm:p-2">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-2 sm:px-3 py-1 sm:py-2">Popular Options</div>
                    {durations.filter(d => d.popular).map((duration) => (
                      <button
                        key={duration.value}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, duration: duration.value }));
                          setShowDurationDropdown(false);
                        }}
                        className="w-full px-2.5 sm:px-4 py-2 sm:py-3 text-left hover:bg-orange-50 transition-colors flex items-center rounded-lg text-sm sm:text-base"
                      >
                        <FaClock className="text-orange-500 mr-2 sm:mr-3 text-xs sm:text-sm" />
                        <span className="font-medium">{duration.label}</span>
                      </button>
                    ))}
                    <div className="border-t border-neutral-100 mt-1 sm:mt-2 pt-1 sm:pt-2">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-2 sm:px-3 py-1 sm:py-2">Other Options</div>
                      {durations.filter(d => !d.popular).map((duration) => (
                        <button
                          key={duration.value}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, duration: duration.value }));
                            setShowDurationDropdown(false);
                          }}
                          className="w-full px-2.5 sm:px-4 py-2 sm:py-3 text-left hover:bg-orange-50 transition-colors flex items-center rounded-lg text-sm sm:text-base"
                        >
                          <FaClock className="text-orange-500 mr-2 sm:mr-3 text-xs sm:text-sm" />
                          <span className="font-medium">{duration.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guests Section */}
        <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2">
          {/* Number of Guests with Counter */}
          <div className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1 sm:mb-3 flex items-center gap-1.5">
              <FaUsers className="text-indigo-500 text-sm" />
              <span>How many people are staying?</span>
            </label>
            
            <div className="relative">
              <FaUsers className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm sm:text-lg z-10" />
              <div className="flex items-center">
                <input
                  type="text"
                  value={`${formData.guests} ${formData.guests === 1 ? 'Guest' : 'Guests'}`}
                  readOnly
                  className={`w-full pl-9 sm:pl-12 pr-16 sm:pr-24 py-2.5 sm:py-4 border-2 outline-none text-neutral-900 bg-white/90 backdrop-blur-sm text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-300 ${getFieldClasses('guests', false, true).split(' ').slice(5).join(' ')}`}
                />
                <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 sm:space-x-1">
                  <button
                    onClick={() => handleGuestChange(false)}
                    disabled={formData.guests <= 1}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <FaMinus className="text-neutral-600 text-xs" />
                  </button>
                  <button
                    onClick={() => handleGuestChange(true)}
                    disabled={formData.guests >= 10}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <FaPlus className="text-neutral-600 text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-calculated Move-out Display */}
          <div className="relative opacity-75">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-1 sm:mb-3 flex items-center gap-1.5">
              <FaCalendar className="text-gray-400 text-sm" />
              <span>Expected Move-out Date</span>
            </label>
            
            <div className="relative">
              <FaCalendar className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm sm:text-lg" />
              <input
                type="text"
                value={formData.moveIn && formData.duration ? 
                  (() => {
                    const moveInDate = new Date(formData.moveIn);
                    moveInDate.setMonth(moveInDate.getMonth() + parseInt(formData.duration));
                    return moveInDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                  })() : 
                  "Will be calculated automatically"
                }
                readOnly
                className="w-full pl-9 sm:pl-12 pr-2.5 sm:pr-4 py-2.5 sm:py-4 border-2 border-neutral-200 outline-none text-neutral-500 bg-neutral-50/80 backdrop-blur-sm text-sm sm:text-base rounded-xl sm:rounded-2xl"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1 sm:mt-2">
              Automatically calculated based on move-in date and duration
            </p>
          </div>
        </div>

        {/* Filter & Sort Section */}
        <div className="border-t border-neutral-200 pt-4 sm:pt-6">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-xl sm:rounded-2xl border-2 border-orange-200 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <FaFilter className="text-white text-sm sm:text-base" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-neutral-800 text-sm sm:text-lg">Filter & Sort</h4>
                <p className="text-xs sm:text-sm text-neutral-600">Refine your search results</p>
              </div>
            </div>
            <FaChevronDown className={`text-neutral-600 text-sm sm:text-base transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Expandable Filter Options */}
          {showFilters && (
            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 bg-white rounded-xl sm:rounded-2xl border border-neutral-200 p-3 sm:p-4 shadow-lg">
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-1.5">
                  <FaRupeeSign className="text-green-500 text-sm" />
                  <span>Price Range</span>
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full p-2.5 sm:p-3 border-2 border-neutral-200 rounded-lg sm:rounded-xl bg-white text-sm sm:text-base focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                >
                  <option value="">Select price range</option>
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-1.5">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span>Rating</span>
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                  className="w-full p-2.5 sm:p-3 border-2 border-neutral-200 rounded-lg sm:rounded-xl bg-white text-sm sm:text-base focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                >
                  <option value="">Select minimum rating</option>
                  {ratingOptions.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter (if different from search) */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  <span>Location</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full p-2.5 sm:p-3 border-2 border-neutral-200 rounded-lg sm:rounded-xl bg-white text-sm sm:text-base focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-1.5">
                  <FaSort className="text-blue-500 text-sm" />
                  <span>Sort By</span>
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full p-2.5 sm:p-3 border-2 border-neutral-200 rounded-lg sm:rounded-xl bg-white text-sm sm:text-base focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Applied Filters Summary */}
              {(filters.priceRange || filters.rating || filters.sortBy !== 'price-asc') && (
                <div className="pt-2 sm:pt-3 border-t border-neutral-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs sm:text-sm font-medium text-neutral-600">Applied filters:</span>
                    {filters.priceRange && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        <FaRupeeSign className="mr-1 text-xs" />
                        {priceRanges.find(r => r.value === filters.priceRange)?.label}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, priceRange: '' }))}
                          className="ml-1 hover:text-green-900"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {filters.rating && (
                      <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        <FaStar className="mr-1 text-xs" />
                        {ratingOptions.find(r => r.value === filters.rating)?.label}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, rating: '' }))}
                          className="ml-1 hover:text-yellow-900"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {filters.sortBy !== 'price-asc' && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        <FaSort className="mr-1 text-xs" />
                        {sortOptions.find(s => s.value === filters.sortBy)?.label}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="pt-3 sm:pt-6">
          <button
            onClick={handleSearch}
            disabled={!isFormValid}
            className={`w-full py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl transition-all duration-300 flex items-center justify-center space-x-1.5 sm:space-x-3 shadow-xl transform relative overflow-hidden group ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-2xl hover:scale-[1.02] border-2 border-transparent hover:border-white/20 cursor-pointer'
                : 'bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {/* Animated background overlay for valid state */}
            {isFormValid && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            
            <div className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
              isFormValid ? 'bg-white/20 group-hover:bg-white/30 group-hover:scale-110' : 'bg-neutral-300'
            }`}>
              <FaSearch className={`text-xs sm:text-lg transition-all duration-300 ${
                isFormValid ? 'text-white group-hover:scale-110' : 'text-neutral-500'
              }`} />
            </div>
            
            <span className="relative z-10 transition-all duration-300 group-hover:scale-105">
              {isFormValid ? (
                <>
                  Search Properties
                  {/* Show filter count if any filters are applied */}
                  {(filters.priceRange || filters.rating || filters.sortBy !== 'price-asc') && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs group-hover:bg-white/30 transition-all duration-300">
                      {[filters.priceRange, filters.rating, filters.sortBy !== 'price-asc' ? 'sorted' : ''].filter(Boolean).length} filters
                    </span>
                  )}
                </>
              ) : (
                'Complete Required Fields'
              )}
            </span>
            
            {isFormValid && (
              <FaCheck className="text-sm sm:text-lg relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            )}
          </button>
          
          {/* Form Status */}
          <div className="mt-3 sm:mt-4 text-center">
            {isFormValid ? (
              <div className="space-y-2">
                <div className="inline-flex items-center px-3 py-2 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <FaCheck className="text-green-500 text-xs" />
                  </div>
                  <p className="text-green-700 text-xs sm:text-sm font-medium">
                    Ready to search! All required fields completed.
                  </p>
                </div>
                {(filters.priceRange || filters.rating || filters.sortBy !== 'price-asc') && (
                  <div className="inline-flex items-center px-3 py-2 bg-blue-50 border border-blue-200 rounded-full">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <FaSlidersH className="text-blue-500 text-xs" />
                    </div>
                    <p className="text-blue-700 text-xs font-medium">
                      {[filters.priceRange, filters.rating, filters.sortBy !== 'price-asc' ? 'sorted' : ''].filter(Boolean).length} filter(s) applied for better results
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center px-3 py-2 bg-amber-50 border border-amber-200 rounded-full">
                <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                  <FaExclamationCircle className="text-amber-500 text-xs" />
                </div>
                <p className="text-amber-700 text-xs sm:text-sm font-medium">
                  Please fill in the location and move-in date to search properties
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
