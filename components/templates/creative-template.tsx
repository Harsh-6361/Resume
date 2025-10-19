import type { ResumeData } from "@/types/resume"
import { Badge } from "@/components/ui/badge"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto">
      <div className="grid grid-cols-3 min-h-screen">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-primary to-accent text-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
            <div className="space-y-2 text-primary/20 text-sm">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary/20">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill} className="bg-white/20 rounded px-3 py-1 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary/20">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-primary/40">{edu.institution}</p>
                    <p className="text-primary/60 text-xs">
                      {edu.graduationDate && new Date(edu.graduationDate).getFullYear()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary/20">Certifications</h2>
              <div className="space-y-3">
                {data.certificates.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-primary/40 text-xs">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-4 border-primary/20">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-600 bg-primary/10 px-3 py-1 rounded-full">
                          {exp.startDate &&
                            new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          {" - "}
                          {exp.current
                            ? "Present"
                            : exp.endDate &&
                              new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </div>
                      </div>
                      {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Projects</h2>
              <div className="grid gap-4">
                {data.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/20"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} className="bg-primary/10 text-primary text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {data.activities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Activities & Achievements</h2>
              <div className="space-y-3">
                {data.activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-medium">{activity.title}</span>
                      {activity.organization && <span className="text-gray-600"> - {activity.organization}</span>}
                      <Badge variant="outline" className="ml-2 text-xs capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
