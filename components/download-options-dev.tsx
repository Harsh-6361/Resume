"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Download, FileText, AlertCircle, Clock } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface DownloadOptionsDevProps {
  resumeData: ResumeData
  templateType: string
}

export function DownloadOptionsDev({ resumeData, templateType }: DownloadOptionsDevProps) {
  const handlePrintPDF = () => {
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
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
              background: white;
            }
            @media print { 
              body { margin: 0; padding: 0; } 
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${resumeElement.innerHTML}
          <div style="position: fixed; bottom: 10px; right: 10px; font-size: 10px; color: #999;">
            Created with Resume Builder by HARSH VARDHAN
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Download & Export
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/30">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-500" />
          <AlertTitle className="text-blue-800 dark:text-blue-400">Print as PDF Available</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 text-sm">
            Use the Print as PDF option below. For best results, use Chrome or Firefox.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Button onClick={handlePrintPDF} className="w-full flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Print as PDF
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-600" />
            Download as Documents
            <Badge variant="destructive" className="text-xs">
              Under Development
            </Badge>
          </h4>

          <Alert className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/30">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertTitle className="text-yellow-800 dark:text-yellow-400">Coming Soon</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-300 text-sm">
              Download as DOCX, Google Docs, or other formats will be available soon. For now, use Print as PDF.
            </AlertDescription>
          </Alert>

          <div className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
            <p>📋 Planned Export Formats:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Microsoft Word (.docx)</li>
              <li>Google Docs (.gdoc)</li>
              <li>OpenDocument (.odt)</li>
              <li>Rich Text Format (.rtf)</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4 border-t text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            Created by HARSH VARDHAN
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
