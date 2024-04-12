import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import images from "../../assets/images"
export default function Signup() {
  const [file, setFile] = useState(null);
  const [faculty, setFaculty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    institute: "",
    descourse : "",
    researchArea : ""
  });

  const navigate = useNavigate()

  const formData = new FormData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('email', data.email);
    formData.append('image', file)
    formData.append('faculty', faculty)
    formData.append('institute', data.institute)
    formData.append('descourse', data.descourse)
    formData.append('researchArea', data.researchArea)
    // setData(faculty)
    // setData(file)

    console.log(data)

    try {
      setLoading(true)
      const response = await axios.post("/api/v1/users/register", formData)
  
      if(response.status === 200){
        setLoading(false)
        alert("User Signed UP successfully, go to login page")
        navigate("/login")
      }
      else{
        console.error(response.error)
      }
    } catch (error) {
      setLoading(false);
      navigate("/signup")
      console.log("ERROR:", error)
      alert("User already exists or Invalid credentials", error)

    }
  }

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
  return (
    <div className="col-md-10 right">
      {loading ? (<div className="home">Loading....</div>):(<div className="home">Signup</div>)}
      <div className="signup">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label style={labeStyle} htmlFor="username">
            Username
          </label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="email">
            Email
          </label>
          <input
            style={inputStyle}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
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
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="email">
            Image
          </label>
          <input
            style={{
              margin: "3px",
              padding: "5px 10px",
              marginLeft: "95px",
            }}
            type="file"
            id="image"
            name="image"
            placeholder="Browse your Image"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label style={labeStyle} htmlFor="institute">
            Institute
          </label>
          <input
            style={inputStyle}
            type="text"
            id="institute"
            name="institute"
            placeholder="Enter Institute name"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="course">
            Course/Designation
          </label>
          <input
            style={inputStyle}
            type="text"
            id="descourse"
            name="descourse"
            placeholder="Enter Course/Designation"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="researchArea">
            Research Work
          </label>
          <input
            style={inputStyle}
            type="text"
            id="researchArea"
            name="researchArea"
            placeholder="Enter Research Work"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label htmlFor="faculty">
            <input 
            type="checkbox"
            name="faculty"
            id="faculty"
            onChange={(e) => setFaculty(e.target.checked)}
             /> Faculty
          </label>


          <input
            style={inputStyle}
            id="SignupSubmit"
            type="submit"
            value="Sign-up"
          />
        </form>
      </div>
    </div>
  );
}
