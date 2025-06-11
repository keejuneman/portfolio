export interface Project {
  id: string
  title: string
  description: string
  detailDescription?: string
  techStack: string[]
  imageUrl: string
  images?: string[]
  startDate?: string
  endDate?: string
  role?: string
  contributions?: ProjectContribution[]
  results?: string[]
  links?: ProjectLink[]
  retrospective?: string
  tags?: string[]
  category?: string
  createdAt: string
  order: number
}

export interface ProjectContribution {
  area: string // 기여 영역 (예: Frontend Development, Backend API, Database Design 등)
  percentage: number // 0-100
}

export interface ProjectLink {
  type: string // 'github', 'demo', 'video', 'other'
  url: string
  label: string
}

export interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
  createdAt: string
  order: number
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number // 1-5
  createdAt: string
  order: number
}

export interface Award {
  id: string
  title: string
  organization: string
  date: string
  description: string
  category: string // 수상, 자격증, 교육, 기타
  imageUrl?: string
  createdAt: string
  order: number
}

export interface About {
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  website: string
  profileImage: string
  stats: {
    projects: string
    solutions: string
    experience: string
    skills: string
  }
}

export interface User {
  email: string
  isAuthenticated: boolean
}

export const PROJECTS_KEY = "portfolio_projects"
export const EXPERIENCES_KEY = "portfolio_experiences"
export const SKILLS_KEY = "portfolio_skills"
export const AWARDS_KEY = "portfolio_awards"
export const ABOUT_KEY = "portfolio_about"
export const USER_KEY = "portfolio_user"

export const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
}

// 프로젝트 관리
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/api/data?type=projects');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const saveProject = async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
  const projects = await getProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  const updatedProjects = [newProject, ...projects];
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'projects', content: updatedProjects }),
  });
  return newProject;
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project | null> => {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) return null;

  const updatedProject = { ...projects[index], ...updates };
  projects[index] = updatedProject;
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'projects', content: projects }),
  });
  return updatedProject;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  const projects = await getProjects();
  const filteredProjects = projects.filter((p) => p.id !== id);

  if (filteredProjects.length === projects.length) return false;

  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'projects', content: filteredProjects }),
  });
  return true;
};

export const updateProjectsOrder = async (projectIds: string[]): Promise<void> => {
  const projects = await getProjects();
  const updatedProjects = projects.map((project) => {
    const newOrder = projectIds.indexOf(project.id);
    return { ...project, order: newOrder >= 0 ? newOrder : project.order };
  });
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'projects', content: updatedProjects }),
  });
};

// 경력 관리
export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await fetch('/api/data?type=experiences');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const saveExperience = async (experience: Omit<Experience, 'id' | 'createdAt'>): Promise<Experience> => {
  const experiences = await getExperiences();
  const newExperience: Experience = {
    ...experience,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  const updatedExperiences = [newExperience, ...experiences];
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'experiences', content: updatedExperiences }),
  });
  return newExperience;
};

export const updateExperience = async (id: string, updates: Partial<Experience>): Promise<Experience | null> => {
  const experiences = await getExperiences();
  const index = experiences.findIndex((e) => e.id === id);

  if (index === -1) return null;

  const updatedExperience = { ...experiences[index], ...updates };
  experiences[index] = updatedExperience;
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'experiences', content: experiences }),
  });
  return updatedExperience;
};

export const deleteExperience = async (id: string): Promise<boolean> => {
  const experiences = await getExperiences();
  const filteredExperiences = experiences.filter((e) => e.id !== id);

  if (filteredExperiences.length === experiences.length) return false;

  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'experiences', content: filteredExperiences }),
  });
  return true;
};

export const updateExperiencesOrder = async (experienceIds: string[]): Promise<void> => {
  const experiences = await getExperiences();
  const updatedExperiences = experiences.map((experience) => {
    const newOrder = experienceIds.indexOf(experience.id);
    return { ...experience, order: newOrder >= 0 ? newOrder : experience.order };
  });
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'experiences', content: updatedExperiences }),
  });
};

// 기술 스택 관리
export const getSkills = async (): Promise<Skill[]> => {
  try {
    const response = await fetch('/api/data?type=skills');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const saveSkill = async (skill: Omit<Skill, 'id' | 'createdAt'>): Promise<Skill> => {
  const skills = await getSkills();
  const newSkill: Skill = {
    ...skill,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  const updatedSkills = [...skills, newSkill];
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'skills', content: updatedSkills }),
  });
  return newSkill;
};

