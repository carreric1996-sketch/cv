import React from 'react';
import { ModernTemplate } from './ModernTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { PrestigeTemplate } from './PrestigeTemplate';
import { ArtisticTemplate } from './ArtisticTemplate';
import { ChicTemplate } from './ChicTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { VibrantTemplate } from './VibrantTemplate';
import { ResumeData, StyleConfig } from '../types';

export type TemplateComponent = React.FC<{ 
  data: ResumeData; 
  styleConfig: StyleConfig;
  isSecondPage?: boolean;
  visibleItemIds?: Set<string>;
}>;

export const TEMPLATE_MAP: Record<string, TemplateComponent> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimalist: MinimalistTemplate,
  elegant: ElegantTemplate,
  executive: ExecutiveTemplate,
  prestige: PrestigeTemplate,
  artistic: ArtisticTemplate,
  chic: ChicTemplate,
  creative: CreativeTemplate,
  vibrant: VibrantTemplate,
};

export const TEMPLATE_CONFIG: Record<string, { primaryColor: string; fontFamily: string }> = {
  modern: { primaryColor: '#2563eb', fontFamily: 'Inter' },
  professional: { primaryColor: '#18181b', fontFamily: 'Roboto' },
  minimalist: { primaryColor: '#18181b', fontFamily: 'Inter' },
  elegant: { primaryColor: '#d97706', fontFamily: 'Playfair Display' },
  executive: { primaryColor: '#1a1a1a', fontFamily: 'Montserrat' },
  prestige: { primaryColor: '#7c5c4c', fontFamily: 'Playfair Display' },
  artistic: { primaryColor: '#333333', fontFamily: 'Caveat' },
  chic: { primaryColor: '#a67c7c', fontFamily: 'Montserrat' },
  creative: { primaryColor: '#000000', fontFamily: 'Poppins' },
  vibrant: { primaryColor: '#3b82f6', fontFamily: 'Inter' },
};
