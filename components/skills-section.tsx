"use client"

import { useEffect, useState } from "react"
import { getStaticSkills } from "@/lib/static-data"
import { type Skill } from "@/lib/local-storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      const skillsData = await getStaticSkills();
      const sortedSkills = skillsData.sort((a, b) => a.order - b.order);
      setSkills(sortedSkills);
      setLoading(false);
    };
    loadSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-32 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
              ))}
            </div>
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

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "from-red-500 to-red-600"
      case 2:
        return "from-orange-500 to-orange-600"
      case 3:
        return "from-yellow-500 to-yellow-600"
      case 4:
        return "from-blue-500 to-blue-600"
      case 5:
        return "from-green-500 to-green-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {Object.keys(skillsByCategory).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">아직 등록된 기술이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{category}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                  </div>

                  <div className="space-y-6">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.6,
                        }}
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-900 dark:text-white">{skill.name}</span>
                          <Badge className={`bg-gradient-to-r ${getLevelColor(skill.level)} text-white border-0`}>
                            {getLevelText(skill.level)}
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress value={skill.level * 20} className="h-3 bg-slate-200 dark:bg-slate-600" />
                          <div
                            className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${getLevelColor(skill.level)} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level * 20}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
