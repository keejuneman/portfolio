"use client"

import { useEffect, useState } from "react"
import { getProjects, initializeDemoData, type Project } from "@/lib/local-storage"
import { ProjectCard } from "./project-card"
import { ProjectDetailModal } from "./project-detail-modal"

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      // 초기 데모 데이터 설정
      await initializeDemoData()

      // 프로젝트 로드
      const loadedProjects = await getProjects()
      // order 기준으로 정렬
      const sortedProjects = loadedProjects.sort((a, b) => a.order - b.order)
      setProjects(sortedProjects)
      setLoading(false)
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-48 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted rounded h-4 w-3/4"></div>
              <div className="bg-muted rounded h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">아직 등록된 프로젝트가 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  )
}

export type { Project }
