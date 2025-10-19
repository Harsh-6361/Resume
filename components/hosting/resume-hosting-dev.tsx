"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Clock, Zap } from "lucide-react"

export function ResumeHostingDev() {
  return (
    <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
          <Globe className="h-5 w-5" />
          Host Your Resume Online
          <Badge variant="destructive" className="ml-auto flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Under Development
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-6 text-center">
          <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2">Coming Soon!</h3>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            We're building an amazing feature to host your resume online with a custom URL and analytics.
          </p>

          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded p-4 space-y-2 text-sm text-left">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-3">Upcoming Features:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">✓</span>
                <span className="text-yellow-700 dark:text-yellow-300">Custom domain or Hesume URL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">✓</span>
                <span className="text-yellow-700 dark:text-yellow-300">View analytics and visitor tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">✓</span>
                <span className="text-yellow-700 dark:text-yellow-300">Share via QR code or direct link</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">✓</span>
                <span className="text-yellow-700 dark:text-yellow-300">SEO optimization for search engines</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">✓</span>
                <span className="text-yellow-700 dark:text-yellow-300">Direct contact form for recruiters</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-4">
            Check back soon! We'll notify you when this feature is ready.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
