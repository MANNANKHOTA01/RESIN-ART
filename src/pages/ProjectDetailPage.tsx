import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Clock, Droplet, Layers, ShieldCheck, Tag, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Project } from '../types';
import { getProjectBySlug, getProjects } from '../services/dataService';
import { ProjectCard } from '../components/common/ProjectCard';

interface ProjectDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailProps> = ({ slug, onNavigate }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const proj = await getProjectBySlug(slug);
      if (proj) {
        setProject(proj);
        const all = await getProjects({ status: 'published' });
        setRelated(all.filter((p) => p.id !== proj.id).slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-stone-500">
        Loading project blueprint...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl text-stone-900 mb-2">Project Not Found</h2>
        <p className="text-xs text-stone-600 mb-6">The requested project blueprint could not be found.</p>
        <button
          onClick={() => onNavigate('/resin-art-projects/')}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Projects', path: '/resin-art-projects/' },
          { label: project.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Title & Meta */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span className="font-semibold text-teal-800 uppercase tracking-wide">
            {project.difficulty}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {project.estimated_time}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {project.excerpt}
        </p>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-100 mb-10 shadow-xs border border-stone-200">
        <img
          src={project.featured_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Two Column Layout: Materials on side, Steps in center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Materials & Tools */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
            <h3 className="font-serif text-base font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>Materials Checklist</span>
            </h3>
            <ul className="space-y-3 text-xs">
              {project.materials?.map((mat, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-700 pb-2 border-b border-stone-100 last:border-0 last:pb-0">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">{mat.name}</span>
                    <span className="text-stone-500">Qty: {mat.quantity} {mat.notes ? `(${mat.notes})` : ''}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200/80 text-xs text-amber-900">
            <h4 className="font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span>Safety Reminder</span>
            </h4>
            <p className="leading-relaxed">
              Ensure you are wearing an organic vapor respirator (NIOSH OV/P95) and powder-free nitrile gloves while working with uncured epoxy.
            </p>
          </div>
        </div>

        {/* Right: Step-by-Step Instructions */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-6">
              Step-by-Step Execution
            </h3>
            <div className="space-y-6">
              {project.steps?.map((step) => (
                <div key={step.step_number} className="bg-white p-6 rounded-xl border border-stone-200 flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-900 font-bold text-sm flex items-center justify-center shrink-0">
                    {step.step_number}
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-stone-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview text */}
          <div
            className="prose prose-stone text-xs sm:text-sm leading-relaxed text-stone-700 pt-4"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />

          {/* Editorial Author Bio Box */}
          <div className="my-8 p-6 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src="/manan_irfan.jpg"
              alt="Manan Irfan"
              className="w-16 h-16 rounded-full object-cover border-2 border-teal-600 shadow-sm shrink-0"
            />
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-serif text-base font-semibold text-stone-900">
                  Curated by Manan Irfan
                </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                  Lead Instructor
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                10th-class student at <strong>Al Hayan Grammar High School</strong> in Rahim Yar Khan, Pakistan. Documenting resin craft formulas, ratio benchmarks, and step-by-step studio execution.
              </p>
              <button
                onClick={() => onNavigate('/about/')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline cursor-pointer inline-flex items-center gap-1 pt-1"
              >
                <span>Learn more about Manan's journey</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="mt-16 pt-12 border-t border-stone-200">
          <h3 className="font-serif text-2xl font-medium text-stone-900 mb-6">
            Related Project Tutorials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
