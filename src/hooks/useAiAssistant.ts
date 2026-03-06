import { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

// Ensure VITE_GEMINI_API_KEY is set in your .env file locally and in your deployment dashboard.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export type SectionType = 'experience' | 'education' | 'skills' | 'summary';

export const useAiAssistant = () => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const handleAiSuggestion = async (
    sectionType: SectionType,
    context: any,
    onSuccess: (content: string | string[]) => void
  ) => {
    const loadingKey = context.id || sectionType;
    setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
    setError(null);

    try {
      if (!apiKey) {
        throw new Error('API key missing');
      }

      // Initialize SDK inside the handler to ensure fresh state and avoid top-level crashes
      const ai = new GoogleGenAI({ apiKey });

      let prompt = '';
      let responseSchema: any = null;

      switch (sectionType) {
        case 'experience':
          prompt = `Write 3 professional resume bullet points for a ${context.position} at ${context.company}. Use action verbs.`;
          break;
        case 'education':
          prompt = `Summarize key academic achievements for a ${context.degree} at ${context.school}.`;
          break;
        case 'summary':
          prompt = `Write a professional 2-3 sentence resume summary for a ${context.jobTitle}. Focus on key strengths and experience.`;
          break;
        case 'skills':
          prompt = `Suggest 10 relevant hard and soft skills for a ${context.jobTitle} position. Return as a JSON array of strings.`;
          responseSchema = {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          };
          break;
      }

      const response = await ai.models.generateContent({
        model: "gemini-flash-latest", // Using stable alias
        contents: [{ parts: [{ text: prompt }] }],
        config: responseSchema ? {
          responseMimeType: "application/json",
          responseSchema
        } : undefined
      });

      const text = response.text;
      if (!text) throw new Error('No content generated');

      if (responseSchema) {
        onSuccess(JSON.parse(text));
      } else {
        onSuccess(text);
      }
    } catch (err) {
      console.error('AI Generation Error:', err);
      alert("AI service currently unavailable. Please check your connection or try again later.");
      setError('Try again');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  return { handleAiSuggestion, isLoading, error };
};
