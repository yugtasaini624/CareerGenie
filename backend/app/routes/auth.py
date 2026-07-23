from flask import Blueprint, request, jsonify

from flask_jwt_extended import create_access_token

from app.extensions import db, bcrypt
from app.models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No data provided."
            }), 400

        full_name = data.get("full_name")
        email = data.get("email")
        password = data.get("password")

        # Validate required fields
        if not full_name or not email or not password:
            return jsonify({
                "success": False,
                "message": "Full name, email and password are required."
            }), 400

        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            return jsonify({
                "success": False,
                "message": "Email already registered."
            }), 409

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create new user
        new_user = User(
            full_name=full_name,
            email=email,
            password_hash=hashed_password
        )

        # Save to database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "User registered successfully.",
            "data": {
                "id": new_user.id,
                "full_name": new_user.full_name,
                "email": new_user.email
            }
        }), 201

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        # Validation
        if not email or not password:
            return jsonify({
                "success": False,
                "message": "Email and password are required."
            }), 400

        # Find user
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid email or password."
            }), 401

        # Verify password
        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({
                "success": False,
                "message": "Invalid email or password."
            }), 401

        # Generate JWT
        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "token": access_token,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500