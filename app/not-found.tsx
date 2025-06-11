"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center space-y-8 p-8">
        {/* 404 애니메이션 */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-700 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">페이지를 찾을 수 없습니다</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              홈으로 돌아가기
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            이전 페이지
          </Button>
        </div>

        {/* 도움말 링크 */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            문제가 지속되면{" "}
            <Link href="/#contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              연락처
            </Link>
            로 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
