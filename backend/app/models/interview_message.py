from datetime import datetime
from app.extensions import db


class InterviewMessage(db.Model):

    __tablename__ = "interview_messages"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    session_id = db.Column(
        db.Integer,
        db.ForeignKey("interview_sessions.id"),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        nullable=False
    )

    message = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    session = db.relationship(
        "InterviewSession",
        backref="messages"
    )