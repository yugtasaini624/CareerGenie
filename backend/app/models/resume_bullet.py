from app.extensions import db
from datetime import datetime


class ResumeBullet(db.Model):
    __tablename__ = "resume_bullets"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    project_name = db.Column(db.String(200), nullable=False)

    bullets = db.Column(db.Text, nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )