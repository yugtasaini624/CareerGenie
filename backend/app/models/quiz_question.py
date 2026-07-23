from app.extensions import db


class QuizQuestion(db.Model):
    __tablename__ = "quiz_questions"

    id = db.Column(db.Integer, primary_key=True)

    session_id = db.Column(
        db.Integer,
        db.ForeignKey("quiz_sessions.id"),
        nullable=False
    )

    question = db.Column(db.Text, nullable=False)

    option_a = db.Column(db.String(300), nullable=False)

    option_b = db.Column(db.String(300), nullable=False)

    option_c = db.Column(db.String(300), nullable=False)

    option_d = db.Column(db.String(300), nullable=False)

    correct_answer = db.Column(db.String(1), nullable=False)