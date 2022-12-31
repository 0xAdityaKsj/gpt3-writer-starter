import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import pirateLogo from '../assets/itachi.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>AI Chat-app</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Chat with Naruto Uzumaki</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a message to Naruto, ask him about anything , だってばよ</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="who are you?" className="prompt-box" value = {userInput} onChange = {onUserChangedText}/>
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
          <div className="generate">
            {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
          </div>
            </a>
        </div>
          {apiOutput && (
        <div className="output">
          <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.buymeacoffee.com/adityaksj"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>by aditya k</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
