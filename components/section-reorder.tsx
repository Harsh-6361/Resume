"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { GripVertical, ArrowUp, ArrowDown, Settings } from "lucide-react"
import type { ResumeSection } from "@/types/resume"

interface SectionReorderProps {
  sections: ResumeSection[]
  onSectionsChange: (sections: ResumeSection[]) => void
}

export function SectionReorder({ sections, onSectionsChange }: SectionReorderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSection = (id: string) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, enabled: !section.enabled } : section,
    )
    onSectionsChange(updatedSections)
  }

  const moveSection = (id: string, direction: "up" | "down") => {
    const currentIndex = sections.findIndex((section) => section.id === id)
    const newSections = [...sections]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === sections.length - 1)) {
      return
    }
    // Swap the sections
    ;[newSections[currentIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[currentIndex]]

    // Update order values
    newSections.forEach((section, index) => {
      section.order = index
    })

    onSectionsChange(newSections)
  }

  const getSectionDisplayName = (type: string) => {
    const names: Record<string, string> = {
      experience: "Work Experience",
      education: "Education",
      projects: "Projects",
      certificates: "Certificates",
      activities: "Additional Activities",
      skills: "Skills",
    }
    return names[type] || type
  }

  if (!isOpen) {
    return (
      <Card>
        <CardContent className="p-4">
          <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Customize Resume Sections
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Resume Sections
          </span>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
            Done
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Customize which sections appear in your resume and their order.</p>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex items-center gap-3 p-3 border rounded-lg ${section.enabled ? "bg-card" : "bg-muted/50"}`}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/60" />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{getSectionDisplayName(section.type)}</span>
                {!section.enabled && (
                  <Badge variant="secondary" className="text-xs">
                    Hidden
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <Button
                  onClick={() => moveSection(section.id, "up")}
                  disabled={index === 0}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  onClick={() => moveSection(section.id, "down")}
                  disabled={index === sections.length - 1}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>

              <Switch checked={section.enabled} onCheckedChange={() => toggleSection(section.id)} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
