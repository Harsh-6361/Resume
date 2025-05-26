"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Activity } from "@/types/resume"

interface DynamicActivityFormProps {
  activity: Activity
  onUpdate: (field: string, value: string) => void
}

export function DynamicActivityForm({ activity, onUpdate }: DynamicActivityFormProps) {
  const renderFieldsForType = () => {
    switch (activity.type) {
      case "volunteer":
        return (
          <>
            <div>
              <Label>Organization Name</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="Red Cross, Habitat for Humanity, etc."
              />
            </div>
            <div>
              <Label>Role/Position</Label>
              <Input
                value={activity.role || ""}
                onChange={(e) => onUpdate("role", e.target.value)}
                placeholder="Volunteer Coordinator, Team Leader, etc."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Input type="month" value={activity.date} onChange={(e) => onUpdate("date", e.target.value)} />
              </div>
              <div>
                <Label>End Date (Optional)</Label>
                <Input
                  type="month"
                  value={activity.endDate || ""}
                  onChange={(e) => onUpdate("endDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={activity.location || ""}
                onChange={(e) => onUpdate("location", e.target.value)}
                placeholder="City, State"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={activity.description || ""}
                onChange={(e) => onUpdate("description", e.target.value)}
                placeholder="Describe your volunteer work and impact..."
                rows={3}
              />
            </div>
          </>
        )

      case "award":
        return (
          <>
            <div>
              <Label>Award Name</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                placeholder="Employee of the Year, Dean's List, etc."
              />
            </div>
            <div>
              <Label>Issuing Organization</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="Company, University, etc."
              />
            </div>
            <div>
              <Label>Date Received</Label>
              <Input type="month" value={activity.date} onChange={(e) => onUpdate("date", e.target.value)} />
            </div>
            <div>
              <Label>Achievement Details</Label>
              <Textarea
                value={activity.achievement || ""}
                onChange={(e) => onUpdate("achievement", e.target.value)}
                placeholder="Describe what you achieved to earn this award..."
                rows={3}
              />
            </div>
          </>
        )

      case "publication":
        return (
          <>
            <div>
              <Label>Publication Title</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                placeholder="Research paper, article, book title"
              />
            </div>
            <div>
              <Label>Publisher/Journal</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="IEEE, Nature, Medium, etc."
              />
            </div>
            <div>
              <Label>Publication Date</Label>
              <Input type="month" value={activity.date} onChange={(e) => onUpdate("date", e.target.value)} />
            </div>
            <div>
              <Label>Abstract/Summary</Label>
              <Textarea
                value={activity.description || ""}
                onChange={(e) => onUpdate("description", e.target.value)}
                placeholder="Brief summary of your publication..."
                rows={3}
              />
            </div>
          </>
        )

      case "language":
        return (
          <>
            <div>
              <Label>Language</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                placeholder="Spanish, French, Mandarin, etc."
              />
            </div>
            <div>
              <Label>Proficiency Level</Label>
              <Select value={activity.level || ""} onValueChange={(value) => onUpdate("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="native">Native</SelectItem>
                  <SelectItem value="fluent">Fluent</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Certification/Test (Optional)</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="TOEFL, IELTS, DELE, etc."
              />
            </div>
          </>
        )

      case "extracurricular":
        return (
          <>
            <div>
              <Label>Activity Name</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                placeholder="Drama Club, Student Government, etc."
              />
            </div>
            <div>
              <Label>Organization/School</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="University name, club name, etc."
              />
            </div>
            <div>
              <Label>Role/Position</Label>
              <Input
                value={activity.role || ""}
                onChange={(e) => onUpdate("role", e.target.value)}
                placeholder="President, Member, Captain, etc."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Input type="month" value={activity.date} onChange={(e) => onUpdate("date", e.target.value)} />
              </div>
              <div>
                <Label>End Date (Optional)</Label>
                <Input
                  type="month"
                  value={activity.endDate || ""}
                  onChange={(e) => onUpdate("endDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={activity.description || ""}
                onChange={(e) => onUpdate("description", e.target.value)}
                placeholder="Describe your role and achievements..."
                rows={3}
              />
            </div>
          </>
        )

      case "leadership":
        return (
          <>
            <div>
              <Label>Leadership Role</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                placeholder="Team Lead, Project Manager, etc."
              />
            </div>
            <div>
              <Label>Organization/Company</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="Company, organization, or project name"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Input type="month" value={activity.date} onChange={(e) => onUpdate("date", e.target.value)} />
              </div>
              <div>
                <Label>End Date (Optional)</Label>
                <Input
                  type="month"
                  value={activity.endDate || ""}
                  onChange={(e) => onUpdate("endDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Team Size/Scope</Label>
              <Input
                value={activity.level || ""}
                onChange={(e) => onUpdate("level", e.target.value)}
                placeholder="e.g., Led team of 10 people"
              />
            </div>
            <div>
              <Label>Achievements & Impact</Label>
              <Textarea
                value={activity.description || ""}
                onChange={(e) => onUpdate("description", e.target.value)}
                placeholder="Describe your leadership achievements and impact..."
                rows={3}
              />
            </div>
          </>
        )

      default:
        return (
          <>
            <div>
              <Label>Title</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdate("title", e.target.value)}
                placeholder="Activity title"
              />
            </div>
            <div>
              <Label>Organization (Optional)</Label>
              <Input
                value={activity.organization || ""}
                onChange={(e) => onUpdate("organization", e.target.value)}
                placeholder="Organization name"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="month" value={activity.date} onChange={(e) => onUpdate("date", e.target.value)} />
            </div>
            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={activity.description || ""}
                onChange={(e) => onUpdate("description", e.target.value)}
                placeholder="Describe the activity..."
                rows={3}
              />
            </div>
          </>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Activity Type</Label>
        <Select value={activity.type} onValueChange={(value) => onUpdate("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volunteer">Volunteer Work</SelectItem>
            <SelectItem value="award">Award/Recognition</SelectItem>
            <SelectItem value="publication">Publication</SelectItem>
            <SelectItem value="language">Language</SelectItem>
            <SelectItem value="extracurricular">Extracurricular Activity</SelectItem>
            <SelectItem value="leadership">Leadership Experience</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderFieldsForType()}
    </div>
  )
}
