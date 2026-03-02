import React, { useState, useEffect } from 'react';
import RealStats from './RealStats';
import CohortTable from './CohortTable';
import PMFTables from './PMFTables';

const Admin: React.FC<{onNavigateToChat: () => void}> = ({ onNavigateToChat }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [allPayments, setAllPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    if (!token) {
      setError("Session expirée. Veuillez vous reconnecter.");
      setLoading(false);
      return;
    }

    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Appel des utilisateurs
      const resUsers = await fetch(`${API_URL}/users/admin/all`, { headers });
      const dataUsers = await resUsers.json();

      // Appel des paiements en attente (Consommation UI)
      const resPending = await fetch(`${API_URL}/users/admin/payments`, { headers });
      const dataPending = await resPending.json();

      // Appel de tous les paiements (Analytics)
      const resAll = await fetch(`${API_URL}/users/admin/payments/all`, { headers });
      const dataAll = await resAll.json();

      if (resUsers.ok && Array.isArray(dataUsers)) setUsers(dataUsers);
      if (resPending.ok && Array.isArray(dataPending)) setPendingPayments(dataPending);
      if (resAll.ok && Array.isArray(dataAll)) setAllPayments(dataAll);

    } catch (err) {
      setError("Le serveur ne répond pas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approvePayment = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/users/admin/payments/${id}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) { alert("Erreur lors de la validation"); }
  };

  const resetStats = async () => {
    if (!window.confirm("Voulez-vous vraiment réinitialiser toutes les statistiques à 0% ?")) return;
    try {
      const res = await fetch(`${API_URL}/users/admin/reset-stats`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) { alert("Erreur lors de la réinitialisation"); }
  };

  const toggleUser = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/users/admin/toggle-status/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) { alert("Erreur lors du bannissement"); }
  };

  const handleChat = (u: any) => {
    localStorage.setItem('admin_chat_target', JSON.stringify(u));
    onNavigateToChat();
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rouge"></div>
      <p className="mt-4 font-black text-marron-300 uppercase tracking-widest text-xs">Analyse des flux réels...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto mt-20 p-10 bg-white rounded-[2.5rem] shadow-2xl border border-rouge/20 text-center">
      <div className="text-5xl mb-6">🚫</div>
      <h2 className="text-2xl font-black text-marron-900 mb-4 uppercase">Erreur Système</h2>
      <p className="text-marron-500 font-medium mb-8 leading-relaxed">{error}</p>
      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-marron-900 text-white rounded-full font-bold uppercase text-xs tracking-widest shadow-lg">Réessayer</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-32 animate-fade-in mb-20 text-marron-900">
      
      {/* 📊 INDICATEURS DE PERFORMANCE (UTILISENT TOUS LES PAIEMENTS POUR LES %) */}
      <RealStats users={users} payments={allPayments} />

      {/* 🏆 RAPPORTS DE VALIDATION STRATÉGIQUE */}
      <PMFTables users={users} payments={allPayments} />

      {/* 📅 ANALYSE DE RÉTENTION & COHORTES */}
      <CohortTable users={users} payments={allPayments} />

      {/* SECTION FLUX FINANCIERS (NE MONTRE QUE LES PENDING) */}
      <section className="pt-12 border-t border-marron-50">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-10 uppercase italic">Opérations Financières</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingPayments.length > 0 ? pendingPayments.map(p => (
            <div key={p.id} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-marron-100 flex flex-col items-center hover:shadow-rouge/5 transition-all">
               <p className="font-black text-rouge text-[10px] uppercase mb-6 tracking-widest">Opération #{p.id}</p>
               <a href={p.screenshot_url} target="_blank" rel="noreferrer" className="mb-6 block rounded-3xl overflow-hidden border border-marron-100 shadow-inner group">
                 <img src={p.screenshot_url} className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Justificatif" />
               </a>
               <button onClick={() => approvePayment(p.id)} className="w-full py-4 bg-marron-900 text-white rounded-2xl font-black uppercase text-xs shadow-lg hover:bg-black transition-all">Approuver {p.amount}f</button>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center bg-marron-50/20 rounded-[3rem] border-2 border-dashed border-marron-100 text-marron-200 font-black uppercase text-xs tracking-[0.5em]">Toutes les ventes sont conclues !</div>
          )}
        </div>
      </section>

      {/* SECTION RÉPERTOIRE */}
      <section className="pt-12 border-t border-marron-50">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-10 uppercase italic">Registre des Membres</h2>
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-marron-100 mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-marron-50 text-marron-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <tr><th className="p-10">Utilisateur</th><th className="p-10">Profil</th><th className="p-10">Activité</th><th className="p-10 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-marron-50">
                {users.map(u => (
                  <tr key={u.id} className="group hover:bg-marron-50/10 transition-all">
                    <td className="p-10 flex items-center gap-5">
                      <img src={u.avatar_url} className="w-14 h-14 rounded-2xl object-cover shadow-sm border-2 border-white ring-1 ring-marron-100" alt="" />
                      <div><p className="font-black text-marron-900 text-lg">{u.username}</p><p className="text-[10px] text-marron-400 uppercase font-black">{u.email}</p></div>
                    </td>
                    <td className="p-10">
                      <span className="px-4 py-1.5 bg-marron-900 text-white rounded-xl text-[9px] uppercase tracking-widest font-black">{u.role}</span>
                    </td>
                    <td className="p-10">
                       <span className={allPayments.some(p => p.user_id === u.id && p.status === 'approved') ? "text-green-500 font-bold text-xs" : "text-gray-300 font-bold text-xs"}>
                         {allPayments.some(p => p.user_id === u.id && p.status === 'approved') ? "Vente Conclue" : "En attente"}
                       </span>
                    </td>
                    <td className="p-10 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleUser(u.id)} className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase text-white shadow-xl ${u.is_active ? 'bg-rouge hover:bg-black' : 'bg-green-500 hover:bg-black'}`}>{u.is_active ? 'Bannir' : 'Activer'}</button>
                        <button onClick={() => handleChat(u)} className="px-5 py-3 bg-marron-900 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-black shadow-xl">Contact</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⚡ BOUTON DE RÉINITIALISATION CRITICAL */}
        <div className="flex justify-center">
           <button 
             onClick={resetStats}
             className="px-12 py-6 bg-white border-2 border-marron-900 text-marron-900 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:bg-marron-900 hover:text-white transition-all shadow-2xl"
           >
             Réinitialiser les Statistiques (0%)
           </button>
        </div>
      </section>
    </div>
  );
};

export default Admin;