export const updateSkill = async (id: string, updates: Partial<Skill>): Promise<Skill | null> => {
  const skills = await getSkills();
  const index = skills.findIndex((s) => s.id === id);

  if (index === -1) return null;

  const updatedSkill = { ...skills[index], ...updates };
  skills[index] = updatedSkill;
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'skills', content: skills }),
  });
  return updatedSkill;
};

export const deleteSkill = async (id: string): Promise<boolean> => {
  const skills = await getSkills();
  const filteredSkills = skills.filter((s) => s.id !== id);

  if (filteredSkills.length === skills.length) return false;

  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'skills', content: filteredSkills }),
  });
  return true;
};

export const updateSkillsOrder = async (skillIds: string[]): Promise<void> => {
  const skills = await getSkills();
  const updatedSkills = skills.map((skill) => {
    const newOrder = skillIds.indexOf(skill.id);
    return { ...skill, order: newOrder >= 0 ? newOrder : skill.order };
  });
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'skills', content: updatedSkills }),
  });
};

// 수상실적 관리
export const getAwards = async (): Promise<Award[]> => {
  try {
    const response = await fetch('/api/data?type=awards');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const saveAward = async (award: Omit<Award, 'id' | 'createdAt'>): Promise<Award> => {
  const awards = await getAwards();
  const newAward: Award = {
    ...award,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  const updatedAwards = [newAward, ...awards];
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'awards', content: updatedAwards }),
  });
  return newAward;
};

export const updateAward = async (id: string, updates: Partial<Award>): Promise<Award | null> => {
  const awards = await getAwards();
  const index = awards.findIndex((a) => a.id === id);

  if (index === -1) return null;

  const updatedAward = { ...awards[index], ...updates };
  awards[index] = updatedAward;
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'awards', content: awards }),
  });
  return updatedAward;
};

export const deleteAward = async (id: string): Promise<boolean> => {
  const awards = await getAwards();
  const filteredAwards = awards.filter((a) => a.id !== id);

  if (filteredAwards.length === awards.length) return false;

  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'awards', content: filteredAwards }),
  });
  return true;
};

export const updateAwardsOrder = async (awardIds: string[]): Promise<void> => {
  const awards = await getAwards();
  const updatedAwards = awards.map((award) => {
    const newOrder = awardIds.indexOf(award.id);
    return { ...award, order: newOrder >= 0 ? newOrder : award.order };
  });
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'awards', content: updatedAwards }),
  });
};

// 소개 정보 관리
export const getAbout = async (): Promise<About> => {
  try {
    const response = await fetch('/api/data?type=about');
    if (!response.ok) return getDefaultAbout();
    return await response.json();
  } catch {
    return getDefaultAbout();
  }
};

export const saveAbout = async (about: About): Promise<void> => {
  await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'about', content: about }),
  });
};

const getDefaultAbout = (): About => ({
  name: "김개발",
  title: "AI & 자동화 전문가",
  description:
    "Python 개발과 다양한 AI 툴을 활용하여 효율적인 자동화 솔루션을 제공합니다. 혁신적인 기술로 복잡한 문제를 간단하게 해결하는 것을 좋아합니다.",
  email: "contact@example.com",
  phone: "+82-10-1234-5678",
  location: "서울, 대한민국",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  website: "https://portfolio.example.com",
  profileImage: "/placeholder.svg?height=300&width=300",
  stats: {
    projects: "50+",
    solutions: "10+",
    experience: "2년+",
    skills: "15+"
  }
})

// 사용자 인증
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem("portfolio_auth", "true")
      return true
    }
    return false
  } catch (error) {
    console.error('Login error:', error)
    return false
  }
}

export const logout = async (): Promise<void> => {
  try {
    sessionStorage.removeItem("portfolio_auth")
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    return sessionStorage.getItem("portfolio_auth") === "true"
  } catch (error) {
    console.error('Authentication check error:', error)
    return false
  }
}

