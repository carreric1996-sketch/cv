import React from 'react';
import { cn } from '../lib/utils';
import { Layout, Check } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string; // CSS classes for thumbnail representation
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'High energy, bold colors, sidebar layout.',
    thumbnail: 'bg-blue-600',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional, centered header, clean serif fonts.',
    thumbnail: 'bg-zinc-800',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, monochrome, lots of white space.',
    thumbnail: 'bg-white border border-zinc-200',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Soft pink sidebar, serif headers, pill accents.',
    thumbnail: 'bg-[#f5e6e1]',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Dark sidebar, clean layout, gray accents.',
    thumbnail: 'bg-[#1a1a1a]',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    description: 'Circular photo, bronze accents, elegant spacing.',
    thumbnail: 'bg-white',
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description: 'Beige sidebar, bold typography, line art style.',
    thumbnail: 'bg-[#ede6db]',
  },
  {
    id: 'chic',
    name: 'Chic',
    description: 'Soft rose sidebar, bold serif headers, circular accents.',
    thumbnail: 'bg-[#e8c8c1]',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Torn edge photo, script job title, vertical timeline.',
    thumbnail: 'bg-zinc-100',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    description: 'Circular header, blue accents, asymmetrical grid.',
    thumbnail: 'bg-[#a9c0d3]',
  },
];

