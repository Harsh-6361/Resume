"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Eye, LogOut, Save, Plus, Trash2, Brain, Globe } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { AIOptimization } from "@/components/ai-optimization"
import { SectionReorder } from "@/components/section-reorder"
import { DynamicActivityForm } from "@/components/dynamic-activity-form"
import { DownloadOptions } from "@/components/download-options"
import { ResumeHosting } from "@/components/hosting/resume-hosting"
import { AutosaveIndicator } from "@/components/autosave-indicator"
import type {
  ResumeData,
  User,
  TemplateType,
  Experience,
  Education,
  Project,
  Certificate,
  Activity,
  ResumeSection,
} from "@/types/resume"

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    website: "",
    linkedin: "",
    github: "",
  },
  experience: [],
  education: [],
  projects: [],
  certificates: [],
  activities: [],
  skills: [],
  sections: [
    { id: "experience", name: "Work Experience", type: "experience", enabled: true, order: 0 },
    { id: "education", name: "Education", type: "education", enabled: true, order: 1 },
    { id: "projects", name: "Projects", type: "projects", enabled: true, order: 2 },
    { id: "certificates", name: "Certificates", type: "certificates", enabled: true, order: 3 },
    { id: "activities", name: "Additional Activities", type: "activities", enabled: true, order: 4 },
    { id: "skills", name: "Skills", type: "skills", enabled: true, order: 5 },
  ],
}

