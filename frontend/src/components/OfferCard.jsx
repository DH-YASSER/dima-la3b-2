import React from 'react';
import { MapPin, Calendar, Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferCard = ({ offer }) => {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xl shadow-slate-200/40 hover:shadow-primary-500/10 hover:border-primary-200 transition-all group overflow-hidden relative">
            {/* Tag Badge */}
            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-2xl text-[10px] font-bold tracking-widest uppercase ${offer.type === 'stage' ? 'bg-orange-100 text-orange-600' : 'bg-primary-100 text-primary-600'}`}>
                {offer.type}
            </div>

            <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                    <Building2 className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{offer.title}</h3>
                    <p className="text-slate-500 font-medium">{offer.company?.name || 'Entreprise Confidentielle'}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    {offer.city}
                </div>
                <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    {new Date(offer.deadline).toLocaleDateString('fr-FR')}
                </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-primary-600 font-bold text-sm tracking-tight">{offer.category}</span>
                <Link 
                    to={`/offers/${offer.id}`} 
                    className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-primary-600 transition-all shadow-md active:scale-95"
                >
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default OfferCard;
