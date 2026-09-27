import React, { useEffect, useState } from 'react';
import { Check, Copy, Image as ImageIcon, Plus, Search, Trash2, Upload } from 'lucide-react';
import { MediaItem } from '../../types';
import { addMediaItem, deleteMediaItem, getMediaItems } from '../../services/dataService';

export const AdminMedia: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newFileName, setNewFileName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const loadMedia = async () => {
    const list = await getMediaItems();
    setItems(list);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    await addMediaItem({
      file_name: newFileName.trim() || 'image.jpg',
      storage_path: `site-assets/${newFileName.trim() || 'image.jpg'}`,
      public_url: newUrl.trim(),
      alt_text: newAlt.trim() || 'Resin art photo',
      uploaded_by: 'Admin'
    });
    setNewFileName('');
    setNewUrl('');
    setNewAlt('');
    await loadMedia();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this media asset?')) {
      await deleteMediaItem(id);
      await loadMedia();
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = items.filter(
    (m) =>
      !search.trim() ||
      m.file_name.toLowerCase().includes(search.toLowerCase()) ||
      m.alt_text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
          Media Library
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Manage photographic assets, upload URLs, and copy links for articles and projects.
        </p>
      </div>

      {/* Add Media Box */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <h3 className="font-serif font-semibold text-stone-900 text-sm flex items-center gap-2">
          <Upload className="w-4 h-4 text-teal-700" />
          <span>Add Media Asset to Catalog</span>
        </h3>
        <form onSubmit={handleAddMedia} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <input
            type="text"
            placeholder="File name (e.g. ocean_cells_macro.jpg)"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
          />
          <input
            type="text"
            required
            placeholder="Image URL or local asset path"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Descriptive Alt Text"
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shrink-0 cursor-pointer"
            >
              Add Image
            </button>
          </div>
        </form>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between"
          >
            <div className="aspect-16/10 bg-stone-100 overflow-hidden relative">
              <img
                src={item.public_url}
                alt={item.alt_text}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="font-semibold text-xs text-stone-900 truncate">
                {item.file_name}
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-1">
                {item.alt_text}
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.public_url)}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 cursor-pointer font-medium"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
