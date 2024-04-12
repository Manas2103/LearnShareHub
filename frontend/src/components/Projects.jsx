import React from "react";
import InputBtn from "./InputBtn";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Projects() {
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/v1/project/get-all-project");
        if (response.status === 200) {
          const fetchedProjects = response.data.data.allProject;
          console.log("fetchedProjects", fetchedProjects);
          setProjects(fetchedProjects.filter((project) => project.approved));
          // const appProject = projects?.filter((project) => project.approved)
          // approvedProjects.push(...app)
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async (title) => {
    const sure = parseInt(prompt("Are sure you want to delete ??(1/0)"));
    if(sure){
      try {
        const response = await axios.post("/api/v1/project/delete-project", {
          title,
        });
  
        if (response.status === 200) {
          setProjects(projects.filter((project) => !project.title === title));
          navigate("/home");
          alert(
            `Project ${title} removed`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  
  let user;
  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    user = JSON.parse(currUser);
    // setCurrentUser(user)
  }

  return (
    <div className="col-md-10 right">
      <div className="home">Projects</div>

      <div className="row all-projects">
        {projects.length > 0 ? (
          projects.map((ele, index) => (
            <div className="col-md-6 project-box">
            {true ? (
                <div  key={index + 1}>
                <div>
                  <div className="project-title">
                    <h6>{ele.title.toUpperCase()}</h6>
                  </div>

                  <div className="project-image">
                    <div className="member">
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {ele.member}
                      </p>
                      <img
                        src={ele.memberImage}
                        alt="member"
                        height={120}
                        width={110}
                      />
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Member
                      </p>
                    </div>

                    <div className="project-member">
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {ele.mentor}
                      </p>
                      <img
                        src={ele.mentorImage}
                        alt="mentor"
                        height={120}
                        width={110}
                      />
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Mentor
                      </p>
                    </div>
                  </div>
                  <div className="project-description">{ele.description}</div>
                  <div className="project-delete">
                    {(user?.username === ele.member || user?.email === "pkroynitp@gmail.com") ? (
                      <div>

                        <Link className="searchbtn px-3 p-2" onClick={() => handleDelete(ele.title)} >Delete</Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
          
                <div></div>
                </div>
              ) : (
                <div style={{
                  height : "0px",
                  width : "0px"
                }}></div>
              )}
              </div>  
          ))
        ) : (
          <div>No Projects to show</div>
        )}
      </div>

      {isLoggedIn ? (
        <div className="add-project">
          <InputBtn children={"Add Project"} path={"/addProject"} />
        </div>
      ) : (
        <div className="add-project">
          You have to be logged in to Add Projects
        </div>
      )}
    </div>
  );
}
