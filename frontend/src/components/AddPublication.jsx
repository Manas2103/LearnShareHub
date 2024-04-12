import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function AddPublication() {
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

  const [data, setData] = useState({
    title : "",
    webLink : ""
  });
  // const [webLink, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/journal/add-journal", data);
      console.log(response);
      if(response.status === 200){
        setLoading(false)
        alert("Journal Saved Successfully, wait for approval (check status on approvals)");
        navigate("/publications")
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      alert("Journals already exists or invalid credentials")
    }
  }

  
  return (
    <div className="col-md-10 right">
      {!loading ? (
        <div className="home">Add Publications</div>
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
            placeholder="Enter Publication Title"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
          />

          <label style={labeStyle} htmlFor="webLink">
            Web Link to drive
          </label>
          <input
            style={inputStyle}
            type="text"
            id="webLink"
            name="webLink"
            placeholder="Enter Drive Link"
            onChange={(e) => setData({...data, [e.target.name] : e.target.value})}
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
