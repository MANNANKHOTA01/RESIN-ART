import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onNavigate: (path: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onNavigate }) => {
  return (
    <div
      onClick={() => onNavigate(`/projects/${project.slug}`)}
      className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={project.featured_image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
          onError={(e) => {
            (e.target as HTMLElement).style.opacity = '0';
          }}
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="font-semibold text-teal-800 text-[11px] uppercase tracking-wide">
              {project.difficulty}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{project.estimated_time}</span>
          </div>

          <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-teal-900 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {project.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-teal-800">
          <span>View Blueprint</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
