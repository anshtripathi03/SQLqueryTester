import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../features/auth/authSlice";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__back" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="header__brand">
          <h1>SQLearner</h1>
          <span>Earning through Learning</span>
        </div>
      </div>

      <div className="header__right">
        <div className="header__desktop">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="header__btn">
                Login
              </Link>
              <Link to="/signup" className="header__btn header__btn--primary">
                Signup
              </Link>
            </>
          ) : (
            <div className="header__profile">
              <div className="header__user-info">
                <span>{user?.name}</span>
                <span>{user?.email}</span>
              </div>

              <button
                className="header__profile-icon"
                onClick={() => navigate("/dashboard")}
              >
                👤
              </button>

              <button
                className="header__logout"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="header__mobile" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
          {menuOpen && (
            <div className="header__dropdown">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <button onClick={() => dispatch(logoutUser())}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
