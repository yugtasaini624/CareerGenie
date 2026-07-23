import React, { useState } from "react";
import InputField from "./InputField";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";

const RegisterForm = ({ onSwitch }) => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const response = await registerUser({

        full_name:name,
        email,
        password

      });

      toast.success(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      onSwitch();

    }

    catch(error){

      toast.error(

        error.response?.data?.message ||

        "Registration failed."

      );

    }

    finally{

      setLoading(false);

    }

  };

  return(

    <div className="video-panel register-side">

      <div className="video-form-box">
        <h2>Create Account</h2>

        <p className="form-subtitle">
          Join CareerAI and start building your dream career with AI.
        </p>

        <form onSubmit={handleSubmit}>

          <InputField
            id="register-name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <InputField
            id="register-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <InputField
            id="register-password"
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
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="video-switch-text">

          Already have an account?

          <span onClick={onSwitch}>

            Sign In

          </span>

        </p>

      </div>

    </div>

  );

};

export default RegisterForm;