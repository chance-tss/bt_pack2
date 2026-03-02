import React from 'react';

interface CohortTableProps {
  users: any[];
  payments: any[];
}

const CohortTable: React.FC<CohortTableProps> = ({ users, payments }) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const now = new Date("2026-03-02"); // Aujourd'hui

  const formatDate = (date: Date) => date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

  const weeksToShow = 16;
  
  const matrixData = Array.from({ length: weeksToShow }, (_, i) => {
    // Calcul précis du début de la semaine de la cohorte
    const weekStart = new Date(now.getTime() - (weeksToShow - 1 - i) * oneWeek);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart.getTime() + oneWeek);
    
    // Utilisateurs inscrits durant cette semaine précise
    const cohortUsers = users.filter(u => {
      const d = new Date(u.created_at);
      return d >= weekStart && d < weekEnd;
    });

    const size = cohortUsers.length;

    const cells = Array.from({ length: weeksToShow }, (_, colIdx) => {
      // Triangle temporel
      const weeksSinceRegistration = Math.floor((now.getTime() - weekStart.getTime()) / oneWeek);
      if (colIdx > weeksSinceRegistration) return null;
      if (size === 0) return 0;

      // Leading Indicator Simulation Logic:
      // On compte combien d'utilisateurs de la cohorte ont un paiement APPROUVÉ 
      // effectué durant la semaine 'colIdx' après leur inscription.
      // W0 = même semaine que l'inscription.
      
      const convertedInWeek = cohortUsers.filter(u => {
        return payments.some(p => {
          if (p.user_id !== u.id || p.status !== 'approved') return false;
          const payDate = new Date(p.created_at);
          // Calculer le décalage de semaine par rapport au début de la cohorte
          const diffWeeks = Math.floor((payDate.getTime() - weekStart.getTime()) / oneWeek);
          return diffWeeks === colIdx;
        });
      }).length;

      // Pourcentage BRUT (Simulation : 1/5 = 20%)
      return Math.round((convertedInWeek / size) * 100);
    });

    return { label: `Sem. du ${formatDate(weekStart)}`, size, cells };
  });

  const getCellColor = (val: number | null) => {
    if (val === null) return 'transparent';
    if (val === 0) return '#1a1a1a';
    if (val >= 80) return '#10b981';
    if (val >= 60) return '#34d399';
    if (val >= 40) return '#fbbf24';
    if (val >= 20) return '#f87171';
    return '#ef4444';
  };

  return (
    <section className="bg-black text-white p-10 rounded-[2.5rem] shadow-3xl font-sans">
      <div className="mb-12">
        <h2 className="text-3xl font-black tracking-tight mb-2">Leading Indicator Validation</h2>
        <p className="text-gray-500 text-sm font-medium italic underline decoration-zinc-800 underline-offset-4 decoration-2">
          Simulation W0 : Chaque approbation d'un nouvel inscrit augmente le score de cette semaine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {[
          { label: "Leading Indicator", value: "Retention W0", sub: "Achat Semaine 1" },
          { label: "Cohorte Actuelle", value: matrixData[matrixData.length-1].size.toString(), sub: "Nouveaux Inscrits", color: "text-orange-400" },
          { label: "Incrément", value: `${Math.round(100/(matrixData[matrixData.length-1].size || 1))}%`, sub: "Par utilisateur" },
          { label: "Status", value: "LIVE", sub: "Mode Simulation", color: "text-green-400" },
        ].map((k, i) => (
          <div key={i} className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">{k.label}</p>
            <div className={`text-4xl font-black mb-2 ${k.color || 'text-white'}`}>{k.value}</div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-gray-700">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[10px] border-separate border-spacing-[2px]">
          <thead>
            <tr className="text-gray-600 font-bold text-left">
              <th className="px-4 py-2 w-48">Cohortes</th>
              <th className="px-4 py-2 text-center w-20">Users</th>
              {Array.from({ length: 16 }, (_, i) => (<th key={i} className="px-2 py-2 text-center w-10">W{i}</th>))}
            </tr>
          </thead>
          <tbody>
            {matrixData.map((row, rIdx) => (
              <tr key={rIdx} className="group">
                <td className="px-4 py-2 text-gray-400 font-bold group-hover:text-white">{row.label}</td>
                <td className="px-4 py-2 text-center font-black text-zinc-600">{row.size}</td>
                {row.cells.map((cell, cIdx) => (
                  <td key={cIdx} className="p-0">
                    <div className="h-8 flex items-center justify-center font-bold text-black rounded-[2px]"
                      style={{ backgroundColor: getCellColor(cell), opacity: cell === null ? 0 : 1 }}>
                      {cell !== null && cell > 0 ? `${cell}%` : (cell === 0 ? '0%' : '')}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CohortTable;
