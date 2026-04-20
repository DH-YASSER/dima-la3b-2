import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Calendar, Building2, Briefcase, ChevronLeft, Link as LinkIcon, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await api.get(`/offers/${id}`);
                setOffer(response.data);
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
            setLoading(false);
        };
        fetchOffer();
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        try {
            await api.post('/apply', {
                offer_id: id,
                user_id: user.id,
                resume_url: 'https://storage.stagematch.ma/resumes/dummy.pdf', // Placeholder
            });
            setApplied(true);
        } catch (error) {
            alert("Erreur lors de l'application.");
        }
    };

    if (loading) return <div className="p-32 text-center animate-pulse text-primary-600 font-bold text-xl">Chargement de l'offre...</div>;
    if (!offer) return <div className="p-32 text-center text-red-500 font-bold text-xl">Offre introuvable.</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b border-slate-200 py-6">
                <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
                    <Link to="/offers" className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                        <ChevronLeft className="w-6 h-6 text-slate-500" />
                    </Link>
                    <span className="text-slate-400 font-medium">Retour aux offres</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Card */}
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex gap-6 items-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100">
                                    <Building2 className="w-10 h-10 text-slate-300" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{offer.title}</h1>
                                    <p className="text-xl font-semibold text-primary-600 mt-1">{offer.company?.name}</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest">
                                {offer.type}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-50">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Ville</p>
                                <p className="text-slate-800 font-bold flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {offer.city}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Catégorie</p>
                                <p className="text-slate-800 font-bold flex items-center gap-1.5">
                                    <Briefcase className="w-4 h-4 text-slate-400" />
                                    {offer.category}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Date limite</p>
                                <p className="text-slate-800 font-bold flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    {new Date(offer.deadline).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Salaire</p>
                                <p className="text-slate-800 font-bold">{offer.salary || 'À discuter'}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Description du poste</h2>
                            <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                                {offer.description}
                                <br /><br />
                                <strong>Missions :</strong><br />
                                • Développement des fonctionnalités front-end en React.<br />
                                • Maintenance et amélioration de l'API Laravel.<br />
                                • Collaboration avec l'équipe design pour l'UX.<br />
                                • Participation aux réunions de sprint.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Card */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-primary-900/20">
                        <h3 className="text-xl font-bold mb-6">Postuler à cette offre</h3>
                        <p className="text-slate-400 mb-8 font-medium">Votre profil correspond à ce poste ? Envoyez votre CV dès maintenant.</p>
                        
                        {applied ? (
                            <div className="bg-green-500/20 text-green-400 p-4 rounded-xl border border-green-500/30 font-bold text-center flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                Application envoyée !
                            </div>
                        ) : (
                            <button 
                                onClick={handleApply}
                                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-500 hover:scale-[1.02] transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center gap-3"
                            >
                                Postuler maintenant
                            </button>
                        )}
                        <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold">Réponse sous 48h</p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                         <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">À propos de l'entreprise</h3>
                         <p className="text-slate-600 font-medium leading-relaxed mb-6">
                            {offer.company?.description}
                         </p>
                         <div className="space-y-4">
                            <a href="#" className="flex items-center gap-3 text-primary-600 font-bold hover:underline">
                                <LinkIcon className="w-4 h-4" />
                                Site web
                            </a>
                            <div className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
                                <MapPin className="w-4 h-4" />
                                {offer.company?.city}, Maroc
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferDetail;
