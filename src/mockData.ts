import { ResumeData } from './types';

export const mockResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Riverstone',
    email: 'alex.stone@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    website: 'https://riverstone-dev.io',
    jobTitle: 'Senior Full-Stack Engineer',
    summary: 'Innovative Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Architecture. Proven track record of reducing server costs by 40% and leading cross-functional teams of 10+ developers to deliver high-impact products on tight deadlines.',
    photo: 'https://i.pravatar.cc/300?u=alex', // Using a placeholder avatar
    dateOfBirth: '1992-05-15',
    placeOfBirth: 'Austin, TX',
    drivingLicence: 'Class C',
    gender: 'Non-binary',
    nationality: 'American',
    linkedin: 'linkedin.com/in/alexriver',
    github: 'github.com/ariverstone',
    isHeadline: true,
  },
  experience: [
    
    {
      id: '1',
      company: 'TechFlow Systems',
      position: 'Lead Developer',
      location: 'Remote',
      startDate: '2021-01',
      endDate: '2022-02',
      current: false,
      description: 'Spearheaded the migration of legacy monolith to microservices. Implemented CI/CD pipelines that reduced deployment time by 60%. Mentored 5 junior developers.',
    },
    {
      id: '2',
      company: 'Open Source Resume Maker',
      position: 'Senior Full-Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description: 'Lead development of a popular open-source resume builder. Designed and implemented a React/Node.js application that generates PDF resumes from JSON data. Achieved 10k+ stars on GitHub and 1M+ downloads.',}
  ],
  education: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      location: 'Berkeley, CA',
      startDate: '2014-08',
      endDate: '2018-05',
      description: 'Graduated with Honors. Specialized in Distributed Systems.',
    }
  ],
  skills: [
    {id: '1', name: 'JavaScript (ES6+)', level: 1 },
    {id: '2', name: 'TypeScript', level: 2 },
    {id: '3', name: 'React/Next.js', level: 2 },
    {id: '4', name: 'PostgreSQL', level: 2 },
    {id: '5', name: 'AWS (Lambda/S3)', level: 3 }
  ],
  projects: [
    {
      id: '1',
      name: 'OpenSource Resume Maker',
      description: 'A tool that helps developers generate PDFs from JSON data.',
      link: 'https://github.com/ariverstone/resume-maker'
    }
  ],
  languages: [
    {id: '1', name: 'English', level: 1 },
    {id: '2', name: 'Spanish', level: 3 }
  ],
  hobbies: ['Rock Climbing', 'Generative Art', 'Mechanical Keyboards'],
  awards: [
    {id: '1', name: 'Innovator of the Year', date: '2022', issuer: 'TechFlow' }
  ],
  customSections: [],
  labels: {
    experience: 'Professional Experience',
    education: 'Education',
    skills: 'Technical Skills',
    summary: 'Profile',
    contact: 'Contact Info',
    languages: 'Languages',
    interests: 'Interests',
    projects: 'Personal Projects',
    awards: 'Honors & Awards',
    software: 'Software Proficiency',
  }
};

// export const mockResumeData: ResumeData = {
//   personalInfo: {
//     fullName: '',
//     email: '',
//     phone: '',
//     location: '',
//     website: '',
//     jobTitle: '',
//     summary: '',
//     photo: '',
//     dateOfBirth: '',
//     placeOfBirth: '',
//     drivingLicence: '',
//     gender: '',
//     nationality: '',
//     linkedin: '',
//     github: '',
//     isHeadline: true,
//   },
//   experience: [],
//   education: [],
//   skills: [],
//   projects: [],
//   languages: [],
//   hobbies: [],
//   awards: [],
//   customSections: [],
//   labels: {
//     experience: 'Experience',
//     education: 'Education',
//     skills: 'Skills',
//     summary: 'Summary',
//     contact: 'Contact',
//     languages: 'Languages',
//     interests: 'Interests',
//     projects: 'Projects',
//     awards: 'Awards',
//     software: 'Software',
//   },
// };
