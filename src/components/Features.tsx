import React from 'react';
import { Target, Cpu, History, Check } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Target className="text-primary" size={28} />,
      title: "1. Tailored Questions",
      description: "Choose your interview type, experience level, and job role. The AI generates realistic questions matched specifically to entry-level and graduate roles.",
      highlights: ["Technical, Behavioral & HR types", "Entry level & internship focused", "Role-specific scenario prompts"]
    },
    {
      icon: <Cpu className="text-primary" size={28} />,
      title: "2. Instant AI Evaluation",
      description: "Submit your written answer and receive instant 1–10 scoring, highlighted strengths, areas for improvement, model answer, and follow-up questions.",
      highlights: ["Objective 1–10 scoring badge", "Detailed strengths & weakness list", "Model improved answer sample"]
    },
    {
      icon: <History className="text-primary" size={28} />,
      title: "3. Personalized Tips & History",
      description: "Gain tailored actionable interview advice and automatically save your practice history in your browser for easy review before real interviews.",
      highlights: ["Targeted advice for your role", "Local history storage", "Review past scores anytime"]
    }
  ];

  return (
    <section className="py-5 bg-white border-top border-bottom">
      <div className="container py-3">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">How It Works</span>
          <h2 className="fw-bold mt-1 mb-3">Designed for Interview Success</h2>
          <p className="text-secondary">
            Simple 3-step practice flow engineered to help students build confidence and refine interview answers.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="card h-100 p-4 border card-hover">
                <div className="bg-soft-primary p-3 rounded-3 d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '56px', height: '56px' }}>
                  {feature.icon}
                </div>

                <h3 className="h5 fw-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-secondary small mb-4">{feature.description}</p>

                <ul className="list-unstyled mt-auto pt-3 border-top mb-0">
                  {feature.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="d-flex align-items-center gap-2 text-muted fs-7 mb-2">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
