import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    return new GoogleGenAI({ apiKey });
  };

  const MODELS_TO_TRY = ["gemini-3.6-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

  const callGeminiWithRetry = async (ai: GoogleGenAI, requestParams: any) => {
    let lastError: any;
    for (const modelName of MODELS_TO_TRY) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const paramsWithModel = { ...requestParams, model: modelName };
          return await ai.models.generateContent(paramsWithModel);
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.message || "";
          console.warn(`[Gemini API] Error with ${modelName} (attempt ${attempt}): ${errMsg}`);
          const isTransient =
            errMsg.includes("503") ||
            errMsg.includes("UNAVAILABLE") ||
            errMsg.includes("high demand") ||
            errMsg.includes("429") ||
            err?.status === 503 ||
            err?.code === 503;

          if (isTransient && attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          break; // Try next model in fallback list
        }
      }
    }
    throw lastError;
  };

  // API endpoint: Generate Interview Question using Gemini AI
  app.post("/api/generate-question", async (req, res) => {
    try {
      const { interviewType, experienceLevel, jobRole } = req.body;

      if (!interviewType || !experienceLevel || !jobRole) {
        return res.status(400).json({
          error: "Missing required fields: interviewType, experienceLevel, or jobRole."
        });
      }

      const ai = getAi();
      const prompt = `You are an expert technical and HR interviewer specializing in hiring for ${jobRole} positions.

Generate exactly ONE unique, realistic, and high-quality interview question for a candidate with the following parameters:
- Target Job Role: ${jobRole}
- Interview Category / Type: ${interviewType}
- Experience Level: ${experienceLevel}

CRITICAL DIFFICULTY & SELECTION RULES:
1. Difficulty Calibration:
   - For "Intern", "University Student", or "Intern / University Student": Ask beginner-level foundational questions focusing on core concepts, coursework projects, basic problem-solving, or enthusiasm for learning.
   - For "Fresh Graduate" or "Entry Level": Ask junior-level questions focusing on entry-level industry practices, core technical/functional mechanics, basic real-world scenarios, or situational judgment.
   - For "Junior (1-2 Years)": Ask practical real-world questions focusing on real production edge-cases, trade-offs, debugging, system workflows, or cross-functional team collaboration.
2. Direct Role Relevance: The question MUST be deeply relevant and tailored specifically to the ${jobRole} role in a ${interviewType} context.
3. Freshness & Novelty: Be creative, varied, and distinct. Avoid overused generic questions.

OUTPUT FORMAT:
- Return ONLY the exact raw question text.
- Do NOT wrap in quotation marks, add question numbers, greetings, headings, or conversational filler.`;

      const response = await callGeminiWithRetry(ai, {
        contents: prompt,
        config: {
          temperature: 0.9,
        }
      });

      const rawQuestion = response.text ? response.text.trim() : "";
      const question = rawQuestion.replace(/^["']|["']$/g, '');

      if (!question) {
        return res.status(500).json({ error: "Failed to generate a question from AI." });
      }

      return res.json({ question });
    } catch (err: any) {
      console.error("Error generating question:", err);
      return res.status(500).json({
        error: err.message || "Failed to generate interview question via Gemini AI."
      });
    }
  });

  // API endpoint: Evaluate Answer using Gemini AI
  app.post("/api/evaluate-answer", async (req, res) => {
    try {
      const { interviewType, experienceLevel, jobRole, question, userAnswer } = req.body;

      if (!interviewType || !experienceLevel || !jobRole || !question || !userAnswer) {
        return res.status(400).json({
          error: "Missing required fields: interviewType, experienceLevel, jobRole, question, or userAnswer."
        });
      }

      const ai = getAi();
      const prompt = `You are a senior hiring lead and expert interview coach conducting a rigorous, highly personalized evaluation of a candidate's answer.

CANDIDATE & CONTEXT:
- Target Job Role: ${jobRole}
- Interview Category / Type: ${interviewType}
- Experience Level: ${experienceLevel}
- Question Asked: "${question}"
- Candidate's Exact Submitted Answer: "${userAnswer}"

EVALUATION INSTRUCTIONS:
Base your assessment strictly on the candidate's actual answer provided above. Never output canned or template responses.

1. "score": An integer rating from 1 to 10 evaluating the answer's quality, completeness, structure (e.g. STAR method), technical/functional accuracy, and relevance to a ${experienceLevel} ${jobRole}.
2. "strengths": 2 to 4 bullet points highlighting specific concepts, details, or structural elements the candidate articulated well in their exact response.
3. "areasForImprovement": 2 to 4 constructive bullet points highlighting concrete gaps, missing details, vague points, or structural weaknesses in their response.
4. "improvedAnswer": Provide a polished, high-scoring model answer for "${question}" tailored specifically for a ${experienceLevel} ${jobRole}, demonstrating ideal structure, depth, and clarity.
5. "followUpQuestion": A natural, realistic follow-up question an interviewer would ask next, building directly on what the candidate mentioned in their response.
6. "interviewSummary": A concise 2-3 sentence overall evaluation summary of the candidate's performance on this specific answer.
7. "personalizedTips": 3 to 4 actionable, role-specific interview tips tailored specifically to a ${jobRole} at the ${experienceLevel} level (e.g., specific methodologies, tools, metrics, or communication strategies for this role).`;

      const response = await callGeminiWithRetry(ai, {
        contents: prompt,
        config: {
          temperature: 0.3,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Rating from 1 to 10" },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of key strengths in candidate's response"
              },
              areasForImprovement: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of areas for improvement in candidate's response"
              },
              improvedAnswer: { type: Type.STRING, description: "A polished model answer" },
              followUpQuestion: { type: Type.STRING, description: "Realistic follow-up question" },
              interviewSummary: { type: Type.STRING, description: "Brief overall evaluation summary" },
              personalizedTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 3-4 personalized role-specific interview tips"
              }
            },
            required: [
              "score",
              "strengths",
              "areasForImprovement",
              "improvedAnswer",
              "followUpQuestion",
              "interviewSummary",
              "personalizedTips"
            ]
          }
        }
      });

      const jsonText = response.text ? response.text.trim() : "";
      if (!jsonText) {
        return res.status(500).json({ error: "Empty evaluation result from AI." });
      }

      const cleanedJsonText = jsonText.replace(/^```(json)?\s*/i, '').replace(/```$/s, '').trim();
      const evaluationData = JSON.parse(cleanedJsonText);
      return res.json(evaluationData);
    } catch (err: any) {
      console.error("Error evaluating answer:", err);
      return res.status(500).json({
        error: err.message || "Failed to evaluate answer via Gemini AI."
      });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
