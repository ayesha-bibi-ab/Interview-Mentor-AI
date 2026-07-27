import React from 'react';
import { Target, Code2, Cpu, UserCheck, ShieldCheck, GraduationCap, Github } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const techStack = [
    { name: 'React 19', category: 'Frontend Framework' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Bootstrap 5', category: 'UI Component Library' },
    { name: 'Poppins Font', category: 'Typography' },
    { name: 'Google Gemini API', category: 'AI Intelligence Engine' },
    { name: 'Vite', category: 'Build Tooling' },
    { name: 'HTML5 & CSS3', category: 'Core Web Standards' },
    { name: 'localStorage', category: 'Client State Persistence' },
  ];

  return (
    <section id="about" className="py-5 bg-light border-top">
      <div className="container py-3">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">About The Project</span>
          <h2 className="fw-bold mt-1 mb-3">Interview Mentor AI</h2>
          <p className="text-secondary">
            Empowering graduating students and early-career job seekers with accessible, high-quality interview preparation tools.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Card 1: Purpose */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 p-4 border bg-white">
              <div className="bg-soft-primary p-2.5 rounded-3 text-primary d-inline-flex mb-3" style={{ width: '48px', height: '48px' }}>
                <Target size={24} />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">Project Purpose</h3>
              <p className="text-secondary fs-7 mb-0">
                Landing entry-level roles can be daunting for university graduates due to lack of practical interview feedback. Interview Mentor AI provides an accessible, instant platform to practice technical, behavioral, and HR questions with structured evaluation.
              </p>
            </div>
          </div>

          {/* Card 2: AI Model */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 p-4 border bg-white">
              <div className="bg-soft-primary p-2.5 rounded-3 text-primary d-inline-flex mb-3" style={{ width: '48px', height: '48px' }}>
                <Cpu size={24} />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">AI Model & Intelligence</h3>
              <p className="text-secondary fs-7 mb-0">
                Engineered with <strong>Google Gemini API</strong> models, specifically trained to analyze candidate responses against real-world tech and graduate recruiter expectations, delivering 1–10 scoring, strengths, improvement areas, and follow-up prompts.
              </p>
            </div>
          </div>

          {/* Card 3: Developer / Project Metadata */}
          <div className="col-lg-4 col-md-12">
            <div className="card h-100 p-4 border bg-white">
              <div className="bg-soft-primary p-2.5 rounded-3 text-primary d-inline-flex mb-3" style={{ width: '48px', height: '48px' }}>
                <GraduationCap size={24} />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">Developer Information</h3>
              <p className="text-secondary fs-7 mb-3">
                Developed as a University Final Year Project demonstrating full-stack frontend design, clean component architecture, and generative AI integration.
              </p>

              <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between text-muted fs-8">
                <span>Status: Production-Ready</span>
                <span className="badge bg-primary-subtle text-primary fw-medium px-2 py-1">University Capstone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="card border p-4 bg-white">
          <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
            <Code2 size={20} className="text-primary" />
            <h3 className="h6 fw-bold text-dark mb-0">Technologies & Specifications</h3>
          </div>

          <div className="row g-3">
            {techStack.map((tech, idx) => (
              <div key={idx} className="col-lg-3 col-md-4 col-sm-6">
                <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between">
                  <span className="fw-semibold text-dark fs-7">{tech.name}</span>
                  <span className="badge bg-white text-muted border fs-8">{tech.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
