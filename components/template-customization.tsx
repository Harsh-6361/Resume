"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Palette, Type, Settings } from "lucide-react"

export interface TemplateCustomization {
  fontFamily: "sans" | "serif" | "mono"
  headingSize: number
  bodySize: number
  primaryColor: string
  accentColor: string
  headingColor: string
  spacing: number
}

interface TemplateCustomizationProps {
  customization: TemplateCustomization
  onUpdate: (customization: TemplateCustomization) => void
}

const FONT_FAMILIES = [
  { value: "sans", label: "Sans Serif (Modern)" },
  { value: "serif", label: "Serif (Classic)" },
  { value: "mono", label: "Monospace (Tech)" },
]

const PRESET_COLORS = [
  { name: "Purple", primary: "#7c3aed", accent: "#f59e0b" },
  { name: "Blue", primary: "#3b82f6", accent: "#ec4899" },
  { name: "Green", primary: "#10b981", accent: "#f59e0b" },
  { name: "Indigo", primary: "#6366f1", accent: "#8b5cf6" },
  { name: "Rose", primary: "#e11d48", accent: "#f59e0b" },
  { name: "Teal", primary: "#14b8a6", accent: "#06b6d4" },
]

export function TemplateCustomization({ customization, onUpdate }: TemplateCustomizationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFontChange = (fontFamily: "sans" | "serif" | "mono") => {
    onUpdate({ ...customization, fontFamily })
  }

  const handleHeadingSizeChange = (size: number[]) => {
    onUpdate({ ...customization, headingSize: size[0] })
  }

  const handleBodySizeChange = (size: number[]) => {
    onUpdate({ ...customization, bodySize: size[0] })
  }

  const handleSpacingChange = (spacing: number[]) => {
    onUpdate({ ...customization, spacing: spacing[0] })
  }

  const handleColorPreset = (preset: any) => {
    onUpdate({
      ...customization,
      primaryColor: preset.primary,
      accentColor: preset.accent,
    })
  }

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...customization, primaryColor: e.target.value })
  }

  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...customization, accentColor: e.target.value })
  }

  const handleHeadingColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...customization, headingColor: e.target.value })
  }

  if (!isOpen) {
    return (
      <Card>
        <CardContent className="p-4">
          <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Customize Template
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
            <Palette className="h-5 w-5" />
            Template Customization
          </span>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
            Done
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Family */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Type className="h-4 w-4" />
            Font Family
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {FONT_FAMILIES.map((font) => (
              <Button
                key={font.value}
                onClick={() => handleFontChange(font.value as "sans" | "serif" | "mono")}
                variant={customization.fontFamily === font.value ? "default" : "outline"}
                className="text-sm"
              >
                {font.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Sizes */}
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Type className="h-4 w-4" />
              Heading Size: {customization.headingSize}px
            </Label>
            <Slider
              value={[customization.headingSize]}
              onValueChange={handleHeadingSizeChange}
              min={20}
              max={40}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Type className="h-4 w-4" />
              Body Size: {customization.bodySize}px
            </Label>
            <Slider
              value={[customization.bodySize]}
              onValueChange={handleBodySizeChange}
              min={12}
              max={18}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4" />
              Spacing: {customization.spacing}
            </Label>
            <Slider
              value={[customization.spacing]}
              onValueChange={handleSpacingChange}
              min={0.8}
              max={1.5}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Color Presets */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4" />
            Color Presets
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_COLORS.map((preset) => (
              <Button
                key={preset.name}
                onClick={() => handleColorPreset(preset)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: preset.primary,
                  }}
                />
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: preset.accent,
                  }}
                />
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium">Custom Colors</h4>

          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="primaryColor"
                type="color"
                value={customization.primaryColor}
                onChange={handlePrimaryColorChange}
                className="h-10 w-14 p-1"
              />
              <Input
                type="text"
                value={customization.primaryColor}
                onChange={handlePrimaryColorChange}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="accentColor"
                type="color"
                value={customization.accentColor}
                onChange={handleAccentColorChange}
                className="h-10 w-14 p-1"
              />
              <Input
                type="text"
                value={customization.accentColor}
                onChange={handleAccentColorChange}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="headingColor">Heading Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="headingColor"
                type="color"
                value={customization.headingColor}
                onChange={handleHeadingColorChange}
                className="h-10 w-14 p-1"
              />
              <Input
                type="text"
                value={customization.headingColor}
                onChange={handleHeadingColorChange}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="bg-primary/10 p-3 rounded-lg">
          <p className="text-sm text-primary font-medium">💡 Tip</p>
          <p className="text-xs text-muted-foreground mt-1">Changes will be reflected in the preview instantly</p>
        </div>
      </CardContent>
    </Card>
  )
}
