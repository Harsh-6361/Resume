import type { ResumeData } from "@/types/resume"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="bg-white text-foreground max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-muted-foreground">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">
              Professional Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge key={skill} className="bg-primary/10 text-primary/90 hover:bg-primary/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">Work Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      {exp.location && <p className="text-muted-foreground text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-sm text-muted-foreground bg-foreground px-3 py-1 rounded">
                      {exp.startDate &&
                        new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      {" - "}
                      {exp.current
                        ? "Present"
                        : exp.endDate &&
                          new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </div>
                  </div>
                  {exp.description && <p className="text-muted-foreground leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {data.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 text-xs text-primary">
                    {project.url && (
                      <a href={project.url} className="hover:underline">
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} className="hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-primary">{edu.institution}</p>
                    {edu.location && <p className="text-muted-foreground text-sm">{edu.location}</p>}
                    {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.graduationDate &&
                      new Date(edu.graduationDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">Certificates</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-primary text-sm">{cert.issuer}</p>
                  <p className="text-muted-foreground text-xs">
                    {cert.issueDate &&
                      new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {cert.expiryDate &&
                      ` - ${new Date(cert.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                  </p>
                  {cert.credentialId && <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {data.activities.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">
              Additional Activities
            </h2>
            <div className="space-y-3">
              {data.activities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{activity.title}</h3>
                    {activity.organization && <p className="text-primary text-sm">{activity.organization}</p>}
                    {activity.description && <p className="text-muted-foreground text-sm">{activity.description}</p>}
                    <Badge variant="outline" className="text-xs mt-1 capitalize">
                      {activity.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.date &&
                      new Date(activity.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
