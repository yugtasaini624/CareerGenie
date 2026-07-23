from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import json

from app.extensions import db

from app.models.interview_session import InterviewSession
from app.models.interview_message import InterviewMessage
from app.models.interview_report import InterviewReport

from app.services.interview_service import (
    interview_chat,
    finish_interview
)

from app.services.gemini_service import (
    generate_interview_question
)


interview_bp = Blueprint(
    "interview",
    __name__,
    url_prefix="/api/interview"
)



# ==================================================
# START INTERVIEW
# ==================================================

@interview_bp.route("/start", methods=["POST"])
@jwt_required()
def start_interview():

    try:

        user_id = int(get_jwt_identity())

        data = request.get_json()


        role = data.get("role")
        difficulty = data.get("difficulty")

        total_questions = data.get(
            "total_questions",
            10
        )


        if not role or not difficulty:

            return jsonify({

                "success":False,

                "message":
                "Role and difficulty are required."

            }),400



        session = InterviewSession(

            user_id=user_id,

            role=role,

            difficulty=difficulty,

            total_questions=total_questions,

            current_question=1

        )


        db.session.add(session)

        db.session.commit()



        question = generate_interview_question(

            role=role,

            difficulty=difficulty,

            question_number=1,

            previous_questions=[]

        )



        db.session.add(

            InterviewMessage(

                session_id=session.id,

                role="interviewer",

                message=question

            )

        )


        db.session.commit()



        return jsonify({

            "success":True,

            "session_id":session.id,

            "question_number":1,

            "question":question

        }),201



    except Exception as e:


        db.session.rollback()


        return jsonify({

            "success":False,

            "message":str(e)

        }),500







# ==================================================
# ANSWER QUESTION
# ==================================================

@interview_bp.route("/answer", methods=["POST"])
@jwt_required()
def answer_question():


    try:


        user_id=int(get_jwt_identity())


        data=request.get_json()


        session_id=data.get("session_id")

        answer=data.get("answer")



        if not session_id or not answer:


            return jsonify({

                "success":False,

                "message":
                "session_id and answer required"

            }),400




        session = InterviewSession.query.filter_by(

            id=session_id,

            user_id=user_id

        ).first()



        if not session:


            return jsonify({

                "success":False,

                "message":
                "Interview session not found"

            }),404






        # save candidate answer

        db.session.add(

            InterviewMessage(

                session_id=session.id,

                role="candidate",

                message=answer

            )

        )


        db.session.commit()





        # increase question number

        session.current_question += 1


        db.session.commit()



        print(
            "QUESTION NUMBER:",
            session.current_question
        )






        if session.current_question > session.total_questions:


            session.status="completed"

            db.session.commit()


            return jsonify({

                "success":True,

                "interview_completed":True

            })








        # previous questions memory

        old_questions = (

            InterviewMessage.query

            .filter_by(

                session_id=session.id,

                role="interviewer"

            )

            .order_by(
                InterviewMessage.id.asc()
            )

            .all()

        )



        previous_questions = [

            q.message

            for q in old_questions

        ]

        next_question = generate_interview_question(

            role=session.role,

            difficulty=session.difficulty,

            question_number=session.current_question,

            previous_questions=previous_questions

        )





        db.session.add(

            InterviewMessage(

                session_id=session.id,

                role="interviewer",

                message=next_question

            )

        )


        db.session.commit()





        return jsonify({

            "success":True,

            "interview_completed":False,

            "question_number":
            session.current_question,

            "next_question":
            next_question

        })





    except Exception as e:


        db.session.rollback()


        return jsonify({

            "success":False,

            "message":str(e)

        }),500
    


