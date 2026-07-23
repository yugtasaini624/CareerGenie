from datetime import datetime
from app.extensions import db


class Certificate(db.Model):

    __tablename__ = "certificates"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )


    quiz_session_id = db.Column(
        db.Integer,
        db.ForeignKey("quiz_sessions.id"),
        nullable=False
    )


    certificate_id = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )


    issued_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )