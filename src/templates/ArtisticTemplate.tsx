import React from 'react';
import { ResumeData, StyleConfig } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const ArtisticTemplate: React.FC<{ 
  data: ResumeData; 
  styleConfig: StyleConfig;
  isSecondPage?: boolean;
  visibleItemIds?: Set<string>;
}> = ({ data, styleConfig, isSecondPage, visibleItemIds }) => {
  const { personalInfo, experience, education, skills, languages, hobbies, labels } = data;
  const { fontFamily, fontSize, lineHeight, primaryColor } = styleConfig;

  const fontSizeMap = {
    small: '12px',
    medium: '14px',
    large: '16px',
    xl: '18px',
  };

  return (
    <div 
      className="flex bg-white min-h-[297mm] w-[210mm] overflow-hidden"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Sidebar - Beige */}
      <aside 
        className="w-[38%] flex flex-col"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        {/* Illustration Placeholder */}
        <div className="p-8 pt-12">
          <svg viewBox="0 0 200 200" className="w-full h-auto opacity-60" style={{ color: primaryColor }}>
            <path
              d="M40,160 Q60,100 100,120 T160,80 M50,150 L150,150 M60,140 L140,140 M70,130 L130,130"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="100" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M80,90 Q100,110 120,90" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="p-10 flex flex-col gap-12 text-center">
          {/* Contact */}
          <section className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Phone size={24} strokeWidth={1.5} className="mb-1" style={{ color: primaryColor }} />
              <p className="text-[1em]">{personalInfo.phone}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail size={24} strokeWidth={1.5} className="mb-1" style={{ color: primaryColor }} />
              <p className="text-[1em] break-all px-4">{personalInfo.email}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin size={24} strokeWidth={1.5} className="mb-1" style={{ color: primaryColor }} />
              <p className="text-[1em]">{personalInfo.location}</p>
            </div>
          </section>

          {/* Languages */}
          {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).length > 0 && (
            <section>
              <h2 className="text-[1.7em] font-black uppercase tracking-widest mb-4 font-serif" style={{ color: primaryColor }}>{labels?.languages || 'Languages'}</h2>
              <div className="space-y-1 text-[1em]">
                {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).map((lang) => (
                  <p key={lang.id} data-resume-item={lang.id}>
                    {lang.name} {lang.level >= 4 ? 'Fluent' : ''}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <section>
              <h2 className="text-[1.7em] font-black uppercase tracking-widest mb-4 font-serif" style={{ color: primaryColor }}>{labels?.interests || 'Interests'}</h2>
              <div className="space-y-1 text-[1em]">
                {hobbies.map((hobby, i) => (
                  <p key={i}>{hobby}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 flex flex-col gap-12 bg-white">
        {/* Header */}
        {!isSecondPage && (
          <header className="mb-4">
            <h1 className="text-[5em] font-black uppercase text-[#333333] mb-4 tracking-tighter">
              {personalInfo.fullName.split(' ').map((part, i) => (
                <span key={i} className="block">{part}</span>
              ))}
            </h1>
            <p className="text-[1.7em] font-medium text-[#333333]">
              {personalInfo.jobTitle}
            </p>
          </header>
        )}

        {/* Experience */}
        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 className="text-[2.2em] font-black uppercase tracking-widest mb-6 font-serif" style={{ color: primaryColor }}>{labels?.experience || 'Experience'}</h2>
            <div className="space-y-8">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline text-[1.2em]">
                    <span className="font-medium">{exp.company}</span>
                    <span className="text-[0.75em] font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="italic text-[1.2em]">{exp.position}</p>
                  <ul className="space-y-1 mt-2">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="text-[1em] flex gap-2">
                        <span>•</span>
                        <span>{line.replace(/^•\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <h2 className="text-[2.2em] font-black uppercase tracking-widest mb-6 font-serif" style={{ color: primaryColor }}>{labels?.education || 'Education'}</h2>
            <div className="space-y-6">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-[1.2em]">
                    <span className="font-medium">{edu.school}</span>
                    <span className="text-[0.75em] font-medium">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="italic text-[1.2em]">{edu.degree}</p>
                  {edu.description && <p className="text-[1em] italic">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section>
            <h2 className="text-[2.2em] font-black uppercase tracking-widest mb-6 font-serif" style={{ color: primaryColor }}>{labels?.skills || 'Skills'}</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                <div key={skill.id} data-resume-item={skill.id} className="flex items-center gap-2 text-[1em]">
                  <span>•</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
