import React from 'react';
import { ResumeData, StyleConfig } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const ProfessionalTemplate: React.FC<{ 
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
      className="p-16 bg-white min-h-[297mm] w-[210mm]"
      style={{ 
        fontFamily: `${fontFamily}, serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {!isSecondPage && (
        <header 
          className="text-center mb-12 border-b-2 pb-10"
          style={{ borderBottomColor: primaryColor }}
        >
          <h1 className="text-[3.5em] font-bold mb-4 tracking-tight" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
          {personalInfo.jobTitle && (
            <p 
              className="text-[1.5em] uppercase tracking-[0.2em] mb-6 font-sans font-medium"
              style={{ color: primaryColor }}
            >
              {personalInfo.jobTitle}
            </p>
          )}
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[0.85em] font-sans text-zinc-600">
            {personalInfo.email && <span className="flex flex-col justify-center items-center gap-2"><Mail size={14} className="shrink-0" /> <span className="leading-none">{personalInfo.email}</span></span>}
            {personalInfo.phone && <span className="flex flex-col justify-center items-center gap-2"><Phone size={14} className="shrink-0" /> <span className="leading-none">{personalInfo.phone}</span></span>}
            {personalInfo.location && <span className="flex flex-col justify-center items-center gap-2"><MapPin size={14} className="shrink-0" /> <span className="leading-none">{personalInfo.location}</span></span>}
          </div>
        </header>
      )}

      <div className="space-y-12">
        {!isSecondPage && personalInfo.summary && (
          <section>
            <h2 className="text-[1.1em] font-bold uppercase tracking-widest border-b border-zinc-200 pb-2 mb-4 font-sans text-zinc-400">{labels?.summary || 'Professional Summary'}</h2>
            <p className="text-[1.1em] text-zinc-800 italic">{personalInfo.summary}</p>
          </section>
        )}

        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 className="text-[1.1em] font-bold uppercase tracking-widest border-b border-zinc-200 pb-2 mb-6 font-sans text-zinc-400">{labels?.experience || 'Work Experience'}</h2>
            <div className="space-y-10">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[1.4em] font-bold">{exp.position}</h3>
                    <span className="text-[0.85em] font-sans font-bold text-zinc-500 uppercase tracking-wider">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[1.2em] text-zinc-600 mb-4 italic">{exp.company}, {exp.location}</div>
                  <p className="text-[1em] whitespace-pre-line font-sans text-zinc-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 className="text-[1.1em] font-bold uppercase tracking-widest border-b border-zinc-200 pb-2 mb-6 font-sans text-zinc-400">{labels?.education || 'Education'}</h2>
            <div className="space-y-8">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[1.4em] font-bold">{edu.degree}</h3>
                    <span className="text-[0.85em] font-sans font-bold text-zinc-500 uppercase tracking-wider">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-[1.2em] text-zinc-600 italic">{edu.school}, {edu.location}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section>
            <h2 className="text-[1.1em] font-bold uppercase tracking-widest border-b border-zinc-200 pb-2 mb-6 font-sans text-zinc-400">{labels?.skills || 'Key Skills'}</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                <div key={skill.id} data-resume-item={skill.id} className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <span className="font-sans font-bold text-[0.85em] uppercase tracking-wider text-zinc-700">{skill.name}</span>
                  <span className="font-sans text-[0.7em] text-zinc-400 uppercase font-black">Level {skill.level}/5</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
