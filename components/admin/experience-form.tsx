"use client"

import type React from "react"

import { useState } from "react"
import { saveExperience, updateExperience, type Experience } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface ExperienceFormProps {
  experience?: Experience | null
  onClose: () => void
}

export function ExperienceForm({ experience, onClose }: ExperienceFormProps) {
  const [company, setCompany] = useState(experience?.company || "")
  const [position, setPosition] = useState(experience?.position || "")
  const [period, setPeriod] = useState(experience?.period || "")
  const [description, setDescription] = useState(experience?.description || "")
  const [achievements, setAchievements] = useState<string[]>(experience?.achievements || [])
  const [newAchievement, setNewAchievement] = useState("")
  const [loading, setLoading] = useState(false)

  const addAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const removeAchievement = (achievement: string) => {
    setAchievements(achievements.filter((a) => a !== achievement))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const experienceData = {
        company,
        position,
        period,
        description,
        achievements,
      }

      if (experience) {
        updateExperience(experience.id, experienceData)
      } else {
        saveExperience(experienceData)
      }

      onClose()
    } catch (error) {
      console.error("경력 저장 실패:", error)
      alert("경력 저장에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{experience ? "경력 수정" : "새 경력 추가"}</CardTitle>
              <CardDescription>경력 정보를 입력해주세요</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">회사명</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="회사명을 입력하세요"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">직책</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="직책을 입력하세요"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">근무 기간</Label>
              <Input
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="예: 2020.03 - 2022.02"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">업무 설명</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="담당했던 업무에 대해 설명해주세요"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>주요 성과</Label>
              <div className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="주요 성과를 입력하세요"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAchievement())}
                />
                <Button type="button" onClick={addAchievement} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Badge variant="secondary" className="text-xs">
                      {index + 1}
                    </Badge>
                    <span className="flex-1 text-sm">{achievement}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAchievement(achievement)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "저장 중..." : experience ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