interface TemplateGalleryProps {
  currentTemplate: string;
  onSelect: (id: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ currentTemplate, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Layout size={20} className="text-zinc-400" />
        <h3 className="font-bold text-zinc-900">Templates</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              "group relative flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left",
              currentTemplate === template.id
                ? "border-blue-500 bg-blue-50/50"
                : "border-zinc-100 bg-white hover:border-zinc-200"
            )}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className={cn(
                "text-sm font-bold",
                currentTemplate === template.id ? "text-blue-600" : "text-zinc-900"
              )}>
                {template.name}
              </span>
            </div>
            
            <div className={cn(
              "w-full h-24 rounded-lg mb-3 flex overflow-hidden shadow-inner border-2 transition-all relative",
              currentTemplate === template.id ? "border-blue-500" : "border-transparent",
              template.thumbnail
            )}>
              {currentTemplate === template.id && (
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                  <div className="bg-blue-500 text-white p-1 rounded-full shadow-lg">
                    <Check size={16} />
                  </div>
                </div>
              )}
              {/* Simplified visual representation */}
              {template.id === 'modern' && (
                <>
                  <div className="w-1/3 h-full bg-blue-700 opacity-50" />
                  <div className="flex-1 h-full bg-white p-2 space-y-1">
                    <div className="w-3/4 h-1 bg-zinc-100" />
                    <div className="w-full h-1 bg-zinc-100" />
                    <div className="w-1/2 h-1 bg-zinc-100" />
                  </div>
                </>
              )}
              {template.id === 'professional' && (
                <div className="w-full h-full bg-white p-2 flex flex-col items-center space-y-1">
                  <div className="w-1/2 h-2 bg-zinc-200 rounded-sm mb-1" />
                  <div className="w-full h-1 bg-zinc-100" />
                  <div className="w-full h-1 bg-zinc-100" />
                  <div className="w-3/4 h-1 bg-zinc-100" />
                </div>
              )}
              {template.id === 'minimalist' && (
                <div className="w-full h-full bg-white p-4 space-y-2">
                  <div className="w-1/3 h-1 bg-zinc-900" />
                  <div className="w-full h-px bg-zinc-100" />
                  <div className="w-full h-1 bg-zinc-50" />
                  <div className="w-3/4 h-1 bg-zinc-50" />
                </div>
              )}
              {template.id === 'elegant' && (
                <>
                  <div className="w-[38%] h-full bg-[#f5e6e1]" />
                  <div className="flex-1 h-full bg-white p-2 space-y-2">
                    <div className="w-1/2 h-2 bg-[#f0ddd5] rounded-full" />
                    <div className="w-full h-1 bg-zinc-50" />
                    <div className="w-full h-1 bg-zinc-50" />
                  </div>
                </>
              )}
              {template.id === 'executive' && (
                <>
                  <div className="w-[35%] h-full bg-[#1a1a1a]" />
                  <div className="flex-1 h-full bg-white p-2 space-y-2">
                    <div className="w-3/4 h-2 bg-zinc-100" />
                    <div className="w-1/4 h-1 bg-[#b3b3b3] mx-auto" />
                    <div className="w-full h-1 bg-zinc-50" />
                  </div>
                </>
              )}
              {template.id === 'prestige' && (
                <div className="w-full h-full bg-white p-2 flex gap-2">
                  <div className="w-1/3 h-full space-y-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 mx-auto" />
                    <div className="w-full h-1 bg-zinc-50" />
                    <div className="w-full h-1 bg-zinc-50" />
                  </div>
                  <div className="flex-1 h-full space-y-2">
                    <div className="w-3/4 h-2 bg-[#7c5c4c] ml-auto" />
                    <div className="w-full h-1 bg-zinc-50" />
                    <div className="w-full h-1 bg-zinc-50" />
                  </div>
                </div>
              )}
              {template.id === 'artistic' && (
                <div className="w-full h-full bg-white flex">
                  <div className="w-[38%] h-full bg-[#ede6db] p-2 space-y-2">
                    <div className="w-full aspect-square bg-zinc-200/50 rounded" />
                    <div className="w-1/2 h-1 bg-zinc-400 mx-auto" />
                    <div className="w-1/2 h-1 bg-zinc-400 mx-auto" />
                  </div>
                  <div className="flex-1 h-full p-2 space-y-2">
                    <div className="w-3/4 h-3 bg-zinc-800" />
                    <div className="w-1/2 h-2 bg-zinc-400" />
                    <div className="w-full h-1 bg-zinc-100" />
                    <div className="w-full h-1 bg-zinc-100" />
                  </div>
                </div>
              )}
              {template.id === 'chic' && (
                <div className="w-full h-full bg-white flex relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[50%] h-[150%] bg-[#e8c8c1] rounded-r-full -translate-x-[20%] -translate-y-[10%]" />
                  <div className="w-[35%] h-full p-2 z-10">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border-2 border-white mx-auto" />
                  </div>
                  <div className="flex-1 h-full p-2 space-y-2 z-10">
                    <div className="w-3/4 h-3 bg-zinc-900" />
                    <div className="w-1/2 h-2 bg-[#a67c7c]" />
                    <div className="w-full h-1 bg-zinc-100" />
                  </div>
                </div>
              )}
              {template.id === 'creative' && (
                <div className="w-full h-full bg-white flex flex-col p-1 space-y-1">
                  <div className="flex h-1/2 gap-1">
                    <div className="flex-1 space-y-1">
                      <div className="w-3/4 h-2 bg-zinc-800" />
                      <div className="w-1/2 h-1 bg-zinc-400" />
                    </div>
                    <div className="w-1/3 h-full bg-zinc-200" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <div className="w-1/3 space-y-1">
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-full h-1 bg-zinc-100" />
                    </div>
                    <div className="flex-1 border-l border-zinc-200 pl-1 space-y-1">
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-full h-1 bg-zinc-100" />
                    </div>
                  </div>
                </div>
              )}
              {template.id === 'vibrant' && (
                <div className="w-full h-full bg-white flex flex-col p-1 space-y-1 relative overflow-hidden">
                  <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-12 bg-[#a9c0d3] rounded-full" />
                  <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 bg-[#a9c0d3] opacity-50 rotate-45" />
                  <div className="h-1/3 z-10" />
                  <div className="flex-1 grid grid-cols-2 gap-2 z-10">
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-zinc-200" />
                      <div className="w-full h-1 bg-zinc-100" />
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-zinc-200" />
                      <div className="w-full h-1 bg-zinc-100" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-zinc-500 leading-tight">
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
