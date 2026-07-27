import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { PracticeForm } from './components/PracticeForm';
import { QuestionCard } from './components/QuestionCard';
import { ResultsView } from './components/ResultsView';
import { PracticeHistory } from './components/PracticeHistory';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { EvaluationResult, PracticeSession, QuestionParams } from './types';
import { DEFAULT_MOCK_EVALUATION, INITIAL_SAMPLE_SESSIONS, MOCK_QUESTIONS } from './data/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'interview_mentor_history_v1';

export default function App() {
  // Practice configuration state
  const [params, setParams] = useState<QuestionParams>({
    interviewType: 'Technical',
    experienceLevel: 'Entry Level / Fresh Graduate',
    jobRole: 'Software Engineer'
  });

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [hasGeneratedQuestion, setHasGeneratedQuestion] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  
  // Evaluation result state
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  // Loading states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // History state saved in localStorage
  const [sessions, setSessions] = useState<PracticeSession[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse localStorage history", e);
    }
    return INITIAL_SAMPLE_SESSIONS;
  });

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [sessions]);

  // Error state for generation & evaluation
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [evaluateError, setEvaluateError] = useState<string | null>(null);

  // Handle Question Generation via Gemini 3.6 Flash API endpoint
  const handleGenerateQuestion = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    setEvaluateError(null);
    setEvaluation(null);
    setUserAnswer('');

    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate interview question from AI.');
      }

      setCurrentQuestion(data.question);
      setHasGeneratedQuestion(true);

      // Smooth scroll to question container
      setTimeout(() => {
        const element = document.getElementById('question-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error("Error generating question via Gemini API:", err);
      const isFetchErr = err?.message === 'Failed to fetch' || err?.name === 'TypeError';
      setGenerateError(isFetchErr ? 'Unable to connect to evaluation service. Please retry in a moment.' : (err.message || 'An error occurred while generating question.'));
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Evaluation Trigger via Gemini 3.6 Flash API
  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    setEvaluateError(null);

    try {
      const response = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          interviewType: params.interviewType,
          experienceLevel: params.experienceLevel,
          jobRole: params.jobRole,
          question: currentQuestion,
          userAnswer
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to evaluate answer using AI.');
      }

      const evalData: EvaluationResult = {
        score: typeof data.score === 'number' ? Math.min(10, Math.max(1, data.score)) : 8,
        summary: data.interviewSummary || 'Completed evaluation.',
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        improvements: Array.isArray(data.areasForImprovement) ? data.areasForImprovement : (data.improvements || []),
        improvedAnswer: data.improvedAnswer || '',
        followUpQuestion: data.followUpQuestion || '',
        personalizedTips: Array.isArray(data.personalizedTips) ? data.personalizedTips : []
      };

      setEvaluation(evalData);

      // Create new practice session history entry
      const newSession: PracticeSession = {
        id: `session-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        params,
        question: currentQuestion,
        userAnswer,
        evaluation: evalData
      };

      // Add to sessions
      setSessions(prev => [newSession, ...prev]);

      // Scroll to results section
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error("Error evaluating answer via Gemini API:", err);
      const isFetchErr = err?.message === 'Failed to fetch' || err?.name === 'TypeError';
      setEvaluateError(isFetchErr ? 'Unable to connect to evaluation service. Please retry in a moment.' : (err.message || 'An error occurred while evaluating your answer.'));
    } finally {
      setIsEvaluating(false);
    }
  };

  // Reset to practice again
  const handlePracticeAgain = () => {
    setEvaluation(null);
    setUserAnswer('');
    // Focus back on form
    const formEl = document.getElementById('practice');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // History Actions
  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all practice history?")) {
      setSessions([]);
    }
  };

  const handleLoadSampleSession = () => {
    setSessions(INITIAL_SAMPLE_SESSIONS);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light text-dark">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 1.5: Features Overview */}
        <Features />

        {/* Section 2: Practice Section */}
        <section id="practice" className="py-5 bg-gradient-to-b from-white to-slate-50 border-bottom">
          <div className="container py-3">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">
                Interactive Practice Module
              </span>
              <h2 className="fw-bold mt-1 mb-2">Simulate Your Interview</h2>
              <p className="text-secondary">
                Select your job role and category below to generate realistic interview questions and get feedback.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Practice Configuration Form */}
              <PracticeForm
                params={params}
                onChangeParams={setParams}
                onGenerateQuestion={handleGenerateQuestion}
                isLoading={isGenerating}
              />

              {/* Error Banner */}
              {generateError && (
                <div className="alert alert-danger alert-dismissible fade show mt-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between" role="alert">
                  <div>
                    <strong>Error generating question:</strong> {generateError}
                  </div>
                  <button type="button" className="btn-close" onClick={() => setGenerateError(null)} aria-label="Close"></button>
                </div>
              )}

              {evaluateError && (
                <div className="alert alert-danger alert-dismissible fade show mt-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between" role="alert">
                  <div>
                    <strong>Error evaluating answer:</strong> {evaluateError}
                  </div>
                  <button type="button" className="btn-close" onClick={() => setEvaluateError(null)} aria-label="Close"></button>
                </div>
              )}

              {/* Question & Answer Card */}
              {hasGeneratedQuestion && (
                <div id="question-section">
                  <QuestionCard
                    question={currentQuestion}
                    params={params}
                    userAnswer={userAnswer}
                    onAnswerChange={setUserAnswer}
                    onEvaluate={handleEvaluateAnswer}
                    onRegenerate={handleGenerateQuestion}
                    isEvaluating={isEvaluating}
                    isGenerating={isGenerating}
                  />
                </div>
              )}

              {/* Evaluation Results Section */}
              {evaluation && (
                <ResultsView
                  evaluation={evaluation}
                  question={currentQuestion}
                  userAnswer={userAnswer}
                  params={params}
                  onPracticeAgain={handlePracticeAgain}
                />
              )}
            </div>
          </div>
        </section>

        {/* Section 2.5: Practice History Section */}
        <PracticeHistory
          sessions={sessions}
          onDeleteSession={handleDeleteSession}
          onClearHistory={handleClearHistory}
          onLoadSampleSession={handleLoadSampleSession}
        />

        {/* Section 3: About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
