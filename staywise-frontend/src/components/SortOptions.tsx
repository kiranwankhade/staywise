'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Check, Filter, Search } from 'lucide-react';
import { IProperty } from '../types/property';
import PropertyCard from './PropertyCard'; 

// Define the available sorting types
type SortBy = 'price-asc' | 'price-desc' | 'amenities-desc' | 'none';

interface SortOptionsProps {
    initialProperties: IProperty[];
}

export default function SortOptions({ initialProperties }: SortOptionsProps) {
    const [sortBy, setSortBy] = useState<SortBy>('none');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = useMemo(() => {
        let properties = initialProperties;
        
        const term = searchTerm.toLowerCase().trim();

        if (term) {
            properties = properties.filter(property => 
                property.title.toLowerCase().includes(term) ||
                property.location.toLowerCase().includes(term)
            );
        }

        return properties;
    }, [initialProperties, searchTerm]); // Recalculate whenever the search term changes

    const sortedAndFilteredProperties = useMemo(() => {
        let properties = filteredProperties; // Start with the filtered list

        if (sortBy === 'none') {
            return properties;
        }

        const sorted = [...properties];

        if (sortBy === 'price-asc') {
            sorted.sort((a, b) => a.perNightPrice - b.perNightPrice);
        } else if (sortBy === 'price-desc') {
            sorted.sort((a, b) => b.perNightPrice - a.perNightPrice);
        } else if (sortBy === 'amenities-desc') {
            // Sort by number of amenities (most to least)
            sorted.sort((a, b) => b.amenities.length - a.amenities.length);
        }

        return sorted;
    }, [filteredProperties, sortBy]); 


    const getSortLabel = () => {
        switch (sortBy) {
            case 'price-asc': return 'Price: Low to High';
            case 'price-desc': return 'Price: High to Low';
            case 'amenities-desc': return 'Amenities: Most to Least';
            default: return 'Default Sort';
        }
    };

    const SortItem = ({ label, type }: { label: string, type: SortBy }) => (
        <button
            className={`w-full text-left px-4 py-2 text-sm rounded-md transition duration-150 ease-in-out flex items-center justify-between ${
                sortBy === type 
                    ? 'bg-sw-primary/10 text-sw-primary font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => {
                setSortBy(type);
                setIsMenuOpen(false);
                setSearchTerm('')
            }}
        >
            <span>{label}</span>
            {sortBy === type && <Check className="w-4 h-4 ml-2" />}
        </button>
    );

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
            // use memo to calculate 
    };

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 px-4 sm:px-0">
                
                <form onSubmit={handleSearchSubmit} className="w-full md:w-3/5 relative flex">
                    <input
                        type="text"
                        placeholder="Search by property title or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow pl-4 pr-12 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:ring-sw-primary focus:border-sw-primary transition"
                    />
                    <button 
                        type="submit" 
                        className="flex items-center justify-center px-4 py-2 bg-sw-primary text-white rounded-r-xl shadow-md hover:bg-sw-primary/90 transition duration-150"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>

                <div className="relative inline-block text-left w-full md:w-auto">
                    <div>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sw-primary focus:ring-offset-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            aria-haspopup="true"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">{getSortLabel()}</span>
                            <span className="sm:hidden">Sort</span>
                            {isMenuOpen ? (
                                <ChevronUp className="-mr-1 ml-2 h-5 w-5" />
                            ) : (
                                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div
                            className="absolute right-0 md:left-auto mt-2 w-56 origin-top-right rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-2"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                        >
                            <SortItem label="Default Sort" type="none" />
                            <SortItem label="Price: Low to High" type="price-asc" />
                            <SortItem label="Price: High to Low" type="price-desc" />
                            <SortItem label="Amenities: Most to Least" type="amenities-desc" />
                        </div>
                    )}
                </div>
            </div>

            {sortedAndFilteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {sortedAndFilteredProperties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-10 rounded-xl shadow-xl text-center text-gray-500">
                    <p className="text-xl">
                        {searchTerm 
                            ? `No properties found matching "${searchTerm}".` 
                            : 'No properties are available at the moment.'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}