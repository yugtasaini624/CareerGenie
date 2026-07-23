from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.user import User
from app.models.user_skill import UserSkill
from app.models.skill import Skill

from app.services.chat_service import ask_career_assistant

from app.extensions import db
from app.models.chat_session import ChatSession
from app.models.chat_message import ChatMessage

chat_bp = Blueprint(
    "chat",
    __name__,
    url_prefix="/api/chat"
)


@chat_bp.route("", methods=["POST"])
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

        user = User.query.get(int(get_jwt_identity()))

        session = ChatSession.query.filter_by(
            id=session_id,
            user_id=user.id
        ).first()

        if not session:
            return jsonify({
                "success": False,
                "message": "Chat session not found."
            }), 404

        # Save user message
        db.session.add(
            ChatMessage(
                session_id=session.id,
                role="user",
                message=message
            )
        )

        db.session.commit()

        skills = (
            UserSkill.query
            .join(Skill)
            .filter(UserSkill.user_id == user.id)
            .all()
        )

        skill_names = [s.skill.name for s in skills]

        history = ChatMessage.query.filter_by(
            session_id=session.id
        ).order_by(ChatMessage.created_at).all()

        reply = ask_career_assistant(
            user=user,
            skills=skill_names,
            history=history
        )

        db.session.add(
            ChatMessage(
                session_id=session.id,
                role="assistant",
                message=reply
            )
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "reply": reply
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    
@chat_bp.route("/start", methods=["POST"])
@jwt_required()
def start_chat():

    user = User.query.get(int(get_jwt_identity()))

    session = ChatSession(
        user_id=user.id,
        title="New Chat"
    )

    db.session.add(session)
    db.session.commit()

    return jsonify({
        "success": True,
        "session_id": session.id
    })

@chat_bp.route("/sessions", methods=["GET"])
@jwt_required()
def get_sessions():

    user = User.query.get(int(get_jwt_identity()))

    sessions = (
        ChatSession.query
        .filter_by(user_id=user.id)
        .order_by(ChatSession.created_at.desc())
        .all()
    )

    return jsonify({
        "success": True,
        "sessions": [
            {
                "id": session.id,
                "title": session.title,
                "created_at": session.created_at
            }
            for session in sessions
        ]
    })

@chat_bp.route("/session/<int:session_id>", methods=["GET"])
@jwt_required()
def get_chat(session_id):

    user = User.query.get(int(get_jwt_identity()))

    session = ChatSession.query.filter_by(
        id=session_id,
        user_id=user.id
    ).first()

    if not session:
        return jsonify({
            "success": False,
            "message": "Session not found."
        }), 404

    messages = (
        ChatMessage.query
        .filter_by(session_id=session.id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )

    return jsonify({
        "success": True,
        "messages": [
            {
                "role": msg.role,
                "message": msg.message,
                "created_at": msg.created_at
            }
            for msg in messages
        ]
    })