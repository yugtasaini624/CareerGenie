import { useState } from "react";

import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import ResultCard from "./ResultCard";

import "./Quiz.css";


export default function QuizCard({

  quizData,

  sessionId

}) {


  const [currentQuestion, setCurrentQuestion] = useState(0);


  const [selectedAnswer, setSelectedAnswer] = useState("");


  const [answers, setAnswers] = useState([]);


  const [finished, setFinished] = useState(false);



  const totalQuestions = quizData.length;



  const handleNext = () => {


    const updatedAnswers = [...answers];


    updatedAnswers[currentQuestion] = {

      question_id: quizData[currentQuestion].id,

      selected: selectedAnswer

    };


    setAnswers(updatedAnswers);



    setSelectedAnswer("");



    if (currentQuestion === totalQuestions - 1) {


      setFinished(true);

      return;

    }



    setCurrentQuestion(

      currentQuestion + 1

    );


  };



  const restartQuiz = () => {


    setCurrentQuestion(0);

    setSelectedAnswer("");

    setAnswers([]);

    setFinished(false);


  };





  if (finished) {


    return (

      <ResultCard

        sessionId={sessionId}

        answers={answers}

        restartQuiz={restartQuiz}

      />

    );


  }




  return (

    <div className="quiz-container">


      <div className="quiz-top">


        <ProgressBar

          current={currentQuestion}

          total={totalQuestions}

        />



        <Timer

          onTimeUp={() => setFinished(true)}

        />


      </div>





      <QuestionCard


        question={quizData[currentQuestion]}


        currentQuestion={currentQuestion}


        totalQuestions={totalQuestions}


        selectedAnswer={selectedAnswer}


        setSelectedAnswer={setSelectedAnswer}


      />

      <div className="quiz-footer">

        <button

          className="next-btn"

          onClick={handleNext}

          disabled={!selectedAnswer}

        >

          {currentQuestion === totalQuestions - 1
            ? "Submit Assessment"
            : "Next Question →"}

        </button>

      </div>



    </div>

  );

}
