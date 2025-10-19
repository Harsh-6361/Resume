"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Globe, Copy, Check, Eye, ExternalLink, Trash2 } from "lucide-react"
import type { ResumeData, TemplateType, HostedResume, User } from "@/types/resume"

interface ResumeHostingProps {
  resumeData: ResumeData
  templateType: TemplateType
  user: User
}

export function ResumeHosting({ resumeData, templateType, user }: ResumeHostingProps) {
  const [hostedResumes, setHostedResumes] = useState<HostedResume[]>([])
  const [customUrl, setCustomUrl] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isHosting, setIsHosting] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    loadHostedResumes()
  }, [user.id])

  const loadHostedResumes = () => {
    const hosted = JSON.parse(localStorage.getItem("hostedResumes") || "[]")
    const userResumes = hosted.filter((resume: HostedResume) => resume.userId === user.id)
    setHostedResumes(userResumes)
  }

  const generateUniqueUrl = () => {
    const baseUrl = customUrl.trim() || resumeData.personalInfo.fullName.toLowerCase().replace(/\s+/g, "-")
    const timestamp = Date.now().toString().slice(-4)
    return `${baseUrl}-${timestamp}`
  }

  const hostResume = async () => {
    if (!resumeData.personalInfo.fullName) {
      alert("Please add your name before hosting your resume")
      return
    }

    setIsHosting(true)

    // Simulate hosting process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const url = generateUniqueUrl()
    const hostedResume: HostedResume = {
      id: Date.now().toString(),
      userId: user.id,
      resumeData,
      template: templateType,
      url,
      isPublic,
      createdAt: new Date().toISOString(),
      views: 0,
    }

    // Save to localStorage
    const existingHosted = JSON.parse(localStorage.getItem("hostedResumes") || "[]")
    existingHosted.push(hostedResume)
    localStorage.setItem("hostedResumes", JSON.stringify(existingHosted))

    setHostedResumes([...hostedResumes, hostedResume])
    setCustomUrl("")
    setIsHosting(false)
  }

  const deleteHostedResume = (id: string) => {
    const existingHosted = JSON.parse(localStorage.getItem("hostedResumes") || "[]")
    const updated = existingHosted.filter((resume: HostedResume) => resume.id !== id)
    localStorage.setItem("hostedResumes", JSON.stringify(updated))
    setHostedResumes(hostedResumes.filter((resume) => resume.id !== id))
  }

  const copyToClipboard = async (url: string, id: string) => {
    const fullUrl = `${window.location.origin}/resume/${url}`
    await navigator.clipboard.writeText(fullUrl)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const incrementViews = (id: string) => {
    const existingHosted = JSON.parse(localStorage.getItem("hostedResumes") || "[]")
    const updated = existingHosted.map((resume: HostedResume) =>
      resume.id === id ? { ...resume, views: resume.views + 1 } : resume,
    )
    localStorage.setItem("hostedResumes", JSON.stringify(updated))
    loadHostedResumes()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Host Your Resume Online
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Host New Resume */}
        <div className="space-y-4 p-4 border border-border rounded-lg bg-primary/5">
          <h4 className="font-medium text-primary">Create New Hosted Resume</h4>

          <div className="space-y-3">
            <div>
              <Label htmlFor="customUrl">Custom URL (Optional)</Label>
              <Input
                id="customUrl"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="my-awesome-resume"
                className="bg-white"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Preview: hesume-builder.com/resume/{customUrl || "your-name-1234"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isPublic">Make Public</Label>
                <p className="text-xs text-muted-foreground">Allow search engines to index your resume</p>
              </div>
              <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            <Button onClick={hostResume} disabled={isHosting} className="w-full">
              {isHosting ? "Hosting Resume..." : "Host Resume Online"}
            </Button>
          </div>
        </div>

        {/* Existing Hosted Resumes */}
        {hostedResumes.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Your Hosted Resumes</h4>
            {hostedResumes.map((resume) => (
              <div key={resume.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium">{resume.resumeData.personalInfo.fullName}</h5>
                      <Badge variant={resume.isPublic ? "default" : "secondary"} className="text-xs">
                        {resume.isPublic ? "Public" : "Private"}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {resume.template}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <code className="bg-muted px-2 py-1 rounded text-xs">hesume-builder.com/resume/{resume.url}</code>
                      <Button
                        onClick={() => copyToClipboard(resume.url, resume.id)}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        {copied === resume.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {resume.views} views
                      </span>
                      <span>Created {new Date(resume.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        incrementViews(resume.id)
                        window.open(`/resume/${resume.url}`, "_blank")
                      }}
                      size="sm"
                      variant="outline"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button onClick={() => deleteHostedResume(resume.id)} size="sm" variant="ghost">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h5 className="font-medium mb-2">💡 Hosting Tips</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use a professional custom URL for better branding</li>
            <li>• Public resumes are indexed by search engines</li>
            <li>• Share your hosted resume link in job applications</li>
            <li>• Update your resume and re-host to reflect changes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
