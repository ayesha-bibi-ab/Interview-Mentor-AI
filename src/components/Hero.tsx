import React from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles, Target, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-5 pb-5 mt-4 bg-gradient-to-b from-blue-50/50 to-transparent">
      <div className="container py-4">
        <div className="row align-items-center gy-5">
          {/* Left Column: Text & CTAs */}
          <div className="col-lg-6">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-soft-primary text-primary fw-medium fs-7 mb-3 border border-blue-100">
              <Sparkles size={16} />
              <span>Tailored for University Students & Graduates</span>
            </div>

            <h1 className="display-5 fw-bold text-dark lh-sm mb-3">
              Master Your Job Interviews with <span className="text-primary">AI Mentorship</span>
            </h1>

            <p className="lead text-secondary mb-4 fs-6">
              Practice realistic interview questions customized for your target role and experience level. Receive instant feedback, scoring (1–10), improved answers, and personalized career tips.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <a href="#practice" className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2 shadow-sm">
                <span>Start Practice Now</span>
                <ArrowRight size={18} />
              </a>
              <a href="#about" className="btn btn-outline-primary btn-lg d-inline-flex align-items-center gap-2">
                <span>Learn More</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="d-flex flex-wrap gap-4 pt-2 border-top">
              <div className="d-flex align-items-center gap-2 text-muted fs-7">
                <CheckCircle2 size={16} className="text-success" />
                <span>No Login Required</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted fs-7">
                <CheckCircle2 size={16} className="text-success" />
                <span>Instant 1–10 Scoring</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted fs-7">
                <CheckCircle2 size={16} className="text-success" />
                <span>Local History Saved</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Mock Preview Card */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="card border-0 shadow-lg p-4 bg-white rounded-4">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary-subtle text-primary fw-semibold px-2.5 py-1.5 rounded-2">
                      Technical Interview
                    </span>
                    <span className="badge bg-light text-dark border fw-normal px-2.5 py-1.5 rounded-2">
                      Entry Level
                    </span>
                  </div>
                  <div className="badge-score bg-success text-white shadow-sm" style={{ width: '42px', height: '42px', fontSize: '1rem' }}>
                    8/10
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-uppercase text-muted fs-8 fw-semibold tracking-wider">Generated Question</span>
                  <p className="fw-medium text-dark mt-1 mb-0 fs-6">
                    "How do you handle error boundaries and state management in modern web applications?"
                  </p>
                </div>

                <div className="bg-light p-3 rounded-3 mb-3 border">
                  <div className="d-flex align-items-center gap-2 text-primary fw-semibold mb-1 fs-7">
                    <Award size={16} />
                    <span>AI Feedback Summary</span>
                  </div>
                  <p className="small text-secondary mb-0">
                    Strong explanation of try-catch blocks and state synchronization. Clear structure with actionable real-world examples.
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between text-muted fs-7 pt-2">
                  <span className="d-flex align-items-center gap-1">
                    <Target size={14} className="text-primary" /> Role: Frontend Engineer
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Zap size={14} className="text-warning" /> Evaluation Time: ~2s
                  </span>
                </div>
              </div>

              {/* Soft decorative blur element */}
              <div 
                className="position-absolute rounded-circle bg-primary opacity-10 filter blur-3xl"
                style={{ width: '250px', height: '250px', top: '-20px', right: '-20px', zIndex: -1, filter: 'blur(50px)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
