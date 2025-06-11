"use client"

import { useEffect, useState } from "react"
import { getAbout, type About } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Github, Mail, ExternalLink, ChevronDown } from "lucide-react"

export function Hero() {
  const [about, setAbout] = useState<About | null>(null)

  useEffect(() => {
    const aboutData = getAbout()
    setAbout(aboutData)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!about) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-muted rounded w-96 mx-auto mb-8"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-10 bg-muted rounded w-24"></div>
              <div className="h-10 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {about.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">{about.title}</p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">{about.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection("contact")}>
              <Mail className="h-4 w-4 mr-2" />
              연락하기
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href={about.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto" asChild>
              <a href={about.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                포트폴리오
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* 스크롤 다운 버튼 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button variant="ghost" size="sm" className="animate-bounce" onClick={() => scrollToSection("about")}>
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
