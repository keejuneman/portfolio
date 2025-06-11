"use client"

import { useEffect, useState } from "react"
import { getStaticExperiences } from "@/lib/static-data"
import { type Experience as ExperienceType } from "@/lib/local-storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExperiences = async () => {
      const experienceData = await getStaticExperiences()
      setExperiences(experienceData)
      setLoading(false)
    }
    loadExperiences()
  }, [])

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">경력</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">지금까지의 경험과 성과를 소개합니다</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">아직 등록된 경력이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <Card key={experience.id} className="relative">
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-px bg-border"></div>
                  )}
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{experience.position}</CardTitle>
                        <CardDescription className="text-lg font-medium text-foreground">
                          {experience.company}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{experience.period}</span>
                        </div>
                      </div>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
