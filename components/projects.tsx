import { ProjectGrid } from "./project-grid"

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">프로젝트</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            다양한 AI 툴과 자동화 기술을 활용한 프로젝트들을 소개합니다.
          </p>
        </div>
        <ProjectGrid />
      </div>
    </section>
  )
}
