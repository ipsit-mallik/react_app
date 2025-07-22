import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Crud from "./pages/crud.operation";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import ProtectedRoute from "./util/protectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/crud"
          element={
            <ProtectedRoute>
              <Crud />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
