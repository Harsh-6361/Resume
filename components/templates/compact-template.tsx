import type { ResumeData } from "@/types/resume"

interface CompactTemplateProps {
  data: ResumeData
  customization?: any
}

export function CompactTemplate({ data, customization }: CompactTemplateProps) {
  const fontFamily =
    customization?.fontFamily === "serif"
      ? "Georgia, serif"
      : customization?.fontFamily === "mono"
        ? "monospace"
        : "Calibri, sans-serif"
  const headingSize = customization?.headingSize || 24
  const bodySize = customization?.bodySize || 12
  const primaryColor = customization?.primaryColor || "#1e40af"

  return (
    <div
      style={{ fontFamily, fontSize: `${bodySize}px`, color: "#1a1a1a", lineHeight: "1.4" }}
      className="bg-white max-w-4xl mx-auto p-6"
    >
      {/* Compact Header */}
      <div style={{ marginBottom: "12px" }}>
        <h1 style={{ fontSize: `${headingSize}px`, color: primaryColor, margin: "0", fontWeight: "bold" }}>
          {data.personalInfo.fullName}
        </h1>
        <div style={{ fontSize: `${bodySize - 1}px`, color: "#555", margin: "4px 0 0 0" }}>
          {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(" • ")}
        </div>
      </div>

      {/* Summary - Compact */}
      {data.personalInfo.summary && (
        <div style={{ marginBottom: "10px", fontSize: `${bodySize - 1}px`, lineHeight: "1.4" }}>
          <strong style={{ color: primaryColor }}>PROFILE: </strong>
          {data.personalInfo.summary.substring(0, 150)}...
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {/* Left Column */}
        <div>
          {/* Experience - Compact */}
          {data.experience.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <h2
                style={{
                  fontSize: `${bodySize + 1}px`,
                  color: primaryColor,
                  margin: "0 0 6px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                EXPERIENCE
              </h2>
              {data.experience.slice(0, 2).map((exp) => (
                <div key={exp.id} style={{ marginBottom: "6px", fontSize: `${bodySize - 1}px` }}>
                  <div style={{ fontWeight: "bold" }}>{exp.position}</div>
                  <div style={{ color: "#666" }}>{exp.company}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills - Compact */}
          {data.skills.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${bodySize + 1}px`,
                  color: primaryColor,
                  margin: "0 0 6px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                SKILLS
              </h2>
              <div style={{ fontSize: `${bodySize - 1}px`, lineHeight: "1.4" }}>
                {data.skills.slice(0, 10).join(", ")}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education - Compact */}
          {data.education.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <h2
                style={{
                  fontSize: `${bodySize + 1}px`,
                  color: primaryColor,
                  margin: "0 0 6px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "4px", fontSize: `${bodySize - 1}px` }}>
                  <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                  <div style={{ color: "#666" }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates - Compact */}
          {data.certificates.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${bodySize + 1}px`,
                  color: primaryColor,
                  margin: "0 0 6px 0",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                CERTS
              </h2>
              <div style={{ fontSize: `${bodySize - 1}px` }}>
                {data.certificates
                  .slice(0, 3)
                  .map((c) => c.name)
                  .join(", ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
