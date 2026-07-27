import React, { useState } from 'react';
import { EvaluationResult, QuestionParams } from '../types';
import { Award, CheckCircle2, AlertCircle, Sparkles, Copy, Check, MessageSquare, Lightbulb, FileText, ArrowRight } from 'lucide-react';

interface ResultsViewProps {
  evaluation: EvaluationResult;
  question: string;
  userAnswer: string;
  params: QuestionParams;
  onPracticeAgain: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  evaluation,
  question,
  userAnswer,
  params,
  onPracticeAgain
}) => {
  const [copied, setCopied] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-success text-white';
    if (score >= 6) return 'bg-warning text-dark';
    return 'bg-danger text-white';
  };

  const getScoreBadgeText = (score: number) => {
    if (score >= 8) return 'Excellent Response';
    if (score >= 6) return 'Good Effort';
    return 'Needs Refinement';
  };

  const handleCopyImprovedAnswer = () => {
    navigator.clipboard.writeText(evaluation.improvedAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card shadow-md border-0 p-4 bg-white mt-4 rounded-4" id="results-section">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-success-subtle p-2 rounded-2 text-success">
            <Award size={22} />
          </div>
          <div>
            <h2 className="h5 fw-bold mb-0">AI Evaluation & Feedback</h2>
            <p className="text-muted fs-7 mb-0">Analysis generated based on university hiring benchmarks</p>
          </div>
        </div>

        <button 
          onClick={onPracticeAgain}
          className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1.5"
        >
          <Sparkles size={15} />
          <span>Practice Another Question</span>
        </button>
      </div>

      {/* Top Banner: Score & Interview Summary */}
      <div className="row g-3 align-items-stretch mb-4">
        {/* Score Card */}
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-4 text-center h-100 d-flex flex-column justify-content-center align-items-center border">
            <span className="text-uppercase text-muted fs-8 fw-bold tracking-wider mb-2">Overall Score</span>
            <div className={`badge-score ${getScoreColor(evaluation.score)} mb-2 shadow-sm`}>
              {evaluation.score}
            </div>
            <span className="fw-bold fs-6 text-dark mb-1">{getScoreBadgeText(evaluation.score)}</span>
            <span className="text-muted fs-8">Scale 1 to 10</span>
          </div>
        </div>

        {/* ⭐ Interview Summary Card */}
        <div className="col-md-8">
          <div className="p-4 bg-soft-primary rounded-4 h-100 border border-blue-100 d-flex flex-column justify-content-center">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FileText size={18} className="text-primary" />
              <h3 className="h6 fw-bold text-primary mb-0">Interview Summary</h3>
            </div>
            <p className="text-dark fs-7 mb-0 lh-base">
              {evaluation.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column: Strengths & Areas for Improvement */}
      <div className="row g-4 mb-4">
        {/* Strengths */}
        <div className="col-md-6">
          <div className="p-3.5 bg-success-subtle/30 rounded-3 border border-success-subtle h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <CheckCircle2 size={18} className="text-success" />
              <h3 className="h6 fw-bold text-success-emphasis mb-0">Strengths</h3>
            </div>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              {evaluation.strengths.map((strength, idx) => (
                <li key={idx} className="d-flex align-items-start gap-2 text-dark fs-7">
                  <span className="badge bg-success rounded-circle p-1 mt-1 flex-shrink-0" style={{ width: '6px', height: '6px' }}></span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="col-md-6">
          <div className="p-3.5 bg-warning-subtle/30 rounded-3 border border-warning-subtle h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-warning-emphasis" />
              <h3 className="h6 fw-bold text-warning-emphasis mb-0">Areas for Improvement</h3>
            </div>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              {evaluation.improvements.map((improvement, idx) => (
                <li key={idx} className="d-flex align-items-start gap-2 text-dark fs-7">
                  <span className="badge bg-warning rounded-circle p-1 mt-1 flex-shrink-0" style={{ width: '6px', height: '6px' }}></span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Improved Answer Section */}
      <div className="mb-4">
        <div className="card bg-slate-900 text-white p-4 border-0 rounded-4">
          <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-slate-700">
            <div className="d-flex align-items-center gap-2">
              <Sparkles size={18} className="text-primary" />
              <h3 className="h6 fw-bold text-white mb-0">Model Improved Answer</h3>
            </div>
            <button
              onClick={handleCopyImprovedAnswer}
              className="btn btn-dark btn-sm text-slate-300 d-inline-flex align-items-center gap-1.5 border border-slate-700"
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              <span className="fs-8">{copied ? 'Copied' : 'Copy Sample'}</span>
            </button>
          </div>
          <p className="text-slate-200 fs-7 lh-base mb-0 bg-slate-800/60 p-3 rounded-3 border border-slate-700/50">
            "{evaluation.improvedAnswer}"
          </p>
        </div>
      </div>

      {/* Follow-up Question Card */}
      <div className="p-3.5 bg-purple-50/50 rounded-3 mb-4 border border-purple-100">
        <div className="d-flex align-items-center gap-2 mb-2">
          <MessageSquare size={18} className="text-purple-600" />
          <h3 className="h6 fw-bold text-purple-900 mb-0">Likely Follow-up Question</h3>
        </div>
        <p className="fw-medium text-dark mb-0 fs-7">
          "{evaluation.followUpQuestion}"
        </p>
      </div>

      {/* ⭐ Personalized Interview Tips */}
      <div className="p-4 bg-light rounded-4 border">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Lightbulb size={20} className="text-warning" />
          <h3 className="h6 fw-bold text-dark mb-0">Personalized Interview Tips for {params.jobRole}</h3>
        </div>
        <div className="row g-2">
          {evaluation.personalizedTips.map((tip, idx) => (
            <div key={idx} className="col-md-6">
              <div className="p-2.5 bg-white rounded-3 border d-flex align-items-start gap-2 fs-7 text-secondary h-100">
                <span className="badge bg-primary-subtle text-primary fw-bold rounded-2 px-2 py-0.5 mt-0.5">Tip {idx + 1}</span>
                <span>{tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-4 pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-muted fs-7">Session automatically saved to your history.</span>
        <button
          onClick={onPracticeAgain}
          className="btn btn-primary d-inline-flex align-items-center gap-2"
        >
          <span>Practice Another Question</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
