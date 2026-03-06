import React from 'react';
import { ResumeData, StyleConfig } from '../types';
import { Mail, Phone, MapPin, Utensils, Plane, Book, Waves, Sprout, Wind, Heart } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const ElegantTemplate: React.FC<{ 
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

  const getHobbyIcon = (hobby: string) => {
    const h = hobby.toLowerCase();
    if (h.includes('cook') || h.includes('cuis')) return <Utensils size={14} />;
    if (h.includes('travel') || h.includes('voyage')) return <Plane size={14} />;
    if (h.includes('read') || h.includes('lect')) return <Book size={14} />;
    if (h.includes('swim') || h.includes('nat')) return <Waves size={14} />;
    if (h.includes('garden') || h.includes('jard')) return <Sprout size={14} />;
    if (h.includes('yoga') || h.includes('sport')) return <Wind size={14} />;
    return <Heart size={14} />;
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
      {/* Sidebar - Soft Pink */}
      <aside 
        className="w-[38%] p-10 flex flex-col gap-10"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        {!isSecondPage && (
          <div className="mb-4">
            <h1 className="text-[3.5em] font-serif font-bold mb-2 text-[#333333]">
              {personalInfo.fullName.split(' ').map((part, i) => (
                <span key={i} className="block">{part}</span>
              ))}
            </h1>
            {personalInfo.jobTitle && (
              <p 
                className="text-[1em] font-sans uppercase tracking-[0.25em] font-medium mt-4"
                style={{ color: primaryColor }}
              >
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
        )}

        <section>
          <h2 className="text-[1.5em] font-serif mb-4 border-b border-[#e5d5d0] pb-1">{labels?.contact || 'Contact'}</h2>
          <div className="space-y-3 text-[0.85em]">
            {personalInfo.phone && (
              <div className="flex flex-col justify-center items-center gap-3 leading-none">
                <Phone size={14} className="text-[#333333] shrink-0" fill="#333333" />
                <span className="leading-none">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex flex-col justify-center items-center gap-3 leading-none">
                <Mail size={14} className="text-[#333333] shrink-0" fill="#333333" />
                <span className="break-all leading-none">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex flex-col justify-center items-center gap-3 leading-none">
                <MapPin size={14} className="text-[#333333] shrink-0" fill="#333333" />
                <span className="leading-none">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </section>

        {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).length > 0 && (
          <section>
            <h2 className="text-[1.5em] font-serif mb-4 border-b border-[#e5d5d0] pb-1">{labels?.languages || 'Languages'}</h2>
            <div className="space-y-2 text-[0.85em]">
              {languages.filter(l => !visibleItemIds || visibleItemIds.has(l.id)).map((lang) => (
                <div key={lang.id} data-resume-item={lang.id} className="flex justify-between uppercase tracking-wider">
                  <span className="font-bold">{lang.name}</span>
                  <span className="text-[#888888]">
                    {lang.level >= 5 ? 'Native' : lang.level >= 4 ? 'Fluent' : 'Conversational'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
          <section>
            <h2 className="text-[1.5em] font-serif mb-4 border-b border-[#e5d5d0] pb-1">{labels?.skills || 'Skills'}</h2>
            <div className="space-y-1 text-[0.85em] text-[#666666]">
              {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                <p key={skill.id} data-resume-item={skill.id}>{skill.name}</p>
              ))}
            </div>
          </section>
        )}

        {hobbies.length > 0 && (
          <section>
            <h2 className="text-[1.5em] font-serif mb-6 border-b border-[#e5d5d0] pb-1">{labels?.interests || 'Interests'}</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {hobbies.map((hobby, i) => (
                <div key={i} className="flex flex-col justify-center items-center gap-3 text-[0.85em] leading-none">
                  <div className="text-[#333333] shrink-0">{getHobbyIcon(hobby)}</div>
                  <span className="leading-none">{hobby}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 flex flex-col gap-12 bg-white">
        {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <div 
              className="rounded-full py-3 px-10 inline-block mb-8"
              style={{ backgroundColor: `${primaryColor}25` }}
            >
              <h2 className="text-[1.7em] font-serif text-[#333333]">{labels?.education || 'Education'}</h2>
            </div>
            <div className="space-y-8">
              {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                <div key={edu.id} data-resume-item={edu.id} className="space-y-2">
                  <div 
                    className="rounded-full px-3 py-1 inline-block text-[0.7em] font-bold text-[#666666]"
                    style={{ backgroundColor: `${primaryColor}25` }}
                  >
                    {edu.startDate} - {edu.endDate}
                  </div>
                  <h3 className="font-bold text-[1em] text-[#333333]">{edu.degree}</h3>
                  <p className="text-[0.85em] text-[#888888]">{edu.school} - {edu.location}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
          <section>
            <div 
              className="rounded-full py-3 px-10 inline-block mb-8"
              style={{ backgroundColor: `${primaryColor}25` }}
            >
              <h2 className="text-[1.7em] font-serif text-[#333333]">{labels?.experience || 'Experience'}</h2>
            </div>
            <div className="space-y-10">
              {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                <div key={exp.id} data-resume-item={exp.id} className="space-y-3">
                  <div 
                    className="rounded-full px-3 py-1 inline-block text-[0.7em] font-bold text-[#666666]"
                    style={{ backgroundColor: `${primaryColor}25` }}
                  >
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <div>
                    <h3 className="font-bold text-[1em] text-[#333333]">{exp.position}</h3>
                    <p className="text-[0.85em] text-[#888888]">{exp.company} - {exp.location}</p>
                  </div>
                  <ul className="space-y-1">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="text-[0.85em] text-[#666666] flex gap-2">
                        <span className="text-zinc-300">•</span>
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
