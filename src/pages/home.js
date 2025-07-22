import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUser } from "../util/auth";

function Home() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow text-center p-4" style={{ minWidth: "350px" }}>
        <div className="card-body d-flex flex-column justify-content-between" style={{ height: "250px" }}>
          {!isAuthenticated() ? (
            <>
              <h2 className="mb-4">Welcome to the App!</h2>
              <div className="mt-auto">
                <Link to="/signup" className="btn btn-outline-primary me-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-4">Welcome {user?.name || "to the App"}!</h2>
              <div className="mt-auto">
                <Link to="/crud" className="btn btn-success me-2">
                  Go to CRUD
                </Link>
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
