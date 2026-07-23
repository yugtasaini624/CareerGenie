from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.user import User

from app.models.roadmap import Roadmap
from app.models.roadmap_task import RoadmapTask

from app.models.quiz_session import QuizSession

from app.models.interview_session import InterviewSession
from app.models.interview_report import InterviewReport

from app.models.resume_bullet import ResumeBullet



dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/dashboard"
)



# ==================================================
# MAIN DASHBOARD DATA
# ==================================================

@dashboard_bp.route(
    "",
    methods=["GET"]
)
@jwt_required()
def get_dashboard():

    try:

        user_id = int(
            get_jwt_identity()
        )


        # ==========================
        # ROADMAP PROGRESS
        # ==========================

        roadmap_progress = 0


        roadmap = Roadmap.query.filter_by(
            user_id=user_id
        ).first()



        if roadmap:


            tasks = RoadmapTask.query.filter_by(
                roadmap_id=roadmap.id
            ).all()


            if tasks:

                completed = sum(

                    1

                    for task in tasks

                    if task.completed

                )


                roadmap_progress = round(

                    (completed / len(tasks)) * 100

                )





        # ==========================
        # QUIZ SCORE
        # ==========================

        quiz_score = 0


        quiz = (

            QuizSession.query

            .filter_by(
                user_id=user_id
            )

            .order_by(
                QuizSession.created_at.desc()
            )

            .first()

        )


        if quiz:

            quiz_score = quiz.percentage or 0





        # ==========================
        # INTERVIEW SCORE
        # ==========================

        interview_score = 0


        session = (

            InterviewSession.query

            .filter_by(
                user_id=user_id
            )

            .order_by(
                InterviewSession.created_at.desc()
            )

            .first()

        )


        if session:


            report = InterviewReport.query.filter_by(

                session_id=session.id

            ).first()


            if report:

                interview_score = report.overall_score





        return jsonify({

            "success":True,

            "dashboard":{

                "roadmapProgress":
                roadmap_progress,


                "latestQuiz":
                quiz_score,


                "mockInterview":
                interview_score

            }

        }),200




    except Exception as e:


        return jsonify({

            "success":False,

            "message":str(e)

        }),500







# ==================================================
# CAREER SUMMARY
# ==================================================

@dashboard_bp.route(
    "/summary",
    methods=["GET"]
)
@jwt_required()
def get_summary():

    try:


        user_id = int(
            get_jwt_identity()
        )



        user = User.query.get(
            user_id
        )



        if not user:

            return jsonify({

                "success":False,

                "message":"User not found"

            }),404





        # ==========================
        # CAREER GOAL
        # ==========================

        career_goal = "Not Selected"


        if user.career_role:

            career_goal = user.career_role.name






        # ==========================
        # ROADMAP
        # ==========================


        current_week = 0

        total_weeks = 0



        roadmap = Roadmap.query.filter_by(

            user_id=user_id

        ).first()



        if roadmap:


            tasks = RoadmapTask.query.filter_by(

                roadmap_id=roadmap.id

            ).all()



            if tasks:


                weeks = list(set(

                    task.week_number

                    for task in tasks

                ))


                total_weeks = len(weeks)



                completed_weeks = []



                for week in weeks:


                    week_tasks = [

                        task

                        for task in tasks

                        if task.week_number == week

                    ]


                    if all(

                        task.completed

                        for task in week_tasks

                    ):

                        completed_weeks.append(
                            week
                        )



                if completed_weeks:

                    current_week = max(
                        completed_weeks
                    )

                else:

                    current_week = 1







        # ==========================
        # QUIZ
        # ==========================


        quiz_score = 0



        quiz = (

            QuizSession.query

            .filter_by(
                user_id=user_id
            )

            .order_by(

                QuizSession.created_at.desc()

            )

            .first()

        )



        if quiz:

            quiz_score = quiz.percentage or 0







        # ==========================
        # MOCK INTERVIEW
        # ==========================


        interview_score = 0



        interview = (

            InterviewSession.query

            .filter_by(
                user_id=user_id
            )

            .order_by(

                InterviewSession.created_at.desc()

            )

            .first()

        )



        if interview:


            report = InterviewReport.query.filter_by(

                session_id=interview.id

            ).first()



            if report:

                interview_score = report.overall_score







        # ==========================
        # RESUME
        # ==========================


        resume_status = "Not Added"



        resume = ResumeBullet.query.filter_by(

            user_id=user_id

        ).first()



        if resume:

            resume_status = "Generated"








        return jsonify({

            "success":True,


            "summary":{


                "careerGoal":
                career_goal,


                "currentWeek":
                current_week,


                "totalWeeks":
                total_weeks,


                "quizScore":
                quiz_score,


                "interviewScore":
                interview_score,


                "resumeStatus":
                resume_status


            }


        }),200






    except Exception as e:


        return jsonify({

            "success":False,

            "message":str(e)

        }),500

