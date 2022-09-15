import React,{useState,useEffect,useRef} from 'react'
import "./Quiz.css"
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

   useEffect(() => {
     const findCheckedInput =
       radiosWrapper.current.querySelector('input:checked');
     if (findCheckedInput) {
       findCheckedInput.checked = false;
     }
   }, [data]);

   const changeHandler = (e) => {
     setSelected(e.target.value);
     if (error) {
       setError('');
     }
   };

   const nextClickHandler = (e) => {
     onAnswerUpdate((prevState) => [
       ...prevState,
       { q: data.question, a: selected },
     ]);
     setSelected('');
     if (currentQuestion < numberOfQuestions - 1) {
       onSetCurrentQuestion(currentQuestion + 1);
     } else {
       onSetMenu("result");
     }
   };
   useEffect(() => {
     const timer = setTimeout(() => {
       if (currentQuestion == numberOfQuestions - 1) {
         onSetMenu('result');
       }
       onSetCurrentQuestion(currentQuestion + 1);
     }, 10 * 1000);
     return () => clearTimeout(timer);
   }, [currentQuestion]);

  return (
    <div className="quiz">
      <div className="quiz_content">
        <div className="content">
          <h2>{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice,i) => (
              <label className="radio_label" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  onChange={changeHandler}
                />
                {choice}
              </label>
            ))}
          </div>
          <div className="label_error">error here</div>
          <button className="next_button" onClick={nextClickHandler}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz