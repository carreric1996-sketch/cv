import React from 'react';
import { ResumeData, StyleConfig } from '../types';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const VibrantTemplate: React.FC<{ 
  data: ResumeData; 
  styleConfig: StyleConfig;
  isSecondPage?: boolean;
  visibleItemIds?: Set<string>;
}> = ({ data, styleConfig, isSecondPage, visibleItemIds }) => {
  const { personalInfo, experience, education, skills, labels } = data;
  const { fontFamily, fontSize, lineHeight, primaryColor } = styleConfig;

  const fontSizeMap = {
    small: '12px',
    medium: '14px',
    large: '16px',
    xl: '18px',
  };

  return (
    <div 
      className="relative bg-white min-h-[297mm] w-[210mm] overflow-hidden p-12"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Background Layer - Irregular Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Center Oval */}
        <div 
          className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[500px] h-[400px] border-[1px] rounded-full opacity-50" 
          style={{ borderColor: primaryColor }}
        />
        <div 
          className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[400px] h-[320px] rounded-full" 
          style={{ backgroundColor: primaryColor }}
        />
        
        {/* Bottom Right Slanted Shape */}
        <div 
          className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] opacity-60 transition-all duration-500 hidden md:block"
          style={{
            clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)',
            backgroundColor: primaryColor
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col gap-16">
        {/* Header - Centered in the oval */}
        {!isSecondPage && (
          <header className="h-[280px] flex flex-col items-center justify-center text-center pt-8">
            <p className="text-[1em] uppercase tracking-[0.4em] text-zinc-600 mb-2">
              {personalInfo.jobTitle}
            </p>
            <h1 className="text-[4.5em] font-serif font-black uppercase tracking-tight text-zinc-900">
              {personalInfo.fullName}
            </h1>
          </header>
        )}

        {/* Middle Section - 12 Column Grid */}
        <div className="grid grid-cols-12 gap-12">
          {/* Left Column: Education & Summary */}
          <div className="col-span-12 md:col-span-8 space-y-12">
            {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
              <section>
                <h2 className="text-[1.7em] font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>{labels?.education || 'Education'}</h2>
                <div className="space-y-4">
                  {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                    <div key={edu.id} data-resume-item={edu.id} className="space-y-1">
                      <p className="font-bold uppercase text-[1em]">{edu.degree}</p>
                      <p className="text-[1em] text-zinc-600">{edu.school}</p>
                      <p className="text-[0.85em] text-zinc-500">{edu.startDate} - {edu.endDate} • {edu.location}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!isSecondPage && personalInfo.summary && (
              <section>
                <h2 className="text-[1.7em] font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>{labels?.summary || 'Summary'}</h2>
                <p className="text-[1em] text-zinc-700 max-w-2xl">
                  {personalInfo.summary}
                </p>
              </section>
            )}
          </div>

          {/* Right Column: Contact */}
          <div className="col-span-12 md:col-span-4 text-right">
            <section>
              <h2 className="text-[1.7em] font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>{labels?.contact || 'Contact'}</h2>
              <div className="space-y-2 text-[1em] text-zinc-600">
                {personalInfo.phone && <p>{personalInfo.phone}</p>}
                {personalInfo.website && <p>{personalInfo.website}</p>}
                {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                {personalInfo.location && <p>{personalInfo.location}</p>}
              </div>
            </section>
          </div>
        </div>

        {/* Highlights Section */}
        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section className="text-center py-8">
            <h2 className="text-[1.7em] font-bold uppercase tracking-widest mb-8" style={{ color: primaryColor }}>{labels?.skills || 'Highlights'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                <div key={skill.id} data-resume-item={skill.id} className="flex flex-col justify-center items-center gap-3 text-[1em] leading-none">
                  <span className="w-1 h-1 bg-zinc-900 rounded-full shrink-0" />
                  <span className="leading-none">{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[1.7em] font-bold uppercase tracking-widest" style={{ color: primaryColor }}>{labels?.experience || 'Experience'}</h2>
              {/* Decorative Leaf Icon Placeholder */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={primaryColor} strokeWidth="2" className="opacity-60">
                <path d="M11 20A7 7 0 0 1 11 6a7 7 0 0 1 7 7 7 7 0 0 1-7 7z" />
                <path d="M11 13l7-7" />
                <path d="M11 13l-4 4" />
              </svg>
            </div>
            <div className="space-y-12">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id} className="space-y-4">
                  <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-[1.2em] font-bold uppercase tracking-tight">{exp.position}</h3>
                      <p className="text-[1em] font-bold text-zinc-500 uppercase tracking-widest">{exp.company}</p>
                    </div>
                    <span className="text-[1em] font-bold text-zinc-400">
                      {exp.startDate} – {exp.current ? 'Current' : exp.endDate}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="text-[1em] text-zinc-600 flex gap-3">
                        <span className="text-zinc-900">•</span>
                        <span>{line.replace(/^•\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
