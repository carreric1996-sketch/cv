import React from 'react';
import { ResumeData, StyleConfig } from '../types';

interface TemplateProps {
  data: ResumeData;
  styleConfig: StyleConfig;
}

export const CreativeTemplate: React.FC<{ 
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
      className="relative bg-white min-h-[297mm] w-[210mm] overflow-hidden"
      style={{ 
        fontFamily: `${fontFamily}, serif`,
        fontSize: fontSizeMap[fontSize],
        lineHeight: lineHeight,
      }}
    >
      {/* Background Layer - Layering Strategy */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Header background split */}
        <div className="absolute top-0 left-0 w-full h-[450px] bg-white" />
      </div>

      {/* Main Container - 12 Column Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 min-h-[297mm]">
        
        {/* Header Section - Spans full width but split internally */}
        {!isSecondPage && (
          <header className="col-span-12 grid grid-cols-1 md:grid-cols-12 h-auto md:h-[450px]">
            {/* Name & Title Area */}
            <div className="col-span-12 md:col-span-7 p-10 md:p-16 flex flex-col justify-center relative">
              <h1 className="text-[5em] font-bold tracking-tighter mb-4 z-10" style={{ color: primaryColor }}>
                {personalInfo.fullName.split(' ').map((part, i) => (
                  <span key={i} className="block">{part}</span>
                ))}
              </h1>
              {/* Overlapping Script Title */}
              <div className="relative z-20 mt-2 md:mt-0">
                <p 
                  className="font-script text-[4.5em] -rotate-3 md:-rotate-6 absolute top-[-20px] md:top-[-40px] left-0 md:left-4 whitespace-nowrap drop-shadow-md"
                  style={{ color: primaryColor }}
                >
                  {personalInfo.jobTitle}
                </p>
              </div>
            </div>

            {/* Photo Area with Torn Edge */}
            <div className="col-span-12 md:col-span-5 relative h-[300px] md:h-full overflow-hidden">
              {personalInfo.photo && (
                <div className="w-full h-full relative">
                  <img 
                    src={personalInfo.photo} 
                    className="w-full h-full object-cover grayscale" 
                    alt="Profile" 
                  />
                  {/* Torn Edge Shape Implementation */}
                  <div 
                    className="absolute top-0 left-0 h-full w-16 md:w-24 bg-white transition-all duration-500 hidden md:block"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 85% 5%, 95% 10%, 80% 15%, 90% 20%, 75% 25%, 85% 30%, 70% 35%, 80% 40%, 65% 45%, 75% 50%, 60% 55%, 70% 60%, 55% 65%, 65% 70%, 50% 75%, 60% 80%, 45% 85%, 55% 90%, 40% 95%, 100% 100%, 0% 100%)'
                    }}
                  />
                </div>
              )}
            </div>
          </header>
        )}

        {/* Body Section - Asymmetrical Columns */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 p-10 md:p-16">
          
          {/* Left Column - Spans 5 columns */}
          <div className="col-span-12 md:col-span-5 space-y-12">
            {/* Contact */}
            <section>
              <h2 className="text-[1.7em] font-bold mb-6 border-b-2 border-zinc-100 pb-2" style={{ color: primaryColor }}>{labels?.contact || 'Contact'}</h2>
              <div className="space-y-3 text-[1em] text-zinc-700">
                {personalInfo.phone && <p>{personalInfo.phone}</p>}
                {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                {personalInfo.website && <p>{personalInfo.website}</p>}
                {personalInfo.location && <p>{personalInfo.location}</p>}
              </div>
            </section>

            {/* Education */}
            {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
              <section>
                <h2 className="text-[1.7em] font-bold mb-6 border-b-2 border-zinc-100 pb-2" style={{ color: primaryColor }}>{labels?.education || 'Education'}</h2>
                <div className="space-y-8">
                  {education.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((edu) => (
                    <div key={edu.id} data-resume-item={edu.id} className="space-y-1">
                      <h3 className="font-bold text-[1.2em]">{edu.degree}</h3>
                      <p className="text-[1em] text-zinc-600">{edu.school} - {edu.location}</p>
                      <p className="text-[0.75em] font-bold italic text-zinc-400 uppercase tracking-widest">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).length > 0 && (
              <section>
                <h2 className="text-[1.7em] font-bold mb-6 border-b-2 border-zinc-100 pb-2" style={{ color: primaryColor }}>{labels?.skills || 'Skills'}</h2>
                <div className="space-y-3 text-[1em] text-zinc-700">
                  {skills.filter(s => !visibleItemIds || visibleItemIds.has(s.id)).map((skill) => (
                    <div key={skill.id} data-resume-item={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                      <p>{skill.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Spans 7 columns */}
          <div className="col-span-12 md:col-span-7 space-y-12">
            {/* Summary */}
            {!isSecondPage && personalInfo.summary && (
              <section>
                <h2 className="text-[1.7em] font-bold mb-6 border-b-2 border-zinc-100 pb-2" style={{ color: primaryColor }}>{labels?.summary || 'Profile'}</h2>
                <p className="text-[1em] text-zinc-700">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {/* Experience Timeline */}
            {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).length > 0 && (
              <section>
                <h2 className="text-[1.7em] font-bold mb-8 border-b-2 border-zinc-100 pb-2" style={{ color: primaryColor }}>{labels?.experience || 'Experience'}</h2>
                <div className="relative border-l-2 border-zinc-200 ml-16">
                  {experience.filter(e => !visibleItemIds || visibleItemIds.has(e.id)).map((exp) => (
                    <div key={exp.id} data-resume-item={exp.id} className="mb-12 relative pl-8">
                      {/* Timeline Dot */}
                      <div 
                        className="absolute -left-[7px] top-2 w-3 h-3 rounded-full border-2 border-white" 
                        style={{ backgroundColor: primaryColor }}
                      />
                      
                      {/* Rotated Date - Technical Detail Match */}
                      <div className="absolute -left-[85px] top-0 w-20 text-right">
                        <p className="text-[0.7em] font-bold uppercase tracking-tighter rotate-[-90deg] origin-right translate-y-10 whitespace-nowrap text-zinc-400">
                          {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-[1.4em] font-bold uppercase tracking-tight">{exp.position}</h3>
                        <p className="text-[1em] font-bold text-zinc-500">{exp.company} - {exp.location}</p>
                        <ul className="space-y-3 mt-4">
                          {exp.description.split('\n').map((line, i) => (
                            <li key={i} className="text-[1em] text-zinc-600 flex gap-3">
                              <span className="text-black font-bold">•</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};
