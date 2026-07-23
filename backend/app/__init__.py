from flask import Flask

from app.config import Config
from app.extensions import (
    db,
    migrate,
    jwt,
    bcrypt,
    cors
)

from app.models import *

def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": "*"
            }
        }
    )

    from app.routes.auth import auth_bp
    from app.routes.carrer import career_bp
    from app.routes.roadmap import roadmap_bp
    from app.routes.project import project_bp
    from app.routes.resume import resume_bp
    from app.routes.quiz import quiz_bp
    from app.routes.dashboard import dashboard_bp
    from app.routes.chat import chat_bp
    from app.routes.interview import interview_bp
    from app.routes.resume_ import analyze_bp
    from app.routes.certificate_routes import certificate_bp


    app.register_blueprint(auth_bp)
    app.register_blueprint(career_bp)
    app.register_blueprint(roadmap_bp)
    app.register_blueprint(project_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(interview_bp)
    app.register_blueprint(analyze_bp)
    app.register_blueprint(certificate_bp)

    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "🚀 SkillBridge Backend is Running"
        }

    return app