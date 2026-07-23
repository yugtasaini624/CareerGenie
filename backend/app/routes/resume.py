from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.resume_bullet import ResumeBullet
from app.services.gemini_service import generate_resume_bullets


resume_bp = Blueprint(
    "resume",
    __name__,
    url_prefix="/api/resume"
)


@resume_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate_resume():

    try:

        data = request.get_json()

        project_name = data.get("project_name")
        technologies = data.get("technologies")
        description = data.get("description")

        user_id = int(get_jwt_identity())


        if not project_name or not technologies or not description:

            return jsonify({
                "success": False,
                "message": "Missing required fields."
            }),400



        # CHECK DATABASE FIRST

        existing_resume = ResumeBullet.query.filter_by(
            user_id=user_id,
            project_name=project_name
        ).first()



        if existing_resume:

            return jsonify({

                "success": True,

                "source": "database",

                "bullets": existing_resume.bullets.split("\n")

            }),200



        # IF NOT FOUND GENERATE FROM GEMINI

        result = generate_resume_bullets(
            project_name,
            technologies,
            description
        )


        bullet_text = "\n".join(
            result["bullets"]
        )


        resume = ResumeBullet(

            user_id=user_id,

            project_name=project_name,

            bullets=bullet_text

        )


        db.session.add(resume)

        db.session.commit()



        return jsonify({

            "success": True,

            "source": "gemini",

            "bullets": result["bullets"]

        }),200



    except Exception as e:

        db.session.rollback()

        return jsonify({

            "success": False,

            "message": str(e)

        }),500