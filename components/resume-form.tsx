"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData, Experience, Education, Project, Certificate, Activity } from "@/types/resume"

interface ResumeFormProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

export function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newTech, setNewTech] = useState("")
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    })
  }

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
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

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
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

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
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    })
  }

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const addTechToProject = (projectId: string) => {
    if (newTech.trim()) {
      setResumeData({
        ...resumeData,
        projects: resumeData.projects.map((project) =>
          project.id === projectId ? { ...project, technologies: [...project.technologies, newTech.trim()] } : project,
        ),
      })
      setNewTech("")
    }
  }

  const removeTechFromProject = (projectId: string, tech: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((project) =>
        project.id === projectId
          ? { ...project, technologies: project.technologies.filter((t) => t !== tech) }
          : project,
      ),
    })
  }

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((project) => project.id !== id),
    })
  }

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
    setResumeData({
      ...resumeData,
      certificates: [...resumeData.certificates, newCert],
    })
  }

  const updateCertificate = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      certificates: resumeData.certificates.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    })
  }

  const removeCertificate = (id: string) => {
    setResumeData({
      ...resumeData,
      certificates: resumeData.certificates.filter((cert) => cert.id !== id),
    })
  }

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: "other",
      title: "",
      organization: "",
      date: "",
      description: "",
    }
    setResumeData({
      ...resumeData,
      activities: [...resumeData.activities, newActivity],
    })
  }

  const updateActivity = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      activities: resumeData.activities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity,
      ),
    })
  }

  const removeActivity = (id: string) => {
    setResumeData({
      ...resumeData,
      activities: resumeData.activities.filter((activity) => activity.id !== id),
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div>
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
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={addProject} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certificates</CardTitle>
          <Button onClick={addCertificate} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Activities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Additional Activities</CardTitle>
          <Button onClick={addActivity} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.activities.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Activity Entry</h4>
                <Button onClick={() => removeActivity(activity.id)} variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Activity Type</Label>
                  <Select value={activity.type} onValueChange={(value) => updateActivity(activity.id, "type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volunteer">Volunteer Work</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="publication">Publication</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={activity.title}
                    onChange={(e) => updateActivity(activity.id, "title", e.target.value)}
                    placeholder="Activity title"
                  />
                </div>
                <div>
                  <Label>Organization (Optional)</Label>
                  <Input
                    value={activity.organization || ""}
                    onChange={(e) => updateActivity(activity.id, "organization", e.target.value)}
                    placeholder="Organization name"
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="month"
                    value={activity.date}
                    onChange={(e) => updateActivity(activity.id, "date", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Description (Optional)</Label>
                <Textarea
                  value={activity.description || ""}
                  onChange={(e) => updateActivity(activity.id, "description", e.target.value)}
                  placeholder="Describe the activity..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
