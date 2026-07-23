from app.extensions import db
from datetime import datetime


class QuizSession(db.Model):
    __tablename__ = "quiz_sessions"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    topic = db.Column(db.String(150), nullable=False)

    score = db.Column(db.Integer, default=0)

    percentage = db.Column(db.Float, default=0)

    difficulty = db.Column(
        db.String(50),
        nullable=False,
        default="Beginner"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )