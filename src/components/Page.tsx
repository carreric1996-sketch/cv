import React from 'react';
import { cn } from '../lib/utils';

interface PageProps {
  children: React.ReactNode;
  pageNumber: number;
  totalPages: number;
}

export const Page: React.FC<PageProps> = ({ children, pageNumber, totalPages }) => {
  return (
    <div className="relative group">
      {/* Page Label */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 no-print opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-px w-12 bg-zinc-300" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">
          Page {pageNumber} of {totalPages}
        </span>
        <div className="h-px w-12 bg-zinc-300" />
      </div>

      {/* A4 Sheet */}
      <div 
        className={cn(
          "cv-page w-[210mm] h-[297mm] bg-white shadow-2xl mb-12 overflow-hidden relative print:m-0 print:shadow-none",
          pageNumber < totalPages && "print:page-break"
        )}
      >
        {children}
      </div>
    </div>
  );
};
