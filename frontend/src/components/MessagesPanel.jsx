import { useState, useEffect } from 'react';

const MessagesPanel = ({ messages, loading, onLoad, onDelete }) => {
    const [deleteLoading, setDeleteLoading] = useState(null);
  
    useEffect(() => {
      onLoad();
    }, []);
  
    const handleDelete = async (id) => {
      if (!window.confirm('Delete this message?')) return;
      setDeleteLoading(id);
      try {
        await onDelete(id);
        onLoad();
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.detail || err?.message || 'Delete failed');
      } finally {
        setDeleteLoading(null);
      }
    };
  
    const formatDate = (d) => {
      if (!d) return '';
      try {
        const date = typeof d === 'string' ? new Date(d) : d;
        return date.toLocaleDateString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      } catch {
        return '';
      }
    };
  
    return (
      <div className="bg-black/30 backdrop-blur-xl border border-neon-purple/20 rounded-2xl p-6 lg:p-8">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-6">
          Contact Messages ({messages?.length || 0})
        </h2>
        {loading ? (
          <p className="text-[#c4b5fd]">Loading...</p>
        ) : !messages?.length ? (
          <p className="text-[#a0a0ff]/70">No messages yet. Messages from the contact form will appear here.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-black/40 border border-neon-purple/20 rounded-xl p-5 hover:border-neon-purple/40 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono font-semibold text-white">{msg.name}</span>
                      <span className="text-[#a0a0ff] text-sm">{msg.email}</span>
                      <span className="text-[#c4b5fd] text-xs">{formatDate(msg.date)}</span>
                    </div>
                    <h4 className="text-neon-purple font-medium mb-2">{msg.subject}</h4>
                    <p className="text-[#b0b0ff] text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    disabled={deleteLoading === msg.id}
                    className="shrink-0 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition text-sm disabled:opacity-50"
                  >
                    {deleteLoading === msg.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  

export default MessagesPanel