from app.extensions import db
from datetime import datetime


class ProjectRecommendation(db.Model):

    __tablename__ = "project_recommendations"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )


    career = db.Column(
        db.String(150),
        nullable=False
    )


    readiness = db.Column(
        db.Integer,
        default=0
    )


    project_name = db.Column(
        db.String(200),
        nullable=False
    )


    difficulty = db.Column(
        db.String(50),
        default="Beginner"
    )


    skills = db.Column(
        db.Text
    )


    features = db.Column(
        db.Text
    )

    
    request_key = db.Column(
        db.String(500),
        nullable=False
    )
    
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )