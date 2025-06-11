"use client"

import { useEffect, useState } from "react"
import { getStaticAbout } from "@/lib/static-data"
import { type About } from "@/lib/local-storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export function AboutSection() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const aboutData = await getStaticAbout();
        setAbout(aboutData);
        setLoading(false);
      } catch (error) {
        console.error('About data loading error:', error);
        setLoading(false);
      }
    };
    loadAbout();
  }, []);

  if (!about) {
    return (
      <section id="about" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-32 mx-auto mb-16"></div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-4">
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
              <div className="h-64 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const stats = [
    { label: "프로젝트", value: about?.stats?.projects || "0+" },
    { label: "도입 솔루션", value: about?.stats?.solutions || "0+" },
    { label: "총 경력", value: about?.stats?.experience || "0년+" },
    { label: "기술 스택", value: about?.stats?.skills || "0+" },
  ]

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {about.name}
              </h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-6">
                {about.title}
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {about.description}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-slate-600 dark:text-slate-400">{about.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-slate-600 dark:text-slate-400">{about.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-slate-600 dark:text-slate-400">{about.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
