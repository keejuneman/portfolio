"use client"

import { useEffect, useState } from "react"
import { getAbout, type About } from "@/lib/local-storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react"

export function Contact() {
  const [about, setAbout] = useState<About | null>(null)

  useEffect(() => {
    const aboutData = getAbout()
    setAbout(aboutData)
  }, [])

  if (!about) {
    return (
      <section id="contact" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const contactItems = [
    {
      icon: Mail,
      label: "이메일",
      value: about.email,
      href: `mailto:${about.email}`,
    },
    {
      icon: Phone,
      label: "전화번호",
      value: about.phone,
      href: `tel:${about.phone}`,
    },
    {
      icon: MapPin,
      label: "위치",
      value: about.location,
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: about.github,
    },
    // {
    //   icon: Linkedin,
    //   label: "LinkedIn",
    //   href: about.linkedin,
    // },
    {
      icon: Globe,
      label: "Website",
      href: about.website,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">연락처</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            언제든지 연락주세요. 새로운 기회와 협업을 기다리고 있습니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {contactItems.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{item.value}</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">소셜 링크</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link, index) => (
                  <Button key={index} variant="outline" size="lg" asChild>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <link.icon className="h-5 w-5 mr-2" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
