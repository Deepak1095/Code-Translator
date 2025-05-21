import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/fontawesome-free-solid';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const cleanCodeOutput = (text) => {
  const match = text.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
  return match ? match[1].trim() : text.trim();
};

function Home() {
  const [inputLanguage, setInputLanguage] = useState('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState('Python'); // Default for translate
  const [inputCode, setInputCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('night');

  const toggleTheme = () => {
    setTheme(theme === 'day' ? 'night' : 'day');
  };

  const languages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#',
    'TypeScript', 'PHP', 'Swift', 'Go', 'Ruby',
  ];

  const callGeminiAPI = async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to get response from Gemini API.");
    }
  };

  const translateCode = async () => {
    setLoading(true);
    try {
      const prompt = `You are a strict code translator. Your ONLY task is to translate the provided ${inputLanguage} code into equivalent ${outputLanguage} code.

      Output Rules:
      1. Provide ONLY the translated code.
      2. Do NOT include any explanations, comments, or conversational text.
      3. Do NOT include any import statements unless the functionality absolutely cannot be achieved without them, and only include the bare minimum necessary imports.
      4. Always enclose the translated code within a single markdown code block.

      Here is the ${inputLanguage} code to translate:\n\n\`\`\`${inputLanguage}\n${inputCode}\n\`\`\`\n\nTranslated ${outputLanguage} code:`;

      const result = await callGeminiAPI(prompt);
      setTranslatedCode(cleanCodeOutput(result));
    } catch (err) {
      console.error(err.message);
      setTranslatedCode("Error: Could not translate code.");
    }
    setLoading(false);
  };

  const handleDebug = async () => {
    setLoading(true);
    setOutputLanguage(inputLanguage);
    try {
      const prompt = `You are a code debugger. Analyze the following ${inputLanguage} code.
      
      Output Rules:
      1. First, list any issues or suggestions for improvement as bullet points.
      2. Then, on a new line, provide the corrected and improved ${inputLanguage} code.
      3. Ensure the corrected code is presented within a markdown code block.
      4. Do NOT include any conversational text outside of the bullet points and the code block.

      Here is the ${inputLanguage} code to debug:\n\n\`\`\`${inputLanguage}\n${inputCode}\n\`\`\`\n\nIssues and Improvements:\n- `;
      
      const result = await callGeminiAPI(prompt);
      setTranslatedCode(result);
    } catch (err) {
      console.error(err.message);
      setTranslatedCode("Error: Could not debug code.");
    }
    setLoading(false);
  };

  const handleQualityCheck = async () => {
    setLoading(true);
    setOutputLanguage(inputLanguage); 
    try {
      const prompt = `You are a code quality checker. Analyze the following ${inputLanguage} code for quality and best practices.

      Output Rules:
      1. First, list any improvements that can be made as bullet points.
      2. Then, on a new line, provide the updated and improved ${inputLanguage} code.
      3. Ensure the updated code is presented within a markdown code block.
      4. Do NOT include any conversational text outside of the bullet points and the code block.

      Here is the ${inputLanguage} code to quality check:\n\n\`\`\`${inputLanguage}\n${inputCode}\n\`\`\`\n\nQuality Improvements:\n- `;
      
      const result = await callGeminiAPI(prompt);
      setTranslatedCode(result);
    } catch (err) {
      console.error(err.message);
      setTranslatedCode("Error: Could not perform quality check.");
    }
    setLoading(false);
  };

  return (
    <div className={`md:h-screen text-center p-5 ${theme === 'night' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-sans text-2xl mx-auto">AI Code Translator</h4>
        <button
          className={`py-2 text-xl rounded-md ${theme === 'night' ? 'text-white' : 'text-black'} cursor-pointer transition duration-300`}
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={theme === 'night' ? faSun : faMoon} className="mr-2" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-center m-auto gap-4 mt-5 md:w-3/5 w-full">
        <button
          className={`w-full py-2 text-xl rounded-md ${theme === 'night' ? 'bg-white text-black' : 'bg-gray-700 text-white'} cursor-pointer transition duration-300 hover:bg-blue-500`}
          onClick={translateCode}
          disabled={loading}
        >
          Translate
        </button>
        <button
          className={`w-full py-2 text-xl rounded-md ${theme === 'night' ? 'bg-white text-black' : 'bg-gray-700 text-white'} cursor-pointer transition duration-300 hover:bg-blue-500`}
          onClick={handleDebug}
          disabled={loading}
        >
          Debug
        </button>
        <button
          className={`w-full py-2 text-xl rounded-md ${theme === 'night' ? 'bg-white text-black' : 'bg-gray-700 text-white'} cursor-pointer transition duration-300 hover:bg-blue-500`}
          onClick={handleQualityCheck}
          disabled={loading}
        >
          Quality Check
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full mx-auto mt-5">
        <div className="w-full md:w-1/2">
          <p className="text-center pb-3 text-2xl font-sans">Input</p>
          <select
            className={`bg-gray-800 h-12 w-full text-white px-2 text-lg ${theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'}`}
            onChange={(e) => setInputLanguage(e.target.value)}
            value={inputLanguage}
            disabled={loading}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <textarea
            className={`w-full h-64 md:h-96 bg-gray-800 ${theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'} text-white p-3 text-lg resize-none`}
            id="chat-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>

        <div className="w-full md:w-1/2">
          <p className="text-center pb-3 text-2xl font-sans">Output</p>
          <select
            className={`bg-gray-800 h-12 w-full text-white px-2 text-lg ${theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'}`}
            onChange={(e) => setOutputLanguage(e.target.value)}
            value={outputLanguage}
            disabled={loading}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <textarea
            className={`w-full h-64 md:h-96 bg-gray-800 ${theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'} text-white p-3 text-lg resize-none`}
            id="chat-message"
            value={loading ? 'Loading...' : translatedCode}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Home;