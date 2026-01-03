import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, role }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h3 onClick={() => navigate("/")}>PCOS Secure Predictor</h3>

      {user && (
        <div className="nav-right">
          <span>{user} ({role})</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
