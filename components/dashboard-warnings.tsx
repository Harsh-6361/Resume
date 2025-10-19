"use client"

import { AlertCircle, Shield, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DashboardWarnings() {
  return (
    <div className="grid gap-3 mb-6">
      <Alert className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/30">
        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
        <AlertTitle className="text-yellow-800 dark:text-yellow-400">Important: Do Not Refresh</AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
          Avoid refreshing the page while editing your resume. Use the auto-save feature - your changes are saved
          automatically every 2 seconds.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/30">
        <Zap className="h-4 w-4 text-blue-600 dark:text-blue-500" />
        <AlertTitle className="text-blue-800 dark:text-blue-400">Auto-Save Active</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Your resume is being saved automatically. Watch for the "Saved" indicator at the top to confirm.
        </AlertDescription>
      </Alert>

      <Alert className="border-purple-500/50 bg-purple-50 dark:bg-purple-950/30">
        <Shield className="h-4 w-4 text-purple-600 dark:text-purple-500" />
        <AlertTitle className="text-purple-800 dark:text-purple-400">Data Stored Locally</AlertTitle>
        <AlertDescription className="text-purple-700 dark:text-purple-300">
          Your resume data is stored securely in your browser. Clear your browser cache/cookies to avoid losing data.
        </AlertDescription>
      </Alert>
    </div>
  )
}
