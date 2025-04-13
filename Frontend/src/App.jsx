import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./main";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Register from "./Pages/Register";
import PatientDashboard from "./Pages/PatientDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated, user } = useContext(Context);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Patient Route */}
        <Route
          path="/patient-dashboard"
          element={
            isAuthenticated && user?.role === "Patient" ? (
              <PatientDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Redirect any other route to patient dashboard if authenticated */}
        <Route
          path="*"
          element={
            isAuthenticated && user?.role === "Patient" ? (
              <Navigate to="/patient-dashboard" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
};

export default App;
