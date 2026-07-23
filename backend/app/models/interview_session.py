from datetime import datetime
from app.extensions import db


class InterviewSession(db.Model):
    __tablename__ = "interview_sessions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    role = db.Column(
        db.String(100),
        nullable=False
    )

    difficulty = db.Column(
        db.String(30),
        nullable=False
    )

    total_questions = db.Column(
        db.Integer,
        nullable=False,
        default=10
    )

    current_question = db.Column(
        db.Integer,
        nullable=False,
        default=1
    )

    score = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="ongoing"
    )

    started_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    completed_at = db.Column(
        db.DateTime,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user = db.relationship(
        "User",
        backref="interview_sessions"
    )