"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getAbout, saveAbout, About } from "@/lib/local-storage"
import { toast } from "sonner"

export function AboutAdmin() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAbout()
  }, [])

  const loadAbout = async () => {
    try {
      const data = await getAbout()
      setAbout(data)
    } catch (error) {
      console.error("Error loading about data:", error)
      toast.error("소개 정보를 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!about) return

    try {
      await saveAbout(about)
      toast.success("소개 정보가 저장되었습니다.")
    } catch (error) {
      console.error("Error saving about data:", error)
      toast.error("소개 정보 저장에 실패했습니다.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!about) return
    const { name, value } = e.target
    setAbout((prev) => {
      if (!prev) return prev
      if (name.startsWith("stats.")) {
        const statKey = name.split(".")[1]
        return {
          ...prev,
          stats: {
            ...prev.stats,
            [statKey]: value
          }
        }
      }
      return { ...prev, [name]: value }
    })
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!about) {
    return <div>데이터를 불러올 수 없습니다.</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                value={about.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">직함</Label>
              <Input
                id="title"
                name="title"
                value={about.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">소개</Label>
            <Input
              id="description"
              name="description"
              value={about.description}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>연락처 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={about.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                name="phone"
                value={about.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">위치</Label>
            <Input
              id="location"
              name="location"
              value={about.location}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>소셜 링크</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={about.github}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={about.linkedin}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">웹사이트</Label>
            <Input
              id="website"
              name="website"
              value={about.website}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>통계 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats.projects">프로젝트</Label>
              <Input
                id="stats.projects"
                name="stats.projects"
                value={about.stats.projects}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.solutions">도입 솔루션</Label>
              <Input
                id="stats.solutions"
                name="stats.solutions"
                value={about.stats.solutions}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.experience">총 경력</Label>
              <Input
                id="stats.experience"
                name="stats.experience"
                value={about.stats.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.skills">기술 스택</Label>
              <Input
                id="stats.skills"
                name="stats.skills"
                value={about.stats.skills}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
} 