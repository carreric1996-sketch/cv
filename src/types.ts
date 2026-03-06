export interface ResumeLabels {
  experience?: string;
  education?: string;
  skills?: string;
  summary?: string;
  contact?: string;
  languages?: string;
  interests?: string;
  projects?: string;
  awards?: string;
  software?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    jobTitle: string;
    summary: string;
    photo?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    drivingLicence?: string;
    gender?: string;
    nationality?: string;
    linkedin?: string;
    github?: string;
    isHeadline?: boolean;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  hobbies: string[];
  awards: Award[];
  customSections: CustomSection[];
  labels?: ResumeLabels;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'text' | 'list';
  content?: string;
  items?: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Award {
  id: string;
  name: string;
  date: string;
  issuer: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export type TemplateType = 'modern' | 'professional' | 'minimalist' | 'elegant' | 'executive' | 'prestige' | 'artistic' | 'chic' | 'creative' | 'vibrant' | 'classic' | 'minimal';

export interface StyleConfig {
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  lineHeight: number;
  primaryColor: string;
}
