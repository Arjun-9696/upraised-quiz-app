import React, { useEffect, useState } from 'react';
import { formatTime } from '../../Utils/formatTime';
import Quiz_Bubbles from '../../Icons/quiz_bubbles.svg';
import Result_Ani from '../../Icons/result_ani.svg';
import './Result.css';
import Speedometer from 'react-d3-speedometer';

const Result = ({ results, data, onReset, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [endTime, setEndTime] = useState('');

  // Showing the time taken to finish the quiz effect.
  useEffect(() => {
    if (time) {
      setEndTime(formatTime(time));
    }
  }, []);

  // Showing the Answers effect.
  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, []);

  return (
    <div className="result">
      <img src={Quiz_Bubbles} alt="Quiz Bubbles" />
      <div className="result_content">
        <div className="content">
          <h3>Your Result</h3>
          <div className="result_meter_div">
            {/* Result meter section */}
            <div className="meter_div">
              <Speedometer
                width={480}
                height={240}
                minValue={0}
                maxValue={100}
                needleHeightRatio={1}
                needleWidthRatio={2}
                startColor="red"
                endColor="green"
                ringWidth={15}
                segments={50}
                value={Math.floor((correctAnswers / data.length) * 100)} // value
                maxSegmentLabels={0}
                needleColor="#000080"
              />
              <img src={Result_Ani} alt="" />
              <div className="round">
                <div>
                  <h1>{Math.floor((correctAnswers / data.length) * 100)}%</h1>
                </div>
              </div>
            </div>
          </div>
          {/* Result Details section */}
          <div className="correct">
            {/* <img src={Correct_Dot} alt="Correct Dot" /> */}
            <div className="correct_dot"></div>
            <h5>{correctAnswers}</h5>
            <h6>Correct</h6>
          </div>
          <div className="incorrect">
            <div className="incorrect_dot"></div>
            <h5>{data.length - correctAnswers}</h5>
            <h6>Incorrect</h6>
          </div>
          <div className="timeTaken">
            <div className="timeTaken_dot"></div>
            <h5> {endTime}</h5>
            <h6>Your total time</h6>
          </div>
          <button className="reset" onClick={onReset}>
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
