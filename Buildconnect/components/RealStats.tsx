import React from 'react';

interface StatsProps {
  users: any[];
  payments: any[];
}

const RealStats: React.FC<StatsProps> = ({ users, payments }) => {
  // Calculs des vraies données
  const totalUsers = users.length;
  
  // Ceux qui ont acheté (ceux qui ont au moins un paiement)
  const uniquePayers = new Set(payments.map(p => p.user_id)).size;
  
  // Ceux qui ont eu des services (utilisons 'is_subscribed' ou un rôle spécifique)
  const serviceUsers = users.filter(u => u.is_subscribed).length;

  const statsData = [
    { label: "Utilisateurs Inscrits", count: totalUsers, color: "bg-marron-900", goal: "Croissance" },
    { label: "Acheteurs Matériels", count: uniquePayers, color: "bg-rouge", goal: "Conversion" },
    { label: "Utilisateurs Services", count: serviceUsers, color: "bg-green-500", goal: "Rétention" }
  ];

  return (
    <section className="animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* BIG NUMBERS CARD */}
        <div className="bg-marron-900 p-10 rounded-[3rem] text-white flex flex-col justify-between w-full lg:w-96 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
          
          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] mb-4 opacity-60">État de la Plateforme</p>
            <h3 className="text-5xl font-black leading-tight italic">BUILD<br/>METRICS</h3>
          </div>

          <div className="mt-12 space-y-6 relative z-10">
             <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase font-black opacity-40">Taux d'Engagement</span>
                <span className="text-2xl font-black text-green-400">
                  {totalUsers > 0 ? Math.round(((uniquePayers + serviceUsers) / totalUsers) * 100) : 0}%
                </span>
             </div>
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-400" style={{ width: `${totalUsers > 0 ? ((uniquePayers + serviceUsers) / totalUsers) * 100 : 0}%` }}></div>
             </div>
          </div>
        </div>

        {/* REAL DATA PMF-STYLE TABLE */}
        <div className="flex-1 bg-white rounded-[3rem] shadow-2xl p-8 border border-marron-50 overflow-hidden flex flex-col justify-center">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-marron-300 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-6 pb-2 italic text-marron-900 text-lg">Tableau des Indicateurs (PMF Mode)</th>
                  <th className="px-6">Volume</th>
                  <th className="px-6">Pénétration (%)</th>
                  <th className="px-6 text-right">Focus</th>
                </tr>
              </thead>
              <tbody>
                {statsData.map((item, i) => {
                  const percent = totalUsers > 0 ? Math.round((item.count / totalUsers) * 100) : 0;
                  return (
                    <tr key={i} className="group hover:translate-x-1 transition-transform">
                      <td className="px-6 py-6 bg-marron-50/20 rounded-l-3xl">
                        <span className="font-black text-marron-900 text-sm uppercase tracking-tight">{item.label}</span>
                      </td>
                      <td className="px-6 font-black text-2xl text-marron-900">{item.count}</td>
                      <td className="px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-2.5 bg-marron-50 rounded-full overflow-hidden shadow-inner">
                            <div className={`h-full ${item.color} transition-all duration-1000 shadow-lg`} style={{ width: `${percent}%` }}></div>
                          </div>
                          <span className="font-black text-marron-900 text-sm">{percent}%</span>
                        </div>
                      </td>
                      <td className="px-6 rounded-r-3xl text-right">
                        <span className="px-4 py-2 bg-marron-50 rounded-xl text-[9px] font-black text-marron-400 uppercase tracking-widest">
                          {item.goal}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealStats;
