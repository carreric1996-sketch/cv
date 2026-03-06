import React from 'react';
import { ResumeData, StyleConfig } from '../types';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const ModernTemplate: React.FC<{ 
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
      className="flex bg-white min-h-[297mm] w-[210mm]"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Sidebar - Bold Blue */}
      <aside 
        className="w-[35%] text-white p-10 flex flex-col gap-10"
        style={{ backgroundColor: primaryColor }}
      >
        {!isSecondPage && (
          <div className="flex flex-col items-center text-center">
            {personalInfo.photo && (
              <div className="w-32 h-32 rounded-3xl border-4 border-white/20 overflow-hidden mb-6 shadow-2xl rotate-3">
                <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
              </div>
            )}
            <h1 className="text-[2.2em] font-black uppercase tracking-tighter mb-2 font-display">{personalInfo.fullName}</h1>
            {personalInfo.jobTitle && (
              <p 
                className="bg-white px-3 py-1 rounded-full text-[0.7em] font-black uppercase tracking-widest mt-2 flex flex-col justify-center min-h-[24px]"
                style={{ color: primaryColor }}
              >
                <span className="leading-none">{personalInfo.jobTitle}</span>
              </p>
            )}
          </div>
        )}

        {(personalInfo.email || personalInfo.phone || personalInfo.location) && (
          <section>
            <h2 className="text-[0.85em] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              {labels?.contact || 'Contact'}
            </h2>
            <div className="space-y-4 text-[0.8em]">
              {personalInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail size={14} className="opacity-50" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={14} className="opacity-50" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="opacity-50" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section>
            <h2 className="text-[0.85em] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              {labels?.skills || 'Expertise'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                <span key={skill.id} data-resume-item={skill.id} className="px-3 py-1.5 bg-white/10 rounded-lg text-[0.7em] font-bold uppercase tracking-wider">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).length > 0 && (
          <section>
            <h2 className="text-[0.85em] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              {labels?.languages || 'Languages'}
            </h2>
            <div className="space-y-3">
              {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).map((lang) => (
                <div key={lang.id} data-resume-item={lang.id} className="flex justify-between items-center text-[0.7em] font-bold uppercase">
                  <span>{lang.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i <= lang.level ? "bg-white" : "bg-white/20")} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 flex flex-col gap-12">
        {!isSecondPage && personalInfo.summary && (
          <section>
            <h2 
              className="text-[2.5em] font-black uppercase tracking-tighter mb-6 font-display"
              style={{ color: primaryColor }}
            >
              {labels?.summary || 'About Me'}
            </h2>
            <p className="text-[1em] text-zinc-600 font-medium">{personalInfo.summary}</p>
          </section>
        )}

        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 
              className="text-[2.5em] font-black uppercase tracking-tighter mb-8 font-display"
              style={{ color: primaryColor }}
            >
              {labels?.experience || 'Experience'}
            </h2>
            <div className="space-y-10">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id} className="relative pl-8 border-l-2 border-zinc-100">
                  <div 
                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white" 
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[1.2em] font-black uppercase tracking-tight">{exp.position}</h3>
                    <span 
                      className="text-[0.7em] font-black uppercase tracking-widest px-2 py-1 rounded"
                      style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                    >
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[0.85em] font-bold text-zinc-400 uppercase mb-4">{exp.company} • {exp.location}</p>
                  <p className="text-[1em] text-zinc-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 
              className="text-[2.5em] font-black uppercase tracking-tighter mb-8 font-display"
              style={{ color: primaryColor }}
            >
              {labels?.education || 'Education'}
            </h2>
            <div className="space-y-8">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id} className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-300 shrink-0 leading-none">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-[1.2em] font-black uppercase tracking-tight mb-1">{edu.degree}</h3>
                    <p className="text-[0.85em] font-bold text-zinc-400 uppercase mb-2">{edu.school} • {edu.startDate} — {edu.endDate}</p>
                    <p className="text-[1em] text-zinc-500">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
