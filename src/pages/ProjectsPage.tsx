import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, Layers, Tag, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Project } from '../types';
import { getProjects } from '../services/dataService';
import { ProjectCard } from '../components/common/ProjectCard';

export const ProjectsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  useEffect(() => {
    async function load() {
      const data = await getProjects({ status: 'published' });
      setProjects(data);
    }
    load();
  }, []);

  const filtered = projects.filter((p) => {
    if (selectedDifficulty === 'All') return true;
    return p.difficulty === selectedDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Resin Art Projects' }]}
        onNavigate={onNavigate}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-1 block">
            Studio Workshops
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight">
            Resin Art Projects
          </h1>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm lg:text-base max-w-xl">
            Explore our step-by-step resin art projects. Whether you are a beginner or experienced artist, find detailed tutorials and create something amazing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <ProjectCard key={proj.id} project={proj} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};
