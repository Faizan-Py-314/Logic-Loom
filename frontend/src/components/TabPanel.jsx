import { useState, useEffect } from 'react';
import MDEditor from '../components/MDEditor'

const TabPanel = ({
    title,
    items,
    loading,
    onLoad,
    onDelete,
    editingItem,
    setEditingItem,
    formData,
    setFormData,
    onSubmit,
    getFormFields,
    emptyFields,
    mdPlaceholder = 'Write your markdown here...',
  }) => {
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
  
    useEffect(() => {
      onLoad();
    }, []);
  
    const handleUpdateClick = (item) => {
      setEditingItem(item);
      setIsUpdateMode(true);
      setFormData(item);
    };
  
    const handleCancelEdit = () => {
      setEditingItem(null);
      setIsUpdateMode(false);
      setFormData(emptyFields);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        await onSubmit(isUpdateMode ? editingItem?.id : null, formData);
        handleCancelEdit();
        onLoad();
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.detail || err?.message || 'Operation failed');
      } finally {
        setSubmitLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this?')) return;
      setDeleteLoading(id);
      try {
        await onDelete(id);
        if (editingItem?.id === id) handleCancelEdit();
        onLoad();
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.detail || err?.message || 'Delete failed');
      } finally {
        setDeleteLoading(null);
      }
    };
  
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload / Update Form */}
          <div className="bg-black/30 backdrop-blur-xl border border-neon-purple/20 rounded-2xl p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-6">
              {isUpdateMode ? `Update ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {getFormFields(formData, setFormData, isUpdateMode)}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 px-6 py-3.5 bg-linear-to-r from-neon-purple to-neon-cyan text-white font-mono font-semibold rounded-xl shadow-lg hover:shadow-neon-purple/30 transition disabled:opacity-50"
                >
                  {submitLoading ? 'Saving...' : isUpdateMode ? 'Save Changes' : 'Add'}
                </button>
                {isUpdateMode && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3.5 bg-gray-600/80 hover:bg-gray-600 text-white font-mono rounded-xl transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
  
          {/* Items List */}
          <div className="bg-black/30 backdrop-blur-xl border border-neon-purple/20 rounded-2xl p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-6">
              Current {title} ({items?.length || 0})
            </h2>
            {loading ? (
              <p className="text-[#c4b5fd]">Loading...</p>
            ) : !items?.length ? (
              <p className="text-[#a0a0ff]/70">No items yet. Add one above.</p>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-4 p-4 rounded-xl border transition ${
                      editingItem?.id === item.id
                        ? 'bg-neon-purple/10 border-neon-purple/50'
                        : 'bg-black/40 border-neon-purple/20 hover:border-neon-purple/40'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="font-mono font-semibold text-white truncate">{item.title}</h4>
                      <p className="text-[#c4b5fd] text-sm truncate">
                        {item.description || item.excerpt || item.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateClick(item)}
                        className="px-3 py-1.5 text-neon-purple hover:text-white hover:bg-neon-purple/20 rounded-lg transition text-sm"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteLoading === item.id}
                        className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition text-sm disabled:opacity-50"
                      >
                        {deleteLoading === item.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Full-width Markdown section */}
        <div className="bg-black/30 backdrop-blur-xl border border-neon-purple/20 rounded-2xl p-6 lg:p-8">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-6">
            Markdown Content & Live Preview
          </h2>
          <MDEditor
            value={formData.content}
            onChange={(v) => setFormData({ ...formData, content: v })}
            placeholder={mdPlaceholder}
          />
        </div>
      </div>
    );
  };
  

export default TabPanel