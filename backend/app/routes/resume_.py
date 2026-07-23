from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import traceback

from app.services.resume_parser import extract_resume_text
from app.services.gemini_service import analyze_resume


analyze_bp = Blueprint(
    "resume_analyzer",
    __name__,
    url_prefix="/api/resume"
)


@analyze_bp.route("/analyze", methods=["POST"])
@jwt_required()
def analyze():

    if "resume" not in request.files:
        return jsonify({
            "success": False,
            "message": "Resume file is required."
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "message": "Please select a resume."
        }), 400

    try:

        resume_text = extract_resume_text(file)

        if not resume_text.strip():
            return jsonify({
                "success": False,
                "message": "Could not extract text from the resume."
            }), 400

        result = analyze_resume(resume_text)

        return jsonify(result), 200

    except Exception:
        traceback.print_exc()

        return jsonify({
            "success": False,
            "message": "Failed to analyze resume."
        }), 500