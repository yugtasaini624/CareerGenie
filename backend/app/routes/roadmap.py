from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db

from app.models.user import User
from app.models.roadmap import Roadmap
from app.models.roadmap_task import RoadmapTask

from app.services.gemini_service import generate_learning_roadmap



roadmap_bp = Blueprint(
    "roadmap",
    __name__,
    url_prefix="/api/roadmap"
)





# =================================================
# GENERATE AI ROADMAP
# =================================================


@roadmap_bp.route(
    "/generate",
    methods=["POST"]
)
@jwt_required()
def generate():


    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(
        user_id
    )


    if not user:

        return jsonify({

            "success":False,

            "message":
            "User not found"

        }),404




    data = request.get_json()



    target_role = data.get(
        "target_role"
    )


    if not target_role:


        return jsonify({

            "success":False,

            "message":
            "Target role is required"

        }),400





    try:


        roadmap_json = generate_learning_roadmap(


            role=target_role,


            current_skills=data.get(
                "current_skills",
                []
            ),


            learning_goals=data.get(
                "learning_goals",
                []
            ),


            level=data.get(
                "level",
                ""
            ),


            weekly_hours=data.get(
                "weekly_hours",
                10
            ),


            learning_pace=data.get(
                "learning_pace",
                "Moderate"
            )


        )



    except Exception as e:


        print(
            "Gemini Error:",
            e
        )


        return jsonify({

            "success":False,

            "message":
            "AI roadmap generation failed"

        }),500





    if not roadmap_json.get(
        "weeks"
    ):


        return jsonify({

            "success":False,

            "message":
            "Invalid roadmap format"

        }),500







    try:


        # Remove previous roadmap


        old_roadmap = Roadmap.query.filter_by(

            user_id=user_id

        ).first()



        if old_roadmap:


            RoadmapTask.query.filter_by(

                roadmap_id=old_roadmap.id

            ).delete()



            db.session.delete(
                old_roadmap
            )


            db.session.commit()






        # Create new roadmap


        roadmap = Roadmap(

            user_id=user_id

        )


        db.session.add(
            roadmap
        )


        db.session.commit()





        # Save weeks and tasks


        for week in roadmap_json["weeks"]:


            for item in week["tasks"]:



                task = RoadmapTask(


                    roadmap_id=roadmap.id,


                    week_number=week["week"],


                    goal=week["goal"],


                    task=item["title"],


                    estimated_hours=item.get(

                        "hours",

                        0

                    ),


                    mini_project=item.get(

                        "project",

                        ""

                    ),


                    completed=False,


                    project_completed=False

                )



                db.session.add(
                    task
                )



        # Mark assessment completed

        user.assessment_completed = True



        db.session.commit()





    except Exception as e:


        db.session.rollback()


        print(
            "Database Error:",
            e
        )


        return jsonify({

            "success":False,

            "message":
            "Database error"

        }),500






    return jsonify({

        "success":True,

        "message":
        "AI roadmap generated successfully"

    }),201











# =================================================
# GET FULL ROADMAP
# =================================================


@roadmap_bp.route(
    "/",
    methods=["GET"]
)
@jwt_required()
def get_roadmap():


    user_id = int(
        get_jwt_identity()
    )



    roadmap = Roadmap.query.filter_by(

        user_id=user_id

    ).first()




    if not roadmap:


        return jsonify({

            "success":False,

            "message":
            "No roadmap found"

        }),404





    tasks = RoadmapTask.query.filter_by(

        roadmap_id=roadmap.id

    ).order_by(

        RoadmapTask.week_number

    ).all()





    weeks = {}





    for task in tasks:



        if task.week_number not in weeks:



            weeks[task.week_number] = {


                "week":
                task.week_number,


                "goal":
                task.goal,


                "estimated_hours":
                0,


                "mini_project":{

                    "title":
                    task.mini_project,


                    "completed":
                    task.project_completed

                },


                "tasks":[]


            }





        weeks[task.week_number][
            "estimated_hours"
        ] += task.estimated_hours






        weeks[task.week_number][
            "tasks"
        ].append({

            "id":
            task.id,


            "task":
            task.task,


            "completed":
            task.completed

        })







    return jsonify({

        "success":True,


        "roadmap":
        list(
            weeks.values()
        )

    }),200

    # =================================================
