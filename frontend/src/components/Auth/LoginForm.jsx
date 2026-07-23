import React, { useState } from "react";
import InputField from "./InputField";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ onSwitch }) => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const response = await loginUser({

        email,
        password

      });

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(response.data.message);

      // Go to dashboard
      navigate("/dashboard");

    }

    catch(error){

      toast.error(

        error.response?.data?.message ||

        "Login failed."

      );

    }

    finally{

      setLoading(false);

    }

  };

  return(

    <div className="video-panel login-side">

      <div className="video-form-box">

        <h2>

          Welcome Back

        </h2>

        <p className="form-subtitle">

          Sign in to continue your AI-powered learning journey.

        </p>

        <form onSubmit={handleSubmit}>

          <InputField
            id="login-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <InputField
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="video-submit-btn"
            disabled={loading}
          >

            {loading ? "Signing In..." : "Sign In"}

          </button>

        </form>

        <p className="video-switch-text">

          New to CareerAI?

          <span onClick={onSwitch}>

            Create Account

          </span>

        </p>

      </div>

    </div>

  );

};

export default LoginForm;