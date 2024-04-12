import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Opinion() {

  
  const navigate = useNavigate();

  const inputStyle = {
    margin: "5px",
    padding: "7px 25px",
    border: "1px solid gray",
    borderRadius: "20px",
  };

  const contentBox = {
    margin: "5px",
    padding: "7px 25px",
    border: "1px solid gray",
    borderRadius: "20px",
    height: "25vh",
  };

  const labeStyle = {
    fontWeight: "bold",
    color: "black",
  };

  const [formData, setFormData] = useState({
    institute : "",
    opinion : ""
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault()

    const response = await axios.post("/api/v1/opinion/add-opinion", formData)

    if(response.status === 200){
      setLoading(true);
      alert("Opinion saved successfully")
      navigate("/home")
    }
    else{
      setLoading(true);
      console.log("Error while saving the opinion")
      alert("Error while uploading opinion")
    }
  }
  return (
    <div className="col-md-10 right">
      {loading ? (<div className="home">Loading...</div>) : (<div className="home">Give Your Opinion</div>)}
      
      <div className="login">
        <form action="" className="form" onSubmit={handleSubmit}>
          {/* <label style={labeStyle} htmlFor="email">
            Userame
          </label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            name="email"
            placeholder="Enter your username"
            onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}
          /> */}
          <label style={labeStyle} htmlFor="password">
            Institute
          </label>
          <input
            style={inputStyle}
            type="text"
            id="institute"
            name="institute"
            placeholder="Enter your Institute"
            onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}
          />
          <label style={labeStyle} htmlFor="opinion">
            Opinion
          </label>
          <input
            style={contentBox}
            type="text"
            id="content"
            name="opinion"
            placeholder="Enter your Opinion"
            onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}
          />
          <input style={inputStyle} id="LoginSubmit" type="submit" />
        </form>
      </div>
    </div>
  );
}
