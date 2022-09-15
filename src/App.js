import React, { useState, useEffect } from 'react';
import './App.css';
import StartQuiz from './Components/StartQuiz/StartQuiz';
import Quiz from './Components/Quiz/Quiz';
import Result from './Components/Result/Result';
import quizData from './Json/QuizQuestions.json';
let interval;
function App() {
  const [menu, setMenu] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (menu === 'result') {
      clearTimeout(interval);
    }
  }, [menu]);

// Quiz starting logic
  const quizStartHandler = () => {
    setMenu('quiz');
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

// Restart the Quiz logic
  const resetClickHandler = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMenu('start');
    setTime(0);
  };
  return (
    <div className="App">
      {menu === 'start' && <StartQuiz onQuizStart={quizStartHandler} />}
      {menu === 'quiz' && (
        <Quiz
          data={quizData.data[currentQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.data.length}
          currentQuestion={currentQuestion}
          onSetCurrentQuestion={setCurrentQuestion}
          onSetMenu={setMenu}
        />
      )}
      {menu === 'result' && (
        <Result
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          time={time}
        />
      )}
    </div>
  );
}

export default App;
