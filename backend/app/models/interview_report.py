from datetime import datetime

from app.extensions import db


class InterviewReport(db.Model):

    __tablename__ = "interview_reports"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    session_id = db.Column(
        db.Integer,
        db.ForeignKey("interview_sessions.id"),
        nullable=False,
        unique=True
    )

    overall_score = db.Column(
        db.Integer,
        nullable=False
    )

    technical_score = db.Column(
        db.Integer,
        nullable=False
    )

    communication_score = db.Column(
        db.Integer,
        nullable=False
    )

    confidence_score = db.Column(
        db.Integer,
        nullable=False
    )

    strengths = db.Column(
        db.Text,
        nullable=False
    )

    weaknesses = db.Column(
        db.Text,
        nullable=False
    )

    recommendations = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    session = db.relationship(
        "InterviewSession",
        backref="report",
        uselist=False
    )