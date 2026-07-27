import { EvaluationResult, PracticeSession, QuestionParams } from '../types';

export const INTERVIEW_TYPES = [
  'Technical',
  'Behavioral',
  'System Design',
  'HR / Culture Fit',
  'Situational',
] as const;

export const EXPERIENCE_LEVELS = [
  'Intern / University Student',
  'Entry Level / Fresh Graduate',
  'Junior (1-2 Years)',
] as const;

export const SAMPLE_JOB_ROLES = [
  'Software Engineer',
  'Data Analyst',
  'Product Manager',
  'Frontend Developer',
  'Cybersecurity Analyst',
  'Marketing Specialist',
];

export const MOCK_QUESTIONS: Record<string, string[]> = {
  'Technical': [
    "Explain the difference between process and thread, and how memory is managed between them in modern operating systems.",
    "Describe how a REST API differs from GraphQL. When would you choose one over the other for a fresh graduate project?",
    "What are data structures like Hash Tables, and how do you handle hash collisions in production applications?",
    "Explain the concept of asynchronous programming in JavaScript/Node.js and how Promises and async/await work under the hood."
  ],
  'Behavioral': [
    "Tell me about a time you faced a difficult conflict during a team project in university. How did you handle it and what was the outcome?",
    "Describe a situation where a project deadline was approaching, but you encountered unexpected technical blockers. How did you prioritize?",
    "Give an example of a time you had to learn a completely new technology or tool independently in a short amount of time.",
    "Share an instance where you received critical feedback from a professor or teammate. How did you respond and improve?"
  ],
  'System Design': [
    "Design a simple URL shortening service like Bit.ly. What are the key API endpoints and database considerations?",
    "How would you approach designing a notification system for a university portal that alerts 10,000 students simultaneously?",
    "Explain how a Web Application Firewall (WAF) and Load Balancer fit into a cloud architecture for high availability."
  ],
  'HR / Culture Fit': [
    "Why are you interested in joining our company as a fresh graduate, and what short-term career goals do you hope to achieve here?",
    "What company environment or team dynamics enable you to perform at your absolute best?",
    "How do you stay updated with industry trends and continuously invest in personal development outside your degree requirements?"
  ],
  'Situational': [
    "Imagine your manager assigns you two high-priority tasks with conflicting deadlines on your first week. How would you handle this?",
    "If you notice a critical bug in a team project right before submission, what steps would you take immediately?",
    "How would you explain a complex technical concept to a non-technical stakeholder or client?"
  ]
};

export const DEFAULT_MOCK_EVALUATION: EvaluationResult = {
  score: 8,
  summary: "Solid, structured response showing strong foundational knowledge and good articulation. You demonstrated clear problem-solving steps and relevant technical terminology suitable for an entry-level position.",
  strengths: [
    "Clear and logical structure following a modified STAR method (Situation, Task, Action, Result).",
    "Used accurate domain terminology relevant to the target role.",
    "Demonstrated strong ownership and willingness to collaborate with team members."
  ],
  improvements: [
    "Include more specific metrics or quantifiable results to quantify impact (e.g., improved speed by 25% or saved 3 hours).",
    "Elaborate slightly more on the specific technical choices made and trade-offs considered.",
    "Conclude with a brief summary statement summarizing what you learned from the experience."
  ],
  improvedAnswer: "In my final-year university project, our team faced an unexpected database latency issue when handling concurrent user requests. I took ownership of the performance bottleneck by analyzing query logs. I introduced indexing on key columns and refactored our REST endpoints to cache frequent queries. This reduced average response time by 40% and enabled our team to successfully present a responsive application during final evaluation.",
  followUpQuestion: "That makes sense! If user traffic grew by 10x next month, how would your approach scale, and what database caching strategies would you introduce next?",
  personalizedTips: [
    "Structure behavioral answers using STAR: Situation, Task, Action, Result.",
    "Always state the business or project outcome clearly—numbers make your answers memorable.",
    "Keep answers concise (around 90 to 120 seconds spoken time) to keep the interviewer engaged.",
    "Highlight your continuous learning mindset and adaptability as a fresh graduate."
  ]
};

export const INITIAL_SAMPLE_SESSIONS: PracticeSession[] = [
  {
    id: "sample-session-1",
    timestamp: new Date(Date.now() - 86400000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    params: {
      interviewType: 'Behavioral',
      experienceLevel: 'Entry Level / Fresh Graduate',
      jobRole: 'Software Engineer'
    },
    question: "Tell me about a time you faced a difficult conflict during a team project in university. How did you handle it and what was the outcome?",
    userAnswer: "During my senior capstone project, our team disagreed on whether to use SQL or MongoDB. One member wanted MongoDB while others wanted PostgreSQL. I set up a quick 30-minute comparison meeting where we listed pros and cons based on our project requirements. We decided on PostgreSQL because of relational requirements, and the team was satisfied.",
    evaluation: {
      score: 8,
      summary: "Effective response highlighting leadership, active listening, and objective decision-making.",
      strengths: [
        "Addressed team dynamics professionally without pointing fingers.",
        "Used a data-driven comparison approach to resolve technical disagreement.",
        "Reached a clear team consensus efficiently."
      ],
      improvements: [
        "Mention the specific project deadline impact.",
        "Add a closing sentence about how this improved your team communication skills long term."
      ],
      improvedAnswer: "During my capstone project, our four-person team debated between MongoDB and PostgreSQL. To resolve the standstill without missing our milestone, I organized an objective benchmark session. We evaluated query complexity and schema requirements, determining PostgreSQL fit our relational needs best. As a result, we stayed on schedule and delivered a database schema with zero migration delays.",
      followUpQuestion: "How do you handle a situation if a teammate still disagrees even after a group consensus?",
      personalizedTips: [
        "Focus on 'I' actions while giving credit to 'We' outcomes.",
        "Emphasize conflict resolution as a positive collaboration tool."
      ]
    }
  }
];
