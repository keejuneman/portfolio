"use client"

import { useEffect, useState } from "react"
import { getStaticSkills } from "@/lib/static-data"
import { type Skill } from "@/lib/local-storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      const skillsData = await getStaticSkills()
      setSkills(skillsData)
      setLoading(false)
    }
    loadSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
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

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">기술 스택</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">보유하고 있는 기술과 숙련도를 소개합니다</p>
        </div>

        {Object.keys(skillsByCategory).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 등록된 기술이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {getLevelText(skill.level)}
                          </Badge>
                        </div>
                        <Progress value={skill.level * 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
