import React, { useEffect, useState } from 'react';
import { formatTime } from '../../Utils/formatTime';
import Quiz_Bubbles from '../../Icons/quiz_bubbles.svg';
import Result_Ani from '../../Icons/result_ani.svg';
import './Result.css';
import Speedometer from 'react-d3-speedometer';
const Result = ({ results, data, onReset, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [endTime, setEndTime] = useState('');
  useEffect(() => {
    if (time) {
      setEndTime(formatTime(time));
    }
  }, []);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="result">
      <img src={Quiz_Bubbles} alt="Quiz Bubbles" />
      <div className="result_content">
        <div className="content">
          <h3>Your Result</h3>
          <div className="result_meter_div">
            <div className="meter_div">
              <Speedometer
                // className="speedometer"
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
          {/* <div>
            <p>
              {correctAnswers} of {data.length}
            </p>
            <p>{Math.floor((correctAnswers / data.length) * 100)}%</p>
            <p>Your total time : {endTime}</p>
            <button className="reset" onClick={onReset}>
              Restart Quiz
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Result;
