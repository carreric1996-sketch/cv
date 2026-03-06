import React from 'react';
import { ResumeData, StyleConfig } from '../types';
import { Mail, Phone, MapPin, Car } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const ExecutiveTemplate: React.FC<{ 
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
      className="flex bg-white min-h-[297mm] w-[210mm]"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Sidebar - Dark */}
      <aside className="w-[35%] bg-[#1a1a1a] text-white flex flex-col">
        {personalInfo.photo && (
          <div className="w-full aspect-[4/5] overflow-hidden">
            <img src={personalInfo.photo} className="w-full h-full object-cover grayscale" alt="Profile" />
          </div>
        )}
        
        <div className="p-8 space-y-12">
          {/* Profile Section */}
          {!isSecondPage && (
            <section>
              <h2 className="text-[1em] font-bold uppercase tracking-[0.3em] mb-2 text-center">{labels?.summary || 'Profile'}</h2>
              <div 
                className="w-10 h-1 mx-auto mb-6" 
                style={{ backgroundColor: primaryColor }}
              />
              <p className="text-[0.8em] text-center text-zinc-300 italic">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Contact Section */}
          <section>
            <h2 className="text-[1em] font-bold uppercase tracking-[0.3em] mb-2 text-center">{labels?.contact || 'Contact'}</h2>
            <div 
              className="w-10 h-1 mx-auto mb-6" 
              style={{ backgroundColor: primaryColor }}
            />
            <div className="space-y-4 text-[0.8em]">
              {personalInfo.location && (
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="shrink-0 text-zinc-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail size={14} className="shrink-0 text-zinc-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={14} className="shrink-0 text-zinc-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.drivingLicence && (
                <div className="flex items-start gap-3">
                  <Car size={14} className="shrink-0 text-zinc-400" />
                  <span>{personalInfo.drivingLicence}</span>
                </div>
              )}
            </div>
          </section>

          {/* Interests Section */}
          {hobbies.length > 0 && (
            <section>
              <h2 className="text-[1em] font-bold uppercase tracking-[0.3em] mb-2 text-center">{labels?.interests || 'Interests'}</h2>
              <div className="w-10 h-1 bg-[#b3b3b3] mx-auto mb-6" />
              <div className="space-y-4">
                <div className="text-[0.8em]">
                  <p className="font-bold uppercase tracking-wider mb-1 border-b border-zinc-700 pb-1">Hobbies :</p>
                  <p className="text-zinc-400">{hobbies.join(', ')}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 flex flex-col gap-12">
        {/* Header */}
        {!isSecondPage && (
          <header className="mb-4">
            <h1 className="text-[4.5em] font-light tracking-tight text-[#1a1a1a] mb-2">
              {personalInfo.fullName}
            </h1>
            <p className="text-[1.5em] font-medium uppercase tracking-[0.4em] text-[#333333]">
              {personalInfo.jobTitle}
            </p>
          </header>
        )}

        {/* Education Section */}
        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-[1em] font-bold uppercase tracking-[0.5em] mb-2">{labels?.education || 'Education'}</h2>
              <div 
                className="w-16 h-1.5" 
                style={{ backgroundColor: primaryColor }}
              />
            </div>
            <div className="space-y-4">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id} className="flex gap-4 text-[0.85em]">
                  <span className="font-bold w-24 shrink-0">{edu.startDate} - {edu.endDate}</span>
                  <div>
                    <span className="font-bold">{edu.degree}</span>
                    <span className="text-zinc-400"> - {edu.school}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-[1em] font-bold uppercase tracking-[0.5em] mb-2">{labels?.experience || 'Experience'}</h2>
              <div 
                className="w-16 h-1.5" 
                style={{ backgroundColor: primaryColor }}
              />
            </div>
            <div className="space-y-10">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id} className="grid grid-cols-[100px_1fr] gap-6">
                  <div className="text-[0.8em] space-y-1">
                    <p className="font-bold">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    <p className="font-bold text-zinc-500">{exp.company}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-[0.85em] font-black uppercase tracking-wider">{exp.position}</h3>
                    <ul className="space-y-1.5">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="text-[0.8em] text-[#4a4a4a] flex gap-2">
                          <span className="text-zinc-300">•</span>
                          <span>{line.replace(/^•\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {(skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 || languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).length > 0) && (
          <section>
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-[1em] font-bold uppercase tracking-[0.5em] mb-2">{labels?.skills || 'Skills'}</h2>
              <div className="w-16 h-1.5 bg-[#b3b3b3]" />
            </div>
            <div className="grid grid-cols-2 gap-12">
              {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-[0.7em] font-bold uppercase tracking-widest border-b border-zinc-100 pb-1">{labels?.languages || 'Languages'}</h3>
                  <div className="space-y-2">
                    {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).map((lang) => (
                      <div key={lang.id} data-resume-item={lang.id} className="flex justify-between text-[0.8em]">
                        <span className="font-bold">{lang.name}</span>
                        <span className="text-zinc-500 italic">
                          {lang.level >= 5 ? 'Native' : lang.level >= 4 ? 'Fluent' : 'Basic'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-[0.7em] font-bold uppercase tracking-widest border-b border-zinc-100 pb-1">{labels?.software || 'Software'}</h3>
                  <div className="space-y-2">
                    {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                      <div key={skill.id} data-resume-item={skill.id} className="text-[0.8em]">
                        <span className="font-bold">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
