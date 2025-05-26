"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Save, Check, Clock } from "lucide-react"

interface AutosaveIndicatorProps {
  lastSaved: Date | null
  isSaving: boolean
}

export function AutosaveIndicator({ lastSaved, isSaving }: AutosaveIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    if (!lastSaved) return

    const updateTimeAgo = () => {
      const now = new Date()
      const diff = now.getTime() - lastSaved.getTime()
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)

      if (seconds < 60) {
        setTimeAgo("just now")
      } else if (minutes < 60) {
        setTimeAgo(`${minutes}m ago`)
      } else {
        setTimeAgo(lastSaved.toLocaleTimeString())
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [lastSaved])

  if (isSaving) {
    return (
      <Badge variant="outline" className="flex items-center gap-1 text-blue-600">
        <Save className="h-3 w-3 animate-pulse" />
        Saving...
      </Badge>
    )
  }

  if (lastSaved) {
    return (
      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
        <Check className="h-3 w-3" />
        Saved {timeAgo}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="flex items-center gap-1 text-gray-500">
      <Clock className="h-3 w-3" />
      Not saved
    </Badge>
  )
}
