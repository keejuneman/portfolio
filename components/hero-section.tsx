"use client"

import { useEffect, useState } from "react"
import { getStaticAbout } from "@/lib/static-data"
import { type About } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { ArrowDown, Briefcase, Download, ExternalLink, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-8"></div>
          <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-48 mx-auto"></div>
        </div>
      </section>
    )
  }

  if (!about) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-8"></div>
          <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-48 mx-auto"></div>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            <Image
              src={about?.profileImage || "/placeholder.svg"}
              alt={about?.name || "Profile"}
              fill
              className="rounded-full object-cover border-4 border-primary/20"
              priority
            />
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
          >
            {about.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-6 font-light"
          >
            {about.title}
          </motion.p>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {about.description}
          </motion.p> */}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-3 rounded-full transition-all duration-300"
              onClick={() => scrollToSection("projects")}
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Projects
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom left-1/2 transform -translate-x-1/2"
        >
          <Button variant="ghost" size="sm" className="animate-bounce" onClick={() => scrollToSection("about")}>
            <ArrowDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
