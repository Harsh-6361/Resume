"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, AlertCircle, Info, Zap, Shield, TrendingUp } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface OptimizationSuggestion {
  type: "ats" | "keywords" | "content" | "formatting" | "structure" | "impact"
  section: string
  message: string
  priority: "high" | "medium" | "low"
  actionable?: string
}

interface ResumeOptimizationV2Props {
  resumeData: ResumeData
}

export function AIOptimizationV2({ resumeData }: ResumeOptimizationV2Props) {
  const [optimization, setOptimization] = useState<any | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const suggestions: OptimizationSuggestion[] = []
    let score = 85

    // 1. Power Words Check
    const powerWords = [
      "spearheaded",
      "orchestrated",
      "accelerated",
      "streamlined",
      "transformed",
      "optimized",
      "pioneered",
      "revolutionized",
      "established",
      "delivered",
      "collaborated",
      "architected",
    ]
    const hasPowerWords = resumeData.experience.some((exp) =>
      powerWords.some((word) => exp.description?.toLowerCase().includes(word)),
    )

    if (!hasPowerWords && resumeData.experience.length > 0) {
      suggestions.push({
        type: "impact",
        section: "Experience",
        message:
          "Replace weak verbs with power words (spearheaded, orchestrated, accelerated) to show impact and leadership",
        priority: "high",
        actionable:
          "Use action verbs that demonstrate results: 'Led' → 'Spearheaded', 'Made' → 'Orchestrated', 'Improved' → 'Accelerated'",
      })
      score -= 8
    }

    // 2. Quantifiable Metrics Check
    const metricsRegex = /(\d+%|\$\d+[KMB]?|\d+x|\d+ [a-z]+)/gi
    let metricsCount = 0
    resumeData.experience.forEach((exp) => {
      if (exp.description) {
        const matches = exp.description.match(metricsRegex) || []
        metricsCount += matches.length
      }
    })

    if (metricsCount === 0 && resumeData.experience.length > 0) {
      suggestions.push({
        type: "content",
        section: "Experience",
        message: "Add quantifiable metrics to demonstrate tangible results (percentages, revenue, time saved)",
        priority: "high",
        actionable:
          "Examples: 'Increased sales by 45%', 'Reduced costs by $200K', 'Improved efficiency by 3x', 'Managed team of 12'",
      })
      score -= 10
    } else if (metricsCount < resumeData.experience.length) {
      suggestions.push({
        type: "content",
        section: "Experience",
        message: `You have ${metricsCount} quantifiable metrics. Aim for at least ${resumeData.experience.length} (one per role)`,
        priority: "medium",
        actionable: "Add measurable outcomes to remaining experience entries",
      })
      score -= 4
    }

    // 3. Industry Keywords Check
    const techKeywords = [
      "agile",
      "scrum",
      "devops",
      "cloud",
      "api",
      "microservices",
      "ci/cd",
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "gcp",
      "sql",
      "nosql",
      "react",
      "angular",
      "vue",
      "node",
      "python",
      "java",
      "c#",
      "go",
      "rust",
      "machine learning",
      "ai",
      "data analysis",
      "analytics",
    ]

    const allText =
      `${resumeData.personalInfo.summary} ${resumeData.experience.map((e) => e.description).join(" ")} ${resumeData.skills.join(" ")}`.toLowerCase()

    const keywordsFound = techKeywords.filter((keyword) => allText.includes(keyword)).length

    if (keywordsFound < 5 && resumeData.skills.length > 0) {
      suggestions.push({
        type: "keywords",
        section: "Skills & Experience",
        message: `Include more industry-specific keywords (${keywordsFound}/25 found). This improves ATS matching`,
        priority: "high",
        actionable:
          "Add technical skills, frameworks, and tools relevant to your target roles. Check job descriptions for common keywords",
      })
      score -= 8
    }

    // 4. Professional Summary Quality
    if (!resumeData.personalInfo.summary || resumeData.personalInfo.summary.length < 100) {
      suggestions.push({
        type: "content",
        section: "Professional Summary",
        message: "Strengthen your summary with specific achievements and career objectives (100-150 words ideal)",
        priority: "high",
        actionable:
          "Include: years of experience, key expertise, major achievement, and career goal. Example: 'Senior Software Engineer with 8+ years experience leading cross-functional teams to deliver scalable solutions. Expert in cloud architecture, resulting in 40% cost reduction.'",
      })
      score -= 7
    }

    // 5. LinkedIn Profile
    if (!resumeData.personalInfo.linkedin) {
      suggestions.push({
        type: "ats",
        section: "Contact Information",
        message: "Add LinkedIn profile - 95% of recruiters verify candidates via LinkedIn",
        priority: "high",
        actionable: "Include your full LinkedIn URL in contact section",
      })
      score -= 5
    }

    // 6. Gaps and Inconsistencies
    if (resumeData.experience.length > 0) {
      let hasGaps = false
      for (let i = 0; i < resumeData.experience.length - 1; i++) {
        const endDate = new Date(resumeData.experience[i].endDate)
        const nextStartDate = new Date(resumeData.experience[i + 1].startDate)
        const monthGap = (endDate.getFullYear() - nextStartDate.getFullYear()) * 12
        if (monthGap > 2) {
          hasGaps = true
        }
      }

      if (hasGaps) {
        suggestions.push({
          type: "formatting",
          section: "Experience Timeline",
          message: "Address employment gaps by explaining them (education, freelance, sabbatical)",
          priority: "medium",
          actionable:
            "Add context for gaps: 'Completed AWS Solutions Architect certification' or 'Freelance consultant'",
        })
        score -= 4
      }
    }

    // 7. Projects Impact
    if (resumeData.projects.length > 0) {
      const projectsWithMetrics = resumeData.projects.filter((p) =>
        p.description?.match(/(\d+%|\$\d+[KMB]?|\d+x|\d+ [a-z]+)/gi),
      ).length

      if (projectsWithMetrics === 0) {
        suggestions.push({
          type: "impact",
          section: "Projects",
          message: "Highlight project impact with metrics (users, performance improvement, adoption rate)",
          priority: "medium",
          actionable:
            "Examples: 'Served 50K+ users', 'Reduced load time by 60%', '2M+ downloads', 'Achieved 99.9% uptime'",
        })
        score -= 5
      }
    }

    // 8. Skills Organization
    if (resumeData.skills.length > 20) {
      suggestions.push({
        type: "structure",
        section: "Skills",
        message: "Consider grouping ${resumeData.skills.length} skills into categories (Languages, Frameworks, Tools)",
        priority: "low",
        actionable: "Group skills: Frontend (React, Vue), Backend (Node.js, Python), DevOps (Docker, Kubernetes)",
      })
    }

    // 9. Certification Value
    if (resumeData.certificates.length === 0) {
      suggestions.push({
        type: "keywords",
        section: "Certifications",
        message: "Add relevant certifications to increase credibility and ATS keyword matching",
        priority: "medium",
        actionable: "Include: AWS, Azure, GCP, Kubernetes, Terraform, or industry-specific certifications",
      })
      score -= 4
    }

    // 10. File Extension Check
    if (!resumeData.personalInfo.email?.includes("@")) {
      suggestions.push({
        type: "ats",
        section: "Email",
        message: "Ensure email address is clearly formatted and correct",
        priority: "high",
        actionable: "Use professional email format: firstname.lastname@domain.com",
      })
      score -= 5
    }

    setOptimization({
      score: Math.max(score, 0),
      suggestions: suggestions.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }),
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
        return <TrendingUp className="h-4 w-4 text-accent" />
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
      case "impact":
        return <Zap className="h-4 w-4 text-primary" />
      case "keywords":
        return <TrendingUp className="h-4 w-4 text-primary" />
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
    if (score >= 85) return "Excellent! Your resume is highly optimized"
    if (score >= 70) return "Good resume, but room for improvement"
    return "Needs improvement for better recruiter impact"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Resume Optimizer
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
            Real-World Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="text-center py-8">
            <Zap className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Analyzing your resume with AI...</p>
            <p className="text-sm text-muted-foreground mt-2">Checking metrics, keywords, and recruiter appeal</p>
          </div>
        ) : optimization ? (
          <>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(optimization.score)}`}>{optimization.score}/100</div>
              <p className="text-muted-foreground">Resume Quality Score</p>
              <p className="text-sm text-muted-foreground mt-1">{getScoreMessage(optimization.score)}</p>
              <Progress value={optimization.score} className="mt-3" />
            </div>

            {optimization.suggestions.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  AI Recommendations ({optimization.suggestions.length})
                </h4>
                {optimization.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg border border-primary/10">
                    <div className="flex gap-2 pt-1">
                      {getTypeIcon(suggestion.type)}
                      {getPriorityIcon(suggestion.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="text-xs bg-primary/5">
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
                        <Badge variant="outline" className="text-xs capitalize bg-blue-50 dark:bg-blue-950/30">
                          {suggestion.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.message}</p>
                      {suggestion.actionable && (
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-xs text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          <strong>Action:</strong> {suggestion.actionable}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="text-secondary font-medium">Perfect! Your resume is fully optimized.</p>
                <p className="text-sm text-muted-foreground mt-1">All recommendations have been implemented.</p>
              </div>
            )}

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h5 className="font-medium text-primary mb-2">💡 Pro Tips for Maximum Impact</h5>
              <ul className="text-sm text-primary space-y-1">
                <li>• Use specific numbers: "Increased revenue by 150%" not "Significantly improved"</li>
                <li>• Tailor skills section to match job description keywords</li>
                <li>• Limit to 1 page if you have less than 5 years experience</li>
                <li>• Ensure consistent date formatting throughout</li>
                <li>• Include both hard skills (technical) and soft skills (leadership)</li>
              </ul>
            </div>

            <Button onClick={analyzeResume} variant="outline" className="w-full bg-transparent border-primary/30">
              <Brain className="h-4 w-4 mr-2" />
              Re-analyze Resume
            </Button>
          </>
        ) : (
          <Button onClick={analyzeResume} className="w-full bg-gradient-to-r from-primary to-accent">
            <Brain className="h-4 w-4 mr-2" />
            Analyze Resume with AI
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
