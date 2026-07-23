from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.user import User
from app.models.career_role import CareerRole

career_bp = Blueprint(
    "career",
    __name__,
    url_prefix="/api/careers"
)


# -----------------------------------
# GET ALL CAREERS
# -----------------------------------
@career_bp.route("/", methods=["GET"])
def get_careers():

    careers = CareerRole.query.all()

    data = []

    for career in careers:
        data.append({
            "id": career.id,
            "name": career.name,
            "description": career.description
        })

    return jsonify({
        "success": True,
        "careers": data
    }), 200


# -----------------------------------
# SELECT USER CAREER
# -----------------------------------
@career_bp.route("/select", methods=["PUT"])
@jwt_required()
def select_career():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    data = request.get_json()

    career_role_id = data.get("career_role_id")

    career = CareerRole.query.get(career_role_id)

    if not career:
        return jsonify({
            "success": False,
            "message": "Career not found."
        }), 404

    user.career_role_id = career.id

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Career selected successfully.",
        "career": {
            "id": career.id,
            "name": career.name
        }
    }), 200

@career_bp.route("/preferences", methods=["PUT"])
@jwt_required()
def save_preferences():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    data = request.get_json()

    user.weekly_hours = data.get("weekly_hours")

    user.learning_pace = data.get("learning_pace")

    db.session.commit()

    return jsonify({

        "success": True,

        "message": "Preferences saved successfully."

    }), 200