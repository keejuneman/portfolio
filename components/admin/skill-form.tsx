"use client"

import type React from "react"

import { useState } from "react"
import { saveSkill, updateSkill, type Skill } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface SkillFormProps {
  skill?: Skill | null
  onClose: () => void
}

export function SkillForm({ skill, onClose }: SkillFormProps) {
  const [name, setName] = useState(skill?.name || "")
  const [category, setCategory] = useState(skill?.category || "")
  const [level, setLevel] = useState(skill?.level || 3)
  const [loading, setLoading] = useState(false)

  const categories = [
    "Programming",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Cloud",
    "AI/ML",
    "Mobile",
    "Design",
    "Other",
  ]

  const getLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "초급"
      case 2:
        return "초중급"
      case 3:
        return "중급"
      case 4:
        return "중고급"
      case 5:
        return "고급"
      default:
        return "초급"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const skillData = {
        name,
        category,
        level,
      }

      if (skill) {
        updateSkill(skill.id, skillData)
      } else {
        saveSkill(skillData)
      }

      onClose()
    } catch (error) {
      console.error("기술 저장 실패:", error)
      alert("기술 저장에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{skill ? "기술 수정" : "새 기술 추가"}</CardTitle>
              <CardDescription>기술 정보를 입력해주세요</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">기술명</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: React, Python, AWS"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>숙련도: {getLevelText(level)}</Label>
              <Slider
                value={[level]}
                onValueChange={(value) => setLevel(value[0])}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>초급</span>
                <span>초중급</span>
                <span>중급</span>
                <span>중고급</span>
                <span>고급</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "저장 중..." : skill ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
