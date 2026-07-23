from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db

from app.models.user import User
from app.models.quiz_session import QuizSession
from app.models.certificate import Certificate


certificate_bp = Blueprint(
    "certificate",
    __name__,
    url_prefix="/api/certificate"
)




@certificate_bp.route(
    "/data/<int:session_id>",
    methods=["GET"]
)
@jwt_required()
def certificate_data(session_id):


    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(user_id)


    quiz = QuizSession.query.get(
        session_id
    )


    if not user or not quiz:

        return jsonify({

            "success":False,
            "message":"Data not found"

        }),404



    if quiz.percentage != 100:

        return jsonify({

            "success":False,
            "message":
            "Certificate available only after 100% score"

        }),403



    certificate = Certificate.query.filter_by(
        quiz_session_id=session_id
    ).first()



    if not certificate:


        certificate = Certificate(

            user_id=user_id,

            quiz_session_id=session_id,

            certificate_id=
            f"GENIE-{quiz.topic.upper()}-{quiz.id}"

        )


        db.session.add(
            certificate
        )

        db.session.commit()



    return jsonify({

        "success":True,


        "certificate":{


            "name":
            user.full_name,


            "role":
            quiz.topic,


            "score":
            quiz.percentage,


            "certificate_id":
            certificate.certificate_id,


            "issue_date":
            certificate.issued_at.strftime(
                "%d-%m-%Y"
            )

        }


    }),200