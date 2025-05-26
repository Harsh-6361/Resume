"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types/resume"

interface LoginFormProps {
  onLogin: (user: User) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("hesumeUsers") || "[]")
    let user = existingUsers.find((u: User) => u.phone === phone)

    if (!user) {
      // Create new user
      user = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
        resumes: [],
      }
      existingUsers.push(user)
      localStorage.setItem("hesumeUsers", JSON.stringify(existingUsers))
    } else {
      // Update name if different
      user.name = name.trim()
      localStorage.setItem("hesumeUsers", JSON.stringify(existingUsers))
    }

    setIsLoading(false)
    onLogin(user)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">Hesume Builder</CardTitle>
          <p className="text-gray-600">Create professional resumes with AI assistance</p>
          <Badge variant="outline" className="mt-2 text-xs">
            Created by HARSH VARDHAN
          </Badge>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In to Hesume Builder"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
