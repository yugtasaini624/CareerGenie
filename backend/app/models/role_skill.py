from app.extensions import db


class RoleSkill(db.Model):
    __tablename__ = "role_skills"

    id = db.Column(db.Integer, primary_key=True)

    career_role_id = db.Column(
        db.Integer,
        db.ForeignKey("career_roles.id"),
        nullable=False
    )

    skill_id = db.Column(
        db.Integer,
        db.ForeignKey("skills.id"),
        nullable=False
    )

    required_level = db.Column(
        db.String(30),
        nullable=False
    )

    career_role = db.relationship("CareerRole")

    skill = db.relationship("Skill")