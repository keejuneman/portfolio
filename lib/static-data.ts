import { Project, Experience, Skill, Award, About } from './local-storage'

// basePath를 고려한 데이터 경로 생성
const getDataPath = (filename: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : ''
  return `${basePath}/data/${filename}`
}

// 정적 데이터 로더
export const getStaticProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(getDataPath('projects.json'))
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export const getStaticExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await fetch(getDataPath('experiences.json'))
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export const getStaticSkills = async (): Promise<Skill[]> => {
  try {
    const response = await fetch(getDataPath('skills.json'))
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export const getStaticAwards = async (): Promise<Award[]> => {
  try {
    const response = await fetch(getDataPath('awards.json'))
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export const getStaticAbout = async (): Promise<About> => {
  try {
    const response = await fetch(getDataPath('about.json'))
    if (!response.ok) throw new Error('Failed to load about data')
    return await response.json()
  } catch {
    return getDefaultAbout()
  }
}

const getDefaultAbout = (): About => ({
  name: "김준",
  title: "풀스택 개발자",
  description: "안녕하세요! 풀스택 개발자 김준입니다.",
  email: "rlwns960@naver.com",
  phone: "010-0000-0000",
  location: "서울, 대한민국",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  website: "https://yourwebsite.com",
  profileImage: "/images/profile.jpg",
  stats: {
    projects: "10+",
    solutions: "50+",
    experience: "2년",
    skills: "15+"
  }
}) 