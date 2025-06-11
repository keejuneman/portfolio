import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 🔄 라우팅 미들웨어 (404 에러 방지)

  const { pathname } = request.nextUrl

  // API 라우트는 그대로 통과
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // 정적 파일들은 그대로 통과
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // 존재하는 페이지 경로들
  const validPaths = ["/", "/admin", "/login"]

  // 유효한 경로면 그대로 통과
  if (validPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // 그 외의 경우 홈으로 리다이렉트 (404 대신)
  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  // 미들웨어가 실행될 경로 패턴
  matcher: [
    /*
     * 다음을 제외한 모든 요청에 대해 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
