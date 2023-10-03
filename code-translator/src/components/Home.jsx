import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/fontawesome-free-solid'; // Import day and night icons

import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

function Home() {
  const [inputLanguage, setInputLanguage] = useState('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState('Python');
  const [inputCode, setInputCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('night'); // Add theme state

  const toggleTheme = () => {
    setTheme(theme === 'day' ? 'night' : 'day');
  };
  const languages = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'TypeScript',
    'PHP',
    'Swift',
    'Go',
    'Ruby',
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

  return (
    <div
      className={`md:h-screen text-center p-5 ${
        theme === 'night' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
        <div className="flex justify-between items-center mb-4">
        <h4 className="font-sans text-2xl mx-auto">AI Code Translator</h4>
        <button
          className={`py-2 text-xl rounded-md ${
            theme === 'night' ?' text-white' :  ' text-black'
          } cursor-pointer transition duration-300`}
          onClick={toggleTheme}
        >
          <FontAwesomeIcon
            icon={theme === 'night' ? faSun : faMoon}
            className="mr-2"
          />
        </button>
      </div>
      <div className={`flex flex-col md:flex-row md:justify-center m-auto gap-4 mt-5  md:w-3/5 w-full`}>
  <button
    className={`w-full py-2 text-xl rounded-md ${
      theme === 'night' ? 'bg-white text-black' : 'bg-gray-700 text-white'
    } cursor-pointer transition duration-300 hover:bg-blue-500`}
    onClick={translateCode}
    disabled={loading}
  >
    Translate
  </button>
  <button
    className={`w-full py-2 text-xl rounded-md ${
      theme === 'night' ? 'bg-white text-black' : 'bg-gray-700 text-white'
    }  cursor-pointer transition duration-300 hover:bg-blue-500`}
    onClick={handleDebug}
    disabled={loading}
  >
    Debug
  </button>
  <button
    className={`w-full py-2 text-xl rounded-md ${
      theme === 'night' ? 'bg-white text-black' : 'bg-gray-700 text-white'
    } cursor-pointer transition duration-300 hover:bg-blue-500`}
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
            className={`bg-gray-800 h-12 w-full text-white px-2 text-lg ${
              theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'
            }`}
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
            className={`w-full h-64 md:h-96 bg-gray-800 ${
              theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'
            } text-white p-3 text-lg resize-none`}
            id="chat-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-center pb-3 text-2xl font-sans">Output</p>
          <select
            className={`bg-gray-800 h-12 w-full text-white px-2 text-lg ${
              theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'
            }`}
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
            className={`w-full h-64 md:h-96 bg-gray-800 ${
              theme === 'night' ? 'border border-gray-700' : 'border border-gray-600'
            } text-white p-3 text-lg resize-none`}
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
