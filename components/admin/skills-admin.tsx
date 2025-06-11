"use client"

import { useState, useEffect } from "react"
import { getSkills, deleteSkill, updateSkillsOrder, type Skill } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { SkillForm } from "./skill-form"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

interface SortableSkillCardProps {
  skill: Skill
  onEdit: (skill: Skill) => void
  onDelete: (skillId: string) => void
  getLevelText: (level: number) => string
}

function SortableSkillCard({ skill, onEdit, onDelete, getLevelText }: SortableSkillCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: skill.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="relative p-4">
        <div className="absolute top-2 right-2">
          <div
            {...attributes}
            {...listeners}
            className="p-1 bg-white/80 dark:bg-slate-800/80 rounded cursor-grab hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <GripVertical className="h-3 w-3 text-slate-600 dark:text-slate-400" />
          </div>
        </div>

        <div className="space-y-3 pr-8">
          <div className="flex justify-between items-center">
            <span className="font-medium">{skill.name}</span>
            <Badge variant="outline" className="text-xs">
              {getLevelText(skill.level)}
            </Badge>
          </div>
          <Progress value={skill.level * 20} className="h-2" />
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(skill)} className="h-6 w-6 p-0">
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(skill.id)}
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const fetchSkills = () => {
    const loadedSkills = getSkills()
    setSkills(loadedSkills)
    setLoading(false)
  }

  useEffect(() => {
    const loadSkills = async () => {
      const skillsData = await getSkills();
      setSkills(skillsData);
      setLoading(false);
    };
    loadSkills();
  }, []);

  const handleDelete = async (skillId: string) => {
    if (window.confirm("정말로 이 기술을 삭제하시겠습니까?")) {
      const updatedSkills = skills.filter((skill) => skill.id !== skillId);
      await saveSkills(updatedSkills);
      setSkills(updatedSkills);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingSkill(null)
    fetchSkills()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = skills.findIndex((skill) => skill.id === active.id)
      const newIndex = skills.findIndex((skill) => skill.id === over.id)

      const newSkills = arrayMove(skills, oldIndex, newIndex)
      setSkills(newSkills)

      // 순서 업데이트
      const skillIds = newSkills.map((skill) => skill.id)
      updateSkillsOrder(skillIds)
    }
  }

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

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
    e.preventDefault();
    setLoading(true);

    try {
      const updatedSkills = editingSkill
        ? skills.map((skill) => (skill.id === editingSkill.id ? editingSkill : skill))
        : [...skills, { ...editingSkill, id: crypto.randomUUID() }];

      await saveSkills(updatedSkills);
      setSkills(updatedSkills);
      setShowForm(false);
      setEditingSkill(null);
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
          <h2 className="text-2xl font-bold">기술 스택 관리</h2>
          <p className="text-muted-foreground">
            보유 기술과 숙련도를 관리하세요. 드래그하여 순서를 변경할 수 있습니다.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />새 기술
        </Button>
      </div>

      {showForm && <SkillForm skill={editingSkill} onClose={handleFormClose} />}

      {Object.keys(skillsByCategory).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 등록된 기술이 없습니다.</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />첫 번째 기술 추가하기
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={skills.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <SortableSkillCard
                          key={skill.id}
                          skill={skill}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          getLevelText={getLevelText}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
