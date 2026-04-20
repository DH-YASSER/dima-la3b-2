import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                           <div className="bg-primary-600 p-1.5 rounded-lg">
                               <Briefcase className="w-5 h-5 text-white" />
                           </div>
                           <span className="text-xl font-bold text-slate-800 tracking-tight">StageMatch<span className="text-primary-600">.ma</span></span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/offers" className="text-slate-600 hover:text-primary-600 font-medium tracking-wide transition-colors">Browse Offers</Link>
                        {user?.role === 'company' && (
                            <Link to="/post-offer" className="text-slate-600 hover:text-primary-600 font-medium tracking-wide transition-colors">Post an Offer</Link>
                        )}
                        
                        {user ? (
                            <div className="flex items-center space-x-4 border-l pl-8 border-slate-200">
                                <span className="text-slate-800 font-semibold text-sm flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {user.name}
                                </span>
                                <button 
                                    onClick={logout}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden lg:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-semibold px-4 py-2 border border-slate-400 rounded-lg hover:border-primary-600 transition-all">Login</Link>
                                <Link to="/register" className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all">Get Started</Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden">
                        <Menu className="w-6 h-6 text-slate-600" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
