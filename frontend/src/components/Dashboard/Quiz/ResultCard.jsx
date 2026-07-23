import { useEffect, useState } from "react";

import {
  Trophy,
  RotateCcw,
  CheckCircle,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp
} from "lucide-react";

import axios from "axios";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import "./Quiz.css";



export default function ResultCard({

  sessionId,
  answers,
  restartQuiz,
  role = "Frontend Developer"

}) {


  const [result,setResult] = useState(null);

  const [loading,setLoading] = useState(true);


  const navigate = useNavigate();




  useEffect(()=>{


    submitQuiz();


  },[]);






  const submitQuiz = async()=>{


    try{


      const token = localStorage.getItem("token");



      const response = await axios.post(

        "https://career-genie-backend-gf7z.onrender.com/api/quiz/submit",

        {

          session_id: sessionId,

          answers: answers

        },

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );





      if(response.data.success){


        setResult(response.data);


      }



    }

    catch(error){


      toast.error(

        error.response?.data?.message ||

        "Quiz submission failed"

      );


    }


    finally{


      setLoading(false);


    }


  };









  if(loading){


    return(


      <div className="result-card loading-card">


        <div className="loading-circle"></div>


        <h2>

          Analyzing Your Performance...

        </h2>


        <p>

          Our AI is evaluating your answers and
          preparing personalized insights.

        </p>


      </div>


    );


  }






  if(!result){

    return null;

  }







  return (

    <div className="result-card">






      {/* HERO */}


      <div className="result-icon">

        <Trophy size={42}/>

      </div>





      <h1>

        Assessment Completed 🎉

      </h1>





      <p className="result-subtitle">


        Fantastic work! Your assessment has been
        evaluated successfully. Here's how you performed.


      </p>









      {/* SCORE */}



      <div className="score-box">


        <span>

          Your Score

        </span>



        <h2>

          {result.score} / {result.total}

        </h2>




        <p>

          {result.percentage}% Accuracy

        </p>



      </div>









      {/* STATS */}



      <div className="result-stats">





        <div className="stat-card">


          <div className="stat-icon success">


            <CheckCircle size={22}/>


          </div>



          <span>

            Correct

          </span>



          <h3>

            {result.score}

          </h3>



        </div>









        <div className="stat-card">


          <div className="stat-icon danger">


            <XCircle size={22}/>


          </div>



          <span>

            Wrong

          </span>



          <h3>

            {result.total - result.score}

          </h3>



        </div>









        <div className="stat-card">


          <div className="stat-icon info">


            <TrendingUp size={22}/>


          </div>




          <span>

            Skill Level

          </span>



          <h3>

            {result.level}

          </h3>



        </div>





      </div>









      {/* AI RECOMMENDATION */}



      <div className="recommendation">



        <div className="section-title">


          <Sparkles size={18}/>


          <h3>

            AI Recommendation

          </h3>


        </div>






        <p>


          Based on your performance, you're currently at


          <strong>

            {" "}{result.level}

          </strong>


          {" "}level.



          Your personalized roadmap will focus on
          strengthening weak concepts while expanding
          your existing skills.


        </p>



      </div>









      {/* CERTIFICATE */}



      <div className="certificate-card">



        <div className="section-title">


          <Award size={20}/>


          <h3>

            Career Genie Certificate

          </h3>


        </div>








        <div className="certificate-status">



        {


          result.percentage === 100


          ?


          (

            <button


              className="certificate-btn"


              onClick={()=>


                navigate(

                  `/certificate/${sessionId}`

                )


              }


            >


              <Award size={18}/>


              Download Certificate



            </button>


          )


          :


          (

            <>

            🔒 Locked

            </>

          )


        }



        </div>









        <p>


        {


          result.percentage === 100



          ?


          `Congratulations! You achieved 100% in ${role}. Your verified Career Genie certificate is ready.`



          :



          "Earn a perfect 100% score to unlock your Career Genie certificate."


        }



        </p>





      </div>









      {/* ROADMAP */}



      <button


        className="roadmap-btn"


        disabled


      >


        Generate AI Roadmap


        <ArrowRight size={18}/>



      </button>





      <p className="coming-soon">

        🚀 Coming Soon

      </p>









      {/* RESTART */}



      <button


        className="restart-btn"


        onClick={restartQuiz}


      >



        <RotateCcw size={18}/>



        Restart Assessment



      </button>







    </div>


  );


}
