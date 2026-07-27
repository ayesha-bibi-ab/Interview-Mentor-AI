import React, { useState } from 'react';
import { PracticeSession } from '../types';
import { History, Trash2, ChevronDown, ChevronUp, Clock, Award, BookOpen, RotateCcw } from 'lucide-react';

interface PracticeHistoryProps {
  sessions: PracticeSession[];
  onDeleteSession: (id: string) => void;
  onClearHistory: () => void;
  onLoadSampleSession: () => void;
}

export const PracticeHistory: React.FC<PracticeHistoryProps> = ({
  sessions,
  onDeleteSession,
  onClearHistory,
  onLoadSampleSession
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 8) return 'bg-success text-white';
    if (score >= 6) return 'bg-warning text-dark';
    return 'bg-danger text-white';
  };

  return (
    <section id="history" className="py-5 bg-white border-top">
      <div className="container py-2">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-2.5">
            <div className="bg-soft-primary p-2.5 rounded-3 text-primary">
              <History size={22} />
            </div>
            <div>
              <h2 className="h4 fw-bold mb-0">Practice History</h2>
              <p className="text-muted fs-7 mb-0">Saved locally in your browser cache</p>
            </div>
          </div>

          {sessions.length > 0 && (
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={onClearHistory}
                className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1.5 rounded-2"
              >
                <Trash2 size={14} />
                <span>Clear History</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {sessions.length === 0 ? (
          <div className="text-center py-5 px-4 bg-light rounded-4 border border-dashed">
            <div className="bg-white p-3 rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
              <BookOpen size={28} className="text-muted" />
            </div>
            <h3 className="h6 fw-bold text-dark mb-1">No Practice Sessions Saved Yet</h3>
            <p className="text-secondary small max-w-md mx-auto mb-4">
              Your completed interview practices will automatically appear here so you can review your performance before real job interviews.
            </p>
            <div className="d-inline-flex gap-2">
              <button
                onClick={onLoadSampleSession}
                className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Load Sample Practice Session</span>
              </button>
              <a href="#practice" className="btn btn-primary btn-sm">
                Start First Practice
              </a>
            </div>
          </div>
        ) : (
          /* Sessions List */
          <div className="d-flex flex-column gap-3">
            {sessions.map((session) => {
              const isExpanded = expandedId === session.id;
              return (
                <div key={session.id} className="card border rounded-3 p-3.5 transition-all">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    {/* Left Details */}
                    <div className="flex-grow-1">
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                        <span className="badge bg-primary-subtle text-primary fw-medium px-2.5 py-1 rounded-2">
                          {session.params.interviewType}
                        </span>
                        <span className="badge bg-light text-dark border fw-normal px-2.5 py-1 rounded-2">
                          {session.params.experienceLevel}
                        </span>
                        <span className="badge bg-secondary-subtle text-dark fw-normal px-2.5 py-1 rounded-2">
                          Role: {session.params.jobRole}
                        </span>
                        <span className="text-muted fs-8 d-inline-flex align-items-center gap-1 ms-auto ms-sm-0">
                          <Clock size={13} /> {session.timestamp}
                        </span>
                      </div>

                      <p className="fw-semibold text-dark mb-0 fs-6 line-clamp-2">
                        "{session.question}"
                      </p>
                    </div>

                    {/* Right Action & Score */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="text-center">
                        <span className="text-muted fs-8 d-block fw-medium">Score</span>
                        <span className={`badge ${getScoreBadgeColor(session.evaluation.score)} px-2.5 py-1 fs-6 fw-bold`}>
                          {session.evaluation.score}/10
                        </span>
                      </div>

                      <button
                        onClick={() => toggleExpand(session.id)}
                        className="btn btn-light btn-sm d-inline-flex align-items-center gap-1 border"
                      >
                        <span className="fs-7">{isExpanded ? 'Hide Details' : 'View Details'}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <button
                        onClick={() => onDeleteSession(session.id)}
                        className="btn btn-outline-danger btn-sm p-1.5"
                        title="Delete session"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Session Card Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-top bg-light p-3 rounded-3">
                      <div className="mb-3">
                        <span className="text-uppercase text-muted fs-8 fw-bold">Your Submitted Answer</span>
                        <p className="text-dark fs-7 mb-0 mt-1 p-2.5 bg-white rounded-2 border">
                          "{session.userAnswer}"
                        </p>
                      </div>

                      <div className="mb-3">
                        <span className="text-uppercase text-primary fs-8 fw-bold">AI Summary</span>
                        <p className="text-dark fs-7 mb-0 mt-1">
                          {session.evaluation.summary}
                        </p>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong className="text-success fs-8 text-uppercase">Strengths:</strong>
                          <ul className="list-unstyled mb-0 fs-7 mt-1">
                            {session.evaluation.strengths.map((s, i) => (
                              <li key={i} className="mb-1 text-secondary">• {s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <strong className="text-warning-emphasis fs-8 text-uppercase">Areas for Improvement:</strong>
                          <ul className="list-unstyled mb-0 fs-7 mt-1">
                            {session.evaluation.improvements.map((imp, i) => (
                              <li key={i} className="mb-1 text-secondary">• {imp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-top">
                        <strong className="text-dark fs-8 text-uppercase">Model Answer:</strong>
                        <p className="text-secondary fs-7 mb-0 mt-1 italic">
                          "{session.evaluation.improvedAnswer}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
