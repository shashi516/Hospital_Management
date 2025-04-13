import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userProfile from '../images/userprofile.png'
import Appointment from './Appointment';

function PatientDashboard() {
  const { isAuthenticated, user, setIsAuthenticated } = useContext(Context);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Patient") {
      navigate("/");
    }

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/patient/me", {
          withCredentials: true,
        });
        setPatient(data.patient); // Ensure your backend returns { patient: {...} }
      } catch {
        toast.error("Error fetching patient data");
        navigate("/");
      }
    };

    fetchPatient();
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true
      })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(false);
          navigate("/");
        })
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row  p-2" style={{ backgroundColor: "#405d27" }}>
        <div className="col-sm-4">
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <img style={{ height: "180px", borderRadius: "50%", border: "1px solid black" }}
              src={userProfile} alt="" />
          </div>
        </div>
        <div className="col-sm-6 " style={{ alignContent: "center", float: "left", textAlign: "center" }} >
          <div style={{ color: "white" }}>
            {patient ? (
              <span style={{ fontSize: "50px", fontFamily: "fantasy" }}>Welcome {patient.firstName}</span>
            ) : (
              <h2>Loading patient details...</h2>
            )}
          </div>
        </div>
        <div className="col-sm-2" style={{ alignContent: "center", textAlign: "center" }}>
          <div>
            <button onClick={handleLogout} style={{ height: "100px", width: "100px" }} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 bg-info" style={{ textAlign: "center" }}>
            <Appointment />
        </div>
        <div className="col-sm-6 bg-dark" style={{textAlign:"center",color:"white"}}>
          <span>
            Check Status
          </span>
        </div>
      </div>
      <div className="row" style={{textAlign:"center", alignContent:"center",
         minHeight:'50vh',fontFamily:"cursive"}}>
        <h1>Thank You</h1>
        <h1>For Visiting Our Platform</h1>
      </div>
    </div>
  )
}

export default PatientDashboard;
