from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.user import User

profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api/profile"
)


@profile_bp.route("/", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    data = request.get_json()

    user.college = data.get("college")
    user.department = data.get("department")
    user.year = data.get("year")
    user.weekly_hours = data.get("weekly_hours")
    user.learning_pace = data.get("learning_pace")

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Profile updated successfully.",
        "data": {
            "college": user.college,
            "department": user.department,
            "year": user.year,
            "weekly_hours": user.weekly_hours,
            "learning_pace": user.learning_pace
        }
    }), 200