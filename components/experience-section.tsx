"use client"

import { useEffect, useState } from "react"
import { getStaticExperiences } from "@/lib/static-data"
import { type Experience } from "@/lib/local-storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExperiences = async () => {
      const experiencesData = await getStaticExperiences();
      // order 기준으로 정렬
      const sortedExperiences = experiencesData.sort((a, b) => a.order - b.order);
      setExperiences(sortedExperiences);
      setLoading(false);
    };
    loadExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-32 mx-auto mb-16"></div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">아직 등록된 경력이 없습니다.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 to-purple-600"></div>

              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-slate-800"></div>

                    <div className="ml-20">
                      <Card className="p-8 bg-white dark:bg-slate-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                          <div className="flex items-start gap-4 mb-4 lg:mb-0">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                {experience.position}
                              </h3>
                              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                {experience.company}
                              </p>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-400">{experience.period}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                          {experience.description}
                        </p>

                        {experience.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              주요 성과
                            </h4>
                            <div className="grid gap-3">
                              {experience.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.2 + idx * 0.1, duration: 0.6 }}
                                  viewport={{ once: true }}
                                  className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                                >
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mt-0.5">
                                    {idx + 1}
                                  </Badge>
                                  <span className="text-slate-700 dark:text-slate-300">{achievement}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
