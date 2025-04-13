import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser, isAuthenticated, user } = useContext(Context);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser({ email, role: "Patient" });

      // Save to localStorage (optional)
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify({ email, role: "Patient" }));

      navigate("/patient-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleClose = () => setShow(!show);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user?.role === "Patient") {
      navigate("/patient-dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <Button variant="success" id="regbtn" onClick={handleClose}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "navy", fontFamily: "monospace" }}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: "1%" }}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: "3%" }}
              required
            />
            <div style={{ marginTop: "2%", fontFamily: "monospace" , textAlign:"end"}}>
              <span>
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </span>
            </div>
            <hr />
            <button className="btn btn-primary form-control" type="submit">
              Login
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
