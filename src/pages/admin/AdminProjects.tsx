import React, { useEffect, useState } from 'react';
import { Edit2, Eye, FolderPlus, Plus, Search, Trash2 } from 'lucide-react';
import { Project } from '../../types';
import { deleteProject, getProjects, saveProject } from '../../services/dataService';

export const AdminProjects: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects({ status: 'all' });
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleStatus = async (p: Project) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published';
    await saveProject({ ...p, status: newStatus });
    await fetchProjects();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Permanently remove project blueprint "${title}"?`)) {
      await deleteProject(id);
      await fetchProjects();
    }
  };

  const filtered = projects.filter(
    (p) =>
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
            Project Blueprints CMS
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage hands-on resin workshops, materials, and step-by-step instructions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/projects/new/')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-teal-700"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400">
                    Loading projects...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        /projects/{proj.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-800">
                        {proj.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {proj.estimated_time}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(proj)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition ${
                          proj.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle publish/draft"
                      >
                        {proj.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      {proj.status === 'published' && (
                        <button
                          onClick={() => onNavigate(`/projects/${proj.slug}`)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 rounded hover:bg-stone-100"
                          title="View on site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onNavigate(`/admin/projects/edit/${proj.id}`)}
                        className="p-1.5 text-teal-700 hover:text-teal-900 rounded hover:bg-teal-50"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
