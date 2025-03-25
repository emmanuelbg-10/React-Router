// src/routes/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);

    loginUser({ username, password })
      .then((result) => {
        localStorage.setItem("authToken", result.token);
        navigate("/");
      })
      .catch(() => {
        setError("Usuario o contraseña incorrectos");
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-wrapper">
          <form className="login-form">
            <span className="login-title">Login</span>

            {error && <p className="error-message">{error}</p>}

            <div
              className="input-wrapper"
              data-validate="Please enter username"
            >
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                type="text"
                placeholder="Username"
                required
              />
            </div>

            <div
              className="input-wrapper"
              data-validate="Please enter password"
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="button-container">
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
            </div>

            <div className="signup-container">
              <span className="signup-text">Don’t have an account? </span>
              <a href="#" className="signup-link">
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
