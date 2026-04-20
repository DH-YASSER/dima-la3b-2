import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, User, Building, MapPin, Mail, Lock, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        company_name: '',
        city: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/register', formData);
            login(response.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
            <div className="max-w-xl w-full bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
                        <UserPlus className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Créez votre compte</h1>
                    <p className="text-slate-500 font-medium mt-2">Rejoignez la communauté StageMatch Morocco</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Role Selector */}
                    <div className="flex p-1.5 bg-slate-50 border border-slate-100 rounded-2xl gap-1">
                        <button
                            type="button"
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${formData.role === 'student' ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                            onClick={() => setFormData({...formData, role: 'student'})}
                        >
                            <User className="w-4 h-4" />
                            Étudiant
                        </button>
                        <button
                            type="button"
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${formData.role === 'company' ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                            onClick={() => setFormData({...formData, role: 'company'})}
                        >
                            <Building className="w-4 h-4" />
                            Entreprise
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-full">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider ml-1">Nom complet</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl focus:ring-primary-600 focus:border-primary-600 font-medium transition-all"
                                placeholder="Yassine El Amrani"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider ml-1">Email professionnel</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-100 rounded-2xl focus:ring-primary-600 focus:border-primary-600 font-medium transition-all"
                                    placeholder="contact@example.ma"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        {formData.role === 'company' && (
                            <>
                                <div className="col-span-full md:col-span-1">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider ml-1">Nom de l'entreprise</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl focus:ring-primary-600 focus:border-primary-600 font-medium transition-all"
                                        placeholder="StartupX"
                                        value={formData.company_name}
                                        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-full md:col-span-1">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider ml-1">Ville</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl focus:ring-primary-600 focus:border-primary-600 font-medium transition-all"
                                        placeholder="Casablanca"
                                        value={formData.city}
                                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    />
                                </div>
                            </>
                        )}

                        <div className="col-span-full">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider ml-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-100 rounded-2xl focus:ring-primary-600 focus:border-primary-600 font-medium transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm font-bold">{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-600 hover:scale-[1.01] transition-all shadow-xl shadow-slate-200 disabled:opacity-70"
                    >
                        {loading ? 'Création...' : 'S\'inscrire'}
                    </button>
                </form>

                <div className="mt-10 text-center text-slate-600 font-medium">
                    Déjà inscrit ?{' '}
                    <Link to="/login" className="text-primary-600 font-bold hover:underline">Se connecter</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
