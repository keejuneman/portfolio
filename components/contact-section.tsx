"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getStaticAbout } from "@/lib/static-data"
import { type About } from "@/lib/local-storage"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Send, Copy, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function ContactSection() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedEmail, setCopiedEmail] = useState(false)

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

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const openEmailClient = (email: string) => {
    const subject = encodeURIComponent('포트폴리오 문의');
    const body = encodeURIComponent('안녕하세요,\n\n포트폴리오를 보고 연락드립니다.\n\n');
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };



  const openKakaoChat = () => {
    // 카카오톡 오픈채팅 - 실제로는 본인의 오픈채팅 URL로 변경
<<<<<<< HEAD
    window.open('https://open.kakao.com/o/sRqU6mCh', '_blank');
=======
    window.open('https://open.kakao.com/o/your-chat-id', '_blank');
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
  };

  if (!about) {
    return (
      <section id="contact" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-32 mx-auto mb-16"></div>
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
                ))}
              </div>
              <div className="h-96 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "이메일",
      value: about.email,
      href: `mailto:${about.email}`,
      color: "blue",
      description: "직접 이메일로 연락주세요",
      action: () => openEmailClient(about.email)
    },
    {
      icon: Phone,
      label: "전화번호",
      value: about.phone,
      href: `tel:${about.phone}`,
      color: "green",
      description: "전화로 바로 연결됩니다",
      action: null
    },
    {
      icon: MapPin,
      label: "위치",
      value: about.location,
      href: null,
      color: "purple",
      description: "현재 위치",
      action: null
    }
  ]

  const quickContactOptions = [
    {
      icon: MessageCircle,
      label: "카카오톡",
      description: "카카오톡 오픈채팅으로 빠른 소통",
      color: "slate",
      action: openKakaoChat
    },
    {
      icon: Send,
      label: "이메일 보내기",
      description: "이메일 클라이언트로 바로 연결",
      color: "slate",
      action: () => openEmailClient(about.email)
    },
    {
      icon: Copy,
      label: copiedEmail ? "복사됨!" : "이메일 복사",
      description: "이메일 주소를 클립보드에 복사",
      color: copiedEmail ? "green" : "slate",
      action: () => copyEmail(about.email)
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: about.github,
      color: "slate",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: about.linkedin,
      color: "blue",
    },
    {
      icon: Globe,
      label: "Website",
      href: about.website,
      color: "purple",
    },
  ]

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            새로운 기회와 협업을 언제나 환영합니다. 편한 방법으로 연락주세요!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">연락처 정보</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-${method.color}-100 dark:bg-${method.color}-900/30 rounded-xl`}>
                          <method.icon className={`h-6 w-6 text-${method.color}-600 dark:text-${method.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{method.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{method.description}</p>
                          {method.href ? (
                            <a
                              href={method.href}
                              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400">{method.value}</span>
                          )}
                        </div>
                        {method.action && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={method.action}
                            className="shrink-0"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">소셜 링크</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="p-4 border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                      asChild
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="h-6 w-6" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">빠른 연락 방법</h3>
              <div className="space-y-4">
                {quickContactOptions.map((option, index) => (
                  <motion.div
                    key={option.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      onClick={option.action}
                      className={`w-full p-6 h-auto bg-gradient-to-r from-${option.color}-50 to-${option.color}-100 dark:from-${option.color}-900/20 dark:to-${option.color}-800/20 border border-${option.color}-200 dark:border-${option.color}-800 hover:from-${option.color}-100 hover:to-${option.color}-200 dark:hover:from-${option.color}-800/30 dark:hover:to-${option.color}-700/30 text-slate-900 dark:text-white transition-all duration-300`}
                      variant="outline"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div className={`p-3 bg-${option.color}-200 dark:bg-${option.color}-800 rounded-xl`}>
                          <option.icon className={`h-6 w-6 text-${option.color}-700 dark:text-${option.color}-300`} />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-semibold text-lg">{option.label}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{option.description}</p>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
