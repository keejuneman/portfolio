# 🚀 AI & 자동화 전문가 포트폴리오

[![CI](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/workflows/CI/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions/workflows/ci.yml)
[![Deploy](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/workflows/Deploy%20to%20Production/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions/workflows/deploy.yml)
[![Code Quality](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/workflows/Code%20Quality/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions/workflows/code-quality.yml)

Next.js로 구축된 개인 포트폴리오 웹사이트입니다. 관리자 패널을 통해 프로젝트, 경력, 기술 스택 등을 동적으로 관리할 수 있습니다.

## ✨ 주요 기능

- 📱 **반응형 디자인** - 모든 디바이스에서 완벽하게 작동
- 🌙 **다크모드 지원** - 라이트/다크 테마 전환
- 🔐 **관리자 패널** - 콘텐츠 실시간 관리
- 🎨 **모던 UI** - Tailwind CSS + shadcn/ui
- ⚡ **빠른 성능** - Next.js 최적화
- 🎭 **애니메이션** - Framer Motion 효과

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Actions

## 💻 로컬 개발

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
\`\`\`

## 🔐 관리자 접근

1. 로고를 **5번 연속 클릭**하여 관리자 버튼 활성화
2. 관리자 버튼 클릭 → 로그인 페이지 이동
3. 기본 계정:
   - **이메일**: admin@portfolio.com
   - **비밀번호**: admin123

## 📁 프로젝트 구조

\`\`\`
portfolio-firebase/
├── app/                    # Next.js App Router
│   ├── admin/             # 관리자 페이지
│   ├── login/             # 로그인 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 글로벌 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── admin/            # 관리자 컴포넌트
│   └── ...               # 기타 컴포넌트
├── lib/                  # 유틸리티 함수
│   └── local-storage.ts  # 데이터 관리
├── public/               # 정적 파일

├── next.config.js        # Next.js 설정
└── package.json          # 프로젝트 설정
\`\`\`

## 🔧 커스터마이징

### 개인 정보 수정
1. 관리자 패널 → **소개** 탭
2. 이름, 직책, 설명 등 수정

### 프로젝트 추가
1. 관리자 패널 → **프로젝트** 탭
2. **새 프로젝트** 버튼 클릭

### 스타일 변경
- `app/globals.css`: 전역 스타일
- `tailwind.config.ts`: Tailwind 설정

## 🐛 문제 해결

### 빌드 에러
\`\`\`bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
\`\`\`

### 환경변수 문제
- `.env.local` 파일 확인

### 라우팅 문제
- 브라우저 캐시 삭제

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. [Next.js 문서](https://nextjs.org/docs)
2. [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/issues)

---

**Happy Coding! 🚀**

## EC2 배포 가이드

### 1. EC2 인스턴스 설정

1. EC2 인스턴스 생성
   - Amazon Linux 2023 AMI 선택
   - t2.micro 이상 권장
   - 보안 그룹에서 HTTP(80), HTTPS(443) 포트 개방

2. 인스턴스 접속
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

### 2. 필요한 소프트웨어 설치

```bash
# Node.js 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# PM2 설치
npm install -g pm2

# Git 설치
sudo yum update -y
sudo yum install git -y
```

### 3. 프로젝트 배포

```bash
# 프로젝트 클론
git clone your-repository-url
cd portfolio

# 의존성 설치
npm install

# 프로젝트 빌드 및 실행
npm run deploy
```

### 4. Nginx 설정

```bash
# Nginx 설치
sudo yum install nginx -y

# Nginx 설정 파일 생성
sudo nano /etc/nginx/conf.d/portfolio.conf
```

다음 내용을 추가:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Nginx 시작
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. SSL 인증서 설정 (선택사항)

```bash
# Certbot 설치
sudo yum install certbot python3-certbot-nginx -y

# SSL 인증서 발급
sudo certbot --nginx -d your-domain.com
```

### 6. 유지보수 명령어

```bash
# 로그 확인
pm2 logs

# 프로젝트 재시작
pm2 restart portfolio

# 프로젝트 상태 확인
pm2 status
```

## 문제 해결

1. 포트 충돌 시:
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

2. Nginx 오류 로그 확인:
```bash
sudo tail -f /var/log/nginx/error.log
```

3. PM2 로그 확인:
```bash
pm2 logs portfolio
```
