import React from 'react';
import { Layout, Type, CaseSensitive, List, Pipette, Maximize2, Printer } from 'lucide-react';
import { StyleConfig, TemplateType } from '../types';
import { cn } from '../lib/utils';

interface CVToolbarProps {
  style: StyleConfig;
  setStyle: (style: StyleConfig) => void;
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
  onToggleTemplates: () => void;
  onToggleFullScreen: () => void;
  isFullScreen: boolean;
  onPrint: () => void;
}

export const CVToolbar: React.FC<CVToolbarProps> = ({ 
  style, 
  setStyle, 
  template, 
  setTemplate, 
  onToggleTemplates, 
  onToggleFullScreen,
  isFullScreen,
  onPrint
}) => {
  const fonts = ['Inter', 'Playfair Display', 'JetBrains Mono', 'Montserrat', 'Caveat', 'Roboto', 'Poppins'];
  const sizes: ('small' | 'medium' | 'large' | 'xl')[] = ['small', 'medium', 'large', 'xl'];
  const spacings = [1.0, 1.2, 1.5, 2.0];

  return (
    <div className={cn(
      "fixed bottom-8 z-50 -translate-x-1/2 transition-all duration-500 ease-in-out",
      isFullScreen ? "left-1/2" : "left-1/2 lg:left-[75%]"
    )}>
      <div className="w-auto max-w-[95vw] md:max-w-[600px] bg-white/90 backdrop-blur-md shadow-2xl border border-zinc-200 rounded-full px-6 py-2 flex items-center gap-4 overflow-x-auto no-scrollbar">
        
        {/* Templates Button */}
        <button 
          onClick={onToggleTemplates}
          className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 rounded-full transition-all text-xs font-bold text-zinc-700 whitespace-nowrap"
        >
          <Layout size={16} className="text-zinc-400 shrink-0" />
          <span>Templates</span>
        </button>

        <div className="w-px h-4 bg-zinc-200 shrink-0" />

      {/* Font Family */}
      <div className="flex items-center gap-2">
        <Type size={16} className="text-zinc-400 shrink-0" />
        <select 
          value={style.fontFamily}
          onChange={(e) => setStyle({ ...style, fontFamily: e.target.value })}
          className="bg-transparent text-xs font-bold text-zinc-700 focus:outline-none cursor-pointer hover:text-zinc-900 transition-colors max-w-[80px]"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-2">
        <CaseSensitive size={16} className="text-zinc-400 shrink-0" />
        <select 
          value={style.fontSize}
          onChange={(e) => setStyle({ ...style, fontSize: e.target.value as any })}
          className="bg-transparent text-xs font-bold text-zinc-700 focus:outline-none cursor-pointer hover:text-zinc-900 transition-colors"
        >
          {sizes.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Line Spacing */}
      <div className="flex items-center gap-2">
        <List size={16} className="text-zinc-400 shrink-0" />
        <select 
          value={style.lineHeight}
          onChange={(e) => setStyle({ ...style, lineHeight: parseFloat(e.target.value) })}
          className="bg-transparent text-xs font-bold text-zinc-700 focus:outline-none cursor-pointer hover:text-zinc-900 transition-colors"
        >
          {spacings.map((s) => (
            <option key={s} value={s}>{s.toFixed(1)}</option>
          ))}
        </select>
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-3 pl-2 border-l border-zinc-200">
        <div className="relative flex items-center gap-2 cursor-pointer group">
          <Pipette size={16} className="text-zinc-400 shrink-0" />
          <div 
            className="w-5 h-5 rounded-full border border-white shadow-sm ring-2 ring-zinc-100"
            style={{ backgroundColor: style.primaryColor }}
          />
          <input 
            type="color" 
            value={style.primaryColor}
            onChange={(e) => setStyle({ ...style, primaryColor: e.target.value })}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
      </div>

      <button 
        onClick={onToggleFullScreen}
        className={cn(
          "p-2 rounded-full transition-all shrink-0",
          isFullScreen ? "bg-zinc-900 text-white" : "hover:bg-zinc-100 text-zinc-400"
        )}
      >
        <Maximize2 size={16} />
      </button>
{/*
      <div className="w-px h-4 bg-zinc-200 shrink-0" />

       <button 
        type="button"
        onClick={onPrint}
        className="relative z-50 flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full text-xs font-bold hover:bg-zinc-800 transition-all active:scale-95"
      >
        <Printer size={16} />
        <span>Print / Save PDF</span>
      </button> */}
      </div>
    </div>
  );
};
