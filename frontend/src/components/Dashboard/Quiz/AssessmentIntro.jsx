import { useState } from "react";

import "./AssessmentIntro.css";


const skillsList = [

  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Python",
  "Java",
  "C++",
  "SQL",
  "Machine Learning",
  "Data Analysis"

];


const goals = [

  "Frontend Developer",
  "Full Stack Developer",
  "AI Engineer",
  "Data Scientist",
  "Backend Developer"

];


const difficulties = [

  "Beginner",
  "Intermediate",
  "Advanced"

];


export default function AssessmentIntro({

  onStart

}) {


const [skills,setSkills] = useState([]);

const [difficulty,setDifficulty] = useState("");

const [goal,setGoal] = useState("");



const toggleSkill=(skill)=>{


if(skills.includes(skill)){


setSkills(

skills.filter(

item=>item!==skill

)

);


}

else{


setSkills([

...skills,

skill

]);


}


};



const startAssessment=()=>{


if(

skills.length===0 ||

!difficulty ||

!goal

){

return;

}


onStart({

skills,

difficulty,

goal

});


};



return (

<div className="ai-assessment-intro">


<h1>

AI Skill Assessment 🚀

</h1>



<p>

Tell us about your current skills and career goal.

Our AI will create a personalized assessment.

</p>




<div className="ai-assessment-section">


<h3>

Select your skills

</h3>



<div className="ai-skills-grid">


{

skillsList.map(skill=>(


<div

key={skill}

onClick={()=>toggleSkill(skill)}

className={`ai-skill-chip

${skills.includes(skill)

? "active"

: ""

}`}

>

{skill}


</div>


))

}


</div>


</div>






<div className="ai-assessment-section">


<h3>

Career Goal

</h3>


<div className="ai-skills-grid">


{

goals.map(item=>(


<div

key={item}

onClick={()=>setGoal(item)}

className={`ai-skill-chip

${goal===item

? "active"

: ""

}`}

>

{item}


</div>


))

}


</div>


</div>







<div className="ai-assessment-section">


<h3>

Difficulty Level

</h3>


<div className="ai-difficulty-grid">


{

difficulties.map(level=>(


<button

key={level}

onClick={()=>setDifficulty(level)}

className={`ai-difficulty-btn

${difficulty===level

? "active"

: ""

}`}


>

{level}


</button>


))

}


</div>


</div>







<button

className="ai-generate-btn"

disabled={

skills.length===0 ||

!difficulty ||

!goal

}


onClick={startAssessment}


>

Generate AI Assessment ✨


</button>



</div>


);


}