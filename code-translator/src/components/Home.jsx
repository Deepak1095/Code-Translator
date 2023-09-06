import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [inputLanguage, setInputLanguage] = useState("JavaScript");
  const [outputLanguage, setOutputLanguage] = useState("Python");
  const [inputCode, setInputCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputLanguageChange = (e) => {
    setInputLanguage(e.target.value);
  };

  const handleOutputLanguageChange = (e) => {
    setOutputLanguage(e.target.value);
  };

  const handleTranslateClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-004/completions",
        {
          prompt: `You are a coding translator! Your task is to translate ${inputLanguage} code to ${outputLanguage} code. Your work is to give only the code; you don't have to tell anything about the code, just change it from ${inputLanguage} to ${outputLanguage}. There is no need for printing extra. Here is ${inputLanguage} code you need to translate: ${inputCode}`,
          max_tokens: 50,
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          }
        }
      );

      const translatedCode = response.data.choices[0].text;
      setTranslatedCode(translatedCode);
    } catch (err) {
      console.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-black text-white">
      <div id="heading" className="mx-auto mt-16 text-center w-1/5 text-3xl font-serif">
        <h4>AI Code Translator</h4>
      </div>
      <div className="w-full mt-2">
        <label htmlFor="inputLanguage" className="block">
          Input Language:
        </label>
        <select
          id="inputLanguage"
          value={inputLanguage}
          onChange={handleInputLanguageChange}
          className="w-full bg-gray-800 h-9 text-white border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="TypeScript">TypeScript</option>
          <option value="PHP">PHP</option>
          <option value="Swift">Swift</option>
          <option value="Go">Go</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>
      <div className="w-full mt-2">
        <label htmlFor="outputLanguage" className="block">
          Output Language:
        </label>
        <select
          id="outputLanguage"
          value={outputLanguage}
          onChange={handleOutputLanguageChange}
          className="w-full bg-gray-800 h-9 text-white border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="TypeScript">TypeScript</option>
          <option value="PHP">PHP</option>
          <option value="Swift">Swift</option>
          <option value="Go">Go</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>
      <div className="w-full mt-2">
        <label htmlFor="inputCode" className="block">
          Input Code:
        </label>
        <textarea
          id="inputCode"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          className="w-full h-40 bg-gray-800 text-white p-2"
        ></textarea>
      </div>
      <button
        onClick={handleTranslateClick}
        disabled={isLoading}
        className={`w-40 mx-auto h-9 text-2xl border bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
      <div className="mt-4">
        <h2 className="text-2xl">Translated Code:</h2>
        <pre className="bg-gray-800 text-white p-2">{translatedCode}</pre>
      </div>
    </div>
  );
}

export default Home;
