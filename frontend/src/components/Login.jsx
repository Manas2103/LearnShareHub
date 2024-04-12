import React from "react";
import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


// import images from "../../assets/images"
export default function Login() {
  const {loginUser, logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const inputStyle = {
    margin: "5px",
    padding: "7px 25px",
    border: "1px solid gray",
    borderRadius: "20px",
  };

  const labeStyle = {
    fontWeight: "bold",
    color: "black",
  };

  const [loginData, setLoginData] = useState({
    email : "",
    password : ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/users/login", loginData)
  
      if(response.status === 200){
        setLoading(false)
        console.log("Logged In Successfully")
        loginUser()
        navigate("/home")
        alert("User Logged in Successfully")
        try {
          const responseUser = await axios.post("/api/v1/users/get-current-user")
          console.log(responseUser);
          if(responseUser.status === 200){
            console.log("curr User", responseUser.data. data)
            localStorage.setItem("currUser", JSON.stringify(responseUser.data.data))
          }
        } catch (error) {
          console.log("Get current user error : ", error)
        }
      }
      else{
        alert("error while logging in")
      }
    } catch (error) {
      setLoading(false)
      navigate("/login")
      if (error.response && error.response.data && error.response.data.message) {
        // Assuming server sends error message as `message` property in the response
        alert(error.response.data.message)
      } else {
        alert("An error occured while logging in please give valid credentials")
      }
    }
  }





  return (
    <div className="col-md-10 right">
      {!loading ? (
        <div className="home">Login</div>
      ) : (
        <div className="home">Loading....</div>
      )}
      <div className="login">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label style={labeStyle} htmlFor="email">
            Email
          </label>
          <input
            style={inputStyle}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value = {loginData.email}
            onChange={(e) => setLoginData({...loginData, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="password">
            Password
          </label>
          <input
            style={inputStyle}
            type="text"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value = {loginData.password}
            onChange={(e) => setLoginData({...loginData, [e.target.name] : e.target.value})}
          />

          <input
            style={inputStyle}
            id="LoginSubmit"
            type="submit"
            value="Login"
          />

        </form>
      </div>
    </div>
  );
}
