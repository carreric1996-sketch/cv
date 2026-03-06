import React, { useState } from 'react';
import { ResumeData, Experience, Education, Project, Skill, Language, Award, CustomSection } from '../types';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, GraduationCap, 
  Code, FolderGit2, Languages, Trophy, Heart, Camera, MoreVertical, 
  Check, Edit2, Printer, MapPin, Calendar, Type, Link as LinkIcon,
  Bold, Italic, Underline, List, ListOrdered, AlignLeft, Sparkles, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAiAssistant, SectionType } from '../hooks/useAiAssistant';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onPrint: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, onPrint }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());
  const { handleAiSuggestion, isLoading, error } = useAiAssistant();

  const toggleField = (field: string) => {
    const newVisible = new Set(visibleFields);
    if (newVisible.has(field)) {
      newVisible.delete(field);
      // Optionally clear data when hidden
      updatePersonalInfo(field, '');
    } else {
      newVisible.add(field);
    }
    setVisibleFields(newVisible);
  };

  const updatePersonalInfo = (field: string, value: string | boolean) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const id = crypto.randomUUID();
    const newExp: Experience = {
      id,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
    setEditingId(id);
  };

  const addEducation = () => {
    const id = crypto.randomUUID();
    const newEdu: Education = {
      id,
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
    setEditingId(id);
  };

  const addSkill = () => {
    const id = crypto.randomUUID();
    const newSkill: Skill = { id, name: '', level: 3 };
    onChange({ ...data, skills: [...data.skills, newSkill] });
    setEditingId(id);
  };

  const addLanguage = () => {
    const id = crypto.randomUUID();
    const newLang: Language = { id, name: '', level: 3 };
    onChange({ ...data, languages: [...data.languages, newLang] });
    setEditingId(id);
  };

  const addCustomSection = (title: string, type: 'text' | 'list') => {
    const id = crypto.randomUUID();
    const newSection: CustomSection = {
      id,
      title,
      type,
      content: type === 'text' ? '' : undefined,
      items: type === 'list' ? [] : undefined,
    };
    onChange({
      ...data,
      customSections: [...(data.customSections || []), newSection],
    });
    setEditingId(id);
  };

  const updateCustomSection = (id: string, updates: Partial<CustomSection>) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s => s.id === id ? { ...s, ...updates } : s),
    });
  };

  const removeCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: data.customSections.filter(s => s.id !== id),
    });
  };

  const addCustomSectionItem = (sectionId: string) => {
    const itemId = crypto.randomUUID();
    const newItem = { id: itemId, title: '', subtitle: '', date: '', description: '' };
    onChange({
      ...data,
      customSections: data.customSections.map(s => 
        s.id === sectionId ? { ...s, items: [...(s.items || []), newItem] } : s
      ),
    });
    setEditingId(itemId);
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, updates: any) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s => 
        s.id === sectionId ? {
          ...s,
          items: s.items?.map(item => item.id === itemId ? { ...item, ...updates } : item)
        } : s
      ),
    });
  };

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s => 
        s.id === sectionId ? {
          ...s,
          items: s.items?.filter(item => item.id !== itemId)
        } : s
      ),
    });
  };

  return (
    <div className="space-y-12 pb-32">
      {/* Personal Details */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-zinc-900">Personal Details</h2>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><ChevronUp size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-zinc-500 mb-2">Photo</label>
            <div className="relative w-32 h-32 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 flex items-center justify-center group overflow-hidden">
              {data.personalInfo.photo ? (
                <img src={data.personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <Camera size={32} className="text-zinc-300" />
              )}
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <span className="text-white text-xs font-bold uppercase">Change</span>
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <Input label="Given name" value={data.personalInfo.fullName.split(' ')[0] || ''} onChange={(v) => updatePersonalInfo('fullName', `${v} ${data.personalInfo.fullName.split(' ').slice(1).join(' ')}`)} placeholder="Jhon" />
            <Input label="Family name" value={data.personalInfo.fullName.split(' ').slice(1).join(' ') || ''} onChange={(v) => updatePersonalInfo('fullName', `${data.personalInfo.fullName.split(' ')[0]} ${v}`)} placeholder="Craddock" />
          </div>

          <div className="col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-zinc-500">Desired job position</label>
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => updatePersonalInfo('isHeadline', !data.personalInfo.isHeadline)}
                  className={cn(
                    "w-8 h-4 rounded-full relative cursor-pointer transition-colors duration-200",
                    data.personalInfo.isHeadline ? "bg-blue-600" : "bg-zinc-200"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-2 h-2 bg-white rounded-full transition-all duration-200",
                    data.personalInfo.isHeadline ? "left-5" : "left-1"
                  )} />
                </div>
                <span className="text-xs text-zinc-400">Use as headline</span>
              </div>
            </div>
            <input 
              className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:border-zinc-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-zinc-900"
              value={data.personalInfo.jobTitle}
              onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
              placeholder="UI developer"
            />
          </div>

          <Input label="Email address" value={data.personalInfo.email} onChange={(v) => updatePersonalInfo('email', v)} placeholder="carr.eric.1996@gmail.com" />
          <Input label="Phone number" value={data.personalInfo.phone} onChange={(v) => updatePersonalInfo('phone', v)} placeholder="18283337907" />
          
          <div className="col-span-2">
            <Input label="Address" value={data.personalInfo.location} onChange={(v) => updatePersonalInfo('location', v)} placeholder="438 Hannah Street, Asheville" />
          </div>

          <Input label="Post code" value="" onChange={() => {}} placeholder="343434" />
          <Input label="City" value="" onChange={() => {}} placeholder="ny" />
        </div>

        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-500">Professional Summary</label>
            <AiButton 
              isLoading={isLoading['summary']} 
              onClick={() => handleAiSuggestion('summary', { jobTitle: data.personalInfo.jobTitle }, (content) => updatePersonalInfo('summary', content as string))} 
            />
          </div>
          <textarea 
            className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:border-zinc-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-zinc-900 min-h-[120px] resize-none"
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            placeholder="Write a brief professional summary..."
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <AnimatePresence>
            {visibleFields.has('dateOfBirth') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="Date of birth" value={data.personalInfo.dateOfBirth || ''} onChange={(v) => updatePersonalInfo('dateOfBirth', v)} onRemove={() => toggleField('dateOfBirth')} placeholder="12-05-1996" />
              </motion.div>
            )}
            {visibleFields.has('placeOfBirth') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="Place of birth" value={data.personalInfo.placeOfBirth || ''} onChange={(v) => updatePersonalInfo('placeOfBirth', v)} onRemove={() => toggleField('placeOfBirth')} placeholder="London" />
              </motion.div>
            )}
            {visibleFields.has('drivingLicence') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="Driving licence" value={data.personalInfo.drivingLicence || ''} onChange={(v) => updatePersonalInfo('drivingLicence', v)} onRemove={() => toggleField('drivingLicence')} placeholder="Full" />
              </motion.div>
            )}
            {visibleFields.has('gender') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="Gender" value={data.personalInfo.gender || ''} onChange={(v) => updatePersonalInfo('gender', v)} onRemove={() => toggleField('gender')} placeholder="Male" />
              </motion.div>
            )}
            {visibleFields.has('nationality') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="Nationality" value={data.personalInfo.nationality || ''} onChange={(v) => updatePersonalInfo('nationality', v)} onRemove={() => toggleField('nationality')} placeholder="British" />
              </motion.div>
            )}
            {visibleFields.has('linkedin') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="LinkedIn" value={data.personalInfo.linkedin || ''} onChange={(v) => updatePersonalInfo('linkedin', v)} onRemove={() => toggleField('linkedin')} placeholder="linkedin.com/in/username" />
              </motion.div>
            )}
            {visibleFields.has('github') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="GitHub" value={data.personalInfo.github || ''} onChange={(v) => updatePersonalInfo('github', v)} onRemove={() => toggleField('github')} placeholder="github.com/username" />
              </motion.div>
            )}
            {visibleFields.has('website') && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="col-span-1">
                <OptionalInput label="Website" value={data.personalInfo.website || ''} onChange={(v) => updatePersonalInfo('website', v)} onRemove={() => toggleField('website')} placeholder="portfolio.com" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {!visibleFields.has('dateOfBirth') && <PillButton label="Date of birth" onClick={() => toggleField('dateOfBirth')} />}
          {!visibleFields.has('placeOfBirth') && <PillButton label="Place of birth" onClick={() => toggleField('placeOfBirth')} />}
          {!visibleFields.has('drivingLicence') && <PillButton label="Driving licence" onClick={() => toggleField('drivingLicence')} />}
          {!visibleFields.has('gender') && <PillButton label="Gender" onClick={() => toggleField('gender')} />}
          {!visibleFields.has('nationality') && <PillButton label="Nationality" onClick={() => toggleField('nationality')} />}
          {!visibleFields.has('linkedin') && <PillButton label="LinkedIn" onClick={() => toggleField('linkedin')} />}
          {!visibleFields.has('github') && <PillButton label="GitHub" onClick={() => toggleField('github')} />}
          {!visibleFields.has('website') && <PillButton label="Website" onClick={() => toggleField('website')} />}
          <PillButton label="Civil status" />
          <PillButton label="Custom field" />
        </div>
      </section>

      {/* Employment */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-zinc-200 rounded-full" />
            <h2 className="text-xl font-bold text-zinc-900">Employment</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><ChevronUp size={20} /></button>
          </div>
        </div>

        <div className="space-y-4">
          {data.experience.map((exp) => (
            <motion.div 
              layout
              key={exp.id} 
              className={cn(
                "border rounded-2xl transition-all duration-300",
                editingId === exp.id 
                  ? "border-blue-200 bg-white shadow-xl shadow-blue-50 p-8" 
                  : "border-zinc-100 bg-zinc-50/50 p-6 hover:bg-white hover:border-zinc-200 cursor-pointer"
              )}
              onClick={() => editingId !== exp.id && setEditingId(exp.id)}
            >
              <AnimatePresence mode="wait">
                {editingId === exp.id ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900">Edit Experience</h3>
                        <p className="text-xs text-zinc-400">Add your professional background</p>
                      </div>
                    </div>
                    <Input label="Position" value={exp.position} onChange={(v) => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, position: v } : e) })} placeholder="UI developer" />
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Employer" value={exp.company} onChange={(v) => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, company: v } : e) })} placeholder="Thinkpad" />
                      <Input label="City" value={exp.location} onChange={(v) => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, location: v } : e) })} placeholder="New York" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <MonthYearPicker label="Start date" value={exp.startDate} onChange={(v) => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, startDate: v } : e) })} />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-zinc-500">End date</label>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, current: !e.current, endDate: !e.current ? 'Present' : '' } : e) })}
                              className={cn(
                                "w-8 h-4 rounded-full relative transition-colors",
                                exp.current ? "bg-blue-500" : "bg-zinc-200"
                              )}
                            >
                              <div className={cn(
                                "absolute top-1 w-2 h-2 bg-white rounded-full transition-all",
                                exp.current ? "right-1" : "left-1"
                              )} />
                            </button>
                            <span className="text-xs text-zinc-400">Present</span>
                          </div>
                        </div>
                        <MonthYearPicker 
                          value={exp.current ? 'Present' : exp.endDate}
                          onChange={(v) => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, endDate: v, current: v === 'Present' } : e) })}
                          disabled={exp.current}
                          showPresentOption
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-500">Description</label>
                        <AiButton 
                          isLoading={isLoading[exp.id]} 
                          onClick={() => handleAiSuggestion('experience', { id: exp.id, position: exp.position, company: exp.company }, (content) => {
                            const newDesc = exp.description ? `${exp.description}\n${content}` : content as string;
                            onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, description: newDesc } : e) });
                          })} 
                        />
                      </div>
                      <RichTextEditor value={exp.description} onChange={(v) => onChange({ ...data, experience: data.experience.map(e => e.id === exp.id ? { ...e, description: v } : e) })} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => onChange({ ...data, experience: data.experience.filter(e => e.id !== exp.id) })} className="p-3 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Check size={20} /> Done</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{exp.position || 'Position'}</h3>
                        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                          {exp.company || 'Employer'} • {exp.startDate || 'Start'} - {exp.current ? 'Present' : exp.endDate || 'End'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setEditingId(exp.id); }} className="p-2 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all"><Edit2 size={18} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onChange({ ...data, experience: data.experience.filter(e => e.id !== exp.id) }); }} className="p-2 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <button onClick={addExperience} className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">
          <Plus size={20} /> Add employment
        </button>
      </section>

      {/* Education */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-zinc-200 rounded-full" />
            <h2 className="text-xl font-bold text-zinc-900">Education</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><ChevronUp size={20} /></button>
          </div>
        </div>

        <div className="space-y-4">
          {data.education.map((edu) => (
            <motion.div 
              layout
              key={edu.id} 
              className={cn(
                "border rounded-2xl transition-all duration-300",
                editingId === edu.id 
                  ? "border-blue-200 bg-white shadow-xl shadow-blue-50 p-8" 
                  : "border-zinc-100 bg-zinc-50/50 p-6 hover:bg-white hover:border-zinc-200 cursor-pointer"
              )}
              onClick={() => editingId !== edu.id && setEditingId(edu.id)}
            >
              <AnimatePresence mode="wait">
                {editingId === edu.id ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900">Edit Education</h3>
                        <p className="text-xs text-zinc-400">Add your academic background</p>
                      </div>
                    </div>
                    <Input label="Education" value={edu.degree} onChange={(v) => onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, degree: v } : e) })} placeholder="Bachelor of Business Management" />
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="School" value={edu.school} onChange={(v) => onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, school: v } : e) })} placeholder="Wardiere University" />
                      <Input label="City" value={edu.location} onChange={(v) => onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, location: v } : e) })} placeholder="New York" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <MonthYearPicker label="Start date" value={edu.startDate} onChange={(v) => onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, startDate: v } : e) })} />
                      <MonthYearPicker label="End date" value={edu.endDate} onChange={(v) => onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, endDate: v } : e) })} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-500">Description</label>
                        <AiButton 
                          isLoading={isLoading[edu.id]} 
                          onClick={() => handleAiSuggestion('education', { id: edu.id, degree: edu.degree, school: edu.school }, (content) => {
                            const newDesc = edu.description ? `${edu.description}\n${content}` : content as string;
                            onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, description: newDesc } : e) });
                          })} 
                        />
                      </div>
                      <RichTextEditor value={edu.description} onChange={(v) => onChange({ ...data, education: data.education.map(e => e.id === edu.id ? { ...e, description: v } : e) })} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => onChange({ ...data, education: data.education.filter(e => e.id !== edu.id) })} className="p-3 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Check size={20} /> Done</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{edu.degree || 'Education'}</h3>
                        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                          {edu.school || 'School'} • {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setEditingId(edu.id); }} className="p-2 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all"><Edit2 size={18} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onChange({ ...data, education: data.education.filter(e => e.id !== edu.id) }); }} className="p-2 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <button onClick={addEducation} className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">
          <Plus size={20} /> Add education
        </button>
      </section>

      {/* Skills */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-zinc-900">Skills</h2>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><ChevronUp size={20} /></button>
          </div>
        </div>

        <div className="space-y-4">
          {data.skills.map((skill) => (
            <motion.div 
              layout
              key={skill.id} 
              className={cn(
                "border rounded-2xl transition-all duration-300",
                editingId === skill.id 
                  ? "border-blue-200 bg-white shadow-xl shadow-blue-50 p-8" 
                  : "border-zinc-100 bg-zinc-50/50 p-6 hover:bg-white hover:border-zinc-200 cursor-pointer"
              )}
              onClick={() => editingId !== skill.id && setEditingId(skill.id)}
            >
              <AnimatePresence mode="wait">
                {editingId === skill.id ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Skill" value={skill.name} onChange={(v) => onChange({ ...data, skills: data.skills.map(s => s.id === skill.id ? { ...s, name: v } : s) })} placeholder="JavaScript" />
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-500">Level</label>
                        <select 
                          className="w-full bg-zinc-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                          value={skill.level}
                          onChange={(e) => onChange({ ...data, skills: data.skills.map(s => s.id === skill.id ? { ...s, level: parseInt(e.target.value) } : s) })}
                        >
                          <option value={1}>Beginner</option>
                          <option value={2}>Elementary</option>
                          <option value={3}>Intermediate</option>
                          <option value={4}>Advanced</option>
                          <option value={5}>Expert</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => onChange({ ...data, skills: data.skills.filter(s => s.id !== skill.id) })} className="p-3 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Check size={20} /> Done</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                        <Code size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{skill.name || 'Skill'}</h3>
                        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                          {['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setEditingId(skill.id); }} className="p-2 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all"><Edit2 size={18} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onChange({ ...data, skills: data.skills.filter(s => s.id !== skill.id) }); }} className="p-2 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <button onClick={addSkill} className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">
            <Plus size={20} /> Add skill
          </button>
          <AiButton 
            isLoading={isLoading['skills']} 
            onClick={() => handleAiSuggestion('skills', { jobTitle: data.personalInfo.jobTitle }, (content) => {
              const newSkills = (content as string[]).map(name => ({ id: crypto.randomUUID(), name, level: 3 }));
              onChange({ ...data, skills: [...data.skills, ...newSkills] });
            })} 
          />
        </div>
      </section>

      {/* Languages */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-zinc-200 rounded-full" />
            <h2 className="text-xl font-bold text-zinc-900">Languages</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
            <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors"><ChevronUp size={20} /></button>
          </div>
        </div>

        <div className="space-y-4">
          {data.languages.map((lang) => (
            <motion.div 
              layout
              key={lang.id} 
              className={cn(
                "border rounded-2xl transition-all duration-300",
                editingId === lang.id 
                  ? "border-blue-200 bg-white shadow-xl shadow-blue-50 p-8" 
                  : "border-zinc-100 bg-zinc-50/50 p-6 hover:bg-white hover:border-zinc-200 cursor-pointer"
              )}
              onClick={() => editingId !== lang.id && setEditingId(lang.id)}
            >
              <AnimatePresence mode="wait">
                {editingId === lang.id ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Language" value={lang.name} onChange={(v) => onChange({ ...data, languages: data.languages.map(l => l.id === lang.id ? { ...l, name: v } : l) })} placeholder="Spanish" />
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-500">Level</label>
                        <select 
                          className="w-full bg-zinc-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                          value={lang.level}
                          onChange={(e) => onChange({ ...data, languages: data.languages.map(l => l.id === lang.id ? { ...l, level: parseInt(e.target.value) } : l) })}
                        >
                          <option value={1}>A1</option>
                          <option value={2}>A2</option>
                          <option value={3}>B1</option>
                          <option value={4}>B2</option>
                          <option value={5}>C1/C2</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => onChange({ ...data, languages: data.languages.filter(l => l.id !== lang.id) })} className="p-3 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Check size={20} /> Done</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                        <Languages size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{lang.name || 'Language'}</h3>
                        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                          {['A1', 'A2', 'B1', 'B2', 'C1/C2'][lang.level - 1]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setEditingId(lang.id); }} className="p-2 text-zinc-400 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all"><Edit2 size={18} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onChange({ ...data, languages: data.languages.filter(l => l.id !== lang.id) }); }} className="p-2 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <button onClick={addLanguage} className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">
            <Plus size={20} /> Add language
          </button>
          <button className="flex items-center gap-2 text-zinc-400 font-bold hover:bg-zinc-50 px-4 py-2 rounded-xl transition-colors">
            <Sparkles size={20} /> AI Suggestions
          </button>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-zinc-200 rounded-full" />
            <h2 className="text-xl font-bold text-zinc-900">Awards</h2>
          </div>
        </div>

        <div className="space-y-4">
          {data.awards?.map((award) => (
            <div key={award.id} className="border border-zinc-100 rounded-2xl p-6 bg-white shadow-sm">
              {editingId === award.id ? (
                <div className="space-y-6">
                  <Input label="Award Name" value={award.name} onChange={(v) => onChange({ ...data, awards: data.awards?.map(a => a.id === award.id ? { ...a, name: v } : a) })} placeholder="Employee of the Month" />
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Issuer" value={award.issuer} onChange={(v) => onChange({ ...data, awards: data.awards?.map(a => a.id === award.id ? { ...a, issuer: v } : a) })} placeholder="Google" />
                    <Input label="Date" value={award.date} onChange={(v) => onChange({ ...data, awards: data.awards?.map(a => a.id === award.id ? { ...a, date: v } : a) })} placeholder="2023" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => onChange({ ...data, awards: data.awards?.filter(a => a.id !== award.id) })} className="p-3 text-zinc-400 hover:bg-zinc-50 rounded-xl transition-colors"><Trash2 size={20} /></button>
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Check size={20} /> Done</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-zinc-900">{award.name || '[Award]'}</h3>
                    <p className="text-sm text-zinc-500">{award.issuer} | {award.date}</p>
                  </div>
                  <button onClick={() => setEditingId(award.id)} className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"><Edit2 size={18} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={() => {
            const id = crypto.randomUUID();
            const newAward = { id, name: '', issuer: '', date: '' };
            onChange({ ...data, awards: [...(data.awards || []), newAward] });
            setEditingId(id);
          }} 
          className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={20} /> Add award
        </button>
      </section>

      {/* Hobbies */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-zinc-200 rounded-full" />
            <h2 className="text-xl font-bold text-zinc-900">Hobbies</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {data.hobbies?.map((hobby, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full text-sm font-medium text-zinc-700">
                {hobby}
                <button onClick={() => onChange({ ...data, hobbies: data.hobbies?.filter((_, i) => i !== index) })} className="text-zinc-400 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              id="hobby-input"
              className="flex-1 px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:border-zinc-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-zinc-900"
              placeholder="Add a hobby (e.g. Photography)"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    onChange({ ...data, hobbies: [...(data.hobbies || []), val] });
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
            <button 
              onClick={() => {
                const input = document.getElementById('hobby-input') as HTMLInputElement;
                const val = input.value.trim();
                if (val) {
                  onChange({ ...data, hobbies: [...(data.hobbies || []), val] });
                  input.value = '';
                }
              }}
              className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Custom Sections */}
      <AnimatePresence>
        {data.customSections?.map((section) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 group relative"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                <input 
                  className="text-xl font-bold text-zinc-900 bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                  value={section.title}
                  onChange={(e) => updateCustomSection(section.id, { title: e.target.value })}
                  placeholder="Section Title"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full cursor-grab active:cursor-grabbing"><MoreVertical size={20} /></button>
                <button 
                  onClick={() => removeCustomSection(section.id)}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {section.type === 'text' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-500">Description</label>
                  <AiButton 
                    isLoading={isLoading[section.id]} 
                    onClick={() => handleAiSuggestion('summary', { jobTitle: section.title }, (content) => {
                      const newContent = section.content ? `${section.content}\n${content}` : content as string;
                      updateCustomSection(section.id, { content: newContent });
                    })} 
                  />
                </div>
                <RichTextEditor 
                  value={section.content || ''} 
                  onChange={(v) => updateCustomSection(section.id, { content: v })} 
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  {section.items?.map((item) => (
                    <div key={item.id} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 group/item">
                      {editingId === item.id ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <Input label="Title" value={item.title} onChange={(v) => updateCustomSectionItem(section.id, item.id, { title: v })} placeholder="e.g. Course Name" />
                            <Input label="Organization" value={item.subtitle} onChange={(v) => updateCustomSectionItem(section.id, item.id, { subtitle: v })} placeholder="e.g. University" />
                            <Input label="Date" value={item.date} onChange={(v) => updateCustomSectionItem(section.id, item.id, { date: v })} placeholder="e.g. Jan 2023" />
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-zinc-500">Description</label>
                              <AiButton 
                                isLoading={isLoading[item.id]} 
                                onClick={() => handleAiSuggestion('experience', { id: item.id, position: item.title, company: item.subtitle }, (content) => {
                                  const newDesc = item.description ? `${item.description}\n${content}` : content as string;
                                  updateCustomSectionItem(section.id, item.id, { description: newDesc });
                                })} 
                              />
                            </div>
                            <RichTextEditor value={item.description} onChange={(v) => updateCustomSectionItem(section.id, item.id, { description: v })} />
                          </div>
                          <div className="flex justify-end gap-3">
                            <button onClick={() => removeCustomSectionItem(section.id, item.id)} className="flex items-center gap-2 px-6 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={20} /> Delete</button>
                            <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Check size={20} /> Done</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group">
                          <div>
                            <h3 className="font-bold text-zinc-900">{item.title || '[Title]'}</h3>
                            <p className="text-sm text-zinc-500">{item.subtitle} | {item.date}</p>
                          </div>
                          <button onClick={() => setEditingId(item.id)} className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full opacity-0 group-hover/item:opacity-100 transition-all"><Edit2 size={18} /></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => addCustomSectionItem(section.id)}
                  className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
                >
                  <Plus size={20} /> Add item
                </button>
              </div>
            )}
          </motion.section>
        ))}
      </AnimatePresence>

      {/* Footer Pill Buttons */}
      <div className="flex flex-wrap gap-3">
        <PillButton label="Profile" onClick={() => addCustomSection('Profile', 'text')} isActive={data.customSections.some(s => s.title === 'Profile')} />
        <PillButton label="Internships" onClick={() => addCustomSection('Internships', 'list')} isActive={data.customSections.some(s => s.title === 'Internships')} />
        <PillButton label="Courses" onClick={() => addCustomSection('Courses', 'list')} isActive={data.customSections.some(s => s.title === 'Courses')} />
        <PillButton label="Extracurricular activities" onClick={() => addCustomSection('Extracurricular activities', 'list')} isActive={data.customSections.some(s => s.title === 'Extracurricular activities')} />
        <PillButton label="References" onClick={() => addCustomSection('References', 'list')} isActive={data.customSections.some(s => s.title === 'References')} />
        <PillButton label="Qualities" onClick={() => addCustomSection('Qualities', 'list')} isActive={data.customSections.some(s => s.title === 'Qualities')} />
        <PillButton label="Certificates" onClick={() => addCustomSection('Certificates', 'list')} isActive={data.customSections.some(s => s.title === 'Certificates')} />
        <PillButton label="Achievements" onClick={() => addCustomSection('Achievements', 'list')} isActive={data.customSections.some(s => s.title === 'Achievements')} />
        <PillButton label="Signature" onClick={() => addCustomSection('Signature', 'text')} isActive={data.customSections.some(s => s.title === 'Signature')} />
        <PillButton label="Footer" onClick={() => addCustomSection('Footer', 'text')} isActive={data.customSections.some(s => s.title === 'Footer')} />
        <PillButton label="Custom section" onClick={() => addCustomSection('Custom Section', 'list')} hasChevron />
      </div>

      {/* Final Print Button */}
      <div className="flex justify-end pt-8">
        <button 
          type="button"
          onClick={onPrint}
          className="relative z-50 flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:scale-105 active:scale-95"
        >
          <Printer size={24} />
          Print / Save PDF
        </button>
      </div>
    </div>
  );
};

const MonthYearPicker = ({ label, value, onChange, disabled = false, showPresentOption = false }: { label?: string; value: string; onChange: (v: string) => void; disabled?: boolean; showPresentOption?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => (currentYear - i).toString());

  const isPresent = value === 'Present';
  const [selectedMonth, selectedYear] = isPresent ? ['', ''] : value.split(' ');

  const handleSelect = (m: string, y: string) => {
    if (m === 'Present' || y === 'Present') {
      onChange('Present');
    } else {
      onChange(`${m} ${y}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative">
      {label && <label className="block text-sm font-medium text-zinc-500">{label}</label>}
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:border-zinc-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-zinc-900 text-left flex justify-between items-center disabled:opacity-50",
          isOpen && "bg-white border-zinc-200 ring-2 ring-blue-500/20"
        )}
      >
        <span className={cn(!value && "text-zinc-400")}>
          {value || "Select date"}
        </span>
        <Calendar size={18} className="text-zinc-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for click-outside */}
            <div 
              className="fixed inset-0 z-[70]" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 z-[80] overflow-hidden"
            >
              <div className="flex gap-4 h-64">
                {/* Months Grid */}
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1">Month</div>
                  <div className="grid grid-cols-3 gap-1">
                    {showPresentOption && (
                      <button
                        type="button"
                        onClick={() => handleSelect('Present', 'Present')}
                        className={cn(
                          "col-span-3 py-2 text-xs font-bold rounded-lg transition-all mb-1",
                          isPresent 
                            ? "bg-blue-600 text-white" 
                            : "bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-blue-600"
                        )}
                      >
                        Present
                      </button>
                    )}
                    {fullMonths.map((m, i) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleSelect(m, selectedYear || currentYear.toString())}
                        className={cn(
                          "py-2 text-xs font-medium rounded-lg transition-all",
                          selectedMonth === m
                            ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20"
                            : "text-zinc-600 hover:bg-blue-50 hover:text-blue-600"
                        )}
                      >
                        {months[i]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Years Column */}
                <div className="w-20 flex flex-col">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1">Year</div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-1">
                    {years.map(y => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => handleSelect(selectedMonth || 'January', y)}
                        className={cn(
                          "w-full py-2 text-xs font-medium rounded-lg transition-all",
                          selectedYear === y
                            ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20"
                            : "text-zinc-600 hover:bg-blue-50 hover:text-blue-600"
                        )}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder, disabled = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-zinc-500">{label}</label>
    <input
      type="text"
      disabled={disabled}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:border-zinc-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-zinc-900 disabled:opacity-50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const OptionalInput = ({ label, value, onChange, onRemove, placeholder }: { label: string; value: string; onChange: (v: string) => void; onRemove: () => void; placeholder?: string }) => (
  <div className="space-y-2 group">
    <div className="flex items-center justify-between">
      <label className="block text-sm font-medium text-zinc-500">{label}</label>
      <button 
        onClick={onRemove}
        className="text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        title="Remove field"
      >
        <Trash2 size={14} />
      </button>
    </div>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:border-zinc-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-zinc-900"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
  </div>
);

const PillButton = ({ label, onClick, isActive = false, hasChevron = false }: { label: string; onClick?: () => void; isActive?: boolean; hasChevron?: boolean }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-all",
      isActive 
        ? "bg-blue-50 border-blue-200 text-blue-600 shadow-sm" 
        : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
    )}
  >
    <Plus size={16} className={cn(isActive ? "text-blue-500" : "text-zinc-400")} />
    {label}
    {hasChevron && <ChevronDown size={16} className="text-zinc-400" />}
  </button>
);

const AiButton = ({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    disabled={isLoading}
    className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all text-xs disabled:opacity-50"
  >
    <Sparkles size={14} className={cn(isLoading && "animate-pulse")} />
    {isLoading ? 'Generating...' : 'AI Suggestions'}
  </button>
);

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="border border-zinc-100 rounded-2xl overflow-hidden bg-zinc-50">
    <div className="flex items-center gap-1 p-2 border-b border-zinc-100 bg-white">
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500"><Bold size={18} /></button>
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500"><Italic size={18} /></button>
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500"><Underline size={18} /></button>
      <div className="w-px h-6 bg-zinc-100 mx-1" />
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500"><LinkIcon size={18} /></button>
      <div className="w-px h-6 bg-zinc-100 mx-1" />
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500"><List size={18} /></button>
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500"><ListOrdered size={18} /></button>
      <div className="w-px h-6 bg-zinc-100 mx-1" />
      <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500 flex items-center gap-1"><AlignLeft size={18} /><ChevronDown size={14} /></button>
    </div>
    <textarea
      className="w-full px-6 py-4 bg-transparent outline-none text-sm min-h-[150px] text-zinc-700 leading-relaxed"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe your achievements and responsibilities..."
    />
  </div>
);
