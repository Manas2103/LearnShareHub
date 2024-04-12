import React from "react";
import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function AddProject() {

  const [loading, setLoading] = useState(false);

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

  const [mentorImage, setMentor] = useState(null);
  const [data, setData] = useState({
    title: "",
    mentor: "",
    description: ""
  });

  const navigate = useNavigate()

  const formData = new FormData()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true);
    formData.append('title', data.title);
    formData.append('mentor', data.mentor);
    formData.append('description', data.description);
    formData.append('mentorImage', mentorImage)

    try {
      const response = await axios.post("/api/v1/project/add-project", formData);
  
      if(response.status === 200){

        setLoading(false);
        alert("Project saved successfully and wait for approval (you can check status in approvals)");
        navigate("/projects")
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Project already exists or invalid credentials")
    }
   
  }

  return (
    <div className="col-md-10 right">
      {!loading ? (
        <div className="home">Add Project</div>
      ) : (
        <div className="home">Loading....</div>
      )}
      <div className="signup">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label style={labeStyle} htmlFor="title">
            Title
          </label>
          <input
            style={inputStyle}
            type="text"
            id="title"
            name="title"
            placeholder="Enter Project Title"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="mentor">
            Mentor
          </label>
          <input
            style={inputStyle}
            type="text"
            id="mentor"
            name="mentor"
            placeholder="Enter your Mentor"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="description">
            Description
          </label>
          <input
            style={inputStyle}
            type="text"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="mentorImage">
            Mentor Image
          </label>
          <input
            style={{
              margin: "5px",
              padding: "7px 15px",
              marginLeft: "95px",
            }}
            type="file"
            id="mentorImage"
            name="mentorImage"
            placeholder="Browse your Image"
            onChange={(e) => setMentor(e.target.files[0])}
          />

          <input
            style={inputStyle}
            id="SignupSubmit"
            type="submit"
            value="Add"
          />
        </form>
      </div>
    </div>
  );
}
