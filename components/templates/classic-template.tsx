import type { ResumeData } from "@/types/resume"

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="bg-card text-foreground max-w-4xl mx-auto p-8 font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-foreground pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="text-muted-foreground space-y-1">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          <div className="flex justify-center gap-4">
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          <div className="flex justify-center gap-4">
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Professional Summary
            </h2>
            <p className="text-foreground leading-relaxed text-justify">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="font-medium text-foreground">{exp.company}</p>
                      {exp.location && <p className="text-muted-foreground text-sm italic">{exp.location}</p>}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {exp.startDate &&
                        new Date(exp.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      {" - "}
                      {exp.current
                        ? "Present"
                        : exp.endDate &&
                          new Date(exp.endDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </div>
                  </div>
                  {exp.description && <p className="text-foreground leading-relaxed text-justify">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-foreground">{edu.institution}</p>
                    {edu.location && <p className="text-muted-foreground text-sm italic">{edu.location}</p>}
                    {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {edu.graduationDate &&
                      new Date(edu.graduationDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Core Competencies
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {data.skills.map((skill) => (
                <div key={skill} className="text-foreground">
                  • {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Notable Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-foreground text-sm mb-2">{project.description}</p>
                  <div className="text-xs text-muted-foreground">Technologies: {project.technologies.join(", ")}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-muted-foreground"> - {cert.issuer}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {cert.issueDate &&
                      new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {data.activities.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide border-b border-border pb-1">
              Additional Information
            </h2>
            <div className="space-y-2">
              {data.activities.map((activity) => (
                <div key={activity.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{activity.title}</span>
                    {activity.organization && <span className="text-muted-foreground"> - {activity.organization}</span>}
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