# GET SINGLE WEEK DETAILS
# =================================================


@roadmap_bp.route(
    "/<int:week_number>",
    methods=["GET"]
)
@jwt_required()
def get_week_details(week_number):


    user_id = int(
        get_jwt_identity()
    )



    roadmap = Roadmap.query.filter_by(

        user_id=user_id

    ).first()



    if not roadmap:


        return jsonify({

            "success":False,

            "message":
            "Roadmap not found"

        }),404






    tasks = RoadmapTask.query.filter_by(

        roadmap_id=roadmap.id,

        week_number=week_number

    ).all()





    if not tasks:


        return jsonify({

            "success":False,

            "message":
            "Week not found"

        }),404







    return jsonify({

        "success":True,


        "week":{


            "week":
            week_number,


            "goal":
            tasks[0].goal,


            "mini_project":{

                "title":
                tasks[0].mini_project,


                "completed":
                tasks[0].project_completed

            },


            "tasks":[


                {

                    "id":
                    task.id,


                    "task":
                    task.task,


                    "hours":
                    task.estimated_hours,


                    "completed":
                    task.completed

                }


                for task in tasks


            ]


        }


    }),200











# =================================================
# UPDATE TASK STATUS
# =================================================


@roadmap_bp.route(
    "/task/<int:task_id>",
    methods=["PUT"]
)
@jwt_required()
def update_task(task_id):


    user_id = int(
        get_jwt_identity()
    )



    task = RoadmapTask.query.get(
        task_id
    )



    if not task:


        return jsonify({

            "success":False,

            "message":
            "Task not found"

        }),404






    roadmap = Roadmap.query.get(

        task.roadmap_id

    )





    if not roadmap or roadmap.user_id != user_id:


        return jsonify({

            "success":False,

            "message":
            "Unauthorized"

        }),403






    data = request.get_json()



    task.completed = data.get(

        "completed",

        False

    )



    db.session.commit()



    return jsonify({

        "success":True,

        "message":
        "Task updated successfully"

    }),200











# =================================================
# UPDATE MINI PROJECT STATUS
# =================================================


@roadmap_bp.route(
    "/project/<int:week_number>",
    methods=["PUT"]
)
@jwt_required()
def update_project(week_number):


    user_id = int(
        get_jwt_identity()
    )



    roadmap = Roadmap.query.filter_by(

        user_id=user_id

    ).first()



    if not roadmap:


        return jsonify({

            "success":False,

            "message":
            "Roadmap not found"

        }),404






    tasks = RoadmapTask.query.filter_by(

        roadmap_id=roadmap.id,

        week_number=week_number

    ).all()





    if not tasks:


        return jsonify({

            "success":False,

            "message":
            "Week not found"

        }),404






    data = request.get_json()



    completed = data.get(

        "completed",

        False

    )





    for task in tasks:


        task.project_completed = completed





    db.session.commit()





    return jsonify({

        "success":True,

        "message":
        "Project status updated"

    }),200










# =================================================
# CHECK ASSESSMENT STATUS
# =================================================


@roadmap_bp.route(
    "/assessment-status",
    methods=["GET"]
)
@jwt_required()
def assessment_status():


    user_id = int(
        get_jwt_identity()
    )



    user = User.query.get(
        user_id
    )



    if not user:


        return jsonify({

            "success":False

        }),404





    return jsonify({

        "success":True,

        "completed":
        user.assessment_completed

    }),200


@roadmap_bp.route("/status", methods=["GET"])
@jwt_required()
def roadmap_status():

    user_id = int(get_jwt_identity())

    roadmap = Roadmap.query.filter_by(
        user_id=user_id
    ).first()

    return jsonify({
        "success": True,
        "hasRoadmap": roadmap is not None
    }),200