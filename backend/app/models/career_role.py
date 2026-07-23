from app.extensions import db


class CareerRole(db.Model):
    __tablename__ = "career_roles"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), unique=True, nullable=False)

    description = db.Column(db.Text)

    def __repr__(self):
        return f"<CareerRole {self.name}>"