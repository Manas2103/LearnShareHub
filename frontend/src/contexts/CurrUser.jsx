import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios"

export default function CurrUser() {

  const navigate = useNavigate();
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/v1/users/logout");

    if (response.status === 200) {
      logoutUser();
      localStorage.removeItem("currUser");
      alert("User logged out");
      navigate("/");
    } else {
      alert("error while logging out");
    }
  };

  const handleDelete = async (e) => {
    const check = parseInt(prompt("Are you sure you want to delete acount 1/0"));
    if(check === 1){
      e.preventDefault();
  
      const response = await axios.get("/api/v1/users/delete-user");
  
      if (response.status === 200) {
        logoutUser();
        navigate("/home");
        alert("User Deleted successfully");
      } else {
        alert("error while deleting user");
      }
    }
  };




  let user;
  const currUser = localStorage.getItem("currUser")
  if(currUser){
    user = JSON.parse(currUser);
    // setCurrentUser(user)
  }

  return (
    <div className="col-md-10 right">
      <div className="home">Current User</div>
      
      <div className="current-user">
        <div className="curr-user-image">
          <img height={150} width={150} src={user.image} alt="" />
        </div>
        <div className="curr-user-details">
          <table>
            <tr>
              <th>Name</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><Link to = {user.email}>{user.email}</Link></td>
            </tr>
            <tr>
              <th>Designation/Course</th>
              <td>{user.descourse}</td>
            </tr>
            <tr>
              <th>Institute</th>
              <td>{user.institute}</td>
            </tr>
            <tr>
              <th>Research Area</th>
              <td>{user.researchArea}</td>
            </tr>
            <tr>
              <th>Approval</th>
              <td>{user.approved ? (<p>Done</p>) : (<p style={{
                color : "yellow"
              }}>Pending</p>)}</td>
            </tr>
          </table>
        </div>
        <div className="user-logout-delete">
        <form
                    action=""
                    onSubmit={handleSubmit}
                    style={{
                      display: "inline",
                    }}
                  >
                    <input type="submit" className="searchbtn" value="logout" />
                  </form>

                  <form
                    action=""
                    onSubmit={handleDelete}
                    style={{
                      display: "inline",
                    }}
                  >
                    <input type="submit" className="searchbtn" value="Delete Account" />
                  </form>
        </div>
      </div>
    </div>
  )
}