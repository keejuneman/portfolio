# GitHub Actions 설정 가이드

이 프로젝트는 GitHub Actions를 사용하여 CI/CD 파이프라인을 구축했습니다.

## 📋 워크플로우 개요

### 1. CI 워크플로우 (`ci.yml`)
- **트리거**: `main`, `develop` 브랜치에 push 또는 PR 생성 시
- **기능**:
  - Node.js 18.x, 20.x 버전에서 테스트
  - TypeScript 타입 검사
  - ESLint 코드 품질 검사
  - 프로젝트 빌드 테스트

### 2. 배포 워크플로우 (`deploy.yml`)
- **트리거**: `main` 브랜치에 push 시
- **기능**:
  - 프로덕션 빌드
  - Vercel에 자동 배포 (설정 필요)

### 3. 코드 품질 워크플로우 (`code-quality.yml`)
- **트리거**: `main`, `develop` 브랜치에 push 또는 PR 생성 시
- **기능**:
  - ESLint 검사
  - TypeScript 검사
  - 사용하지 않는 의존성 검사
  - 보안 취약점 검사
  - 번들 크기 검사

## 🔧 설정 방법

### 1. GitHub Secrets 설정

배포를 위해 다음 secrets를 GitHub 저장소에 추가해야 합니다:

#### Vercel 배포용:
- `VERCEL_TOKEN`: Vercel 계정 토큰
- `ORG_ID`: Vercel 조직 ID
- `PROJECT_ID`: Vercel 프로젝트 ID

#### Netlify 배포용 (대안):
- `NETLIFY_AUTH_TOKEN`: Netlify 인증 토큰
- `NETLIFY_SITE_ID`: Netlify 사이트 ID

### 2. Secrets 추가 방법

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 필요한 secrets 추가

### 3. Vercel 토큰 생성

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. Settings → Tokens → Create Token
3. 생성된 토큰을 `VERCEL_TOKEN`으로 추가

### 4. 프로젝트 ID 확인

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 연결
vercel link

# 프로젝트 정보 확인
vercel project ls
```

## 🚀 사용 방법

### 자동 실행
- 코드를 `main` 또는 `develop` 브랜치에 push하면 자동으로 워크플로우가 실행됩니다.
- Pull Request 생성 시에도 CI 검사가 자동으로 실행됩니다.

### 수동 실행
1. GitHub 저장소 → Actions 탭
2. 실행하고 싶은 워크플로우 선택
3. "Run workflow" 버튼 클릭

## 📊 상태 확인

### 배지 상태
README.md 파일의 상단에 있는 배지를 통해 빌드 상태를 확인할 수 있습니다:
- ✅ 녹색: 성공
- ❌ 빨간색: 실패
- 🟡 노란색: 진행 중

### 상세 로그 확인
1. GitHub 저장소 → Actions 탭
2. 확인하고 싶은 워크플로우 실행 클릭
3. 각 단계별 로그 확인 가능

## 🔄 Dependabot 설정

`dependabot.yml` 파일을 통해 의존성 자동 업데이트가 설정되어 있습니다:
- 매주 월요일 오전 9시에 npm 패키지 업데이트 확인
- GitHub Actions 워크플로우 업데이트 확인
- 자동으로 PR 생성

## 🛠️ 커스터마이징

### 브랜치 변경
워크플로우 파일에서 `branches` 설정을 수정하여 다른 브랜치에서도 실행되도록 할 수 있습니다.

### 배포 대상 변경
`deploy.yml` 파일에서 Vercel 대신 다른 호스팅 서비스를 사용하도록 수정할 수 있습니다.

### 추가 검사 항목
`code-quality.yml` 파일에 더 많은 코드 품질 검사 도구를 추가할 수 있습니다.

## 🐛 문제 해결

### 빌드 실패 시
1. Actions 탭에서 실패한 워크플로우 확인
2. 로그를 통해 오류 원인 파악
3. 로컬에서 동일한 명령어 실행하여 테스트

### 배포 실패 시
1. Secrets 설정 확인
2. Vercel/Netlify 계정 상태 확인
3. 토큰 유효성 확인

## 📚 참고 자료

- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Vercel GitHub Actions](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- [Dependabot 설정](https://docs.github.com/en/code-security/dependabot)

---

**Happy Deploying! 🚀** 