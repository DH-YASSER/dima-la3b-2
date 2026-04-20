import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import OfferCard from '../components/OfferCard';
import { Filter, Loader2, X } from 'lucide-react';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        city: '',
        type: '',
        category: ''
    });

    const fetchOffers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/offers?${params}`);
            setOffers(response.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOffers();
    }, [filters]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <div className="lg:w-72 shrink-0">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-primary-600" />
                                Filtres
                            </h2>
                            {(filters.city || filters.type || filters.category) && (
                                <button 
                                    onClick={() => setFilters({ city: '', type: '', category: '' })}
                                    className="text-xs font-bold text-red-500 hover:underline"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Ville</label>
                                <select 
                                    className="w-full bg-slate-50 border-slate-100 rounded-xl focus:ring-primary-600 focus:border-primary-600 font-medium"
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                >
                                    <option value="">Toutes les villes</option>
                                    <option value="Casablanca">Casablanca</option>
                                    <option value="Rabat">Rabat</option>
                                    <option value="Marrakech">Marrakech</option>
                                    <option value="Tanger">Tanger</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Type</label>
                                <div className="space-y-2">
                                    {['stage', 'job'].map(type => (
                                        <label key={type} className="flex items-center group cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="type" 
                                                className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500" 
                                                checked={filters.type === type}
                                                onChange={() => handleFilterChange('type', type)}
                                            />
                                            <span className="ml-3 text-slate-600 font-medium capitalize transition-colors group-hover:text-primary-600">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Catégorie</label>
                                <select 
                                    className="w-full bg-slate-50 border-slate-100 rounded-xl focus:ring-primary-600 focus:border-primary-600 font-medium"
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <option value="">Toutes catégories</option>
                                    <option value="IT / Software">IT / Software</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Design">Design</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 border-l-4 border-primary-600 pl-4">Offres Disponibles</h1>
                            <p className="text-slate-500 mt-1 font-medium">{offers.length} opportunités correspondent à votre recherche</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary-500" />
                            <p className="font-semibold animate-pulse">Chargement des offres...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {offers.map(offer => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                            {offers.length === 0 && (
                                <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-center">
                                    <X className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <p className="text-xl font-bold text-slate-400">Aucune offre ne correspond à ces critères</p>
                                    <button 
                                        onClick={() => setFilters({ city: '', type: '', category: '' })}
                                        className="mt-6 text-primary-600 font-bold hover:underline"
                                    >
                                        Effacer les filtres
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Offers;
