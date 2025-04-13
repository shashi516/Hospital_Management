import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

   
   if(result.isConfirmed){
     try {
      const response = await axios.delete(`http://localhost:4000/api/v1/user/delete/doctor/${id}`, {
       withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        Swal.fire(
        'Deleted!',
        'The message has been deleted successfully.',
        'success'
        );
        setDoctors(doctors.filter(doctor => doctor._id !== id));
      } else {
        Swal.fire(
        'Error!',
        'There was a problem deleting the message.',
        'error');
      } 
    } catch {
      Swal.fire('An error occurred while trying to delete the message.');
    }
  };
   }
  
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="container-fluid " id="doctorbody" style={{minHeight:"100vh",borderTopLeftRadius:"35px", borderBottomLeftRadius:"35px"}}>
      <div className="row" >
      <div style={{textAlign:"center"}}>
      <span style={{fontSize:"100px"}}>{<FaUserDoctor/>}</span>
      <h1>Doctors</h1>
      </div>
      <hr />
            {doctors && doctors.length > 0 ? (
              doctors.map((element,index) => {
              return (
                <div className="col-md-4" key={index} style={{display:"flex"}}>
              <div className="poster" key={element._id}>
                <div style={{textAlign:"center"}}>
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                </div>
               <div style={{padding:"4%"}}>
               <h4 style={{fontFamily:"Time New Roman",color:"purple",fontStyle:"bolder",textDecoration:"underline"}}>
                {`${element.firstName} ${element.lastName}`}</h4>
                <div className="details" style={{fontFamily:"serif"}}>
                  <p>
                    <b>Email:</b> <span>{element.email}</span>
                  </p>
                  <p>
                    <b>Phone:</b> <span>{element.phone}</span>
                  </p>
                  <p>
                   <b> DOB:</b> <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    <b>Department:</b> <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    <b>NIC:</b> <span>{element.nic}</span>
                  </p>
                  <p>
                    <b>Gender:</b> <span>{element.gender}</span>
                  </p>
                </div>
                <div >
                <div className="d-flex" style={{gap:".5rem"}}>
                  <div >
                    <button className="btn btn-info" style={{width:"145px",borderRadius:"0%"}}>Edit</button>
                  </div>
                  <div>
                  <button className="btn btn-danger" style={{width:"145px",borderRadius:"0%"}}  onClick={() => handleDelete(element._id)}  >Delete</button>
                  </div>
               </div>
                </div>
               </div>
                   </div>
              </div>
            );
            
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      
        
      </div>
    </div>
  );
};

export default AllDoctor;