import React, { useEffect, useState } from 'react';
import { Mail, Trash2, UserCheck, Users } from 'lucide-react';
import { NewsletterSubscriber } from '../../types';
import { getNewsletterSubscribers, unsubscribeNewsletter } from '../../services/dataService';

export const AdminSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  const load = async () => {
    const list = await getNewsletterSubscribers();
    setSubscribers(list);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUnsubscribe = async (id: string, email: string) => {
    if (window.confirm(`Unsubscribe "${email}"?`)) {
      await unsubscribeNewsletter(id);
      await load();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
          Newsletter Subscribers
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Active community members subscribed to the ResinArt editorial newsletter.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-stone-50/80 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-700">
          <span>Subscribers ({subscribers.length})</span>
          <span className="text-emerald-700 font-bold">
            {subscribers.filter((s) => s.status === 'active').length} Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-stone-50/50">
                  <td className="py-3 px-4 font-medium text-stone-900">
                    {sub.email}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        sub.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {sub.status === 'active' && (
                      <button
                        onClick={() => handleUnsubscribe(sub.id, sub.email)}
                        className="text-stone-400 hover:text-rose-600 transition"
                        title="Unsubscribe reader"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
