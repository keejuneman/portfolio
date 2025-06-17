"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload, Plus, Trash2, RefreshCw, ExternalLink, Save } from "lucide-react"
import Link from "next/link"

// 데이터 타입 정의
interface AboutData {
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

interface Project {
  id: string
  title: string
  description: string
  detailDescription: string
  techStack: string[]
  imageUrl: string
  startDate: string
  endDate: string
  role: string
  contributions: { area: string; percentage: number }[]
  results: string[]
  links: { type: string; url: string; label: string }[]
  tags: string[]
  category: string
  order: number
<<<<<<< HEAD
  createdAt: string
=======
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
}

interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
  createdAt?: string
  order: number
}

interface Skill {
  id: string
  name: string
  level: number
  category: string
  order: number
}

interface Award {
  id: string
  title: string
  organization: string
  date: string
  description: string
  type: string
  order: number
}

export default function AdminPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [aboutRes, projectsRes, experiencesRes, skillsRes, awardsRes] = await Promise.all([
        fetch('/data/about.json'),
        fetch('/data/projects.json'),
        fetch('/data/experiences.json'),
        fetch('/data/skills.json'),
        fetch('/data/awards.json')
      ])

      if (aboutRes.ok) setAboutData(await aboutRes.json())
      if (projectsRes.ok) setProjects(await projectsRes.json())
      if (experiencesRes.ok) setExperiences(await experiencesRes.json())
      if (skillsRes.ok) setSkills(await skillsRes.json())
      if (awardsRes.ok) setAwards(await awardsRes.json())
    } catch (error) {
      console.error('데이터 로딩 실패:', error)
    }
    setLoading(false)
  }

  const downloadData = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAllFiles = () => {
    if (aboutData) downloadData(aboutData, 'about.json')
    if (projects.length > 0) downloadData(projects, 'projects.json')
    if (experiences.length > 0) downloadData(experiences, 'experiences.json')
    if (skills.length > 0) downloadData(skills, 'skills.json')
    if (awards.length > 0) downloadData(awards, 'awards.json')
  }

  // About 폼 컴포넌트
  const AboutForm = () => {
    const [formData, setFormData] = useState<AboutData>(aboutData || {
      name: '', title: '', description: '', email: '', phone: '', location: '',
      github: '', linkedin: '', website: '', profileImage: '',
      stats: { projects: '', solutions: '', experience: '', skills: '' }
    })

    useEffect(() => {
      if (aboutData) setFormData(aboutData)
    }, [aboutData])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setAboutData(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input 
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="title">직책</Label>
            <Input 
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="예: 풀스택 개발자"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">소개</Label>
          <Textarea 
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="자기소개를 입력하세요"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input 
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="phone">전화번호</Label>
            <Input 
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="전화번호를 입력하세요"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="location">위치</Label>
            <Input 
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="예: 서울, 대한민국"
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input 
              id="github"
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})}
              placeholder="GitHub 프로필 URL"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input 
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              placeholder="LinkedIn 프로필 URL"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="statsProjects">프로젝트 수</Label>
            <Input 
              id="statsProjects"
              value={formData.stats.projects}
              onChange={(e) => setFormData({...formData, stats: {...formData.stats, projects: e.target.value}})}
              placeholder="예: 10+"
            />
          </div>
          <div>
            <Label htmlFor="statsSolutions">솔루션 수</Label>
            <Input 
              id="statsSolutions"
              value={formData.stats.solutions}
              onChange={(e) => setFormData({...formData, stats: {...formData.stats, solutions: e.target.value}})}
              placeholder="예: 50+"
            />
          </div>
          <div>
            <Label htmlFor="statsExperience">경력</Label>
            <Input 
              id="statsExperience"
              value={formData.stats.experience}
              onChange={(e) => setFormData({...formData, stats: {...formData.stats, experience: e.target.value}})}
              placeholder="예: 2년"
            />
          </div>
          <div>
            <Label htmlFor="statsSkills">기술 수</Label>
            <Input 
              id="statsSkills"
              value={formData.stats.skills}
              onChange={(e) => setFormData({...formData, stats: {...formData.stats, skills: e.target.value}})}
              placeholder="예: 15+"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            변경사항 저장
          </Button>
          <Button type="button" variant="outline" onClick={() => downloadData(formData, 'about.json')}>
            <Download className="h-4 w-4 mr-2" />
            다운로드
          </Button>
        </div>
      </form>
    )
  }

  // 프로젝트 폼 컴포넌트
  const ProjectsForm = () => {
    const [newProject, setNewProject] = useState<Partial<Project>>({
<<<<<<< HEAD
      title: '',
      description: '',
      detailDescription: '',
      techStack: [],
      imageUrl: '/placeholder.svg?height=200&width=400',
      startDate: '',
      endDate: '',
      role: '',
      contributions: [],
      results: [],
      links: [],
      tags: [],
      category: 'Web',
      order: 0
    })
    const [newTech, setNewTech] = useState('')
    const [newContribution, setNewContribution] = useState({ area: '', percentage: 0 })
    const [newResult, setNewResult] = useState('')
    const [newLink, setNewLink] = useState({ type: '', url: '', label: '' })
    const [newTag, setNewTag] = useState('')

    const addTech = () => {
      if (newTech.trim()) {
        setNewProject(prev => ({
          ...prev,
          techStack: [...(prev.techStack || []), newTech.trim()]
        }))
        setNewTech('')
      }
    }

    const addContribution = () => {
      if (newContribution.area && newContribution.percentage > 0) {
        setNewProject(prev => ({
          ...prev,
          contributions: [...(prev.contributions || []), newContribution]
        }))
        setNewContribution({ area: '', percentage: 0 })
      }
    }

    const addResult = () => {
      if (newResult.trim()) {
        setNewProject(prev => ({
          ...prev,
          results: [...(prev.results || []), newResult.trim()]
        }))
        setNewResult('')
      }
    }

    const addLink = () => {
      if (newLink.type && newLink.url && newLink.label) {
        setNewProject(prev => ({
          ...prev,
          links: [...(prev.links || []), newLink]
        }))
        setNewLink({ type: '', url: '', label: '' })
      }
    }

    const addTag = () => {
      if (newTag.trim()) {
        setNewProject(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag.trim()]
        }))
        setNewTag('')
      }
    }
