from app.extensions import db


class RoadmapTask(db.Model):

    __tablename__ = "roadmap_tasks"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    roadmap_id = db.Column(
        db.Integer,
        db.ForeignKey("roadmaps.id"),
        nullable=False
    )


    week_number = db.Column(
        db.Integer,
        nullable=False
    )


    goal = db.Column(
        db.String(255),
        nullable=False
    )


    task = db.Column(
        db.Text,
        nullable=False
    )


    estimated_hours = db.Column(
        db.Integer,
        nullable=False
    )


    mini_project = db.Column(
        db.String(255)
    )


    completed = db.Column(
        db.Boolean,
        default=False
    )


    project_completed = db.Column(
        db.Boolean,
        default=False
    )


    roadmap = db.relationship(
        "Roadmap"
    )