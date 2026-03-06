import React from 'react';
import { ResumeData, StyleConfig } from '../types';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const PrestigeTemplate: React.FC<{ 
  data: ResumeData; 
  styleConfig: StyleConfig;
  isSecondPage?: boolean;
  visibleItemIds?: Set<string>;
}> = ({ data, styleConfig, isSecondPage, visibleItemIds }) => {
  const { personalInfo, experience, education, skills, languages, labels } = data;
  const { fontFamily, fontSize, lineHeight, primaryColor } = styleConfig;

  const fontSizeMap = {
    small: '12px',
    medium: '14px',
    large: '16px',
    xl: '18px',
  };

  return (
    <div 
      className="flex bg-white min-h-[297mm] w-[210mm] p-12 gap-12"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Sidebar */}
      <aside className="w-[32%] flex flex-col gap-12">
        {!isSecondPage && personalInfo.photo && (
          <div className="w-48 h-48 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
            <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
          </div>
        )}

        <section>
          <h2 
            className="text-[1.2em] font-bold uppercase tracking-[0.2em] mb-6 border-b border-zinc-100 pb-2"
            style={{ color: primaryColor }}
          >
            {labels?.contact || 'Contact'}
          </h2>
          <div className="space-y-4 text-[1em]">
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </section>

        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 
              className="text-[1.2em] font-bold uppercase tracking-[0.2em] mb-6 border-b border-zinc-100 pb-2"
              style={{ color: primaryColor }}
            >
              {labels?.education || 'Education'}
            </h2>
            <div className="space-y-6">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id} className="space-y-1">
                  <h3 className="font-bold text-[1em]" style={{ color: primaryColor }}>{edu.degree}</h3>
                  <p className="text-[0.85em]">{edu.school}</p>
                  <p className="text-[0.75em] text-zinc-400">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section>
            <h2 
              className="text-[1.2em] font-bold uppercase tracking-[0.2em] mb-6 border-b border-zinc-100 pb-2"
              style={{ color: primaryColor }}
            >
              {labels?.skills || 'Skills'}
            </h2>
            <div className="space-y-2 text-[1em]">
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                <p key={skill.id} data-resume-item={skill.id}>{skill.name}</p>
              ))}
            </div>
          </section>
        )}

        {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).length > 0 && (
          <section>
            <h2 
              className="text-[1.2em] font-bold uppercase tracking-[0.2em] mb-6 border-b border-zinc-100 pb-2"
              style={{ color: primaryColor }}
            >
              {labels?.languages || 'Languages'}
            </h2>
            <div className="space-y-2 text-[1em]">
              {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).map((lang) => (
                <p key={lang.id} data-resume-item={lang.id}>{lang.name}</p>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-12">
        {!isSecondPage && (
          <header className="text-right">
            <h1 
              className="text-[4.5em] font-bold uppercase tracking-[0.1em]"
              style={{ color: primaryColor }}
            >
              {personalInfo.fullName ? personalInfo.fullName.split(' ').map((part, i) => (
                <span key={i} className="block">{part}</span>
              )) : null}
            </h1>
            <div className="mt-4 space-y-1">
              {personalInfo.jobTitle && <p className="text-[1.5em] text-zinc-500 italic">{personalInfo.jobTitle}</p>}
              {personalInfo.fullName && <p className="text-[1em] font-bold italic" style={{ color: primaryColor }}>With experience</p>}
            </div>
          </header>
        )}

        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 
              className="text-[1.7em] font-bold uppercase tracking-[0.3em] mb-8"
              style={{ color: primaryColor }}
            >
              {labels?.experience || 'Experience'}
            </h2>
            <div className="space-y-12">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id} className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[1.2em] font-bold" style={{ color: primaryColor }}>{exp.position}</h3>
                    <span className="text-[0.75em] uppercase tracking-widest text-zinc-400">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[0.85em] uppercase tracking-[0.2em] font-bold text-zinc-500">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="text-[1em] text-[#4a4a4a] flex gap-3">
                        <span style={{ color: primaryColor }}>•</span>
                        <span>{line.replace(/^•\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
