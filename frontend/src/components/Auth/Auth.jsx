import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthOverlay from "./AuthOverlay";

import "../../styles/auth.css";

export default function Auth() {

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {

    const mode = searchParams.get("mode");

    setIsLogin(mode !== "register");

  }, [searchParams]);

  const showLogin = () => {

    navigate("/auth?mode=login");

  };

  const showRegister = () => {

    navigate("/auth?mode=register");

  };

  return (

    <div className="video-auth-page">

      <div
        className={`video-auth-container ${!isLogin ? "show-register" : ""}`}
      >

        {/* =========================
              LOGIN FORM
        ========================= */}

        <div className="form-wrapper-zone zone-left">

          <LoginForm
            onSwitch={showRegister}
          />

        </div>

        {/* =========================
              REGISTER FORM
        ========================= */}

        <div className="form-wrapper-zone zone-right">

          <RegisterForm
            onSwitch={showLogin}
          />

        </div>

        {/* =========================
              OVERLAY
        ========================= */}

        <AuthOverlay
          isLogin={isLogin}
        />

      </div>

    </div>

  );

}