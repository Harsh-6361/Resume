"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

export function LinkedInFollow() {
  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10">
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300">Connect on LinkedIn</h4>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            Follow the creator for more resume tips and opportunities
          </p>
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <a
              href="https://www.linkedin.com/in/j-harsh-vardhan-934a00258/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              Follow Harsh Vardhan
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