// 초기 데모 데이터
export const initializeDemoData = async (): Promise<void> => {
  // 프로젝트 데모 데이터
  const existingProjects = await getProjects();
  if (existingProjects.length === 0) {
    const demoProjects: Project[] = [
      {
        id: "1",
        title: "AI 챗봇 자동화 시스템",
        description: "Python과 OpenAI API를 활용한 고객 서비스 자동화 챗봇입니다.",
        detailDescription:
          "고객 문의를 자동으로 분류하고 적절한 답변을 제공하는 AI 챗봇 시스템입니다. 자연어 처리 기술을 활용하여 고객의 의도를 파악하고, 맞춤형 응답을 생성합니다.",
        techStack: ["Python", "OpenAI API", "FastAPI", "React"],
        imageUrl: "/placeholder.svg?height=200&width=400",
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
        startDate: "2023.03",
        endDate: "2023.08",
        role: "풀스택 개발자 (개인 프로젝트)",
        contributions: [
          { area: "Backend API 개발", percentage: 90 },
          { area: "Frontend 개발", percentage: 70 },
          { area: "AI 모델 통합", percentage: 85 },
          { area: "데이터베이스 설계", percentage: 100 },
        ],
        results: ["고객 응답 시간 70% 단축", "고객 만족도 85% 향상", "운영 비용 40% 절감"],
        links: [
          { type: "github", url: "https://github.com/example/chatbot", label: "GitHub Repository" },
          { type: "demo", url: "https://chatbot-demo.com", label: "Live Demo" },
        ],
        retrospective:
          "OpenAI API의 토큰 제한과 비용 최적화가 주요 과제였습니다. 향후 로컬 LLM 도입을 고려하고 있습니다.",
        tags: ["AI", "Chatbot", "Automation"],
        category: "AI/ML",
        createdAt: new Date().toISOString(),
        order: 0,
      },
      {
        id: "2",
        title: "데이터 분석 대시보드",
        description: "비즈니스 데이터를 실시간으로 분석하고 시각화하는 대시보드입니다.",
        detailDescription:
          "다양한 데이터 소스에서 수집된 정보를 실시간으로 분석하고 시각화하여 비즈니스 인사이트를 제공하는 대시보드 시스템입니다.",
        techStack: ["Python", "Pandas", "Plotly", "Streamlit"],
        imageUrl: "/placeholder.svg?height=200&width=400",
        startDate: "2023.01",
        endDate: "2023.04",
        role: "데이터 분석가 및 백엔드 개발자",
        contributions: [
          { area: "데이터 분석", percentage: 95 },
          { area: "시각화 개발", percentage: 80 },
          { area: "백엔드 개발", percentage: 60 },
        ],
        results: ["데이터 처리 속도 60% 향상", "의사결정 시간 50% 단축"],
        links: [{ type: "github", url: "https://github.com/example/dashboard", label: "GitHub Repository" }],
        tags: ["Data Analysis", "Visualization", "Dashboard"],
        category: "Data Science",
        createdAt: new Date().toISOString(),
        order: 1,
      },
      {
        id: "3",
        title: "웹 스크래핑 자동화",
        description: "다양한 웹사이트에서 데이터를 자동으로 수집하고 정제하는 시스템입니다.",
        detailDescription:
          "여러 웹사이트에서 정기적으로 데이터를 수집하고, 정제하여 데이터베이스에 저장하는 자동화 시스템입니다. 스케줄링 기능을 통해 정기적인 데이터 업데이트가 가능합니다.",
        techStack: ["Python", "Selenium", "BeautifulSoup", "Celery"],
        imageUrl: "/placeholder.svg?height=200&width=400",
        startDate: "2022.11",
        endDate: "2023.02",
        role: "백엔드 개발자",
        contributions: [
          { area: "스크래핑 로직 개발", percentage: 100 },
          { area: "데이터 정제", percentage: 90 },
          { area: "스케줄링 시스템", percentage: 85 },
        ],
        results: ["수동 작업 시간 90% 단축", "데이터 정확도 95% 달성"],
        links: [{ type: "github", url: "https://github.com/example/scraper", label: "GitHub Repository" }],
        tags: ["Web Scraping", "Automation", "Data Collection"],
        category: "Automation",
        createdAt: new Date().toISOString(),
        order: 2,
      },
    ]
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'projects', content: demoProjects }),
    });
  }

  // 경력 데모 데이터
  const existingExperiences = await getExperiences();
  if (existingExperiences.length === 0) {
    const demoExperiences: Experience[] = [
      {
        id: "1",
        company: "테크 스타트업",
        position: "AI 개발자",
        period: "2022.03 - 현재",
        description: "AI 기반 자동화 솔루션 개발 및 데이터 분석 업무를 담당하고 있습니다.",
        achievements: [
          "고객 서비스 챗봇 개발로 응답 시간 70% 단축",
          "데이터 파이프라인 자동화로 처리 효율성 50% 향상",
          "머신러닝 모델 최적화로 예측 정확도 15% 개선",
        ],
        createdAt: new Date().toISOString(),
        order: 0,
      },
      {
        id: "2",
        company: "IT 솔루션 회사",
        position: "Python 개발자",
        period: "2020.06 - 2022.02",
        description: "웹 애플리케이션 개발 및 데이터 처리 시스템 구축을 담당했습니다.",
        achievements: [
          "Django 기반 웹 애플리케이션 5개 프로젝트 완료",
          "API 성능 최적화로 응답 속도 40% 개선",
          "자동화 스크립트 개발로 업무 효율성 60% 향상",
        ],
        createdAt: new Date().toISOString(),
        order: 1,
      },
    ]
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'experiences', content: demoExperiences }),
    });
  }

  // 기술 스택 데모 데이터
  const existingSkills = await getSkills();
  if (existingSkills.length === 0) {
    const demoSkills: Skill[] = [
      { id: "1", name: "Python", category: "Programming", level: 5, createdAt: new Date().toISOString(), order: 0 },
      { id: "2", name: "JavaScript", category: "Programming", level: 4, createdAt: new Date().toISOString(), order: 1 },
      { id: "3", name: "React", category: "Frontend", level: 4, createdAt: new Date().toISOString(), order: 2 },
      { id: "4", name: "Next.js", category: "Frontend", level: 3, createdAt: new Date().toISOString(), order: 3 },
      { id: "5", name: "Django", category: "Backend", level: 4, createdAt: new Date().toISOString(), order: 4 },
      { id: "6", name: "FastAPI", category: "Backend", level: 4, createdAt: new Date().toISOString(), order: 5 },
      { id: "7", name: "PostgreSQL", category: "Database", level: 3, createdAt: new Date().toISOString(), order: 6 },
      { id: "8", name: "MongoDB", category: "Database", level: 3, createdAt: new Date().toISOString(), order: 7 },
      { id: "9", name: "Docker", category: "DevOps", level: 3, createdAt: new Date().toISOString(), order: 8 },
      { id: "10", name: "AWS", category: "Cloud", level: 3, createdAt: new Date().toISOString(), order: 9 },
      { id: "11", name: "OpenAI API", category: "AI/ML", level: 4, createdAt: new Date().toISOString(), order: 10 },
      { id: "12", name: "Pandas", category: "AI/ML", level: 5, createdAt: new Date().toISOString(), order: 11 },
    ]
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'skills', content: demoSkills }),
    });
  }

  // 수상실적 데모 데이터
  const existingAwards = await getAwards();
  if (existingAwards.length === 0) {
    const demoAwards: Award[] = [
      {
        id: "1",
        title: "AI 해커톤 대상",
        organization: "한국인공지능협회",
        date: "2023.11",
        description: "자연어 처리를 활용한 고객 서비스 자동화 솔루션으로 대상 수상",
        category: "수상",
        imageUrl: "/placeholder.svg?height=200&width=300",
        createdAt: new Date().toISOString(),
        order: 0,
      },
      {
        id: "2",
        title: "정보처리기사",
        organization: "한국산업인력공단",
        date: "2022.08",
        description: "정보처리 분야의 전문 지식과 실무 능력을 인정받아 취득",
        category: "자격증",
        createdAt: new Date().toISOString(),
        order: 1,
      },
      {
        id: "3",
        title: "AWS Solutions Architect Associate",
        organization: "Amazon Web Services",
        date: "2023.03",
        description: "클라우드 아키텍처 설계 및 구현 능력 인증",
        category: "자격증",
        createdAt: new Date().toISOString(),
        order: 2,
      },
      {
        id: "4",
        title: "머신러닝 전문가 과정",
        organization: "패스트캠퍼스",
        date: "2022.12",
        description: "6개월간의 집중 교육을 통한 머신러닝 전문 지식 습득",
        category: "교육",
        createdAt: new Date().toISOString(),
        order: 3,
      },
    ]
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'awards', content: demoAwards }),
    });
  }

  // 소개 정보 초기화
  const existingAbout = await getAbout();
  if (!existingAbout) {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'about', content: getDefaultAbout() }),
    });
  }
};