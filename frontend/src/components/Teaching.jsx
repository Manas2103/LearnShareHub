import React from "react";
import InputBtn from "./InputBtn";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

export default function Teaching() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/v1/course/get-all-course");
        if (response.status === 200) {
          const fetchedCourses = response.data.data.allCourse;
          console.log("fetchedCourses", fetchedCourses);
          setCourses(fetchedCourses);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let user;
  const curUser = localStorage.getItem("currUser");
  if (curUser) {
    user = JSON.parse(curUser);
    // setCurrentUser(user)
  }

  const handleDelete = async (courseId) => {
    const sure = parseInt(prompt("Are sure you want to delete ??(1/0)"));
    if(sure){
      try {
        const response = await axios.post("/api/v1/course/delete-course", {
          courseId,
        });
  
        if (response.status === 200) {
          setCourses(courses.filter((c) => !c.courseId === courseId));
          navigate("/home");
          alert(
            `Course ${courseId} removed`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="col-md-10 right">
      <div className="home">Teaching</div>

      {courses.length > 0 ? (
        courses.map((ele, index) => (
          <div className="teaching-box">
            
              <h4 className="title-course">
                {ele.courseId} : {ele.courseName}
              </h4>
            
            <div className="course-table">
              <table>
                <tbody>
                  <tr>
                    <th>Instructor</th>
                    <td>{ele.instructor}</td>
                  </tr>
                  <tr>
                    <th>When</th>
                    <td>{ele.date}</td>
                  </tr>
                  <tr>
                    <th>Where</th>
                    <td>{ele.venue}</td>
                  </tr>
                  <tr>
                    <th>Teaching Assistant</th>
                    <td>{ele.assistant}</td>
                  </tr>
                  
                </tbody>
              </table>
                <h5 className="title-course">Syllabus</h5>
                <div className="course-image">
                  <img src={ele.syllabus}  alt="syllabus" height={900} width={900} />
                </div>
                {user?.email === "pkroynitp@gmail.com" ? (<div>
                <i onClick={() => handleDelete(ele.courseId)} class="fa fa-trash-o" style={{
                  fontSize:"48px",
                  color:"red"}}></i>
                </div>) : (<div></div>)}
                
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No Courses to show</p>
        </div>
      )}

      {(isLoggedIn && user.faculty) ? (
        <div className="add-project">
          <InputBtn children={"Add Course"} path={"/addCourse"} />
        </div>
      ) : (
        <div className="add-project">
          You have to be logged in as a faculty to Add Course
        </div>
      )}
    </div>
  );
}
