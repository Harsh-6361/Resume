import type { ResumeData } from "@/types/resume"

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="bg-card text-foreground max-w-4xl mx-auto p-8 font-light">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-thin mb-4">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="text-muted-foreground text-sm space-y-1">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>

      <div className="space-y-12">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section>
            <p className="text-foreground leading-relaxed text-lg font-light">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-medium">{exp.position}</h3>
                    <div className="text-sm text-muted-foreground">
                      {exp.startDate && new Date(exp.startDate).getFullYear()}
                      {" - "}
                      {exp.current ? "Present" : exp.endDate && new Date(exp.endDate).getFullYear()}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{exp.company}</p>
                  {exp.description && <p className="text-foreground leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Projects</h2>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                  <p className="text-foreground mb-2">{project.description}</p>
                  <div className="text-sm text-muted-foreground">{project.technologies.join(" • ")}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-medium">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.graduationDate && new Date(edu.graduationDate).getFullYear()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Skills</h2>
            <div className="text-foreground">{data.skills.join(" • ")}</div>
          </section>
        )}

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Certifications</h2>
            <div className="space-y-2">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span>
                    {cert.name} - {cert.issuer}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {cert.issueDate && new Date(cert.issueDate).getFullYear()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {data.activities.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Activities</h2>
            <div className="space-y-2">
              {data.activities.map((activity) => (
                <div key={activity.id} className="flex justify-between">
                  <span>{activity.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {activity.date && new Date(activity.date).getFullYear()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
