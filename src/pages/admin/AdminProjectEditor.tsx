import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Plus, Save, Trash2, Wrench } from 'lucide-react';
import { Project, ProjectMaterial, ProjectStep } from '../../types';
import { getProjects, saveProject } from '../../services/dataService';
import { RESIN_GEODE_IMAGE } from '../../data/seedData';

export const AdminProjectEditor: React.FC<{
  id?: string;
  onNavigate: (path: string) => void;
}> = ({ id, onNavigate }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: RESIN_GEODE_IMAGE,
    difficulty: 'Beginner',
    estimated_time: '1 hour + 24 hr cure',
    status: 'draft',
    materials: [
      { name: '1:1 Art Epoxy Resin', quantity: '8 oz', notes: 'Pre-warmed' },
      { name: 'Silicone Coaster Molds', quantity: '4 pack', notes: 'Clean' }
    ],
    steps: [
      { step_number: 1, title: 'Measure and Stir', content: 'Mix Part A and Part B with calibrated cups for 3 minutes.' }
    ]
  });

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (id) {
        const all = await getProjects({ status: 'all' });
        const match = all.find((p) => p.id === id);
        if (match) setFormData(match);
      }
    }
    load();
  }, [id]);

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.id ? prev.slug : slugified,
      seo_title: prev.seo_title || val
    }));
  };

  const addMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [...(prev.materials || []), { name: '', quantity: '', notes: '' }]
    }));
  };

  const updateMaterial = (idx: number, field: keyof ProjectMaterial, val: string) => {
    const list = [...(formData.materials || [])];
    list[idx] = { ...list[idx], [field]: val };
    setFormData((prev) => ({ ...prev, materials: list }));
  };

  const removeMaterial = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: (prev.materials || []).filter((_, i) => i !== idx)
    }));
  };

  const addStep = () => {
    const nextNum = (formData.steps?.length || 0) + 1;
    setFormData((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), { step_number: nextNum, title: '', content: '' }]
    }));
  };

  const updateStep = (idx: number, field: keyof ProjectStep, val: string | number) => {
    const list = [...(formData.steps || [])];
    list[idx] = { ...list[idx], [field]: val };
    setFormData((prev) => ({ ...prev, steps: list }));
  };

  const removeStep = (idx: number) => {
    const list = (formData.steps || [])
      .filter((_, i) => i !== idx)
      .map((s, i) => ({ ...s, step_number: i + 1 }));
    setFormData((prev) => ({ ...prev, steps: list }));
  };

  const handleSave = async (publishNow = false) => {
    if (!formData.title || !formData.slug) {
      alert('Please fill out title and slug.');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      status: publishNow ? 'published' : formData.status || 'draft'
    };

    await saveProject(payload);
    setSaving(false);
    setStatusMsg(`Project saved successfully!`);

    setTimeout(() => {
      onNavigate('/admin/projects/');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/projects/')}
            className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-medium text-stone-900">
              {id ? 'Edit Project Blueprint' : 'New Project Blueprint'}
            </h1>
            <p className="text-xs text-stone-500">
              Structured hands-on workshop editor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Publish Project</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Main Info */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ocean Wave Serving Tray"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                URL Slug *
              </label>
              <div className="flex items-center text-xs bg-stone-50 border border-stone-200 rounded-lg overflow-hidden focus-within:border-teal-700">
                <span className="px-3 text-stone-400 bg-stone-100 py-2.5 border-r border-stone-200">
                  /projects/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-transparent focus:outline-none text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Overview Excerpt
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value, seo_description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-teal-700 focus:bg-white resize-none"
              />
            </div>
          </div>

          {/* Materials Builder */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-stone-900 text-sm">
                Materials & Tools Required
              </h3>
              <button
                type="button"
                onClick={addMaterial}
                className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 rounded-md font-medium text-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.materials?.map((mat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Material name"
                    value={mat.name}
                    onChange={(e) => updateMaterial(i, 'name', e.target.value)}
                    className="flex-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Qty (e.g. 8 oz)"
                    value={mat.quantity}
                    onChange={(e) => updateMaterial(i, 'quantity', e.target.value)}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Notes (optional)"
                    value={mat.notes || ''}
                    onChange={(e) => updateMaterial(i, 'notes', e.target.value)}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeMaterial(i)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions Builder */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-stone-900 text-sm">
                Step-by-Step Instructions
              </h3>
              <button
                type="button"
                onClick={addStep}
                className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 rounded-md font-medium text-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.steps?.map((st, i) => (
                <div key={i} className="p-4 bg-stone-50/70 border border-stone-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-800 uppercase">Step {st.step_number}</span>
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Step Title (e.g. Seal the Wood Base)"
                    value={st.title}
                    onChange={(e) => updateStep(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-semibold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Instructions and precautions for this step..."
                    value={st.content}
                    onChange={(e) => updateStep(i, 'content', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <h3 className="font-serif font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100">
              Project Parameters
            </h3>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Estimated Time
              </label>
              <input
                type="text"
                value={formData.estimated_time}
                onChange={(e) => setFormData({ ...formData, estimated_time: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Featured Hero Image URL
              </label>
              <input
                type="text"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
              {formData.featured_image && (
                <img
                  src={formData.featured_image}
                  alt=""
                  className="w-full aspect-16/9 object-cover rounded-md mt-2 border border-stone-200"
                />
              )}
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-bold"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
