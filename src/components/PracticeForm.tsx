import React from 'react';
import { EXPERIENCE_LEVELS, INTERVIEW_TYPES, SAMPLE_JOB_ROLES } from '../data/mockData';
import { ExperienceLevel, InterviewType, QuestionParams } from '../types';
import { Sparkles, Briefcase, GraduationCap, Layers } from 'lucide-react';

interface PracticeFormProps {
  params: QuestionParams;
  onChangeParams: (newParams: QuestionParams) => void;
  onGenerateQuestion: () => void;
  isLoading: boolean;
}

export const PracticeForm: React.FC<PracticeFormProps> = ({
  params,
  onChangeParams,
  onGenerateQuestion,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.jobRole.trim()) return;
    onGenerateQuestion();
  };

  return (
    <div className="card shadow-sm border-0 p-4 bg-white">
      <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
        <div className="bg-soft-primary p-2 rounded-2 text-primary">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="h5 fw-bold mb-0">Step 1: Configure Interview Parameters</h2>
          <p className="text-muted fs-7 mb-0">Select your target position and question category</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Interview Type Dropdown */}
          <div className="col-md-4">
            <label className="form-label fw-medium text-dark fs-7 d-flex align-items-center gap-1.5">
              <Layers size={15} className="text-primary" />
              <span>Interview Type</span>
            </label>
            <select
              className="form-select"
              value={params.interviewType}
              onChange={(e) => onChangeParams({ ...params, interviewType: e.target.value as InterviewType })}
            >
              {INTERVIEW_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level Dropdown */}
          <div className="col-md-4">
            <label className="form-label fw-medium text-dark fs-7 d-flex align-items-center gap-1.5">
              <GraduationCap size={15} className="text-primary" />
              <span>Experience Level</span>
            </label>
            <select
              className="form-select"
              value={params.experienceLevel}
              onChange={(e) => onChangeParams({ ...params, experienceLevel: e.target.value as ExperienceLevel })}
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Job Role Input */}
          <div className="col-md-4">
            <label className="form-label fw-medium text-dark fs-7 d-flex align-items-center gap-1.5">
              <Briefcase size={15} className="text-primary" />
              <span>Job Role / Target Field</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Software Engineer, Data Analyst"
              value={params.jobRole}
              onChange={(e) => onChangeParams({ ...params, jobRole: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Quick Role Preset Pills */}
        <div className="mt-3">
          <span className="text-muted fs-8 fw-medium me-2">Popular suggestions:</span>
          <div className="d-inline-flex flex-wrap gap-1.5 align-items-center">
            {SAMPLE_JOB_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                className={`badge border text-decoration-none fw-normal cursor-pointer py-1.5 px-2.5 rounded-2 transition-all ${
                  params.jobRole === role ? 'bg-primary text-white border-primary' : 'bg-light text-secondary hover:bg-slate-200'
                }`}
                onClick={() => onChangeParams({ ...params, jobRole: role })}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-4 pt-2 border-top d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary d-inline-flex align-items-center gap-2 shadow-sm"
            disabled={isLoading || !params.jobRole.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Generating Question...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate Question</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
