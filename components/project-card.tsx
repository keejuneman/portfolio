"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/local-storage"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.category && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-slate-700">
              {project.category}
            </Badge>
          </div>
        )}

        {/* Click to view overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg font-medium">
            상세 정보 보기
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 group-hover:text-blue-600 transition-colors">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        {(project.startDate || project.endDate) && (
          <div className="text-xs text-muted-foreground">
            {project.startDate} {project.startDate && project.endDate && "~"} {project.endDate}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
