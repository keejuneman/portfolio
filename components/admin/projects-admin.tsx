"use client"

import { useState, useEffect } from "react"
import { getProjects, deleteProject, updateProjectsOrder, type Project } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { ProjectForm } from "../project-form"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
}

function SortableProjectCard({ project, onEdit, onDelete }: SortableProjectCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="overflow-hidden">
        <div className="absolute top-2 left-2 z-10">
          <div
            {...attributes}
            {...listeners}
            className="p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg cursor-grab hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <GripVertical className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </div>
        </div>

        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(project)} className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)} className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await getProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    loadProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      try {
        const updatedProjects = projects
          .filter((project) => project.id !== projectId)
          .map((project, index) => ({
            ...project,
            order: index
          }));

        const response = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'projects', content: updatedProjects }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        setProjects(updatedProjects);
      } catch (error) {
        console.error('Delete error:', error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
    fetchProjects()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((project) => project.id === active.id)
      const newIndex = projects.findIndex((project) => project.id === over.id)

      const newProjects = arrayMove(projects, oldIndex, newIndex)
      setProjects(newProjects)

      // 순서 업데이트
      const projectIds = newProjects.map((project) => project.id)
      updateProjectsOrder(projectIds)
    }
  }

  const handleOrderChange = async (reorderedProjects: Project[]) => {
    try {
      // 순서 업데이트
      const updatedProjects = reorderedProjects.map((project, index) => ({
        ...project,
        order: index
      }));

      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'projects', content: updatedProjects }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project order');
      }

      // 정렬된 프로젝트로 상태 업데이트
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Order change error:', error);
      alert("순서 변경에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedProjects: Project[];
      
      if (editingProject) {
        // 기존 프로젝트 수정
        updatedProjects = projects.map((project) => 
          project.id === editingProject.id ? editingProject : project
        );
      } else {
        // 새 프로젝트 추가
        const newProject = {
          ...editingProject,
          id: crypto.randomUUID(),
          order: projects.length,
          createdAt: new Date().toISOString()
        };
        updatedProjects = [...projects, newProject];
      }

      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'projects', content: updatedProjects }),
      });

      if (!response.ok) {
        throw new Error('Failed to save projects');
      }

      // 정렬된 프로젝트로 상태 업데이트
      setProjects(updatedProjects);
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Save error:', error);
      alert("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">프로젝트 관리</h2>
          <p className="text-muted-foreground">
            포트폴리오 프로젝트를 추가하고 관리하세요. 드래그하여 순서를 변경할 수 있습니다.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />새 프로젝트
        </Button>
      </div>

      {showForm && <ProjectForm project={editingProject} onClose={handleFormClose} />}

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 등록된 프로젝트가 없습니다.</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />첫 번째 프로젝트 추가하기
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <SortableProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
