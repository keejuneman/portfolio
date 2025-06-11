"use client"

import { useEffect, useState } from "react"
import { getStaticAwards } from "@/lib/static-data"
import { type Award } from "@/lib/local-storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, AwardIcon, GraduationCap, Star, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAwards = async () => {
      const awardsData = await getStaticAwards();
      const sortedAwards = awardsData.sort((a, b) => a.order - b.order);
      setAwards(sortedAwards);
      setLoading(false);
    };
    loadAwards();
  }, []);

  if (loading) {
    return (
      <section id="awards" className="py-24 bg-white dark:bg-slate-900">
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

  return (
    <section id="awards" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Awards & Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            수상 경력, 자격증, 교육 이수 등 다양한 경험을 소개합니다.
          </p>
        </motion.div>

        {awards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">아직 등록된 수상실적이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full">
                  {award.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={award.imageUrl || "/placeholder.svg"}
                        alt={award.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(award.category)} text-white border-0`}>
                          {award.category}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {!award.imageUrl && (
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 bg-gradient-to-r ${getCategoryColor(award.category)} rounded-lg`}>
                          {(() => {
                            const IconComponent = getCategoryIcon(award.category)
                            return <IconComponent className="h-5 w-5 text-white" />
                          })()}
                        </div>
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(award.category)} text-white border-0`}>
                          {award.category}
                        </Badge>
                      </div>
                    )}

                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {award.title}
                    </h4>

                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{award.date}</span>
                    </div>

                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{award.organization}</p>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {award.description}
                    </p>
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
