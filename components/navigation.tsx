"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Home, User, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showAdminButton, setShowAdminButton] = useState(false)
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogoClick = () => {
    // 기존 타임아웃 클리어
    if (clickTimeout) {
      clearTimeout(clickTimeout)
    }

    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    // 5번 클릭하면 관리자 버튼 표시
    if (newCount >= 5) {
      setShowAdminButton(true)
      setLogoClickCount(0)

      // 개발 환경에서만 콘솔 메시지 표시
      if (process.env.NODE_ENV === "development") {
        console.log("🔓 관리자 모드가 활성화되었습니다!")
      }

      // 10초 후 자동으로 숨김
      setTimeout(() => {
        setShowAdminButton(false)
      }, 10000)
    } else {
      // 3초 내에 다음 클릭이 없으면 카운트 리셋
      const timeout = setTimeout(() => {
        setLogoClickCount(0)
      }, 3000)
      setClickTimeout(timeout)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Awards", id: "awards" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer select-none"
        >
          Portfolio
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {pathname === "/" ? (
            <>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />홈
              </Link>
            </Button>
          )}

          {/* 관리자 버튼 - 클릭 시퀀스로만 표시 */}
          {showAdminButton && pathname !== "/admin" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/admin">
                  <User className="h-4 w-4 mr-2" />
                  관리자
                </Link>
              </Button>
            </motion.div>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {pathname === "/" ? (
              <>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : (
              <Link
                href="/"
                className="block py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
            )}

            {/* 모바일에서도 관리자 버튼 표시 */}
            {showAdminButton && pathname !== "/admin" && (
              <Link
                href="/admin"
                className="block py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors border-t border-red-200 dark:border-red-800 pt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                관리자 모드
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
