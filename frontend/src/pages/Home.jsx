import React from 'react';
import { Search, MapPin, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
                            Trouvez votre futur <span className="text-primary-600">Stage</span> ou <span className="text-primary-600">Job</span> au Maroc.
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
                            La plateforme n°1 dédiée aux étudiants et jeunes diplômés marocains. Connectez-vous avec les meilleures startups et entreprises.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-2xl shadow-primary-500/10 border border-slate-100 flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl">
                                <Search className="w-5 h-5 text-slate-400 mr-3" />
                                <input type="text" placeholder="Poste, compétence..." className="bg-transparent border-none focus:ring-0 w-full text-slate-800 placeholder-slate-400 font-medium" />
                            </div>
                            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl">
                                <MapPin className="w-5 h-5 text-slate-400 mr-3" />
                                <select className="bg-transparent border-none focus:ring-0 w-full text-slate-800 font-medium">
                                    <option>Toutes les villes</option>
                                    <option>Casablanca</option>
                                    <option>Rabat</option>
                                    <option>Marrakech</option>
                                    <option>Tanger</option>
                                </select>
                            </div>
                            <button className="bg-primary-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
                                Rechercher
                            </button>
                        </div>

                        {/* Category Badges */}
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            {['IT / Digital', 'Marketing', 'Finance', 'Engineering', 'Design'].map(cat => (
                                <button key={cat} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:translate-y-[-8px] transition-transform">
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Pour les Étudiants</h3>
                        <p className="text-slate-600">Trouvez votre stage de fin d'études (PFE) ou votre premier job dans les meilleures conditions.</p>
                    </div>
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:translate-y-[-8px] transition-transform">
                        <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Pour les Entreprises</h3>
                        <p className="text-slate-600">Recrutez les profils juniors les plus talentueux au Maroc en quelques clics.</p>
                    </div>
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:translate-y-[-8px] transition-transform">
                        <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Partout au Maroc</h3>
                        <p className="text-slate-600">Des opportunités à Casablanca, Rabat, Tanger et bien plus encore.</p>
                    </div>
                </div>
            </div>

            {/* Featured Section Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900">Dernières Opportunités</h2>
                    <Link to="/offers" className="text-primary-600 font-bold hover:underline flex items-center">
                        Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                 </div>
                 
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder for real offers */}
                    <p className="col-span-full text-center text-slate-500 italic py-10">Prêt à explorer les offres ? Connectez-vous pour voir les détails.</p>
                 </div>
            </div>
        </div>
    );
};

export default Home;
