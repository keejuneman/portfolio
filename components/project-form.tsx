"use client"

import type React from "react"

import { useState } from "react"
import {
  saveProject,
  updateProject,
  type Project,
  type ProjectLink,
  type ProjectContribution,
} from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { X, Plus, LinkIcon, Github, ExternalLink, Video, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProjectFormProps {
  project?: Project | null
  onClose: () => void
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "")
  const [description, setDescription] = useState(project?.description || "")
  const [detailDescription, setDetailDescription] = useState(project?.detailDescription || "")
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || [])
  const [newTech, setNewTech] = useState("")
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "")
  const [images, setImages] = useState<string[]>(project?.images || [])
  const [newImage, setNewImage] = useState("")
  const [startDate, setStartDate] = useState(project?.startDate || "")
  const [endDate, setEndDate] = useState(project?.endDate || "")
  const [role, setRole] = useState(project?.role || "")
  const [contributions, setContributions] = useState<ProjectContribution[]>(project?.contributions || [])
  const [newContribution, setNewContribution] = useState({ area: "", percentage: 50 })
  const [results, setResults] = useState<string[]>(project?.results || [])
  const [newResult, setNewResult] = useState("")
  const [links, setLinks] = useState<ProjectLink[]>(project?.links || [])
  const [newLink, setNewLink] = useState({ type: "", url: "", label: "" })
  const [retrospective, setRetrospective] = useState(project?.retrospective || "")
  const [tags, setTags] = useState<string[]>(project?.tags || [])
  const [newTag, setNewTag] = useState("")
  const [category, setCategory] = useState(project?.category || "")
  const [loading, setLoading] = useState(false)

  const categories = ["Web Development", "Mobile App", "AI/ML", "Data Science", "Automation", "DevOps", "Other"]
  const linkTypes = [
    { value: "github", label: "GitHub", icon: Github },
    { value: "demo", label: "Live Demo", icon: ExternalLink },
    { value: "video", label: "Video", icon: Video },
    { value: "other", label: "Other", icon: LinkIcon },
  ]

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()])
      setNewTech("")
    }
  }

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  const addImage = () => {
    if (newImage.trim() && !images.includes(newImage.trim())) {
      setImages([...images, newImage.trim()])
      setNewImage("")
    }
  }

  const removeImage = (image: string) => {
    setImages(images.filter((img) => img !== image))
  }

  const addContribution = () => {
    if (newContribution.area.trim()) {
      setContributions([...contributions, { ...newContribution }])
      setNewContribution({ area: "", percentage: 50 })
    }
  }

  const removeContribution = (index: number) => {
    setContributions(contributions.filter((_, i) => i !== index))
  }

  const updateContributionPercentage = (index: number, percentage: number) => {
    const updatedContributions = [...contributions]
    updatedContributions[index].percentage = percentage
    setContributions(updatedContributions)
  }

  const addResult = () => {
    if (newResult.trim() && !results.includes(newResult.trim())) {
      setResults([...results, newResult.trim()])
      setNewResult("")
    }
  }

  const removeResult = (result: string) => {
    setResults(results.filter((r) => r !== result))
  }

  const addLink = () => {
    if (newLink.type && newLink.url.trim() && newLink.label.trim()) {
      setLinks([...links, { ...newLink }])
      setNewLink({ type: "", url: "", label: "" })
    }
  }

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const projectData = {
        title,
        description,
        detailDescription,
        techStack,
        imageUrl: imageUrl || "/placeholder.svg?height=200&width=400",
        images,
        startDate,
        endDate,
        role,
        contributions,
        results,
        links,
        retrospective,
        tags,
        category,
      }

      if (project) {
        updateProject(project.id, projectData)
      } else {
        saveProject(projectData)
      }

      onClose()
    } catch (error) {
      console.error("프로젝트 저장 실패:", error)
      alert("프로젝트 저장에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{project ? "프로젝트 수정" : "새 프로젝트 추가"}</CardTitle>
              <CardDescription>프로젝트의 상세 정보를 입력해주세요</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">기본 정보</TabsTrigger>
                <TabsTrigger value="details">상세 정보</TabsTrigger>
                <TabsTrigger value="media">미디어</TabsTrigger>
                <TabsTrigger value="additional">추가 정보</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">프로젝트 제목</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="프로젝트 제목을 입력하세요"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">한줄 설명</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="프로젝트를 한줄로 요약해주세요"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">시작일</Label>
                    <Input
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="예: 2023.03"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">종료일</Label>
                    <Input
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="예: 2023.08 또는 진행중"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select value={category} onValueChange={setCategory}>
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

                <div className="space-y-2">
                  <Label>기술 스택</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="기술 스택 추가 (예: React, Python)"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    />
                    <Button type="button" onClick={addTech} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {tech}
                        <X className="h-3 w-3 ml-1" onClick={() => removeTech(tech)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="detailDescription">상세 설명</Label>
                  <Textarea
                    id="detailDescription"
                    value={detailDescription}
                    onChange={(e) => setDetailDescription(e.target.value)}
                    placeholder="프로젝트의 기획 목적, 주요 기능, 구조 등을 자세히 설명해주세요"
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">주요 역할</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="예: 풀스택 개발자, 팀 리더, 백엔드 개발 담당 등"
                  />
                </div>

                <div className="space-y-2">
                  <Label>기여도</Label>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newContribution.area}
                        onChange={(e) => setNewContribution({ ...newContribution, area: e.target.value })}
                        placeholder="기여 영역 (예: Frontend 개발, Backend API, 데이터베이스 설계)"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addContribution} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">기여도: {newContribution.percentage}%</Label>
                      </div>
                      <Slider
                        value={[newContribution.percentage]}
                        onValueChange={(value) => setNewContribution({ ...newContribution, percentage: value[0] })}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      {contributions.map((contribution, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{contribution.area}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{contribution.percentage}%</span>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeContribution(index)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <Slider
                            value={[contribution.percentage]}
                            onValueChange={(value) => updateContributionPercentage(index, value[0])}
                            max={100}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>결과 및 성과</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newResult}
                      onChange={(e) => setNewResult(e.target.value)}
                      placeholder="프로젝트의 성과나 결과를 입력하세요"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResult())}
                    />
                    <Button type="button" onClick={addResult} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Badge variant="secondary" className="text-xs">
                          {index + 1}
                        </Badge>
                        <span className="flex-1 text-sm">{result}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeResult(result)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>관련 링크</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Select value={newLink.type} onValueChange={(value) => setNewLink({ ...newLink, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="링크 타입" />
                      </SelectTrigger>
                      <SelectContent>
                        {linkTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      placeholder="URL"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={newLink.label}
                        onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                        placeholder="라벨"
                      />
                      <Button type="button" onClick={addLink} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    {links.map((link, index) => {
                      const LinkTypeIcon = linkTypes.find((type) => type.value === link.type)?.icon || LinkIcon
                      return (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <LinkTypeIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">{link.label}</span>
                          <span className="text-xs text-muted-foreground flex-1">{link.url}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeLink(index)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">대표 이미지 URL</Label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {imageUrl && (
                    <div className="relative h-48 w-full mt-2">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                        onError={() => setImageUrl("")}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>추가 이미지 (스크린샷 등)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="이미지 URL을 입력하세요"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                    />
                    <Button type="button" onClick={addImage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-32 w-full">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Screenshot ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="additional" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="retrospective">프로젝트 회고 또는 개선점 (선택)</Label>
                  <Textarea
                    id="retrospective"
                    value={retrospective}
                    onChange={(e) => setRetrospective(e.target.value)}
                    placeholder="프로젝트를 진행하면서 배운 점, 아쉬웠던 점, 개선하고 싶은 부분 등을 작성해주세요"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>태그</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="태그 추가 (예: React, API, 반응형)"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer">
                        {tag}
                        <X className="h-3 w-3 ml-1" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "저장 중..." : project ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
