import type { ResumeData } from "@/types/resume"

interface ElegantTemplateProps {
  data: ResumeData
  customization?: any
}

export function ElegantTemplate({ data, customization }: ElegantTemplateProps) {
  const fontFamily =
    customization?.fontFamily === "serif"
      ? "Georgia, serif"
      : customization?.fontFamily === "mono"
        ? "monospace"
        : "'Times New Roman', serif"
  const headingSize = customization?.headingSize || 32
  const bodySize = customization?.bodySize || 15
  const primaryColor = customization?.primaryColor || "#2c3e50"
  const accentColor = customization?.accentColor || "#e74c3c"

  return (
    <div
      style={{ fontFamily, fontSize: `${bodySize}px`, color: primaryColor }}
      className="bg-white max-w-4xl mx-auto p-10"
    >
      {/* Elegant Header */}
      <div
        style={{
          textAlign: "center",
          borderBottom: `1px solid ${accentColor}`,
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: `${headingSize}px`,
            margin: "0",
            fontWeight: "300",
            letterSpacing: "2px",
            color: primaryColor,
          }}
        >
          {data.personalInfo.fullName}
        </h1>
        <div style={{ fontSize: `${bodySize - 1}px`, color: accentColor, marginTop: "8px", fontStyle: "italic" }}>
          Professional
        </div>
        <div style={{ fontSize: `${bodySize - 2}px`, color: "#7f8c8d", marginTop: "8px" }}>
          {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(" · ")}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        {/* Main Column */}
        <div>
          {/* Summary */}
          {data.personalInfo.summary && (
            <div style={{ marginBottom: "25px" }}>
              <h2
                style={{
                  fontSize: `${bodySize + 3}px`,
                  color: accentColor,
                  margin: "0 0 12px 0",
                  fontWeight: "400",
                  letterSpacing: "1px",
                }}
              >
                ABOUT
              </h2>
              <p style={{ lineHeight: "1.7", fontStyle: "italic", color: "#555" }}>{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h2
                style={{
                  fontSize: `${bodySize + 3}px`,
                  color: accentColor,
                  margin: "0 0 15px 0",
                  fontWeight: "400",
                  letterSpacing: "1px",
                }}
              >
                EXPERIENCE
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: `1px dotted ${accentColor}`,
                      paddingBottom: "5px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: `${bodySize + 1}px` }}>{exp.position}</span>
                    <span style={{ fontSize: `${bodySize - 1}px`, color: accentColor }}>
                      {exp.startDate &&
                        new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      -
                      {exp.current
                        ? "Present"
                        : exp.endDate &&
                          new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div
                    style={{ color: accentColor, fontWeight: "600", fontSize: `${bodySize}px`, marginBottom: "6px" }}
                  >
                    {exp.company}
                  </div>
                  {exp.description && (
                    <p style={{ margin: "0", lineHeight: "1.6", color: "#555" }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${bodySize + 3}px`,
                  color: accentColor,
                  margin: "0 0 15px 0",
                  fontWeight: "400",
                  letterSpacing: "1px",
                }}
              >
                PROJECTS
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "bold", fontSize: `${bodySize + 1}px`, color: primaryColor }}>
                    {project.name}
                  </div>
                  <p style={{ margin: "4px 0", lineHeight: "1.5", color: "#555", fontSize: `${bodySize - 1}px` }}>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Skills */}
          {data.skills.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h2
                style={{
                  fontSize: `${bodySize + 3}px`,
                  color: accentColor,
                  margin: "0 0 12px 0",
                  fontWeight: "400",
                  letterSpacing: "1px",
                }}
              >
                SKILLS
              </h2>
              <div style={{ display: "grid", gap: "6px" }}>
                {data.skills.map((skill) => (
                  <div
                    key={skill}
                    style={{ fontSize: `${bodySize - 1}px`, padding: "4px 0", borderBottom: `1px solid #ecf0f1` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h2
                style={{
                  fontSize: `${bodySize + 3}px`,
                  color: accentColor,
                  margin: "0 0 12px 0",
                  fontWeight: "400",
                  letterSpacing: "1px",
                }}
              >
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "12px", fontSize: `${bodySize - 1}px` }}>
                  <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                  <div style={{ color: "#7f8c8d" }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${bodySize + 3}px`,
                  color: accentColor,
                  margin: "0 0 12px 0",
                  fontWeight: "400",
                  letterSpacing: "1px",
                }}
              >
                CERTIFICATES
              </h2>
              {data.certificates.map((cert) => (
                <div key={cert.id} style={{ fontSize: `${bodySize - 2}px`, marginBottom: "6px", color: "#555" }}>
                  {cert.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
