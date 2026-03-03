import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signupUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./../pagesscss/Signup.scss";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser({ name, username, email, password }));
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={() => navigate(-1)}>
          ✕
        </button>

        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="auth-error">{error || "Login failed"}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
