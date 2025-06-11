"use client"

import { useState, useEffect } from "react"
import { getAwards, deleteAward, updateAwardsOrder, type Award } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Trophy, AwardIcon, GraduationCap, Star, Calendar, GripVertical } from "lucide-react"
import { AwardForm } from "./award-form"
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

interface SortableAwardCardProps {
  award: Award
  onEdit: (award: Award) => void
  onDelete: (awardId: string) => void
  getCategoryIcon: (category: string) => any
  getCategoryColor: (category: string) => string
}

function SortableAwardCard({ award, onEdit, onDelete, getCategoryIcon, getCategoryColor }: SortableAwardCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: award.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const IconComponent = getCategoryIcon(award.category)

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

        {award.imageUrl && (
          <div className="relative h-48 w-full">
            <Image src={award.imageUrl || "/placeholder.svg"} alt={award.title} fill className="object-cover" />
            <div className="absolute top-2 right-2">
              <Badge className={`bg-gradient-to-r ${getCategoryColor(award.category)} text-white border-0`}>
                {award.category}
              </Badge>
            </div>
          </div>
        )}

        <CardHeader>
          {!award.imageUrl && (
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 bg-gradient-to-r ${getCategoryColor(award.category)} rounded-lg`}>
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              <Badge className={`bg-gradient-to-r ${getCategoryColor(award.category)} text-white border-0`}>
                {award.category}
              </Badge>
            </div>
          )}
          <CardTitle className="line-clamp-1">{award.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4" />
              <span>{award.date}</span>
            </div>
            <span className="font-medium">{award.organization}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{award.description}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(award)} className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(award.id)} className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AwardsAdmin() {
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAward, setEditingAward] = useState<Award | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    const loadAwards = async () => {
      const awardsData = await getAwards();
      setAwards(awardsData);
      setLoading(false);
    };
    loadAwards();
  }, []);

  const handleDelete = async (awardId: string) => {
    if (window.confirm("정말로 이 수상실적을 삭제하시겠습니까?")) {
      const updatedAwards = awards.filter((award) => award.id !== awardId);
      await saveAwards(updatedAwards);
      setAwards(updatedAwards);
    }
  };

  const handleEdit = (award: Award) => {
    setEditingAward(award)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingAward(null)
    fetchAwards()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = awards.findIndex((award) => award.id === active.id)
      const newIndex = awards.findIndex((award) => award.id === over.id)

      const newAwards = arrayMove(awards, oldIndex, newIndex)
      setAwards(newAwards)

      // 순서 업데이트
      const awardIds = newAwards.map((award) => award.id)
      updateAwardsOrder(awardIds)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "수상":
        return Trophy
      case "자격증":
        return AwardIcon
      case "교육":
        return GraduationCap
      default:
        return Star
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "수상":
        return "from-yellow-500 to-orange-500"
      case "자격증":
        return "from-blue-500 to-indigo-500"
      case "교육":
        return "from-green-500 to-emerald-500"
      default:
        return "from-purple-500 to-pink-500"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedAwards = editingAward
        ? awards.map((award) => (award.id === editingAward.id ? editingAward : award))
        : [...awards, { ...editingAward, id: crypto.randomUUID() }];

      await saveAwards(updatedAwards);
      setAwards(updatedAwards);
      setShowForm(false);
      setEditingAward(null);
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
          <h2 className="text-2xl font-bold">수상실적 관리</h2>
          <p className="text-muted-foreground">
            수상, 자격증, 교육 이수 등의 실적을 관리하세요. 드래그하여 순서를 변경할 수 있습니다.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />새 수상실적
        </Button>
      </div>

      {showForm && <AwardForm award={editingAward} onClose={handleFormClose} />}

      {awards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 등록된 수상실적이 없습니다.</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />첫 번째 수상실적 추가하기
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={awards.map((a) => a.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award) => (
                <SortableAwardCard
                  key={award.id}
                  award={award}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getCategoryIcon={getCategoryIcon}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
