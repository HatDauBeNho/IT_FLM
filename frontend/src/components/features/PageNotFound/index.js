import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or an error occurred.</p>
      <button className="btn-home" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
