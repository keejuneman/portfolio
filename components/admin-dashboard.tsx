"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsAdmin } from "./admin/projects-admin"
import { ExperienceAdmin } from "./admin/experience-admin"
import { SkillsAdmin } from "./admin/skills-admin"
import { AwardsAdmin } from "./admin/awards-admin"
import { AboutAdmin } from "./admin/about-admin"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">포트폴리오 관리</h1>
        <p className="text-muted-foreground">포트폴리오의 모든 내용을 관리하세요</p>
      </div>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">소개</TabsTrigger>
          <TabsTrigger value="experience">경력</TabsTrigger>
          <TabsTrigger value="awards">수상실적</TabsTrigger>
          <TabsTrigger value="skills">기술</TabsTrigger>
          <TabsTrigger value="projects">프로젝트</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <AboutAdmin />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceAdmin />
        </TabsContent>

        <TabsContent value="awards">
          <AwardsAdmin />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsAdmin />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsAdmin />
        </TabsContent>
      </Tabs>
    </div>
  )
}
