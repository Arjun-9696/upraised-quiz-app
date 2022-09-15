import React, { useState, useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Quiz.css';
import Quiz_Bubbles from '../../Icons/quiz_bubbles.svg';
const Quiz = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  currentQuestion,
  onSetCurrentQuestion,
  onSetMenu,
}) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

// Radio button checked effectiveness
  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector('input:checked');
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

// Selection the options by user
  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  };

// Next Question function when questions end it will render the Result.
  const nextClickHandler = (e) => {
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    setSelected('');
    if (currentQuestion < numberOfQuestions - 1) {
      onSetCurrentQuestion(currentQuestion + 1);
    } else {
      onSetMenu('result');
    }
  };

  // Timer effectiveness
  //10 seconds for every question to choose the correct answer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentQuestion == numberOfQuestions - 1) {
        onSetMenu('result');
      }
      onSetCurrentQuestion(currentQuestion + 1);
    }, 10 * 1000);
    return () => clearTimeout(timer);
  }, [currentQuestion]);


  const renderTime = () => {
    return (
      <div className="timer_text">
        <div className="current_text">
          {currentQuestion + 1}
          <div className="text"> /{numberOfQuestions}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="quiz">
      <img src={Quiz_Bubbles} alt="Quiz Bubbles" />
      <div className="timer_animation">
        <div className="timer">
          <CountdownCircleTimer
            size={218}
            strokeWidth={16}
            isPlaying
            rotation="counterclockwise"
            duration={10}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="quiz_content">
        <div className="content">
          <div className="question_div">
            <h2>{data.question}</h2>
          </div>
          {data.src ? (
            <div className="image">
              <img src={data.src} className="image" height="300px" width="600px" alt="Image" />
            </div>
          ) : (<></>)}
          <div className={data.src ? 'control_img' : 'control'} ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <div className="options_div">
                <label className="radio_label" key={i}>
                  <input
                    type="radio"
                    name="answer"
                    value={choice}
                    onChange={changeHandler}
                  />
                  {/* {choice} */}
                  <h2>{choice}</h2>
                </label>
              </div>
            ))}
          </div>
          <button className="next_button" onClick={nextClickHandler}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
