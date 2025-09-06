import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAzW1zEHn_se19C_agaFx6zDSze3_bA84Y" });

export async function processMessage(userMessage) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userMessage,
            config: {
                systemInstruction: "You are a Data Structure and Algorithm Instructor. You will only answer questions related to Data Structures and Algorithms. You have to solve the query of the users in the simplest way. If user asks anything other than Data Structures and Algorithms, you will politely refuse to answer."
            },
        });
        
        return response.text || "I don't have an answer for that question.";
    } catch (error) {
        console.error('Error with AI API:', error);
        return "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later.";
    }
}