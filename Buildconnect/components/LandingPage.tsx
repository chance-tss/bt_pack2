
import React from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
    onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    return (
        <div className="font-sans text-marron-900">
            {/* HERO SECTION */}
            <section className="relative bg-marron-900 text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left">
                    <div className="lg:w-2/3">
                        <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter uppercase leading-tight">
                            Un Pont entre <span className="text-rouge">l'Offre</span> et <span className="text-rouge">la Demande</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-marron-100 mb-8 max-w-2xl font-medium">
                            La première plateforme digitale au Bénin pour connecter professionnels du BTP et clients en toute confiance.
                            Finis les risques d'arnaque et la perte de temps.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => onNavigate('register-role')}
                                className="bg-rouge hover:bg-red-700 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl transition-transform transform hover:-translate-y-1"
                            >
                                Commencer
                            </button>
                            <button
                                onClick={() => onNavigate('feed')}
                                className="bg-transparent border-2 border-white hover:bg-white hover:text-marron-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all"
                            >
                                Explorer les Pros
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS RAPIDES */}
            <section className="bg-rouge py-12 text-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-black mb-2">100%</div>
                        <p className="font-bold uppercase tracking-widest text-xs opacity-80">Profils Vérifiés</p>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">24/7</div>
                        <p className="font-bold uppercase tracking-widest text-xs opacity-80">Disponibilité</p>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">+60%</div>
                        <p className="font-bold uppercase tracking-widest text-xs opacity-80">Du marché informal sécurisé</p>
                    </div>
                </div>
            </section>

            {/* COMMENT ÇA MARCHE */}
            <section className="py-20 bg-marron-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black uppercase text-marron-900 mb-4">Une solution pour tous</h2>
                        <p className="text-marron-500 max-w-xl mx-auto">Que vous soyez un particulier cherchant à construire, ou un professionnel cherchant des chantiers.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* POUR LES CLIENTS */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-marron-100 hover:shadow-2xl transition-all">
                            <div className="w-16 h-16 bg-marron-100 rounded-full flex items-center justify-center text-3xl mb-6">👷‍♂️</div>
                            <h3 className="text-2xl font-black uppercase mb-4 text-marron-900">Pour les Clients</h3>
                            <ul className="space-y-4 text-marron-600 font-medium">
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Recherche géolocalisée par quartier
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Profils vérifiés avec portfolios réels
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Comparaison transparente des devis
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Suivi de projet en temps réel
                                </li>
                            </ul>
                            <div className="mt-8">
                                <span className="block text-xs font-black uppercase tracking-widest text-marron-400 mb-2">Idéal pour :</span>
                                <p className="text-sm font-bold text-marron-800">Propriétaires, Diaspora, Promoteurs</p>
                            </div>
                        </div>

                        {/* POUR LES PROS */}
                        <div className="bg-marron-900 text-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-rouge opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="w-16 h-16 bg-marron-800 rounded-full flex items-center justify-center text-3xl mb-6 relative z-10">🛠️</div>
                            <h3 className="text-2xl font-black uppercase mb-4 relative z-10">Pour les Pros</h3>
                            <ul className="space-y-4 text-marron-200 font-medium relative z-10">
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Vitrine digitale professionnelle
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Accès à des leads qualifiés dans votre zone
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Gestion de réputation & Avis clients
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rouge font-black">✓</span> Statistiques de performance
                                </li>
                            </ul>
                            <div className="mt-8 relative z-10">
                                <span className="block text-xs font-black uppercase tracking-widest text-marron-400 mb-2">Idéal pour :</span>
                                <p className="text-sm font-bold text-white">Artisans, PME BTP, Fournisseurs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black uppercase text-marron-900 mb-4">Nos Offres Professionnelles</h2>
                        <p className="text-marron-500 max-w-xl mx-auto">Boostez votre visibilité et trouvez plus de chantiers.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* BASIC */}
                        <div className="p-8 rounded-3xl border border-marron-100 hover:border-marron-300 transition-all group">
                            <h3 className="text-xl font-black uppercase text-marron-400 mb-2">Basic</h3>
                            <div className="text-4xl font-black text-marron-900 mb-6 group-hover:text-rouge transition-colors">Gratuit</div>
                            <ul className="space-y-3 mb-8 text-sm font-medium text-marron-600">
                                <li>• Profil simple</li>
                                <li>• 3 photos max</li>
                                <li>• Visibilité limitée</li>
                            </ul>
                            <button onClick={() => onNavigate('register-role')} className="w-full py-3 rounded-xl border-2 border-marron-900 text-marron-900 font-black uppercase text-xs tracking-widest hover:bg-marron-900 hover:text-white transition-all">S'inscrire</button>
                        </div>

                        {/* PRO */}
                        <div className="p-8 bg-marron-900 rounded-[2.5rem] text-white shadow-2xl relative transform lg:scale-105 z-10">
                            <div className="absolute top-6 right-6 bg-rouge text-white text-[10px] uppercase font-black px-3 py-1 rounded-full">Populaire</div>
                            <h3 className="text-xl font-black uppercase text-marron-300 mb-2">Pro</h3>
                            <div className="text-5xl font-black text-white mb-1">15.000 <span className="text-lg font-bold text-marron-400">FCFA</span></div>
                            <div className="text-xs text-marron-400 font-bold uppercase tracking-widest mb-8">/ mois</div>
                            <ul className="space-y-4 mb-10 text-sm font-medium text-marron-100">
                                <li className="flex gap-3"><span className="text-rouge">✓</span> Profil complet & détaillé</li>
                                <li className="flex gap-3"><span className="text-rouge">✓</span> Portfolio illimité</li>
                                <li className="flex gap-3"><span className="text-rouge">✓</span> Badge "Vérifié"</li>
                                <li className="flex gap-3"><span className="text-rouge">✓</span> Accès aux avis clients</li>
                            </ul>
                            <button onClick={() => onNavigate('register-role')} className="w-full py-4 rounded-xl bg-rouge text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-rouge transition-all shadow-lg">Choisir Pro</button>
                        </div>

                        {/* PREMIUM */}
                        <div className="p-8 rounded-3xl border border-marron-100 hover:border-marron-300 transition-all group">
                            <h3 className="text-xl font-black uppercase text-marron-400 mb-2">Premium</h3>
                            <div className="text-4xl font-black text-marron-900 mb-1 group-hover:text-rouge transition-colors">30.000 <span className="text-sm">FCFA</span></div>
                            <div className="text-[10px] text-marron-400 font-bold uppercase tracking-widest mb-6">/ mois</div>
                            <ul className="space-y-3 mb-8 text-sm font-medium text-marron-600">
                                <li>• Tout du pack Pro</li>
                                <li>• Priorité dans les résultats</li>
                                <li>• Analytics avancés</li>
                                <li>• Support dédié 24/7</li>
                            </ul>
                            <button onClick={() => onNavigate('register-role')} className="w-full py-3 rounded-xl border-2 border-marron-900 text-marron-900 font-black uppercase text-xs tracking-widest hover:bg-marron-900 hover:text-white transition-all">S'inscrire</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-20 bg-rouge text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl lg:text-5xl font-black uppercase mb-8 leading-none">Prêt à construire l'avenir ?</h2>
                    <p className="text-xl text-white/80 mb-10 font-bold max-w-2xl mx-auto">Rejoignez la communauté BuildConnect dès aujourd'hui.</p>
                    <button onClick={() => onNavigate('register-role')} className="bg-white text-rouge px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-marron-900 hover:text-white transition-all transform hover:scale-105">
                        Créer un compte
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
