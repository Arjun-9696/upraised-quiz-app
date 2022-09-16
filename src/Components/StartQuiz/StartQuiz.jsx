import React from 'react';
import './StartQuiz.css';
import Logo from '../../Icons/logo.svg';
import Quiz_Logo from '../../Icons/quiz.svg';
const StartQuiz = ({ onQuizStart }) => {
  return (
    // Home section
    <div className="start">
      <div className="logo_div">
        <img className="vector_bg" src={Logo} alt="Logo" />
      </div>
      <div className="quiz_logo">
        <img src={Quiz_Logo} alt="Quiz Logo" />
      </div>
      <div className="start_content">
        <button
          title="Click to start quiz"
          className="start_button"
          onClick={onQuizStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartQuiz;
