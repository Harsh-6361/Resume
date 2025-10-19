"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, AlertCircle, Info, Zap, Shield } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface ResumeOptimizationProps {
  resumeData: ResumeData
}

export function AIOptimization({ resumeData }: ResumeOptimizationProps) {
  const [optimization, setOptimization] = useState<any | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const suggestions = []
    let score = 90

    // ATS Compatibility Analysis
    if (!resumeData.personalInfo.summary || resumeData.personalInfo.summary.length < 50) {
      suggestions.push({
        type: "ats",
        section: "Personal Info",
        message: "Add a professional summary (50+ words) - ATS systems prioritize resumes with clear summaries",
        priority: "high",
      })
      score -= 15
    }

    // Keyword Analysis
    const commonKeywords = ["leadership", "management", "project", "team", "development", "analysis", "strategy"]
    const hasKeywords = commonKeywords.some(
      (keyword) =>
        resumeData.personalInfo.summary?.toLowerCase().includes(keyword) ||
        resumeData.experience.some((exp) => exp.description.toLowerCase().includes(keyword)),
    )

    if (!hasKeywords) {
      suggestions.push({
        type: "keywords",
        section: "Content",
        message: "Include industry-relevant keywords to improve ATS matching and searchability",
        priority: "high",
      })
      score -= 10
    }

    // Contact Information
    if (!resumeData.personalInfo.linkedin) {
      suggestions.push({
        type: "content",
        section: "Personal Info",
        message: "Add LinkedIn profile - 87% of recruiters use LinkedIn to verify candidates",
        priority: "medium",
      })
      score -= 5
    }

    // Experience Analysis
    if (resumeData.experience.length === 0) {
      suggestions.push({
        type: "content",
        section: "Experience",
        message: "Add work experience with quantifiable achievements and action verbs",
        priority: "high",
      })
      score -= 20
    } else {
      resumeData.experience.forEach((exp, index) => {
        if (!exp.description || exp.description.length < 100) {
          suggestions.push({
            type: "content",
            section: "Experience",
            message: `Expand ${exp.position} description with specific metrics and achievements (aim for 100+ words)`,
            priority: "medium",
          })
          score -= 3
        }

        // Check for action verbs
        const actionVerbs = ["achieved", "managed", "led", "developed", "implemented", "improved", "increased"]
        const hasActionVerbs = actionVerbs.some((verb) => exp.description.toLowerCase().includes(verb))
        if (!hasActionVerbs) {
          suggestions.push({
            type: "formatting",
            section: "Experience",
            message: `Use strong action verbs in ${exp.position} description (achieved, managed, led, etc.)`,
            priority: "medium",
          })
          score -= 2
        }
      })
    }

    // Skills Analysis
    if (resumeData.skills.length < 8) {
      suggestions.push({
        type: "keywords",
        section: "Skills",
        message: "Add more relevant skills (aim for 8-15) to improve keyword matching with job descriptions",
        priority: "medium",
      })
      score -= 5
    }

    // Projects Analysis
    if (resumeData.projects.length === 0) {
      suggestions.push({
        type: "content",
        section: "Projects",
        message: "Add projects to demonstrate practical skills and initiative - especially important for tech roles",
        priority: "medium",
      })
      score -= 8
    }

    // ATS Formatting Check
    if (resumeData.sections.filter((s) => s.enabled).length < 4) {
      suggestions.push({
        type: "structure",
        section: "Layout",
        message: "Enable more sections for a comprehensive resume - ATS systems favor complete profiles",
        priority: "medium",
      })
      score -= 5
    }

    // Education Analysis
    if (resumeData.education.length === 0) {
      suggestions.push({
        type: "content",
        section: "Education",
        message: "Add education details - required by most ATS systems for initial screening",
        priority: "medium",
      })
      score -= 7
    }

    // Certificates boost
    if (resumeData.certificates.length > 0) {
      suggestions.push({
        type: "content",
        section: "Certificates",
        message: "Great! Certifications boost your ATS score and demonstrate continuous learning",
        priority: "low",
      })
    }

    setOptimization({
      score: Math.max(score, 0),
      suggestions,
    })
    setIsAnalyzing(false)
  }

  useEffect(() => {
    if (resumeData.personalInfo.fullName) {
      analyzeResume()
    }
  }, [resumeData])

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "medium":
        return <Info className="h-4 w-4 text-accent" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-secondary" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ats":
        return <Shield className="h-4 w-4 text-primary" />
      case "keywords":
        return <Zap className="h-4 w-4 text-primary" />
      default:
        return <Brain className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-secondary"
    if (score >= 70) return "text-accent"
    return "text-destructive"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 85) return "Excellent! Your resume is ATS-optimized"
    if (score >= 70) return "Good resume, but room for improvement"
    return "Needs improvement for better ATS compatibility"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Resume Optimization
          <Badge variant="outline" className="text-xs">
            ATS-Friendly
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="text-center py-8">
            <Zap className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Analyzing your resume for ATS compatibility...</p>
            <p className="text-sm text-muted-foreground mt-2">Checking keywords, formatting, and structure</p>
          </div>
        ) : optimization ? (
          <>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(optimization.score)}`}>{optimization.score}/100</div>
              <p className="text-muted-foreground">ATS Compatibility Score</p>
              <p className="text-sm text-muted-foreground mt-1">{getScoreMessage(optimization.score)}</p>
              <Progress value={optimization.score} className="mt-3" />
            </div>

            {optimization.suggestions.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  AI Optimization Suggestions
                </h4>
                {optimization.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex gap-2">
                      {getTypeIcon(suggestion.type)}
                      {getPriorityIcon(suggestion.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.section}
                        </Badge>
                        <Badge
                          variant={
                            suggestion.priority === "high"
                              ? "destructive"
                              : suggestion.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {suggestion.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {suggestion.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="text-secondary font-medium">Outstanding! Your resume is perfectly optimized.</p>
                <p className="text-sm text-muted-foreground mt-1">ATS systems will easily parse and rank your resume</p>
              </div>
            )}

            <div className="bg-primary/5 p-4 rounded-lg">
              <h5 className="font-medium text-primary mb-2">💡 ATS Optimization Tips</h5>
              <ul className="text-sm text-primary space-y-1">
                <li>• Use standard section headings (Experience, Education, Skills)</li>
                <li>• Include keywords from job descriptions</li>
                <li>• Quantify achievements with numbers and percentages</li>
                <li>• Use simple, clean formatting without graphics</li>
                <li>• Save as PDF to preserve formatting</li>
              </ul>
            </div>

            <Button onClick={analyzeResume} variant="outline" className="w-full bg-transparent">
              <Brain className="h-4 w-4 mr-2" />
              Re-analyze Resume
            </Button>
          </>
        ) : (
          <Button onClick={analyzeResume} className="w-full">
            <Brain className="h-4 w-4 mr-2" />
            Analyze Resume with AI
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
