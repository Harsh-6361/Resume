"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Share2, Globe, Copy, Check } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface DownloadOptionsProps {
  resumeData: ResumeData
  templateType: string
}

export function DownloadOptions({ resumeData, templateType }: DownloadOptionsProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const resumeElement = document.getElementById("resume-preview")
    if (!resumeElement) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.personalInfo.fullName || "Resume"}</title>
          <meta charset="utf-8">
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print { 
              body { margin: 0; padding: 0; } 
              @page { margin: 0.5in; }
            }
            .bg-gradient-to-r { background: linear-gradient(to right, var(--primary), var(--accent)); }
            .bg-gradient-to-b { background: linear-gradient(to bottom, var(--accent), var(--secondary)); }
            .text-primary { color: var(--primary); }
            .text-muted-foreground { color: var(--muted-foreground); }
            .bg-accent/10 { background-color: rgba(var(--accent), 0.1); }
            .bg-muted/50 { background-color: rgba(var(--muted), 0.5); }
            .bg-muted { background-color: var(--muted); }
            .text-white { color: white; }
            .border-primary { border-color: var(--primary); }
            .border-accent { border-color: var(--accent); }
            .rounded { border-radius: 0.25rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-full { border-radius: 9999px; }
            .p-2 { padding: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mt-1 { margin-top: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .ml-1 { margin-left: 0.25rem; }
            .ml-2 { margin-left: 0.5rem; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-3 > * + * { margin-top: 0.75rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .space-y-8 > * + * { margin-top: 2rem; }
            .gap-1 { gap: 0.25rem; }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            .flex { display: flex; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .flex-wrap { flex-wrap: wrap; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .text-center { text-align: center; }
            .text-justify { text-align: justify; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .font-thin { font-weight: 100; }
            .font-light { font-weight: 300; }
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            .uppercase { text-transform: uppercase; }
            .capitalize { text-transform: capitalize; }
            .tracking-wide { letter-spacing: 0.025em; }
            .tracking-widest { letter-spacing: 0.1em; }
            .leading-relaxed { line-height: 1.625; }
            .max-w-4xl { max-width: 56rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .w-2 { width: 0.5rem; }
            .w-4 { width: 1rem; }
            .h-2 { height: 0.5rem; }
            .h-4 { height: 1rem; }
            .min-h-screen { min-height: 100vh; }
            .relative { position: relative; }
            .absolute { position: absolute; }
            .-left-2 { left: -0.5rem; }
            .top-0 { top: 0; }
            .pl-6 { padding-left: 1.5rem; }
            .col-span-2 { grid-column: span 2 / span 2; }
            .font-serif { font-family: ui-serif, Georgia, Cambria, serif; }
            .italic { font-style: italic; }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          </style>
        </head>
        <body>
          ${resumeElement.innerHTML}
          <div style="position: fixed; bottom: 10px; right: 10px; font-size: 10px; color: #666;">
            Created with Resume Builder by HARSH VARDHAN
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  const handleDownloadDOCX = () => {
    // Simulate DOCX download
    const content = generatePlainTextResume()
    const blob = new Blob([content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resumeData.personalInfo.fullName || "Resume"}.docx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generatePlainTextResume = () => {
    let content = `${resumeData.personalInfo.fullName}\n`
    content += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}\n`
    content += `${resumeData.personalInfo.location}\n\n`

    if (resumeData.personalInfo.summary) {
      content += `PROFESSIONAL SUMMARY\n${resumeData.personalInfo.summary}\n\n`
    }

    if (resumeData.experience.length > 0) {
      content += `WORK EXPERIENCE\n`
      resumeData.experience.forEach((exp) => {
        content += `${exp.position} at ${exp.company}\n`
        content += `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}\n`
        if (exp.description) content += `${exp.description}\n`
        content += `\n`
      })
    }

    if (resumeData.education.length > 0) {
      content += `EDUCATION\n`
      resumeData.education.forEach((edu) => {
        content += `${edu.degree} in ${edu.field}\n`
        content += `${edu.institution}\n`
        content += `${edu.graduationDate}\n\n`
      })
    }

    if (resumeData.skills.length > 0) {
      content += `SKILLS\n${resumeData.skills.join(", ")}\n\n`
    }

    content += `\nCreated with Resume Builder by HARSH VARDHAN`
    return content
  }

  const handleShare = () => {
    const resumeId = btoa(JSON.stringify(resumeData)).replace(/[/+=]/g, "")
    const url = `${window.location.origin}/resume/${resumeId}`
    setShareUrl(url)
  }

  const handleCopyUrl = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Download className="h-5 w-5 text-primary" />
          Download & Share Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-primary text-white">
            <FileText className="h-4 w-4 text-white" />
            Download PDF
          </Button>

          <Button
            onClick={handleDownloadDOCX}
            variant="outline"
            className="flex items-center gap-2 border-accent text-accent bg-transparent"
          >
            <FileText className="h-4 w-4 text-accent" />
            Download DOCX
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-primary">
            <Globe className="h-4 w-4 text-primary" />
            Host Online
          </h4>

          {!shareUrl ? (
            <Button onClick={handleShare} variant="outline" className="w-full border-accent text-accent bg-transparent">
              <Share2 className="h-4 w-4 mr-2 text-accent" />
              Generate Shareable Link
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                <code className="flex-1 text-sm break-all text-white">{shareUrl}</code>
                <Button onClick={handleCopyUrl} size="sm" variant="ghost" className="text-accent">
                  {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4 text-accent" />}
                </Button>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs bg-primary text-white">
                  ✓ Public Link Active
                </Badge>
                <Badge variant="outline" className="text-xs border-accent text-accent">
                  No Expiration
                </Badge>
              </div>
            </div>
          )}
        </div>

        <div className="text-center pt-4 border-t text-muted-foreground">
          <Badge variant="outline" className="text-xs border-accent text-accent">
            Created by HARSH VARDHAN
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
