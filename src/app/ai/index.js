const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the AI client
const genAI = new GoogleGenerativeAI("AIzaSyDi__iJH_z8w7KaZxLc96NQpyu1Kw3F6JA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate content using Gemini AI
 * @param {string} prompt - Text prompt for the AI
 * @returns {Promise<string>} - Generated text response
 */
async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

generateContent("helo").then(console.log);

module.exports = { generateContent };
