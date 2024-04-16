import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const navigate = useNavigate();

  const inputStyle = {
    margin: "5px",
    padding: "7px 25px",
    border: "1px solid gray",
    borderRadius: "20px",
  };

  const [data, setData] = useState({
    courseId: "",
    courseName: "",
    instructor: "",
    venue: "",
    date: "",
    assistant: "",
  });

  const formData = new FormData();

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("courseId", data.courseId);
    formData.append("courseName", data.courseName);
    formData.append("instructor", data.instructor);
    formData.append("assistant", data.assistant);
    formData.append("venue", data.venue);
    formData.append("date", data.date);
    formData.append("syllabus", file);

    console.log(formData);

    try {
      setLoading(true)
      const response = await axios.post("/api/v1/course/add-course", formData);
      if (response.status === 200) {
        setLoading(false);
        alert("Course saved");
        navigate("/teaching");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Course with the same id exists or invalid credentials")
    }
  };

  const labeStyle = {
    fontWeight: "bold",
    color: "black",
  };
  return (
    <div className="col-md-10 right">
      {loading ? (<div className="home">Loading....</div>):(<div className="home">Add Course</div>)}
      <div className="signup">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label style={labeStyle} htmlFor="courseId">
            Course ID
          </label>
          <input
            style={inputStyle}
            type="text"
            id="courseId"
            name="courseId"
            placeholder="Enter Course ID"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          <label style={labeStyle} htmlFor="courseName">
            Course Name
          </label>
          <input
            style={inputStyle}
            type="text"
            id="courseName"
            name="courseName"
            placeholder="Enter Course Name"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          <label style={labeStyle} htmlFor="instructor">
            Course Instructor
          </label>
          <input
            style={inputStyle}
            type="text"
            id="instructor"
            name="instructor"
            placeholder="Enter Course Instructor"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          <label style={labeStyle} htmlFor="assistant">
            Course Assistant
          </label>
          <input
            style={inputStyle}
            type="text"
            id="assistant"
            name="assistant"
            placeholder="Enter Course Assistant"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          <label style={labeStyle} htmlFor="date">
            Date
          </label>
          <input
            style={inputStyle}
            type="Date"
            id="date"
            name="date"
            placeholder="Enter Date"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          <label style={labeStyle} htmlFor="venue">
            Venue
          </label>
          <input
            style={inputStyle}
            type="text"
            id="venue"
            name="venue"
            placeholder="Enter Venue"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          {/* <label style={labeStyle} htmlFor="date">
          Date
          </label>
          <input
            style={inputStyle}
            type="date"
            id="date"
            name="date"
            placeholder="Enter Date"
          /> */}

          {/* Enter date programatically */}

          <label style={labeStyle} htmlFor="syllabus">
            Syllabus
          </label>
          <input
            style={{
              margin: "5px",
              padding: "7px 15px",
              marginLeft: "95px",
            }}
            type="file"
            id="syllabus"
            name="syllabus"
            placeholder="Browse your Image"
            onChange={(e) => setFile(e.target.files[0])}
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
