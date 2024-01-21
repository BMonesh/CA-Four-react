import React, { useState } from "react";
import questions from "../questions";
import "./Quiz.css";

const Quiz = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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

  return (
    <>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <header>
          <img src="" alt="Logo" />
          <button id="toggle" onClick={toggleTheme}>
            {darkMode === false ? "Light" : "Dark"}
          </button>
        </header>
        {currentQuestionIndex < questions.length ? (
          <main>
            <div className="question">
              <p>{questions[currentQuestionIndex].text}</p>
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.isCorrect)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </main>
        ) : (
          <main className="complete">
            <div className="completed">
              <h1>Result :)</h1>
              <p>Quiz Completed!</p>
              <p>
                Your score is {score} out of {questions.length}.
              </p>
              <button onClick={restartQuiz}>Restart</button>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Quiz;
