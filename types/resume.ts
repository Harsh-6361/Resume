export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  location?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
  gpa?: string
  location?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  url?: string
  github?: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Activity {
  id: string
  type: "volunteer" | "award" | "publication" | "language" | "extracurricular" | "leadership" | "other"
  title: string
  organization?: string
  role?: string
  date: string
  endDate?: string
  description?: string
  level?: string
  location?: string
  achievement?: string
}

export interface ResumeSection {
  id: string
  name: string
  type: "experience" | "education" | "projects" | "certificates" | "activities" | "skills"
  enabled: boolean
  order: number
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  projects: Project[]
  certificates: Certificate[]
  activities: Activity[]
  skills: string[]
  sections: ResumeSection[]
}

export interface User {
  id: string
  name: string
  phone: string
  resumes: ResumeData[]
}

export type TemplateType = "modern" | "classic" | "minimal" | "creative" | "executive" | "tech"

export interface AIOptimization {
  score: number
  suggestions: {
    type: "content" | "formatting" | "keywords" | "structure" | "ats"
    section: string
    message: string
    priority: "high" | "medium" | "low"
  }[]
}

export interface HostedResume {
  id: string
  userId: string
  resumeData: ResumeData
  template: TemplateType
  url: string
  isPublic: boolean
  createdAt: string
  views: number
}
