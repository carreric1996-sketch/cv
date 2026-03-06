import React from 'react';
import { ResumeData, StyleConfig } from '../types';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const MinimalistTemplate: React.FC<{ 
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
      className="p-20 bg-white min-h-[297mm] w-[210mm]"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {!isSecondPage && (
        <header className="mb-24">
          <h1 className="text-[4.5em] font-light tracking-tighter mb-4" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
          <div 
            className="h-px w-24 mb-8" 
            style={{ backgroundColor: primaryColor }}
          />
          <div className="flex flex-col gap-1 text-[0.7em] uppercase tracking-[0.3em] font-black text-zinc-400">
            <span style={{ color: primaryColor }}>{personalInfo.jobTitle}</span>
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>
      )}

      <div className="space-y-20">
        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <h2 className="text-[0.7em] font-black uppercase tracking-[0.5em] text-zinc-300">{labels?.experience || 'Experience'}</h2>
            </div>
            <div className="col-span-9 space-y-12">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id}>
                  <div className="text-[1.5em] font-bold mb-1">{exp.position}</div>
                  <div className="text-[0.7em] uppercase tracking-[0.2em] font-black text-zinc-400 mb-6">
                    {exp.company} / {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <p className="text-[1em] text-zinc-500 max-w-prose">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <h2 className="text-[0.7em] font-black uppercase tracking-[0.5em] text-zinc-300">{labels?.education || 'Education'}</h2>
            </div>
            <div className="col-span-9 space-y-10">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id}>
                  <div className="text-[1.5em] font-bold mb-1">{edu.degree}</div>
                  <div className="text-[0.7em] uppercase tracking-[0.2em] font-black text-zinc-400">
                    {edu.school} / {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <h2 className="text-[0.7em] font-black uppercase tracking-[0.5em] text-zinc-300">{labels?.skills || 'Skills'}</h2>
            </div>
            <div className="col-span-9">
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                  <div key={skill.id} data-resume-item={skill.id} className="flex flex-col gap-2">
                    <span className="text-[0.7em] uppercase font-black tracking-widest text-zinc-900">{skill.name}</span>
                    <div className="w-12 h-px bg-zinc-100">
                      <div className="h-full bg-zinc-900" style={{ width: `${(skill.level / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
