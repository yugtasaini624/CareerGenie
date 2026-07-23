from app import create_app
from app.extensions import db

from app.models.career_role import CareerRole
from app.models.skill import Skill
from app.models.role_skill import RoleSkill

app = create_app()

role_skill_map = {
    "Frontend Developer": [
        ("HTML", "Beginner"),
        ("CSS", "Beginner"),
        ("JavaScript", "Intermediate"),
        ("React", "Intermediate"),
        ("Git", "Beginner"),
        ("GitHub", "Beginner"),
        ("REST API", "Intermediate"),
        ("Tailwind CSS", "Beginner"),
        ("Responsive Design", "Intermediate")
    ],

    "Backend Developer": [
        ("Python", "Intermediate"),
        ("Flask", "Intermediate"),
        ("SQL", "Intermediate"),
        ("PostgreSQL", "Intermediate"),
        ("Git", "Beginner"),
        ("REST API", "Intermediate")
    ],

    "Full Stack Developer": [
        ("HTML", "Beginner"),
        ("CSS", "Beginner"),
        ("JavaScript", "Intermediate"),
        ("React", "Intermediate"),
        ("Python", "Intermediate"),
        ("Flask", "Intermediate"),
        ("SQL", "Intermediate"),
        ("Git", "Beginner")
    ],

    "Data Analyst": [
        ("Python", "Intermediate"),
        ("SQL", "Intermediate"),
        ("Excel", "Beginner"),
        ("Power BI", "Intermediate"),
        ("Pandas", "Intermediate"),
        ("NumPy", "Intermediate")
    ],

    "UI/UX Designer": [
        ("Figma", "Intermediate"),
        ("Wireframing", "Intermediate"),
        ("Prototyping", "Intermediate")
    ],

    "QA Tester": [
        ("Manual Testing", "Intermediate"),
        ("Automation Testing", "Intermediate"),
        ("Selenium", "Intermediate"),
        ("SQL", "Beginner")
    ]
}

with app.app_context():

    for role_name, skills in role_skill_map.items():

        role = CareerRole.query.filter_by(name=role_name).first()

        for skill_name, level in skills:

            skill = Skill.query.filter_by(name=skill_name).first()

            exists = RoleSkill.query.filter_by(
                career_role_id=role.id,
                skill_id=skill.id
            ).first()

            if not exists:

                db.session.add(
                    RoleSkill(
                        career_role_id=role.id,
                        skill_id=skill.id,
                        required_level=level
                    )
                )

    db.session.commit()

print("✅ Role skills seeded.")