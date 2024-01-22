import React, { useState, useEffect } from "react";
import questions from "../questions";
import "./Quiz.css";

import Highlight from "../assets/Highlight.png"
import DeHighlight from "../assets/De-Highlight.png"
import kalviumLogo from "../assets/Kalvium-Logo-SVG.svg"

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highlited, setHighlited] = useState(false);

  const [dark, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = dark ? "dark-theme" : "light-theme";
  }, [dark]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const headerStyle = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
    borderBottom: dark ? "4px solid #00203f" : "4px solid #a9dbec",
  };

  const headerButtonStyle = {
    backgroundColor: dark ? "#00203f" : "#a9dbec",
    color: dark ? "white" : "black",
  };

  const backStyle = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
  };

  const mainStyle = {
    backgroundColor: dark ? "#00203f" : "#a9dbec",
  };

  const optionStyle = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
    color: dark ? "black" : "white",
  };

  const paraStyle = {
    color: dark ? "white" : "black",
  };

  const resultStyle = {
    color: dark ? "#a9dbec" : "#00203f",
  };

  const resultBtn = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
    color: dark ? "black" : "white",
  };

  return (
    <>
      <div className="app" style={backStyle}>
        <header style={headerStyle}>
          <img className="kalvium" src={kalviumLogo} alt="Logo" />
          <button style={headerButtonStyle} id="toggle" onClick={toggleTheme}>
            {dark === false ? "Light" : "Dark"}
          </button>
        </header>
        {currentQuestionIndex < questions.length ? (
          <main style={mainStyle}>
            <div className="high">
              <img src={highlited == true ? `${Highlight}` : `${DeHighlight}`} onClick={() => {
                highlited == true ? setHighlited(false) : setHighlited(true)
              }}/>
            </div>
            <div className="question">
              <p id={highlited ? "highlited" : ""} style={resultStyle}>{questions[currentQuestionIndex].text}</p>
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.isCorrect)}
                  style={optionStyle}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </main>
        ) : (
          <main className="complete" style={mainStyle}>
            <div className="completed">
              <h1 style={paraStyle}>Result :)</h1>
              <p style={resultStyle}>Quiz Completed!</p>
              <p style={resultStyle}>
                Your score is {score} out of {questions.length}
              </p>
              <button style={resultBtn} onClick={restartQuiz}>
                Restart
              </button>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Quiz;
