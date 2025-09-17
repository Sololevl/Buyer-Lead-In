"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import ImportExport from './ImportExport';
import { Search, SlidersHorizontal, XCircle } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for controlled inputs
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [timeline, setTimeline] = useState(searchParams.get('timeline') || '');

  // Debounced function to update URL params
  const debouncedUpdateParams = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Set or delete params based on state
    if (searchText.trim()) params.set('search', searchText.trim()); else params.delete('search');
    if (city) params.set('city', city); else params.delete('city');
    if (propertyType) params.set('propertyType', propertyType); else params.delete('propertyType');
    if (status) params.set('status', status); else params.delete('status');
    if (timeline) params.set('timeline', timeline); else params.delete('timeline');
    
    params.set('page', '1'); // Reset to page 1 on any filter change
    
    // Use router.replace for a cleaner browser history
    router.replace(`/buyers?${params.toString()}`);
  }, 300); // 300ms delay

  // Effect to trigger the debounced function whenever a filter state changes
  useEffect(() => {
    debouncedUpdateParams();
  }, [searchText, city, propertyType, status, timeline, debouncedUpdateParams]);

  const handleClear = () => {
    setSearchText('');
    setCity('');
    setPropertyType('');
    setStatus('');
    setTimeline('');
    // The useEffect will automatically trigger the debounced update
  };
  
  const hasActiveFilters = !!(searchText || city || propertyType || status || timeline);

  return (
    // Use space-y-6 for consistent vertical spacing between direct children
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8 shadow-2xl space-y-6">
      
      {/* Grouping Search and Filters together */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-200 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-yellow-400" />
            Filter & Search Leads
        </h3>
        {/* Use space-y-4 for spacing within this group */}
        <div className="space-y-4">
            {/* Main Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name, phone, or email..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-gray-500"
                />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* City Filter */}
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="">All Cities</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Mohali">Mohali</option>
                    <option value="Zirakpur">Zirakpur</option>
                    <option value="Panchkula">Panchkula</option>
                    <option value="Other">Other</option>
                </select>
                {/* Property Type Filter */}
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                </select>
                {/* Status Filter */}
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="">All Status</option>
                    <option value="New">New</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visited">Visited</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Converted">Converted</option>
                    <option value="Dropped">Dropped</option>
                </select>
                {/* Timeline Filter */}
                <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="">All Timelines</option>
                    <option value="ZeroTo3m">0-3 months</option>
                    <option value="ThreeTo6m">3-6 months</option>
                    <option value="MoreThan6m">&gt;6 months</option>
                    <option value="Exploring">Just Exploring</option>
                </select>
            </div>
        </div>
      </div>

      {/* Actions section with a top border */}
      <div className="border-t border-gray-700/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Import/Export section */}
        <ImportExport filters={{ search: searchText, city, propertyType, status, timeline }} />
        
        {/* Clear Filters Button */}
        {hasActiveFilters && (
            <button 
                onClick={handleClear} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-gray-200 font-semibold rounded-md hover:bg-red-600 hover:text-white transition-all duration-200 transform hover:scale-105"
            > 
                <XCircle className="w-4 h-4" />
                Clear All Filters 
            </button>
        )}
      </div>
    </div>
  );
}

