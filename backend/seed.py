from app import create_app
from app.extensions import db
from app.models.career_role import CareerRole
from app.models.skill import Skill

app = create_app()

# -------------------------------
# Career Roles
# -------------------------------
careers = [
    {
        "name": "Frontend Developer",
        "description": "Build responsive web interfaces using HTML, CSS, JavaScript and React."
    },
    {
        "name": "Backend Developer",
        "description": "Develop APIs, databases and server-side applications."
    },
    {
        "name": "Full Stack Developer",
        "description": "Work on both frontend and backend technologies."
    },
    {
        "name": "Data Analyst",
        "description": "Analyze data using SQL, Python, Excel and Power BI."
    },
    {
        "name": "UI/UX Designer",
        "description": "Design intuitive and user-friendly digital experiences."
    },
    {
        "name": "QA Tester",
        "description": "Test applications and ensure software quality."
    }
]

# -------------------------------
# Skills
# -------------------------------
skills = [
    # Frontend
    {"name": "HTML", "category": "Frontend"},
    {"name": "CSS", "category": "Frontend"},
    {"name": "JavaScript", "category": "Frontend"},
    {"name": "React", "category": "Frontend"},
    {"name": "Bootstrap", "category": "Frontend"},
    {"name": "Tailwind CSS", "category": "Frontend"},
    {"name": "Responsive Design", "category": "Frontend"},

    # Backend
    {"name": "Python", "category": "Backend"},
    {"name": "Flask", "category": "Backend"},
    {"name": "REST API", "category": "Backend"},

    # Database
    {"name": "SQL", "category": "Database"},
    {"name": "PostgreSQL", "category": "Database"},

    # Tools
    {"name": "Git", "category": "Tools"},
    {"name": "GitHub", "category": "Tools"},

    # Data Analyst
    {"name": "Excel", "category": "Analytics"},
    {"name": "Power BI", "category": "Analytics"},
    {"name": "Pandas", "category": "Analytics"},
    {"name": "NumPy", "category": "Analytics"},

    # UI/UX
    {"name": "Figma", "category": "Design"},
    {"name": "Wireframing", "category": "Design"},
    {"name": "Prototyping", "category": "Design"},

    # QA
    {"name": "Manual Testing", "category": "Testing"},
    {"name": "Automation Testing", "category": "Testing"},
    {"name": "Selenium", "category": "Testing"},
]

with app.app_context():

    # Seed Career Roles
    for career in careers:

        exists = CareerRole.query.filter_by(
            name=career["name"]
        ).first()

        if not exists:
            db.session.add(
                CareerRole(
                    name=career["name"],
                    description=career["description"]
                )
            )

    db.session.commit()

    # Seed Skills
    for skill in skills:

        exists = Skill.query.filter_by(
            name=skill["name"]
        ).first()

        if not exists:
            db.session.add(
                Skill(
                    name=skill["name"],
                    category=skill["category"]
                )
            )

    db.session.commit()

    print("✅ Career roles seeded successfully!")
    print("✅ Skills seeded successfully!")