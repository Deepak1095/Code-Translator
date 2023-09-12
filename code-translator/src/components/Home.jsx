import React, { useState } from 'react';
import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY

function Home(){
  const [inputLanguage, setInputLanguage] = useState('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState('Python');
  const [inputCode, setInputCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "TypeScript",
    "PHP",
    "Swift",
    "Go",
    "Ruby",
  ];
  

  const translateCode = async () => {
    setLoading(true);
    const jsCode = inputCode;
    try {
      const res = await axios.post("https://api.openai.com/v1/completions", {
        prompt: `You are a coding translator! Your task is to translate ${inputLanguage} code to ${outputLanguage} code. Your work is to give only the code; you don't have to tell anything about the code, just change it from ${inputLanguage} to ${outputLanguage}. There is no need for printing extra. Here is ${inputLanguage} code you need to translate: ${jsCode}`,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      });

      const translatedCode = res.data.choices[0].text;
      setTranslatedCode(translatedCode);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  const handleDebug = async () => {
    setLoading(true);
    // Implement debugging logic here
    const jsCode = inputCode;
    try {
      const res = await axios.post("https://api.openai.com/v1/completions", {
        prompt: `You are going to debug this code and tell me what changes we can make in our code you are going to tell me in list and give me the updated code at last  Here is the code you need to translate: ${jsCode}`,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      });

      const translatedCode = res.data.choices[0].text;
      setTranslatedCode(translatedCode);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  const handleQualityCheck = async () => {
    setLoading(true);
    // Implement quality check logic here
    const jsCode = inputCode;
    try {
      const res = await axios.post("https://api.openai.com/v1/completions", {
        prompt: `You are going to do a quality check of the code and tell me what changes we can make in our code. You are going to tell me in a list and give me the updated code at last. Here is the code you need to translate: ${jsCode}`,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      });

      const translatedCode = res.data.choices[0].text;
      setTranslatedCode(translatedCode);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };
return(
  <div className="text-center bg-gray-100 p-5">
  <h4 className="font-sans text-2xl">AI Code Translator</h4>
  <div className="flex justify-center gap-4 mt-5">
    <button className="w-1/3 py-2 text-xl rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={translateCode} disabled={loading}>
      Translate
    </button>
    <button className="w-1/3 py-2 text-xl rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={handleDebug} disabled={loading}>
      Debug
    </button>
    <button className="w-1/3 py-2 text-xl rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={handleQualityCheck} disabled={loading}>
      Quality Check
    </button>
  </div>
  <div className="flex w-90 mx-auto mt-5">
    <div className="w-1/2">
      <p className="text-center pb-3 text-2xl font-sans">Input</p>
      <select
        className="bg-gray-800 h-12 w-full text-white px-2 text-lg"
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
        className="w-full h-96 bg-gray-800 border border-gray-600 text-white p-3 text-lg resize-none"
        id="chat-input"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        disabled={loading}
      ></textarea>
    </div>
    <div className="w-1/2">
      <p className="text-center pb-3 text-2xl font-sans">Output</p>
      <select
        className="bg-gray-800 h-12 w-full text-white px-2 text-lg"
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
        className="w-full h-96 bg-gray-800 border border-gray-600 text-white p-3 text-lg resize-none"
        id="chat-message"
        value={loading ? 'Loading...' : translatedCode}
        readOnly
      ></textarea>
    </div>
  </div>
</div>
)


};

export default Home