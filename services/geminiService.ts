import { GoogleGenAI, Type } from "@google/genai";
import { Industry, SimulationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDealSimulation = async (
  description: string,
  industry: Industry
): Promise<SimulationResult> => {
  const modelId = "gemini-2.5-flash"; // Using flash for speed in complex reasoning

  const prompt = `
    As the Aetherius Core AI, you are an expert in ${industry}, Smart Contracts, DeFi, and Global Logistics.
    
    Analyze the following high-value deal scenario: "${description}"
    
    Generate a JSON response representing an "Anticipatory Smart Contract" structure.
    You must apply expert knowledge in:
    - Stages of growth and capital requirements.
    - Risk mitigation and regulatory compliance (KYC/AML/Cross-border).
    - Board composition strategy.
    
    The output must strictly follow this schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            contractId: { type: Type.STRING, description: "A generated hash ID for the contract (e.g., 0x...)" },
            structure: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Sequential steps of the deal execution."
            },
            riskMatrix: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  level: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
                  mitigation: { type: Type.STRING }
                }
              }
            },
            capitalStack: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  amount: { type: Type.STRING },
                  percentage: { type: Type.NUMBER }
                }
              }
            },
            complianceChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            strategicInsight: {
              type: Type.STRING,
              description: "A customized strategic advice paragraph based on founder expertise (Board composition, growth patterns, etc.)"
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SimulationResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Simulation failed:", error);
    // Fallback mock data in case of failure to maintain UI stability
    return {
      contractId: "ERR_FAIL_SAFE_001",
      structure: ["Analysis Failed", "Please Retry"],
      riskMatrix: [],
      capitalStack: [],
      complianceChecklist: ["System Offline"],
      strategicInsight: "Unable to generate insight at this moment."
    };
  }
};
