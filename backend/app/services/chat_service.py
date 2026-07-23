from app.services.gemini_service import client


def ask_career_assistant(user, skills, history):

    career = (
        user.career_role.name
        if user.career_role
        else "Not Selected"
    )

    skill_text = ", ".join(skills)

    if not skill_text:
        skill_text = "No skills added yet."

    conversation = ""

    for msg in history:

        if msg.role == "user":
            conversation += f"User: {msg.message}\n"

        else:
            conversation += f"Assistant: {msg.message}\n"

    prompt = f"""
You are CareerGenie AI.

You are a personal AI career mentor.

User Name:
{user.full_name}

Career Goal:
{career}

Skills:
{skill_text}

Conversation:

{conversation}

Continue this conversation naturally.

If the user asks follow-up questions,
remember the previous discussion.

Answer professionally using Markdown.
"""

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )

    return response.text