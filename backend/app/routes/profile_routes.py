from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.user import User
from app.models.career_role import CareerRole

profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api/profile"
)


@profile_bp.route("/setup", methods=["POST"])
@jwt_required()
def setup_profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    data = request.get_json()

    career_role_id = data.get("career_role_id")
    weekly_hours = data.get("weekly_hours")
    learning_pace = data.get("learning_pace")

    role = CareerRole.query.get(career_role_id)

    if not role:
        return jsonify({
            "success": False,
            "message": "Invalid career role."
        }), 400

    user.career_role_id = career_role_id
    user.weekly_hours = weekly_hours
    user.learning_pace = learning_pace

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Profile saved successfully."
    }), 200

