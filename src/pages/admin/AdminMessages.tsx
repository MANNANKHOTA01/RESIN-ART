import React, { useEffect, useState } from 'react';
import { Check, Mail, MessageSquare, Trash2 } from 'lucide-react';
import { ContactMessage } from '../../types';
import { deleteContactMessage, getContactMessages, updateContactMessageStatus } from '../../services/dataService';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const load = async () => {
    const list = await getContactMessages();
    setMessages(list);
    if (!selectedMessage && list.length > 0) {
      setSelectedMessage(list[0]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, status: ContactMessage['status']) => {
    await updateContactMessageStatus(id, status);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
    await load();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this reader message?')) {
      await deleteContactMessage(id);
      setSelectedMessage(null);
      await load();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
          Reader Messages & Inquiries
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review submissions from the public contact form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Messages List Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50/80 border-b border-stone-200 text-xs font-semibold text-stone-600">
            Inbox ({messages.length})
          </div>

          <div className="divide-y divide-stone-100 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                No messages received yet.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMessage(m)}
                  className={`p-4 cursor-pointer transition text-xs ${
                    selectedMessage?.id === m.id
                      ? 'bg-teal-50/70 border-l-3 border-teal-700'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-stone-900">{m.name}</strong>
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        m.status === 'new'
                          ? 'bg-rose-100 text-rose-800'
                          : m.status === 'replied'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <h5 className="font-medium text-stone-800 line-clamp-1">{m.subject}</h5>
                  <p className="text-stone-500 line-clamp-1 mt-0.5">{m.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Message Detail Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          {selectedMessage ? (
            <div className="space-y-6 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    {selectedMessage.subject}
                  </h3>
                  <div className="text-xs text-stone-500 mt-1">
                    From <strong>{selectedMessage.name}</strong> ({selectedMessage.email}) ·{' '}
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as any)}
                    className="px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg font-medium"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 leading-relaxed whitespace-pre-wrap text-stone-800">
                {selectedMessage.message}
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-xs text-stone-400">
              Select a message from the left to read full details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
