"use client"

import { useState, useEffect } from "react"
import { getExperiences, deleteExperience, updateExperiencesOrder, type Experience } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Building, Calendar, GripVertical } from "lucide-react"
import { ExperienceForm } from "./experience-form"
import { Badge } from "@/components/ui/badge"
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

interface SortableExperienceCardProps {
  experience: Experience
  onEdit: (experience: Experience) => void
  onDelete: (experienceId: string) => void
}

function SortableExperienceCard({ experience, onEdit, onDelete }: SortableExperienceCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: experience.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="relative">
        <div className="absolute top-4 right-4 z-10">
          <div
            {...attributes}
            {...listeners}
            className="p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg cursor-grab hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <GripVertical className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between pr-12">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{experience.position}</CardTitle>
                <CardDescription className="text-lg font-medium text-foreground">{experience.company}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{experience.period}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(experience)}>
              <Edit className="h-4 w-4 mr-2" />
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(experience.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{experience.description}</p>
          {experience.achievements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">주요 성과</h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5 text-xs">
                      {idx + 1}
                    </Badge>
                    <span className="text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    const loadExperiences = async () => {
      const experiencesData = await getExperiences();
      setExperiences(experiencesData);
      setLoading(false);
    };
    loadExperiences();
  }, []);

  const handleDelete = async (experienceId: string) => {
    if (window.confirm("정말로 이 경력을 삭제하시겠습니까?")) {
      const updatedExperiences = experiences.filter((exp) => exp.id !== experienceId);
      await saveExperiences(updatedExperiences);
      setExperiences(updatedExperiences);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingExperience(null)
    fetchExperiences()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = experiences.findIndex((experience) => experience.id === active.id)
      const newIndex = experiences.findIndex((experience) => experience.id === over.id)

      const newExperiences = arrayMove(experiences, oldIndex, newIndex)
      setExperiences(newExperiences)

      // 순서 업데이트
      const experienceIds = newExperiences.map((experience) => experience.id)
      updateExperiencesOrder(experienceIds)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedExperiences = editingExperience
        ? experiences.map((exp) => (exp.id === editingExperience.id ? editingExperience : exp))
        : [...experiences, { ...editingExperience, id: crypto.randomUUID() }];

      await saveExperiences(updatedExperiences);
      setExperiences(updatedExperiences);
      setShowForm(false);
      setEditingExperience(null);
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
          <h2 className="text-2xl font-bold">경력 관리</h2>
          <p className="text-muted-foreground">
            경력 사항을 추가하고 관리하세요. 드래그하여 순서를 변경할 수 있습니다.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />새 경력
        </Button>
      </div>

      {showForm && <ExperienceForm experience={editingExperience} onClose={handleFormClose} />}

      {experiences.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 등록된 경력이 없습니다.</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />첫 번째 경력 추가하기
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experiences.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {experiences.map((experience) => (
                <SortableExperienceCard
                  key={experience.id}
                  experience={experience}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