=======
      title: '', description: '', techStack: [], category: 'Web'
    })
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3

    const addProject = () => {
      if (newProject.title && newProject.description) {
        const project: Project = {
          id: Date.now().toString(),
          title: newProject.title,
          description: newProject.description,
          detailDescription: newProject.detailDescription || '',
          techStack: newProject.techStack || [],
<<<<<<< HEAD
          imageUrl: newProject.imageUrl || '/placeholder.svg?height=200&width=400',
          startDate: newProject.startDate || '',
          endDate: newProject.endDate || '',
          role: newProject.role || '',
          contributions: newProject.contributions || [],
          results: newProject.results || [],
          links: newProject.links || [],
          tags: newProject.tags || [],
          category: newProject.category || 'Web',
          order: projects.length,
          createdAt: new Date().toISOString()
        }
        setProjects([...projects, project])
        setNewProject({
          title: '',
          description: '',
          detailDescription: '',
          techStack: [],
          imageUrl: '/placeholder.svg?height=200&width=400',
          startDate: '',
          endDate: '',
          role: '',
=======
          imageUrl: '/placeholder.svg?height=200&width=400',
          startDate: newProject.startDate || '',
          endDate: newProject.endDate || '',
          role: newProject.role || '',
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
          contributions: [],
          results: [],
          links: [],
          tags: [],
<<<<<<< HEAD
          category: 'Web',
          order: 0
        })
=======
          category: newProject.category || 'Web',
          order: projects.length
        }
        setProjects([...projects, project])
        setNewProject({ title: '', description: '', techStack: [], category: 'Web' })
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
      }
    }

    const removeProject = (id: string) => {
      setProjects(projects.filter(p => p.id !== id))
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>새 프로젝트 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
<<<<<<< HEAD
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectTitle">프로젝트 제목</Label>
                <Input 
                  id="projectTitle"
                  value={newProject.title || ''}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="프로젝트 제목을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="projectRole">역할</Label>
                <Input 
                  id="projectRole"
                  value={newProject.role || ''}
                  onChange={(e) => setNewProject({...newProject, role: e.target.value})}
                  placeholder="예: 풀스택 개발자"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectDesc">간단한 설명</Label>
=======
            <div>
              <Label htmlFor="projectTitle">프로젝트 제목</Label>
              <Input 
                id="projectTitle"
                value={newProject.title || ''}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="프로젝트 제목을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="projectDesc">프로젝트 설명</Label>
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
              <Textarea 
                id="projectDesc"
                value={newProject.description || ''}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
<<<<<<< HEAD
                placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="projectDetailDesc">상세 설명</Label>
              <Textarea 
                id="projectDetailDesc"
                value={newProject.detailDescription || ''}
                onChange={(e) => setNewProject({...newProject, detailDescription: e.target.value})}
                placeholder="프로젝트에 대한 상세한 설명을 입력하세요"
                rows={3}
              />
            </div>

=======
                placeholder="프로젝트 설명을 입력하세요"
                rows={3}
              />
            </div>
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectStartDate">시작일</Label>
                <Input 
                  id="projectStartDate"
                  value={newProject.startDate || ''}
                  onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                  placeholder="예: 2024.01"
                />
              </div>
              <div>
                <Label htmlFor="projectEndDate">종료일</Label>
                <Input 
                  id="projectEndDate"
                  value={newProject.endDate || ''}
                  onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                  placeholder="예: 2024.03"
                />
              </div>
            </div>
<<<<<<< HEAD

            <div>
              <Label>기술 스택</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="기술을 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                />
                <Button type="button" onClick={addTech} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newProject.techStack?.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                    <button
                      type="button"
                      onClick={() => setNewProject(prev => ({
                        ...prev,
                        techStack: prev.techStack?.filter((_, i) => i !== index)
                      }))}
                      className="ml-1"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>기여도</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input 
                  value={newContribution.area}
                  onChange={(e) => setNewContribution(prev => ({...prev, area: e.target.value}))}
                  placeholder="영역"
                />
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={newContribution.percentage}
                  onChange={(e) => setNewContribution(prev => ({...prev, percentage: parseInt(e.target.value)}))}
                  placeholder="퍼센트"
                />
              </div>
              <Button type="button" onClick={addContribution} size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-1" />
                기여도 추가
              </Button>
              <div className="space-y-2 mt-2">
                {newProject.contributions?.map((contribution, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1">{contribution.area}</span>
                    <span className="text-sm text-muted-foreground">{contribution.percentage}%</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewProject(prev => ({
                        ...prev,
                        contributions: prev.contributions?.filter((_, i) => i !== index)
                      }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>성과</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  value={newResult}
                  onChange={(e) => setNewResult(e.target.value)}
                  placeholder="성과를 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                />
                <Button type="button" onClick={addResult} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {newProject.results?.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1">{result}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewProject(prev => ({
                        ...prev,
                        results: prev.results?.filter((_, i) => i !== index)
                      }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>링크</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Input 
                  value={newLink.type}
                  onChange={(e) => setNewLink(prev => ({...prev, type: e.target.value}))}
                  placeholder="타입 (예: github)"
                />
                <Input 
                  value={newLink.url}
                  onChange={(e) => setNewLink(prev => ({...prev, url: e.target.value}))}
                  placeholder="URL"
                />
                <Input 
                  value={newLink.label}
                  onChange={(e) => setNewLink(prev => ({...prev, label: e.target.value}))}
                  placeholder="라벨"
                />
              </div>
              <Button type="button" onClick={addLink} size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-1" />
                링크 추가
              </Button>
              <div className="space-y-2 mt-2">
                {newProject.links?.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1">
                      <span className="font-medium">{link.type}:</span> {link.label}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewProject(prev => ({
                        ...prev,
                        links: prev.links?.filter((_, i) => i !== index)
                      }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>태그</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="태그를 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newProject.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      onClick={() => setNewProject(prev => ({
                        ...prev,
                        tags: prev.tags?.filter((_, i) => i !== index)
                      }))}
                      className="ml-1"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="projectCategory">카테고리</Label>
              <Select 
                value={newProject.category || 'Web'} 
                onValueChange={(value) => setNewProject({...newProject, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web">Web</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

=======
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
            <Button onClick={addProject} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              프로젝트 추가
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">프로젝트 목록 ({projects.length}개)</h3>
            <Button variant="outline" onClick={() => downloadData(projects, 'projects.json')}>
              <Download className="h-4 w-4 mr-2" />
              다운로드
            </Button>
          </div>
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
<<<<<<< HEAD
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      {project.techStack?.map((tech, index) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">{project.startDate} ~ {project.endDate}</span>
=======
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      {project.startDate && <span className="text-xs text-muted-foreground">{project.startDate} ~ {project.endDate}</span>}
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // 경력 폼 컴포넌트
  const ExperiencesForm = () => {
    const [newExperience, setNewExperience] = useState<Partial<Experience>>({
      company: '', position: '', period: '', description: '', achievements: []
    })
    const [newAchievement, setNewAchievement] = useState('')

    const addAchievement = () => {
      if (newAchievement.trim()) {
        setNewExperience(prev => ({
          ...prev,
          achievements: [...(prev.achievements || []), newAchievement.trim()]
        }))
        setNewAchievement('')
      }
    }

    const removeAchievement = (index: number) => {
      setNewExperience(prev => ({
        ...prev,
        achievements: prev.achievements?.filter((_, i) => i !== index) || []
      }))
    }

    const addExperience = () => {
      if (newExperience.company && newExperience.position && newExperience.period) {
        const experience: Experience = {
          id: Date.now().toString(),
          company: newExperience.company,
          position: newExperience.position || '',
          period: newExperience.period || '',
          description: newExperience.description || '',
          achievements: newExperience.achievements || [],
          order: experiences.length,
          createdAt: new Date().toISOString()
        }
        setExperiences([...experiences, experience])
        setNewExperience({ company: '', position: '', period: '', description: '', achievements: [] })
      }
    }

    const removeExperience = (id: string) => {
      setExperiences(experiences.filter(e => e.id !== id))
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>새 경력 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">회사명</Label>
                <Input 
                  id="company"
                  value={newExperience.company || ''}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <Label htmlFor="position">직책</Label>
                <Input 
                  id="position"
                  value={newExperience.position || ''}
                  onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                  placeholder="직책을 입력하세요"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="period">근무 기간</Label>
              <Input 
                id="period"
                value={newExperience.period || ''}
                onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                placeholder="예: 2023.03 - 현재"
              />
            </div>
            <div>
              <Label htmlFor="description">업무 설명</Label>
              <Textarea 
                id="description"
                value={newExperience.description || ''}
                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                placeholder="주요 업무를 설명하세요"
                rows={3}
              />
            </div>
            <div>
              <Label>주요 성과</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="성과를 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                />
                <Button type="button" onClick={addAchievement} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-3">
                {newExperience.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1 text-sm">{achievement}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAchievement(index)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={addExperience} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              경력 추가
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">경력 목록 ({experiences.length}개)</h3>
            <Button variant="outline" onClick={() => downloadData(experiences, 'experiences.json')}>
              <Download className="h-4 w-4 mr-2" />
              다운로드
            </Button>
          </div>
          {experiences.map((experience) => (
            <Card key={experience.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                                   <div className="flex-1">
                   <h4 className="font-medium">{experience.position} - {experience.company}</h4>
                   <p className="text-sm text-muted-foreground mt-1">{experience.description}</p>
                   <div className="mt-2">
                     <span className="text-xs text-muted-foreground">{experience.period}</span>
                   </div>
                 </div>
                  <Button variant="ghost" size="sm" onClick={() => removeExperience(experience.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // 기술 스택 폼 컴포넌트
  const SkillsForm = () => {
    const [newSkill, setNewSkill] = useState<Partial<Skill>>({
      name: '', level: 3, category: 'Programming'
    })

<<<<<<< HEAD
    const categories = ['Programming', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', ,'Business','Operations','AI & Data','Other']
=======
    const categories = ['Programming', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']
>>>>>>> f3cd1ad9adfa65e183b9d7ed7c70350b99f617c3

    const addSkill = () => {
      if (newSkill.name && newSkill.category) {
        const skill: Skill = {
          id: Date.now().toString(),
          name: newSkill.name,
          level: newSkill.level || 3,
          category: newSkill.category,
          order: skills.length
        }
        setSkills([...skills, skill])
        setNewSkill({ name: '', level: 3, category: 'Programming' })
      }
    }

    const removeSkill = (id: string) => {
      setSkills(skills.filter(s => s.id !== id))
    }

    const getSkillLevelText = (level: number) => {
      const levels = ['입문', '초급', '중급', '고급', '전문가']
      return levels[level - 1] || '중급'
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>새 기술 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skillName">기술명</Label>
                <Input 
                  id="skillName"
                  value={newSkill.name || ''}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  placeholder="예: JavaScript, React, Python"
                />
              </div>
              <div>
                <Label htmlFor="skillCategory">카테고리</Label>
                <Select 
                  value={newSkill.category} 
                  onValueChange={(value) => setNewSkill({...newSkill, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="skillLevel">숙련도 ({getSkillLevelText(newSkill.level || 3)})</Label>
              <Input 
                id="skillLevel"
                type="range"
                min="1"
                max="5"
                value={newSkill.level || 3}
                onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>입문</span>
                <span>초급</span>
                <span>중급</span>
                <span>고급</span>
                <span>전문가</span>
              </div>
            </div>
            <Button onClick={addSkill} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              기술 추가
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">기술 목록 ({skills.length}개)</h3>
            <Button variant="outline" onClick={() => downloadData(skills, 'skills.json')}>
              <Download className="h-4 w-4 mr-2" />
              다운로드
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{skill.name}</h4>
                        <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-muted rounded h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded" 
                            style={{width: `${(skill.level / 5) * 100}%`}}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{getSkillLevelText(skill.level)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 수상 실적 폼 컴포넌트
  const AwardsForm = () => {
    const [newAward, setNewAward] = useState<Partial<Award>>({
      title: '', organization: '', date: '', description: '', type: '수상'
    })

    const awardTypes = ['수상', '자격증', '교육', '기타']

    const addAward = () => {
      if (newAward.title && newAward.organization && newAward.date) {
        const award: Award = {
          id: Date.now().toString(),
          title: newAward.title,
          organization: newAward.organization,
          date: newAward.date,
          description: newAward.description || '',
          type: newAward.type || '수상',
          order: awards.length
        }
        setAwards([...awards, award])
        setNewAward({ title: '', organization: '', date: '', description: '', type: '수상' })
      }
    }

    const removeAward = (id: string) => {
      setAwards(awards.filter(a => a.id !== id))
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>새 수상/자격증 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="awardTitle">제목</Label>
              <Input 
                id="awardTitle"
                value={newAward.title || ''}
                onChange={(e) => setNewAward({...newAward, title: e.target.value})}
                placeholder="수상명 또는 자격증명을 입력하세요"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="awardOrg">발급기관/주최기관</Label>
                <Input 
                  id="awardOrg"
                  value={newAward.organization || ''}
                  onChange={(e) => setNewAward({...newAward, organization: e.target.value})}
                  placeholder="예: 한국산업인력공단, 삼성전자"
                />
              </div>
              <div>
                <Label htmlFor="awardDate">취득/수상 날짜</Label>
                <Input 
                  id="awardDate"
                  value={newAward.date || ''}
                  onChange={(e) => setNewAward({...newAward, date: e.target.value})}
                  placeholder="예: 2023.11"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="awardType">분류</Label>
              <Select 
                value={newAward.type} 
                onValueChange={(value) => setNewAward({...newAward, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="분류 선택" />
                </SelectTrigger>
                <SelectContent>
                  {awardTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="awardDesc">설명</Label>
              <Textarea 
                id="awardDesc"
                value={newAward.description || ''}
                onChange={(e) => setNewAward({...newAward, description: e.target.value})}
                placeholder="수상 내용, 자격증 설명 등을 입력하세요"
                rows={3}
              />
            </div>
            <Button onClick={addAward} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              추가
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">수상/자격증 목록 ({awards.length}개)</h3>
            <Button variant="outline" onClick={() => downloadData(awards, 'awards.json')}>
              <Download className="h-4 w-4 mr-2" />
              다운로드
            </Button>
          </div>
          {awards.map((award) => (
            <Card key={award.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{award.title}</h4>
                      <Badge variant="outline">{award.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{award.organization}</p>
                    <p className="text-sm text-muted-foreground">{award.date}</p>
                    {award.description && (
                      <p className="text-sm mt-2">{award.description}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeAward(award.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">데이터 로딩 중...</span>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  포트폴리오 관리 대시보드
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  폼을 통해 포트폴리오 데이터를 쉽게 관리하고 업데이트하세요
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={downloadAllFiles} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  모든 파일 다운로드
                </Button>
                <Link href="/">
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    포트폴리오 보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Data Editor */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">소개</TabsTrigger>
              <TabsTrigger value="projects">프로젝트</TabsTrigger>
              <TabsTrigger value="experiences">경력</TabsTrigger>
              <TabsTrigger value="skills">기술</TabsTrigger>
              <TabsTrigger value="awards">수상</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>개인 정보</CardTitle>
                  <CardDescription>기본 정보와 연락처를 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AboutForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>프로젝트 관리</CardTitle>
                  <CardDescription>프로젝트를 추가하고 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectsForm />
                </CardContent>
              </Card>
            </TabsContent>

                         <TabsContent value="experiences">
               <Card>
                 <CardHeader>
                   <CardTitle>경력 관리</CardTitle>
                   <CardDescription>경력 사항을 추가하고 관리합니다.</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <ExperiencesForm />
                 </CardContent>
               </Card>
             </TabsContent>

             <TabsContent value="skills">
               <Card>
                 <CardHeader>
                   <CardTitle>기술 관리</CardTitle>
                   <CardDescription>기술 스택과 숙련도를 관리합니다.</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <SkillsForm />
                 </CardContent>
               </Card>
             </TabsContent>

             <TabsContent value="awards">
               <Card>
                 <CardHeader>
                   <CardTitle>수상 관리</CardTitle>
                   <CardDescription>수상 실적과 자격증을 관리합니다.</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <AwardsForm />
                 </CardContent>
               </Card>
             </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}