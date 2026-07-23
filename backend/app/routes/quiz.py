from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.quiz_session import QuizSession
from app.models.quiz_question import QuizQuestion

from app.services.gemini_service import generate_quiz

quiz_bp = Blueprint(
    "quiz",
    __name__,
    url_prefix="/api/quiz"
)


@quiz_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate():

    try:

        data = request.get_json()

        topic = data.get("topic")
        difficulty = data.get("difficulty", "Beginner")

        if not topic:
            return jsonify({
                "success": False,
                "message": "Topic is required."
            }), 400

        # Check if quiz already exists
        existing_session = QuizSession.query.filter_by(
            topic=topic,
            difficulty=difficulty
        ).first()

        # -----------------------------
        # QUIZ ALREADY EXISTS
        # -----------------------------
        if existing_session:

            # Create a new session for current user
            new_session = QuizSession(
                user_id=int(get_jwt_identity()),
                topic=topic,
                difficulty=difficulty
            )

            db.session.add(new_session)
            db.session.commit()

            old_questions = QuizQuestion.query.filter_by(
                session_id=existing_session.id
            ).all()

            questions = []

            for q in old_questions:

                new_question = QuizQuestion(
                    session_id=new_session.id,
                    question=q.question,
                    option_a=q.option_a,
                    option_b=q.option_b,
                    option_c=q.option_c,
                    option_d=q.option_d,
                    correct_answer=q.correct_answer
                )

                db.session.add(new_question)
                db.session.flush()

                questions.append({
                    "id": new_question.id,
                    "question": new_question.question,
                    "option_a": new_question.option_a,
                    "option_b": new_question.option_b,
                    "option_c": new_question.option_c,
                    "option_d": new_question.option_d
                })

            db.session.commit()

            return jsonify({
                "success": True,
                "session_id": new_session.id,
                "questions": questions
            }), 200

        # -----------------------------
        # GENERATE NEW QUIZ USING GEMINI
        # -----------------------------
        result = generate_quiz(
            topic,
            difficulty
        )

        session = QuizSession(
            user_id=int(get_jwt_identity()),
            topic=topic,
            difficulty=difficulty
        )

        db.session.add(session)
        db.session.commit()

        questions = []

        for q in result["questions"]:

            question = QuizQuestion(
                session_id=session.id,
                question=q["question"],
                option_a=q["option_a"],
                option_b=q["option_b"],
                option_c=q["option_c"],
                option_d=q["option_d"],
                correct_answer=q["correct_answer"]
            )

            db.session.add(question)
            db.session.flush()

            questions.append({
                "id": question.id,
                "question": question.question,
                "option_a": question.option_a,
                "option_b": question.option_b,
                "option_c": question.option_c,
                "option_d": question.option_d
            })

        db.session.commit()

        return jsonify({
            "success": True,
            "session_id": session.id,
            "questions": questions
        }), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
        

@quiz_bp.route("/submit", methods=["POST"])
@jwt_required()
def submit_quiz():

    try:
        data = request.get_json()

        session_id = data.get("session_id")
        answers = data.get("answers")

        if not session_id or not answers:
            return jsonify({
                "success": False,
                "message": "session_id and answers are required."
            }), 400

        questions = QuizQuestion.query.filter_by(
            session_id=session_id
        ).all()

        answer_map = {}

        for ans in answers:
            answer_map[ans["question_id"]] = ans["selected"].upper()

        score = 0

        for question in questions:
            if answer_map.get(question.id) == question.correct_answer:
                score += 1

        total = len(questions)

        percentage = round((score / total) * 100, 2) if total > 0 else 0

        if percentage >= 80:
            level = "Advanced"
        elif percentage >= 50:
            level = "Intermediate"
        else:
            level = "Beginner"

        session = QuizSession.query.get(session_id)

        session.score = score
        session.percentage = percentage

        db.session.commit()

        return jsonify({
            "success": True,
            "score": score,
            "total": total,
            "percentage": percentage,
            "level": level
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500