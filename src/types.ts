export type InterviewType = 
  | 'Technical' 
  | 'Behavioral' 
  | 'System Design' 
  | 'HR / Culture Fit' 
  | 'Situational';

export type ExperienceLevel = 
  | 'Intern / University Student' 
  | 'Entry Level / Fresh Graduate' 
  | 'Junior (1-2 Years)';

export interface QuestionParams {
  interviewType: InterviewType;
  experienceLevel: ExperienceLevel;
  jobRole: string;
}

export interface EvaluationResult {
  score: number; // 1 to 10
  summary: string;
  strengths: string[];
  improvements: string[];
  improvedAnswer: string;
  followUpQuestion: string;
  personalizedTips: string[];
}

export interface PracticeSession {
  id: string;
  timestamp: string;
  params: QuestionParams;
  question: string;
  userAnswer: string;
  evaluation: EvaluationResult;
}
