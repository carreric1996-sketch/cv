import React from 'react';
import { ResumeData, StyleConfig } from '../types';
import { Mail, Phone, MapPin, Book, Pencil, Dumbbell, Palette, Heart } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const ChicTemplate: React.FC<{ 
  data: ResumeData; 
  styleConfig: StyleConfig;
  isSecondPage?: boolean;
  visibleItemIds?: Set<string>;
}> = ({ data, styleConfig, isSecondPage, visibleItemIds }) => {
  const { personalInfo, experience, education, skills, hobbies, labels } = data;
  const { fontFamily, fontSize, lineHeight, primaryColor } = styleConfig;

  const fontSizeMap = {
    small: '12px',
    medium: '14px',
    large: '16px',
    xl: '18px',
  };

  const getHobbyIcon = (hobby: string) => {
    const h = hobby.toLowerCase();
    if (h.includes('read') || h.includes('lect')) return <Book size={20} />;
    if (h.includes('draw') || h.includes('dessin')) return <Pencil size={20} />;
    if (h.includes('sport') || h.includes('gym')) return <Dumbbell size={20} />;
    if (h.includes('art') || h.includes('paint')) return <Palette size={20} />;
    return <Heart size={20} />;
  };

  return (
    <div 
      className="relative bg-white min-h-[297mm] w-[210mm] overflow-hidden"
      style={{ 
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Background Layer - Irregular Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-[45%] h-full transition-all duration-500 hidden md:block"
          style={{
            clipPath: 'ellipse(100% 75% at 0% 50%)',
            backgroundColor: `${primaryColor}20` // 20% opacity
          }}
        />
        {/* Mobile fallback: straight sidebar */}
        <div 
          className="absolute top-0 left-0 w-full h-32 md:hidden" 
          style={{ backgroundColor: `${primaryColor}20` }}
        />
      </div>

      {/* Main Container - 12 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 min-h-[297mm]">
        
        {/* Sidebar - Spans 5 columns */}
        <aside className="md:col-span-5 p-8 md:p-12 flex flex-col gap-12">
          {/* Profile Photo - Overlapping element */}
          {!isSecondPage && personalInfo.photo && (
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white overflow-hidden shadow-2xl mx-auto md:-mr-12 relative z-20 bg-white">
                <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
          )}

          <div className="space-y-12 mt-8 md:mt-0">
            {/* Skills Section */}
            {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
              <section>
                <h2 className="text-[1.5em] font-serif font-black mb-6 border-b-2 border-white/30 pb-2">{labels?.skills || 'Skills'}</h2>
                <div className="space-y-4">
                  {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                    <div key={skill.id} data-resume-item={skill.id} className="space-y-1">
                      <p className="text-[0.85em] font-bold uppercase tracking-wider">{skill.name}</p>
                      <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${(skill.level / 5) * 100}%`,
                            backgroundColor: primaryColor
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests Section */}
            {hobbies.length > 0 && (
              <section>
                <h2 className="text-[1.5em] font-serif font-black mb-6 border-b-2 border-white/30 pb-2">{labels?.interests || 'Interests'}</h2>
                <div className="grid grid-cols-2 gap-6">
                  {hobbies.slice(0, 4).map((hobby, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                      <div 
                        className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center shadow-sm leading-none"
                        style={{ color: primaryColor }}
                      >
                        <span className="flex flex-col items-center justify-center">{getHobbyIcon(hobby)}</span>
                      </div>
                      <span className="text-[0.7em] font-bold uppercase tracking-tighter">{hobby}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        {/* Main Content - Spans 7 columns */}
        <main className="md:col-span-7 p-8 md:p-16 flex flex-col gap-12 bg-white md:bg-transparent">
          {/* Header */}
          {!isSecondPage && (
            <header className="mb-4">
              <h1 className="text-[4.5em] font-serif font-black text-zinc-900 mb-4 tracking-tighter">
                {personalInfo.fullName}
              </h1>
              <p 
                className="text-[1.7em] font-bold uppercase tracking-[0.3em] mb-8"
                style={{ color: primaryColor }}
              >
                {personalInfo.jobTitle}
              </p>

              <div className="space-y-3 text-[1em] text-zinc-500 font-medium">
                {personalInfo.location && (
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex flex-col items-center justify-center leading-none"
                      style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
                    >
                      <span className="flex flex-col items-center justify-center"><MapPin size={14} /></span>
                    </div>
                    <span className="leading-none">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex flex-col items-center justify-center leading-none"
                      style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
                    >
                      <span className="flex flex-col items-center justify-center"><Mail size={14} /></span>
                    </div>
                    <span className="break-all leading-none">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex flex-col items-center justify-center leading-none"
                      style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
                    >
                      <span className="flex flex-col items-center justify-center"><Phone size={14} /></span>
                    </div>
                    <span className="leading-none">{personalInfo.phone}</span>
                  </div>
                )}
              </div>
            </header>
          )}

          {/* Experience Section */}
          {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
            <section>
              <h2 className="text-[1.7em] font-serif font-black mb-8 border-b-2 border-zinc-100 pb-2">{labels?.experience || 'Experience'}</h2>
              <div className="space-y-10">
                {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                  <div key={exp.id} data-resume-item={exp.id} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-6">
                    <div className="text-[0.85em] font-black text-zinc-400">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[1.2em] font-black uppercase tracking-tight">{exp.position}</h3>
                      <p 
                        className="text-[0.85em] font-bold uppercase tracking-widest"
                        style={{ color: primaryColor }}
                      >
                        {exp.company} • {exp.location}
                      </p>
                      <ul className="space-y-1.5 mt-4">
                        {exp.description.split('\n').map((line, i) => (
                          <li key={i} className="text-[1em] text-zinc-600 flex gap-2">
                            <span style={{ color: primaryColor }} className="font-black">•</span>
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

          {/* Education Section */}
          {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
            <section>
              <h2 className="text-[1.7em] font-serif font-black mb-8 border-b-2 border-zinc-100 pb-2">{labels?.education || 'Education'}</h2>
              <div className="space-y-8">
                {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                  <div key={edu.id} data-resume-item={edu.id} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-6">
                    <div className="text-[0.85em] font-black text-zinc-400">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    <div>
                      <h3 className="text-[1.2em] font-black uppercase tracking-tight mb-1">{edu.degree}</h3>
                      <p 
                        className="text-[0.85em] font-bold uppercase tracking-widest"
                        style={{ color: primaryColor }}
                      >
                        {edu.school} • {edu.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
