import json

from app.services.gemini_service import (
    call_gemini,
    clean_json
)



def start_interview(
    role,
    difficulty
):

    prompt = f"""
You are an experienced technical interviewer.

Start a mock interview.

Role:
{role}

Difficulty:
{difficulty}

Rules:

- Welcome the candidate.
- Introduce yourself.
- Ask ONLY the first interview question.
- Be friendly but professional.
- Do not answer your own question.
- Return only plain text.
"""

    return call_gemini(prompt)



def interview_chat(
    role,
    difficulty,
    history,
    current_question,
    total_questions
):

    conversation = ""

    for message in history:

        if message.role == "candidate":
            conversation += f"Candidate: {message.message}\n"

        else:
            conversation += f"Interviewer: {message.message}\n"


    prompt = f"""
You are an experienced technical interviewer.

Role:
{role}

Difficulty:
{difficulty}

Current Question:
{current_question}

Total Questions:
{total_questions}

Conversation:

{conversation}

Rules:

- Conduct a realistic technical interview.
- Read the full conversation carefully.
- Acknowledge the candidate's previous answer briefly.
- Ask only ONE new interview question.
- The interview must contain exactly {total_questions} questions.
- If the current question number is less than {total_questions}, continue normally.
- If the current question number is equal to {total_questions}, do NOT ask another question.
- Instead say:

"Thank you. The interview is complete."

- Never answer for the candidate.
- Never reveal scores.
- Never mention you are an AI.
- Keep responses under 70 words.
- Return plain text only.
"""

    return call_gemini(prompt)



def finish_interview(
    role,
    difficulty,
    history
):

    conversation = ""

    for message in history:

        if message.role == "candidate":
            conversation += f"Candidate: {message.message}\n"

        else:
            conversation += f"Interviewer: {message.message}\n"


    prompt = f"""
You are a senior software engineering interviewer.

Analyze the COMPLETE interview.

Role:
{role}

Difficulty:
{difficulty}

Conversation:

{conversation}

Evaluate the candidate.

Return ONLY valid JSON.

{{
    "overall_score": 85,

    "technical_score": 82,

    "communication_score": 90,

    "confidence_score": 84,

    "strengths": [
        "",
        "",
        ""
    ],

    "weaknesses": [
        "",
        "",
        ""
    ],

    "recommendations": [
        "",
        "",
        ""
    ]
}}
"""

    text = clean_json(
        call_gemini(prompt)
    )

    return json.loads(text)