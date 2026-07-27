import React from 'react';
import { QuestionParams } from '../types';
import { HelpCircle, Send, RefreshCw, Lightbulb, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  params: QuestionParams;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onEvaluate: () => void;
  onRegenerate: () => void;
  isEvaluating: boolean;
  isGenerating: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  params,
  userAnswer,
  onAnswerChange,
  onEvaluate,
  onRegenerate,
  isEvaluating,
  isGenerating
}) => {
  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;
  const charCount = userAnswer.length;

  return (
    <div className="card shadow-sm border-0 p-4 bg-white mt-4">
      {/* Header & Badges */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 pb-3 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-soft-primary p-2 rounded-2 text-primary">
            <HelpCircle size={20} />
          </div>
          <div>
            <h2 className="h5 fw-bold mb-0">Step 2: Answer the Interview Question</h2>
            <p className="text-muted fs-7 mb-0">Formulate your response as if speaking to an interviewer</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRegenerate}
          disabled={isGenerating || isEvaluating}
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1.5 rounded-2"
        >
          <RefreshCw size={14} className={isGenerating ? "spin" : ""} />
          <span>New Question</span>
        </button>
      </div>

      {/* Metadata Badges */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <span className="badge bg-primary-subtle text-primary fw-medium px-2.5 py-1.5 rounded-2">
          {params.interviewType}
        </span>
        <span className="badge bg-light text-dark border fw-normal px-2.5 py-1.5 rounded-2">
          {params.experienceLevel}
        </span>
        <span className="badge bg-secondary-subtle text-dark fw-normal px-2.5 py-1.5 rounded-2">
          Target Role: {params.jobRole}
        </span>
      </div>

      {/* Generated Question Display */}
      <div className="bg-light p-3.5 rounded-3 border-start border-4 border-primary mb-4">
        <span className="text-uppercase text-primary fs-8 fw-bold tracking-wider d-block mb-1">
          Interview Question
        </span>
        <p className="fs-5 fw-semibold text-dark mb-0 lh-base">
          "{question}"
        </p>
      </div>

      {/* Answer Textarea */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <label htmlFor="userAnswerTextarea" className="form-label fw-semibold text-dark mb-0 fs-7">
            Your Answer:
          </label>
          <div className="text-muted fs-8">
            <span>{wordCount} words</span> • <span>{charCount} chars</span>
          </div>
        </div>

        <textarea
          id="userAnswerTextarea"
          className="form-control"
          rows={6}
          placeholder="Type or paste your detailed answer here... (Tip: Structure your response with background context, key actions taken, and measurable results)"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
        />
      </div>

      {/* Pro-Tip Box */}
      <div className="p-3 bg-blue-50/60 rounded-3 mb-4 border border-blue-100 d-flex align-items-start gap-2.5">
        <Lightbulb size={18} className="text-primary mt-0.5 flex-shrink-0" />
        <div className="fs-7 text-secondary">
          <strong className="text-dark fw-medium">Pro Tip for {params.interviewType} Questions:</strong>{" "}
          {params.interviewType === 'Behavioral' && "Use the STAR method (Situation, Task, Action, Result) to give structured, impactful answers."}
          {params.interviewType === 'Technical' && "Clearly state your core reasoning, data structure/algorithm choices, and key trade-offs."}
          {params.interviewType === 'HR / Culture Fit' && "Align your personal values with the role's expectations and emphasize growth mindset."}
          {params.interviewType === 'System Design' && "Identify constraints, high-level architecture, API contracts, and scalability steps."}
          {params.interviewType === 'Situational' && "Explain your immediate prioritization steps, stakeholder communication, and conflict resolution."}
        </div>
      </div>

      {/* Action Button */}
      <div className="d-flex align-items-center justify-content-between pt-2 border-top">
        <span className="text-muted fs-7">
          {wordCount < 15 ? "Provide at least a short response to evaluate" : "Ready for AI evaluation"}
        </span>

        <button
          type="button"
          className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2 shadow-sm"
          onClick={onEvaluate}
          disabled={isEvaluating || wordCount < 5}
        >
          {isEvaluating ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Evaluating Answer...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Evaluate Answer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
