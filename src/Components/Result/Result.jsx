import React, { useEffect, useState } from 'react'
import { formatTime } from '../../Utils/formatTime';
const Result = ({ results, data, onReset, time }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [endTime,setEndTime] = useState("");
  useEffect(()=>{
    if(time){
      setEndTime(formatTime(time))
    }
  },[])

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
      <div className="result_content">
        <div className="content">
          <h3>Your Result</h3>
          <p>
            {correctAnswers} of {data.length}
          </p>
          <p>{Math.floor((correctAnswers / data.length) * 100)}%</p>
          <p>Your total time : {endTime}</p>
          <button className="reset" onClick={onReset}>
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result