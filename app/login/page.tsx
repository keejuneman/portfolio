"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // 2초 후 관리자 페이지로 리다이렉트
    const timer = setTimeout(() => {
      router.replace('/admin')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">
              관리자 대시보드로 이동 중
            </CardTitle>
            <CardDescription>
              잠시만 기다려주세요...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed text-center">
                정적 사이트에서는 별도 로그인 없이 바로 관리자 기능을 사용할 수 있습니다.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <Link 
                href="/admin"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors w-full justify-center"
              >
                <ExternalLink className="h-4 w-4" />
                수동으로 이동하기
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