export default function HesumeBuilder() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("modern")
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [newSkill, setNewSkill] = useState("")
  const [newTech, setNewTech] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("currentHesumeUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Autosave functionality
  const saveResume = useCallback(async () => {
    if (!user) return

    setIsSaving(true)

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = {
      ...user,
      resumes: [resumeData],
    }

    const users = JSON.parse(localStorage.getItem("hesumeUsers") || "[]")
    const updatedUsers = users.map((u: User) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem("hesumeUsers", JSON.stringify(updatedUsers))
    localStorage.setItem("currentHesumeUser", JSON.stringify(updatedUser))

    setUser(updatedUser)
    setLastSaved(new Date())
    setIsSaving(false)
  }, [user, resumeData])

  // Auto-save on data changes
  useEffect(() => {
    if (user && resumeData.personalInfo.fullName) {
      const timer = setTimeout(() => {
        saveResume()
      }, 2000) // Save 2 seconds after last change

      return () => clearTimeout(timer)
    }
  }, [resumeData, user, saveResume])

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    localStorage.setItem("currentHesumeUser", JSON.stringify(loggedInUser))

    if (loggedInUser.resumes.length > 0) {
      setResumeData(loggedInUser.resumes[0])
      setLastSaved(new Date())
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("currentHesumeUser")
    setResumeData(initialResumeData)
    setLastSaved(null)
  }

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const updatePersonalInfo = (field: string, value: string) => {
    updateResumeData({
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    })
  }

  // Experience functions
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    }
    updateResumeData({
      experience: [...resumeData.experience, newExp],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    updateResumeData({
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    updateResumeData({
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

  // Education functions
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
      location: "",
    }
    updateResumeData({
      education: [...resumeData.education, newEdu],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    updateResumeData({
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    updateResumeData({
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  // Project functions
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
      url: "",
      github: "",
    }
    updateResumeData({
      projects: [...resumeData.projects, newProject],
    })
  }

  const updateProject = (id: string, field: string, value: string) => {
    updateResumeData({
      projects: resumeData.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const addTechToProject = (projectId: string) => {
    if (newTech.trim()) {
      updateResumeData({
        projects: resumeData.projects.map((project) =>
          project.id === projectId ? { ...project, technologies: [...project.technologies, newTech.trim()] } : project,
        ),
      })
      setNewTech("")
    }
  }

  const removeTechFromProject = (projectId: string, tech: string) => {
    updateResumeData({
      projects: resumeData.projects.map((project) =>
        project.id === projectId
          ? { ...project, technologies: project.technologies.filter((t) => t !== tech) }
          : project,
      ),
    })
  }

  const removeProject = (id: string) => {
    updateResumeData({
      projects: resumeData.projects.filter((project) => project.id !== id),
    })
  }

  // Certificate functions
  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    }
    updateResumeData({
      certificates: [...resumeData.certificates, newCert],
    })
  }

  const updateCertificate = (id: string, field: string, value: string) => {
    updateResumeData({
      certificates: resumeData.certificates.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    })
  }

  const removeCertificate = (id: string) => {
    updateResumeData({
      certificates: resumeData.certificates.filter((cert) => cert.id !== id),
    })
  }

  // Activity functions
  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: "other",
      title: "",
      organization: "",
      date: "",
      description: "",
    }
    updateResumeData({
      activities: [...resumeData.activities, newActivity],
    })
  }

  const updateActivity = (id: string, field: string, value: string) => {
    updateResumeData({
      activities: resumeData.activities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity,
      ),
    })
  }

  const removeActivity = (id: string) => {
    updateResumeData({
      activities: resumeData.activities.filter((activity) => activity.id !== id),
    })
  }

  // Skills functions
  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      updateResumeData({
        skills: [...resumeData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    updateResumeData({
      skills: resumeData.skills.filter((s) => s !== skill),
    })
  }

  const handleSectionsChange = (sections: ResumeSection[]) => {
    updateResumeData({ sections })
  }

  const renderTemplate = () => {
    const props = { data: resumeData }
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate {...props} />
      case "classic":
        return <ClassicTemplate {...props} />
      case "minimal":
        return <MinimalTemplate {...props} />
      case "creative":
        return <CreativeTemplate {...props} />
      default:
        return <ModernTemplate {...props} />
    }
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Hesume Builder</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline" className="text-xs">
                Created by HARSH VARDHAN
              </Badge>
              <AutosaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={saveResume} variant="outline" size="sm" disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Now"}
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-2xl grid-cols-4">
                  <TabsTrigger value="edit" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="optimize" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Optimize
                  </TabsTrigger>
                  <TabsTrigger value="host" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Host Online
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="edit" className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                          placeholder="john.doe@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo("location", e.target.value)}
                          placeholder="City, State"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={resumeData.personalInfo.website || ""}
                          onChange={(e) => updatePersonalInfo("website", e.target.value)}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin || ""}
                          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                          placeholder="linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                        placeholder="Brief summary of your professional background and goals..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="flex gap-2 mb-4">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Experience Entry</h4>
                            <Button onClick={() => removeExperience(exp.id)} variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="Company Name"
                              />
                            </div>
                            <div>
                              <Label>Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                placeholder="Job Title"
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={exp.location || ""}
                                onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                                placeholder="City, State"
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                disabled={exp.current}
                              />
                              <div className="flex items-center space-x-2 mt-2">
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                />
                                <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                  Current position
                                </Label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Projects</h3>
                      <Button onClick={addProject} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.projects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Project Entry</h4>
                            <Button onClick={() => removeProject(project.id)} variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Project Name</Label>
                              <Input
                                value={project.name}
                                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                placeholder="Project Name"
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={project.startDate}
                                onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Date (Optional)</Label>
                              <Input
                                type="month"
                                value={project.endDate || ""}
                                onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Live URL (Optional)</Label>
                              <Input
                                value={project.url || ""}
                                onChange={(e) => updateProject(project.id, "url", e.target.value)}
                                placeholder="https://project-demo.com"
                              />
                            </div>
                            <div>
                              <Label>GitHub URL (Optional)</Label>
                              <Input
                                value={project.github || ""}
                                onChange={(e) => updateProject(project.id, "github", e.target.value)}
                                placeholder="https://github.com/username/repo"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, "description", e.target.value)}
                              placeholder="Describe the project and your role..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Technologies</Label>
                            <div className="flex gap-2 mb-2">
                              <Input
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                placeholder="Add technology"
                                onKeyPress={(e) => e.key === "Enter" && addTechToProject(project.id)}
                              />
                              <Button onClick={() => addTechToProject(project.id)} size="sm">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                                  {tech}
                                  <button
                                    onClick={() => removeTechFromProject(project.id, tech)}
                                    className="ml-1 hover:text-red-500"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Education Entry</h4>
                            <Button onClick={() => removeEducation(edu.id)} variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Institution</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                placeholder="University Name"
                              />
                            </div>
                            <div>
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor's, Master's, etc."
                              />
                            </div>
                            <div>
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                placeholder="Computer Science, Business, etc."
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={edu.location || ""}
                                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                                placeholder="City, State"
                              />
                            </div>
                            <div>
                              <Label>Graduation Date</Label>
                              <Input
                                type="month"
                                value={edu.graduationDate}
                                onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>GPA (Optional)</Label>
                              <Input
                                value={edu.gpa || ""}
                                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                placeholder="3.8"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certificates */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Certificates</h3>
                      <Button onClick={addCertificate} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certificate
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.certificates.map((cert) => (
                        <div key={cert.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Certificate Entry</h4>
                            <Button onClick={() => removeCertificate(cert.id)} variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label>Certificate Name</Label>
                              <Input
                                value={cert.name}
                                onChange={(e) => updateCertificate(cert.id, "name", e.target.value)}
                                placeholder="AWS Certified Solutions Architect"
                              />
                            </div>
                            <div>
                              <Label>Issuing Organization</Label>
                              <Input
                                value={cert.issuer}
                                onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
                                placeholder="Amazon Web Services"
                              />
                            </div>
                            <div>
                              <Label>Issue Date</Label>
                              <Input
                                type="month"
                                value={cert.issueDate}
                                onChange={(e) => updateCertificate(cert.id, "issueDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Expiry Date (Optional)</Label>
                              <Input
                                type="month"
                                value={cert.expiryDate || ""}
                                onChange={(e) => updateCertificate(cert.id, "expiryDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Credential ID (Optional)</Label>
                              <Input
                                value={cert.credentialId || ""}
                                onChange={(e) => updateCertificate(cert.id, "credentialId", e.target.value)}
                                placeholder="ABC123XYZ"
                              />
                            </div>
                            <div>
                              <Label>Certificate URL (Optional)</Label>
                              <Input
                                value={cert.url || ""}
                                onChange={(e) => updateCertificate(cert.id, "url", e.target.value)}
                                placeholder="https://certificate-url.com"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activities */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Additional Activities</h3>
                      <Button onClick={addActivity} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Activity
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.activities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Activity Entry</h4>
                            <Button onClick={() => removeActivity(activity.id)} variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <DynamicActivityForm
                            activity={activity}
                            onUpdate={(field, value) => updateActivity(activity.id, field, value)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimize">
                <AIOptimization resumeData={resumeData} />
              </TabsContent>

              <TabsContent value="host">
                <ResumeHosting resumeData={resumeData} templateType={selectedTemplate} user={user} />
              </TabsContent>

              <TabsContent value="preview">
                <div className="space-y-6">
                  {/* Template Selector */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium">Template:</label>
                      <Select
                        value={selectedTemplate}
                        onValueChange={(value: TemplateType) => setSelectedTemplate(value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Resume Preview */}
                  <div className="mx-auto max-w-4xl">
                    <div className="bg-white shadow-lg print:shadow-none" id="resume-preview">
                      {renderTemplate()}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SectionReorder sections={resumeData.sections} onSectionsChange={handleSectionsChange} />
            <DownloadOptions resumeData={resumeData} templateType={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  )
}