@interview_bp.route("/chat", methods=["POST"])
@jwt_required()
def chat():

    try:

        data = request.get_json()

        session_id = data.get("session_id")
        message = data.get("message")

        if not session_id or not message:
            return jsonify({
                "success": False,
                "message": "session_id and message are required."
            }), 400

        session = InterviewSession.query.filter_by(
            id=session_id,
            user_id=int(get_jwt_identity())
        ).first()

        if not session:
            return jsonify({
                "success": False,
                "message": "Interview session not found."
            }), 404

        db.session.add(
            InterviewMessage(
                session_id=session.id,
                role="candidate",
                message=message
            )
        )
        db.session.commit()

        if session.current_question >= session.total_questions:

            final_message = "Thank you. The interview is now complete."

            last_message = (
                InterviewMessage.query
                .filter_by(
                    session_id=session.id,
                    role="interviewer"
                )
                .order_by(InterviewMessage.id.desc())
                .first()
            )

            if (
                not last_message or
                last_message.message != final_message
            ):
                db.session.add(
                    InterviewMessage(
                        session_id=session.id,
                        role="interviewer",
                        message=final_message
                    )
                )

            session.status = "completed"

            db.session.commit()

            return jsonify({
                "success": True,
                "completed": True,
                "reply": final_message
            })

        history = (
            InterviewMessage.query
            .filter_by(session_id=session.id)
            .order_by(InterviewMessage.created_at.asc())
            .all()
        )

        reply = interview_chat(
            session.role,
            session.difficulty,
            history,
            session.current_question,
            session.total_questions
        )

        db.session.add(
            InterviewMessage(
                session_id=session.id,
                role="interviewer",
                message=reply
            )
        )

        # NEW: Increase question number
        session.current_question += 1

        db.session.commit()

        return jsonify({
            "success": True,
            "completed": False,
            "reply": reply
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@interview_bp.route("/finish", methods=["POST"])
@jwt_required()
def finish():

    try:

        data = request.get_json()

        session_id = data.get("session_id")

        if not session_id:

            return jsonify({

                "success": False,

                "message": "session_id is required."

            }), 400


        session = InterviewSession.query.filter_by(

            id=session_id,

            user_id=int(get_jwt_identity())

        ).first()


        if not session:

            return jsonify({

                "success": False,

                "message": "Interview session not found."

            }), 404


        # Return existing report if already generated

        existing_report = InterviewReport.query.filter_by(

            session_id=session.id

        ).first()

        if existing_report:

            return jsonify({

                "success": True,

                "message": "Interview already completed.",

                "report": {

                    "overall_score": existing_report.overall_score,

                    "technical_score": existing_report.technical_score,

                    "communication_score": existing_report.communication_score,

                    "confidence_score": existing_report.confidence_score,

                    "strengths": json.loads(existing_report.strengths),

                    "weaknesses": json.loads(existing_report.weaknesses),

                    "recommendations": json.loads(existing_report.recommendations)

                }

            }), 200


        history = (

            InterviewMessage.query

            .filter_by(session_id=session.id)

            .order_by(InterviewMessage.created_at.asc())

            .all()

        )


        report = finish_interview(

            session.role,

            session.difficulty,

            history

        )


        interview_report = InterviewReport(

            session_id=session.id,

            overall_score=report["overall_score"],

            technical_score=report["technical_score"],

            communication_score=report["communication_score"],

            confidence_score=report["confidence_score"],

            strengths=json.dumps(report["strengths"]),

            weaknesses=json.dumps(report["weaknesses"]),

            recommendations=json.dumps(report["recommendations"])

        )


        db.session.add(interview_report)


        session.status = "completed"

        session.completed_at = datetime.utcnow()


        db.session.commit()


        return jsonify({

            "success": True,

            "message": "Interview completed successfully.",

            "report": report

        }), 200


    except Exception as e:

        db.session.rollback()

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500



    
@interview_bp.route("/sessions", methods=["GET"])
@jwt_required()
def get_sessions():

    sessions = (

        InterviewSession.query

        .filter_by(user_id=int(get_jwt_identity()))

        .order_by(InterviewSession.created_at.desc())

        .all()

    )


    return jsonify({

        "success": True,

        "sessions":[

            {

                "id":session.id,

                "role":session.role,

                "difficulty":session.difficulty,

                "status":session.status,

                "created_at":session.created_at

            }

            for session in sessions

        ]

    })


@interview_bp.route("/session/<int:session_id>", methods=["GET"])
@jwt_required()
def get_session(session_id):

    session = InterviewSession.query.filter_by(

        id=session_id,

        user_id=int(get_jwt_identity())

    ).first()


    if not session:

        return jsonify({

            "success":False,

            "message":"Interview session not found."

        }),404


    messages=(

        InterviewMessage.query

        .filter_by(session_id=session.id)

        .order_by(InterviewMessage.created_at.asc())

        .all()

    )


    return jsonify({

        "success":True,

        "session":{

            "id":session.id,

            "role":session.role,

            "difficulty":session.difficulty,

            "status":session.status

        },

        "messages":[

            {

                "role":msg.role,

                "message":msg.message,

                "created_at":msg.created_at

            }

            for msg in messages

        ]

    })

@interview_bp.route(
    "/report/<int:session_id>",
    methods=["GET"]
)
@jwt_required()
def get_report(session_id):

    session = InterviewSession.query.filter_by(

        id=session_id,

        user_id=int(get_jwt_identity())

    ).first()


    if not session:

        return jsonify({

            "success": False,

            "message": "Interview session not found."

        }), 404


    report = InterviewReport.query.filter_by(

        session_id=session.id

    ).first()


    if not report:

        return jsonify({

            "success": False,

            "message": "Report not found."

        }), 404


    return jsonify({

        "success": True,

        "report": {

            "overall_score": report.overall_score,

            "technical_score": report.technical_score,

            "communication_score": report.communication_score,

            "confidence_score": report.confidence_score,

            "strengths": json.loads(
                report.strengths
            ),

            "weaknesses": json.loads(
                report.weaknesses
            ),

            "recommendations": json.loads(
                report.recommendations
            ),

            "created_at": report.created_at

        }

    })
