from flask import Blueprint, jsonify, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.extensions import db

from app.models.project_recommendation import ProjectRecommendation

from app.services.gemini_service import (
    generate_project_recommendations
)



project_bp = Blueprint(
    "project",
    __name__,
    url_prefix="/api/projects"
)





@project_bp.route(
    "/recommend",
    methods=["POST"]
)
@jwt_required()
def recommend_projects():

    try:

        user_id = int(
            get_jwt_identity()
        )


        data = request.get_json()



        if not data:

            return jsonify({

                "success": False,
                "message": "No data received"

            }),400




        career = data.get(
            "career",
            ""
        )


        skills = data.get(
            "skills",
            []
        )


        difficulty = data.get(
            "difficulty",
            "Beginner"
        )


        readiness = data.get(
            "readiness",
            50
        )





        # ==============================
        # VALIDATION
        # ==============================


        if not career:

            return jsonify({

                "success":False,
                "message":"Career is required"

            }),400




        if (
            not isinstance(skills,list)
            or len(skills)==0
        ):


            return jsonify({

                "success":False,
                "message":"Skills are required"

            }),400






        # ==============================
        # CREATE REQUEST KEY
        # ==============================


        request_key = (

            career.lower().strip()

            +

            "-"

            +

            "-".join(
                sorted(
                    [
                        skill.lower().strip()
                        for skill in skills
                    ]
                )
            )

        )







        # ==============================
        # CHECK SAME REQUEST
        # ==============================


        existing_projects = ProjectRecommendation.query.filter_by(

            user_id=user_id,

            request_key=request_key

        ).all()





        if existing_projects:


            return jsonify({

                "success":True,

                "source":"database",

                "projects":[


                    {


                    "project_name":
                    project.project_name,


                    "difficulty":
                    project.difficulty,


                    "skills":[

                        item.strip()

                        for item in project.skills.split(",")

                    ] if project.skills else [],



                    "features":[

                        item.strip()

                        for item in project.features.split(",")

                    ] if project.features else []



                    }


                    for project in existing_projects


                ]

            }),200








        # ==============================
        # GEMINI CALL
        # ==============================


        ai_data = generate_project_recommendations(

            career=career,

            skills=skills,

            readiness=readiness

        )





        if (

            not ai_data

            or "projects" not in ai_data

            or not isinstance(
                ai_data["projects"],
                list
            )

        ):


            return jsonify({

                "success":False,

                "message":
                "AI failed to generate projects"

            }),500







        saved_projects=[]





        # ==============================
        # SAVE NEW PROJECTS
        # ==============================


        for project in ai_data["projects"]:



            project_skills = project.get(
                "skills",
                []
            )


            project_features = project.get(
                "features",
                []
            )




            new_project = ProjectRecommendation(



                user_id=user_id,


                career=career,


                readiness=readiness,


                request_key=request_key,



                project_name=project.get(

                    "project_name",

                    "Portfolio Project"

                ),



                difficulty=project.get(

                    "difficulty",

                    difficulty

                ),



                skills=", ".join(
                    project_skills
                ),



                features=", ".join(
                    project_features
                )

            )



            db.session.add(
                new_project
            )



            saved_projects.append({


                "project_name":
                new_project.project_name,


                "difficulty":
                new_project.difficulty,


                "skills":
                project_skills,


                "features":
                project_features


            })





        db.session.commit()






        return jsonify({

            "success":True,

            "source":"gemini",

            "projects":
            saved_projects


        }),200







    except Exception as e:


        db.session.rollback()


        print(
            "PROJECT RECOMMENDATION ERROR:",
            e
        )


        return jsonify({

            "success":False,

            "message":
            "Project recommendation failed"

        }),500
    

# ==================================================
# GET LATEST RECOMMENDED PROJECT
# ==================================================

@project_bp.route(
    "/latest",
    methods=["GET"]
)
@jwt_required()
def latest_project():

    try:

        user_id = int(
            get_jwt_identity()
        )


        project = (

            ProjectRecommendation.query

            .filter_by(
                user_id=user_id
            )

            .order_by(
                ProjectRecommendation.created_at.desc()
            )

            .first()

        )


        if not project:

            return jsonify({

                "success":True,

                "project":None

            }),200





        return jsonify({

            "success":True,

            "project":{

                "project_name":
                project.project_name,


                "difficulty":
                project.difficulty,


                "skills":[

                    item.strip()

                    for item in project.skills.split(",")

                ] if project.skills else [],


                "features":[

                    item.strip()

                    for item in project.features.split(",")

                ] if project.features else []

            }

        }),200



    except Exception as e:


        return jsonify({

            "success":False,

            "message":str(e)

        }),500


@project_bp.route(
    "/demo",
    methods=["POST"]
)
def demo_projects():

    try:

        data = request.get_json()

        if not data:

            return jsonify({

                "success": False,
                "message": "No data received"

            }),400


        career = data.get(
            "career",
            ""
        )


        skills = data.get(
            "skills",
            []
        )


        difficulty = data.get(
            "difficulty",
            "Beginner"
        )


        readiness = data.get(
            "readiness",
            50
        )


        # ==============================
        # VALIDATION
        # ==============================

        if not career:

            return jsonify({

                "success":False,
                "message":"Career is required"

            }),400


        if (
            not isinstance(skills,list)
            or len(skills)==0
        ):

            return jsonify({

                "success":False,
                "message":"Skills are required"

            }),400


        # ==============================
        # GEMINI CALL
        # ==============================

        ai_data = generate_project_recommendations(

            career=career,

            skills=skills,

            readiness=readiness

        )


        if (

            not ai_data

            or "projects" not in ai_data

            or not isinstance(
                ai_data["projects"],
                list
            )

        ):

            return jsonify({

                "success":False,

                "message":
                "AI failed to generate projects"

            }),500


        projects = []

        for project in ai_data["projects"]:

            projects.append({

                "project_name":
                project.get(
                    "project_name",
                    "Portfolio Project"
                ),

                "difficulty":
                project.get(
                    "difficulty",
                    difficulty
                ),

                "skills":
                project.get(
                    "skills",
                    []
                ),

                "features":
                project.get(
                    "features",
                    []
                )

            })


        return jsonify({

            "success":True,

            "source":"gemini",

            "projects":projects

        }),200


    except Exception as e:

        print(
            "PROJECT DEMO ERROR:",
            e
        )

        return jsonify({

            "success":False,

            "message":
            "Project recommendation failed"

        }),500