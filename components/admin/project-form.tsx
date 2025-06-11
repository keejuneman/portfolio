import React, { useState } from 'react';

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(project || {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    githubUrl: "",
    demoUrl: "",
    technologies: [],
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onClose(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div>
      {/* Render your form components here */}
    </div>
  );
} 