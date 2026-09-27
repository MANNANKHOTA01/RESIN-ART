import React, { useEffect, useState } from 'react';
import { Layers, Plus, Tag as TagIcon, Trash2 } from 'lucide-react';
import { Category, Tag } from '../../types';
import { deleteCategory, deleteTag, getCategories, getTags, saveCategory, saveTag } from '../../services/dataService';

export const AdminTaxonomy: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newTagName, setNewTagName] = useState('');

  const refresh = async () => {
    const [c, t] = await Promise.all([getCategories(), getTags()]);
    setCategories(c);
    setTags(t);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    await saveCategory({ name: newCatName.trim(), slug, description: newCatDesc.trim() });
    setNewCatName('');
    setNewCatDesc('');
    await refresh();
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    const slug = newTagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    await saveTag({ name: newTagName.trim(), slug });
    setNewTagName('');
    await refresh();
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      await deleteCategory(id);
      await refresh();
    }
  };

  const handleDeleteTag = async (id: string, name: string) => {
    if (window.confirm(`Delete tag "${name}"?`)) {
      await deleteTag(id);
      await refresh();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
          Taxonomy: Categories & Tags
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Organize editorial guides, tutorials, and project classifications across the database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Panel */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg pb-3 border-b border-stone-100">
            <Layers className="w-5 h-5 text-teal-700" />
            <span>Editorial Categories ({categories.length})</span>
          </div>

          <form onSubmit={handleAddCategory} className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Add New Category
            </h4>
            <input
              type="text"
              required
              placeholder="Category name (e.g. Master Pours)"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
            />
            <input
              type="text"
              placeholder="Short description"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
            />
            <button
              type="submit"
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Add Category
            </button>
          </form>

          <div className="divide-y divide-stone-100">
            {categories.map((cat) => (
              <div key={cat.id} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">{cat.name}</h4>
                  <p className="text-[11px] text-stone-400 font-mono">/category/{cat.slug}</p>
                  {cat.description && (
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{cat.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Panel */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg pb-3 border-b border-stone-100">
            <TagIcon className="w-5 h-5 text-teal-700" />
            <span>Search & Topic Tags ({tags.length})</span>
          </div>

          <form onSubmit={handleAddTag} className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Add New Tag
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Tag name (e.g. UV Resin)"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer"
              >
                Add Tag
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 flex items-center gap-2"
              >
                <span>#{tag.name}</span>
                <button
                  onClick={() => handleDeleteTag(tag.id, tag.name)}
                  className="text-stone-400 hover:text-rose-600 cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
