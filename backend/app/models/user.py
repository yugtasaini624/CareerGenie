from datetime import datetime
from app.extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    college = db.Column(db.String(150), nullable=True)
    department = db.Column(db.String(100), nullable=True)
    year = db.Column(db.Integer, nullable=True)
    weekly_hours = db.Column(db.Integer, nullable=True)
    learning_pace = db.Column(db.String(20), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    career_role_id = db.Column(
    db.Integer,
    db.ForeignKey("career_roles.id"),
    nullable=True
    )

    career_role = db.relationship("CareerRole")

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )