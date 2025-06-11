"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  X,
  Calendar,
  User,
  Target,
  ExternalLink,
  Github,
  Video,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import type { Project } from "@/lib/local-storage"
import Image from "next/image"

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = [project.imageUrl, ...(project.images || [])].filter(Boolean)

  // 모달이 열릴 때 배경 스크롤 비활성화
  useEffect(() => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY
    
    // body 스크롤 비활성화
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    
    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github":
        return Github
      case "demo":
        return ExternalLink
      case "video":
        return Video
      default:
        return LinkIcon
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // 모달 내부 클릭 시 이벤트 전파 막기
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={handleModalClick}>
        <CardContent className="p-0">
          {/* Header */}
          <div className="relative p-6 border-b">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>

            <div className="pr-12">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{project.title}</h1>
                {project.category && <Badge variant="secondary">{project.category}</Badge>}
              </div>
              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {(project.startDate || project.endDate) && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {project.startDate} {project.startDate && project.endDate && "~"} {project.endDate}
                    </span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{project.role}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {allImages.length > 0 && (
            <div className="relative">
              <div className="relative h-64 md:h-80">
                <Image
                  src={allImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />

                {allImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Tech Stack */}
            <div>
              <h3 className="font-semibold mb-3">기술 스택</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Description */}
            {project.detailDescription && (
              <div>
                <h3 className="font-semibold mb-3">상세 설명</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.detailDescription}</p>
              </div>
            )}

            {/* Contributions */}
            {project.contributions && project.contributions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  기여도
                </h3>
                <div className="space-y-4">
                  {project.contributions.map((contribution, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{contribution.area}</span>
                        <span className="text-sm font-medium">{contribution.percentage}%</span>
                      </div>
                      <Progress value={contribution.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  결과 및 성과
                </h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5 text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">관련 링크</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.links.map((link, index) => {
                    const IconComponent = getLinkIcon(link.type)
                    return (
                      <Button key={index} variant="outline" className="justify-start" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <IconComponent className="h-4 w-4 mr-2" />
                          {link.label}
                        </a>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Retrospective */}
            {project.retrospective && (
              <div>
                <h3 className="font-semibold mb-3">프로젝트 회고</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.retrospective}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
