"use client"

import { useEffect, useState } from "react"
import { getAbout, type About as AboutType } from "@/lib/local-storage"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function About() {
  const [about, setAbout] = useState<AboutType | null>(null)

  useEffect(() => {
    const aboutData = getAbout()
    setAbout(aboutData)
  }, [])

  if (!about) {
    return (
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">소개</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">저에 대해 더 자세히 알아보세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="text-center md:text-left">
            <div className="relative w-64 h-64 mx-auto md:mx-0 mb-6">
              <Image
                src={about.profileImage || "/placeholder.svg"}
                alt={about.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{about.name}</h3>
              <p className="text-xl text-primary mb-4">{about.title}</p>
              <p className="text-muted-foreground leading-relaxed">{about.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">연락처</h4>
                  <p className="text-sm text-muted-foreground">{about.email}</p>
                  <p className="text-sm text-muted-foreground">{about.phone}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">위치</h4>
                  <p className="text-sm text-muted-foreground">{about.location}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
