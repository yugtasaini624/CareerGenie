import os
import json
import time
import re
from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# ==============================
# GEMINI SAFE CALLER
# ==============================

def call_gemini(prompt):

    retries = 3

    for attempt in range(retries):

        try:

            response = client.models.generate_content(
                model="gemini-3.1-flash-lite",
                contents=prompt
            )


            if not response.text:

                raise Exception(
                    "Empty Gemini response"
                )


            return response.text.strip()



        except Exception as e:


            error = str(e)


            print(
                "Gemini Error:",
                error
            )


            if (
                "503" in error
                or "UNAVAILABLE" in error
                or "429" in error
            ):


                wait = (attempt + 1) * 5


                print(
                    f"Retrying Gemini after {wait}s"
                )


                time.sleep(wait)


            else:

                raise e



    raise Exception(
        "Gemini service unavailable"
    )





# ==============================
# CLEAN JSON
# ==============================


def clean_json(text):

    if not text:

        return "{}"


    text = text.strip()


    text = text.replace(
        "```json",
        ""
    )


    text = text.replace(
        "```",
        ""
    )


    return text.strip()





# ==============================
# SAFE JSON PARSER
# ==============================


def safe_json_parse(text, default):

    try:

        return json.loads(text)


    except Exception as e:


        print(
            "JSON ERROR:",
            e
        )


        return default



def generate_learning_roadmap(
    role,
    current_skills,
    learning_goals,
    level,
    weekly_hours,
    learning_pace
):


    prompt = f"""

You are an expert AI career mentor.

Your task is to create a personalized learning roadmap.

Return ONLY valid JSON.

No markdown.
No explanation.
No extra text.


Target Role:
{role}


Current Skills:
{", ".join(current_skills)}


Skills User Wants To Learn:
{", ".join(learning_goals)}


Experience Level:
{level}


Weekly Study Hours:
{weekly_hours}


Learning Pace:
{learning_pace}



Create a realistic roadmap between 4-8 weeks.

The roadmap should:

- Start from user's current knowledge.
- Focus on missing skills required for the target role.
- Include practical projects.
- Increase difficulty gradually.
- Match the weekly learning time.



Return ONLY this JSON format:



{{
 "weeks":[

    {{
      "week":1,

      "goal":"",

      "tasks":[

          {{
            "title":"",
            "description":"",
            "hours":5,
            "project":""
          }}

      ]
    }}

 ]
}}

"""


    text = clean_json(
        call_gemini(prompt)
    )


    return safe_json_parse(
        text,
        {
            "weeks": []
        }
    )




def generate_project_recommendations(
    career,
    skills,
    readiness
):

    prompt = f"""
You are an expert software engineering mentor.

Create exactly 3 portfolio project ideas.

Career:
{career}

Current Skills:
{", ".join(skills)}

Readiness:
{readiness}%

Return ONLY valid JSON.

Format:

{{
 "projects":[
    {{
      "project_name":"",
      "difficulty":"",
      "skills":[
        "",
        ""
      ],
      "features":[
        "",
        ""
      ]
    }}
 ]
}}

Rules:
- project_name must be realistic
- difficulty must be Beginner, Intermediate, or Advanced
- skills must contain technologies
- features must contain 3 useful features
"""


    text = clean_json(
        call_gemini(prompt)
    )


    data = safe_json_parse(
        text,
        {
            "projects":[]
        }
    )


    projects = data.get(
        "projects",
        []
    )


    final_projects=[]


    for project in projects:


        final_projects.append({

            "project_name":
            project.get(
                "project_name",
                "Portfolio Project"
            ),


            "difficulty":
            project.get(
                "difficulty",
                "Intermediate"
            ),


            "skills":
            project.get(
                "skills",
                []
            ),


            "features":
            project.get(
                "features",
                []
            )

        })


    return {

        "projects":final_projects

    }

import json

def generate_resume_bullets(
    project_name,
    technologies,
    description
):

    tech = (
        technologies
        if isinstance(technologies,str)
        else ", ".join(technologies)
    )


    prompt = f"""
You are a professional senior technical resume writer.

Create ATS optimized resume bullets for a software engineer.

Project:
{project_name}

Tech Stack:
{tech}

Project Description:
{description}


Rules:

- Generate exactly 4 bullet points
- Start each bullet with strong action verbs
- Include measurable impact when possible
- Mention technologies naturally
- Avoid generic statements
- Keep each bullet under 25 words


Return ONLY JSON.

Format:

{{
 "bullets":[
 "",
 "",
 "",
 ""
 ]
}}

"""


    response = call_gemini(prompt)

    cleaned = clean_json(response)

    return json.loads(cleaned)





def generate_quiz(
    topic,
    difficulty
):

    prompt = f"""
You are an expert technical interviewer.

Generate exactly 10 multiple choice questions.

Topic:
{topic}

Difficulty:
{difficulty}

Return ONLY valid JSON.

No markdown.
No explanation.

JSON format:

{{
  "questions":[
    {{
      "question":"",

      "option_a":"",

      "option_b":"",

      "option_c":"",

      "option_d":"",

      "correct_answer":"A"
    }}
  ]
}}
"""


    text = clean_json(
        call_gemini(prompt)
    )

    return json.loads(text)





def generate_interview_question(
    role,
    difficulty,
    question_number,
    previous_questions=None
):

    if previous_questions is None:
        previous_questions = []


    previous = "\n".join(
        [
            f"- {q}"
            for q in previous_questions
        ]
    )


    prompt = f"""
You are an expert technical interviewer.

Conduct a realistic software engineering interview.

Role:
{role}

Difficulty:
{difficulty}

Current question number:
{question_number}


Questions already asked:

{previous}



Generate the next interview question.


STRICT RULES:

- Ask ONLY one question.
- Never repeat any previous question.
- Choose a different concept/topic.
- Increase difficulty gradually.
- Ask practical interview questions.
- Do not give answers.
- Do not give explanations.
- Return only the question text.

"""


    return call_gemini(prompt)





def generate_interview_feedback(
    role,
    question,
    answer,
    difficulty
):

    prompt = f"""
You are an expert technical interviewer.

Role:
{role}

Difficulty:
{difficulty}

Interview Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON.

Format:

{{
    "score": 8,
    "feedback": "",
    "improvement": ""
}}
"""


    text = clean_json(
        call_gemini(prompt)
    )

    return json.loads(text)



def analyze_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Resume:
{resume_text}

Return ONLY valid JSON.

Format:

{{
    "job_role": "Frontend Developer",
    "backend_stack": "Node.js",
    "match": 82,
    "resume_skills": [
        "React",
        "JavaScript",
        "HTML"
    ],
    "missing_skills": [
        "Docker",
        "AWS",
        "Redux"
    ]
}}

Rules:

- match must be an integer between 0 and 100.
- backend_stack should be "" if not applicable.
- resume_skills must be an array.
- missing_skills must be an array.
- Return ONLY JSON.
- No markdown.
- No explanation.
- No ``` blocks.
"""

    text = clean_json(
        call_gemini(prompt)
    )

    default_response = {
        "job_role": "Unknown",
        "backend_stack": "",
        "match": 0,
        "resume_skills": [],
        "missing_skills": []
    }

    data = safe_json_parse(
        text,
        default_response
    )

    return {
        "job_role": data.get("job_role", "Unknown"),
        "backend_stack": data.get("backend_stack", ""),
        "match": int(data.get("match", 0)),
        "resume_skills": data.get("resume_skills", []),
        "missing_skills": data.get("missing_skills", [])
    }