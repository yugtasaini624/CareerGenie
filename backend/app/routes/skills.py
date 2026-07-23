from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.skill import Skill
from app.models.user import User
from app.models.user_skill import UserSkill

skills_bp = Blueprint(
    "skills",
    __name__,
    url_prefix="/api/skills"
)


# -----------------------------
# GET ALL SKILLS
# -----------------------------
@skills_bp.route("/", methods=["GET"])
def get_all_skills():

    skills = Skill.query.order_by(Skill.category).all()

    result = []

    for skill in skills:
        result.append({
            "id": skill.id,
            "name": skill.name,
            "category": skill.category
        })

    return jsonify({
        "success": True,
        "skills": result
    }), 200


# -----------------------------
# SAVE USER SKILLS
# -----------------------------
@skills_bp.route("/select", methods=["POST"])
@jwt_required()
def select_skills():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    data = request.get_json()

    skill_ids = data.get("skill_ids", [])

    # Remove old skills
    UserSkill.query.filter_by(user_id=user.id).delete()

    # Save new skills
    for skill_id in skill_ids:

        db.session.add(
            UserSkill(
                user_id=user.id,
                skill_id=skill_id
            )
        )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Skills saved successfully."
    }), 200


# -----------------------------
# GET USER SKILLS
# -----------------------------
@skills_bp.route("/my", methods=["GET"])
@jwt_required()
def get_my_skills():

    user_id = get_jwt_identity()

    user_skills = UserSkill.query.filter_by(
        user_id=user_id
    ).all()

    result = []

    for item in user_skills:

        result.append({
            "id": item.skill.id,
            "name": item.skill.name,
            "category": item.skill.category
        })

    return jsonify({
        "success": True,
        "skills": result
    }), 200