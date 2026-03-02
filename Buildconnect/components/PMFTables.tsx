import React from 'react';

interface PMFTablesProps {
  users: any[];
  payments: any[];
}

const PMFTables: React.FC<PMFTablesProps> = ({ users, payments }) => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  // --- CALCUL LEADING INDICATOR (CONVERSION W0) ---
  const calculateLeadingIndicator = () => {
    const totalUsers = users.length;
    if (totalUsers === 0) return { percent: 0, converted: 0, total: 0 };

    // Un utilisateur est "converti" s'il a au moins une transaction APPROUVÉE 
    // dans sa semaine d'inscription (W0).
    const convertedUsers = users.filter(u => {
      const registrationDate = new Date(u.created_at);
      const weekStart = new Date(registrationDate);
      weekStart.setHours(0,0,0,0);
      const weekEnd = new Date(weekStart.getTime() + oneWeek);

      return payments.some(p => {
        if (p.user_id !== u.id || p.status !== 'approved') return false;
        const payDate = new Date(p.created_at);
        return payDate >= weekStart && payDate < weekEnd;
      });
    }).length;

    const percent = Math.round((convertedUsers / totalUsers) * 100);
    return { percent, converted: convertedUsers, total: totalUsers };
  };

  const indicatorStats = calculateLeadingIndicator();
  const target = 70; // Le seuil de succès reste 70% pour la couleur, mais on affiche le % BRUT
  const isTargetMet = indicatorStats.percent >= target;

  const pendingCount = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="animate-fade-in text-marron-900">
      <div className="bg-white rounded-[3rem] shadow-3xl border border-marron-100 overflow-hidden">
        <div className={`p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isTargetMet ? 'bg-green-600' : 'bg-black'}`}>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-60 mb-2">Simulateur de Validation</h3>
            <p className="text-3xl font-black uppercase italic tracking-tighter">Leading Indicator (W0 Conversion)</p>
          </div>
          
          <div className="flex gap-8 border-l border-white/20 pl-8">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase opacity-60 mb-1">À Valider</p>
              <p className="text-2xl font-black">{pendingCount}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase opacity-60 mb-1">Conversion Totale</p>
              <p className="text-2xl font-black text-green-400">{indicatorStats.percent}%</p>
            </div>
          </div>
        </div>

        <div className="p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="flex flex-col items-center">
            <div className={`text-[12rem] font-black leading-none tracking-tighter ${isTargetMet ? 'text-green-600' : 'text-black'}`}>
              {indicatorStats.percent}<span className="text-4xl ml-2 text-marron-200">%</span>
            </div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-marron-300">Taux de Conversion Réel</p>
          </div>

          <div className="flex-1 space-y-10 w-full">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase text-marron-400">Progression In-App</span>
                <span className="text-xl font-black">{indicatorStats.converted} / {indicatorStats.total} <span className="text-xs text-marron-300 font-bold ml-1">Ventes Conclues</span></span>
              </div>
              <div className="h-4 bg-marron-50 rounded-full overflow-hidden p-1 shadow-inner border border-marron-100">
                <div 
                  className={`h-full rounded-full transition-all duration-[2000ms] ease-out shadow-lg ${isTargetMet ? 'bg-green-500' : 'bg-black'}`}
                  style={{ width: `${indicatorStats.percent}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-marron-50/50 rounded-3xl border border-marron-100">
                <p className="text-[9px] font-black text-marron-300 uppercase tracking-widest mb-2">Définition</p>
                <p className="text-[11px] font-bold text-marron-900 leading-relaxed uppercase italic">
                  Utilisateurs effectuant un achat durant la <span className="text-rouge">semaine de leur inscription (W0)</span>.
                </p>
              </div>
              <div className="p-6 bg-marron-50/50 rounded-3xl border border-marron-100">
                <p className="text-[9px] font-black text-marron-300 uppercase tracking-widest mb-2">Verdict Simulation</p>
                {indicatorStats.percent > 0 ? (
                  <p className="text-[11px] font-black text-marron-900 uppercase">Signal {indicatorStats.percent}% détecté - Continuez l'approbation</p>
                ) : (
                  <p className="text-[11px] font-black text-rouge uppercase animate-pulse">En attente d'approbation initiale</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMFTables;
