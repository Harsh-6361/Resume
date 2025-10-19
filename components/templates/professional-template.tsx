import type { ResumeData } from "@/types/resume"

interface ProfessionalTemplateProps {
  data: ResumeData
  customization?: any
}

export function ProfessionalTemplate({ data, customization }: ProfessionalTemplateProps) {
  const fontFamily =
    customization?.fontFamily === "serif"
      ? "Georgia, serif"
      : customization?.fontFamily === "mono"
        ? "monospace"
        : "Arial, sans-serif"
  const headingSize = customization?.headingSize || 28
  const bodySize = customization?.bodySize || 14
  const primaryColor = customization?.primaryColor || "#2563eb"
  const accentColor = customization?.accentColor || "#7c3aed"

  return (
    <div style={{ fontFamily, fontSize: `${bodySize}px`, color: "#333" }} className="bg-white max-w-4xl mx-auto p-8">
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${primaryColor}`, paddingBottom: "20px", marginBottom: "25px" }}>
        <h1 style={{ fontSize: `${headingSize}px`, color: primaryColor, margin: "0 0 8px 0", fontWeight: "bold" }}>
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", color: "#666" }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: `${headingSize - 2}px`,
              color: primaryColor,
              marginTop: "0",
              marginBottom: "10px",
              fontWeight: "bold",
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: "8px",
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: `${headingSize - 2}px`,
              color: primaryColor,
              marginTop: "0",
              marginBottom: "12px",
              fontWeight: "bold",
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: "8px",
            }}
          >
            CORE SKILLS
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {data.skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: "8px",
                  backgroundColor: `${primaryColor}20`,
                  borderRadius: "4px",
                  fontSize: `${bodySize - 1}px`,
                }}
              >
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: `${headingSize - 2}px`,
              color: primaryColor,
              marginTop: "0",
              marginBottom: "15px",
              fontWeight: "bold",
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: "8px",
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? "15px" : "0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontWeight: "bold", fontSize: `${bodySize + 1}px` }}>{exp.position}</span>
                <span style={{ color: "#666", fontSize: `${bodySize - 1}px` }}>
                  {exp.startDate &&
                    new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                  -{" "}
                  {exp.current
                    ? "Present"
                    : exp.endDate &&
                      new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
              <div style={{ color: primaryColor, fontWeight: "600", marginBottom: "8px" }}>{exp.company}</div>
              {exp.description && <p style={{ margin: "0", lineHeight: "1.5", color: "#555" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: `${headingSize - 2}px`,
              color: primaryColor,
              marginTop: "0",
              marginBottom: "15px",
              fontWeight: "bold",
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: "8px",
            }}
          >
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </span>
                <span style={{ color: "#666", fontSize: `${bodySize - 1}px` }}>
                  {edu.graduationDate && new Date(edu.graduationDate).getFullYear()}
                </span>
              </div>
              <div style={{ color: primaryColor }}>{edu.institution}</div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: `${headingSize - 2}px`,
              color: primaryColor,
              marginTop: "0",
              marginBottom: "15px",
              fontWeight: "bold",
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: "8px",
            }}
          >
            FEATURED PROJECTS
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{project.name}</div>
              <p style={{ margin: "0 0 8px 0", color: "#555", lineHeight: "1.5" }}>{project.description}</p>
              <div style={{ fontSize: `${bodySize - 1}px`, color: "#666" }}>
                Tech: {project.technologies.join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificates */}
      {data.certificates.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: `${headingSize - 2}px`,
              color: primaryColor,
              marginTop: "0",
              marginBottom: "12px",
              fontWeight: "bold",
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: "8px",
            }}
          >
            CERTIFICATIONS
          </h2>
          {data.certificates.map((cert) => (
            <div key={cert.id} style={{ marginBottom: "8px", fontSize: `${bodySize - 1}px` }}>
              <span style={{ fontWeight: "bold" }}>{cert.name}</span> - {cert.issuer}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
