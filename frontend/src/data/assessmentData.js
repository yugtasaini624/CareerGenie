const assessmentQuestions = [

    {
        id:"current_skills",
        question:"Which skills do you already know?",
        type:"multiple",
        options:[
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
        ]
    },


    {
        id:"learning_goals",
        question:"Which skills do you want to learn?",
        type:"multiple",
        options:[
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Python",
            "Machine Learning",
            "Deep Learning",
            "SQL",
            "Cloud",
            "System Design"
        ]
    },


    {
        id:"level",
        question:"What is your current experience level?",
        type:"single",
        options:[
            "Beginner",
            "Intermediate",
            "Advanced"
        ]
    },


    {
        id:"target_role",
        question:"Which career role do you want?",
        type:"single",
        options:[
            "Frontend Developer",
            "Full Stack Developer",
            "AI Engineer",
            "Data Scientist",
            "Backend Developer"
        ]
    },


    {
        id:"weekly_hours",
        question:"How many hours can you study weekly?",
        type:"single",
        options:[
            "5",
            "10",
            "15",
            "20",
            "25+"
        ]
    },


    {
        id:"learning_pace",
        question:"Choose your learning pace",
        type:"single",
        options:[
            "Slow",
            "Moderate",
            "Fast"
        ]
    }

];


export default assessmentQuestions;