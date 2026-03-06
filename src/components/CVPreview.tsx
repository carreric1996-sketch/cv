import React, { useState, useLayoutEffect, useRef } from 'react';
import { ResumeData, StyleConfig } from '../types';
import { TEMPLATE_MAP } from '../templates';
import { Page } from './Page';

interface CVPreviewProps {
  data: ResumeData;
  template: string;
  styleConfig: StyleConfig;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, template, styleConfig }) => {
  const Template = TEMPLATE_MAP[template] || TEMPLATE_MAP.professional;
  const [pageDefs, setPageDefs] = useState<{ visibleItemIds: Set<string> }[]>([]);
  const ghostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ghostRef.current) {
      const items = Array.from(ghostRef.current.querySelectorAll('[data-resume-item]')) as HTMLElement[];
      const pageHeightPx = 1122; // Approx 297mm at 96dpi
      const newPageDefs: { visibleItemIds: Set<string> }[] = [];
      
      let currentPageItems = new Set<string>();
      let currentPageHeight = 0;
      
      // Account for header on first page
      const header = ghostRef.current.querySelector('header');
      if (header) {
        currentPageHeight += header.getBoundingClientRect().height + 48;
      }

      items.forEach((item) => {
        const itemId = item.getAttribute('data-resume-item')!;
        const itemHeight = item.getBoundingClientRect().height + 24; // Include some gap
        
        if (currentPageHeight + itemHeight > pageHeightPx && currentPageItems.size > 0) {
          newPageDefs.push({ visibleItemIds: currentPageItems });
          currentPageItems = new Set<string>();
          currentPageHeight = 0; // Header only on first page
        }
        
        currentPageItems.add(itemId);
        currentPageHeight += itemHeight;
      });
      
      if (currentPageItems.size > 0) {
        newPageDefs.push({ visibleItemIds: currentPageItems });
      }
      
      setPageDefs(newPageDefs.length > 0 ? newPageDefs : [{ visibleItemIds: new Set() }]);
    }
  }, [data, template, styleConfig]);

  return (
  <div className="w-full flex flex-col items-center">
    {/* Ghost Render for Measurement */}
    <div className="absolute opacity-0 pointer-events-none -z-50 w-[210mm]" ref={ghostRef}>
      <Template data={data} styleConfig={styleConfig} />
    </div>

    {/* WRAP ALL PAGES IN THIS DIV */}
    <div className="w-full flex flex-col items-center">
      {pageDefs.map((def, i) => (
        <Page key={i} pageNumber={i + 1} totalPages={pageDefs.length}>
          <Template 
            data={data} 
            styleConfig={styleConfig} 
            isSecondPage={i > 0}
            visibleItemIds={def.visibleItemIds}
          />
        </Page>
      ))}
    </div>
  </div>
);
};
