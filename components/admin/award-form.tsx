"use client"

import type React from "react"

import { useState } from "react"
import { saveAward, updateAward, type Award } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import Image from "next/image"

interface AwardFormProps {
  award?: Award | null
  onClose: (award: Award) => void
}

export function AwardForm({ award, onClose }: AwardFormProps) {
  const [formData, setFormData] = useState<Award>(award || {
    id: "",
    title: "",
    organization: "",
    date: "",
    description: "",
    category: "수상",
  })
  const [loading, setLoading] = useState(false)

  const categories = ["수상", "자격증", "교육", "기타"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      if (award) {
        updateAward(award.id, formData)
      } else {
        saveAward(formData)
      }

      await onClose(formData)
    } catch (error) {
      console.error("수상실적 저장 실패:", error)
      alert("수상실적 저장에 실패했습니다.")
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
              <CardTitle>{award ? "수상실적 수정" : "새 수상실적 추가"}</CardTitle>
              <CardDescription>수상, 자격증, 교육 등의 정보를 입력해주세요</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onClose(formData)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="수상명, 자격증명 등을 입력하세요"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organization">발급기관/주최기관</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="예: 한국산업인력공단, 삼성전자 등"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">취득/수상 날짜</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="예: 2023.11, 2023년 11월"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="수상 내용, 자격증 설명, 교육 과정 등을 자세히 입력하세요"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">이미지 URL (선택사항)</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl || ""}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/certificate.jpg"
              />
              {formData.imageUrl && (
                <div className="relative h-48 w-full mt-2">
                  <Image
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                    onError={() => setFormData({ ...formData, imageUrl: "" })}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onClose(formData)} className="flex-1">
                취소
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "저장 중..." : award ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
