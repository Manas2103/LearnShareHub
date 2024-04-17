import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Approvals() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [allUsers, setAllUser] = useState([]);

  const handleApprovalProject = async (title) => {
    try {
      const response = await axios.post("/api/v1/project/approve-project", {
        title,
      });
      if (response.status === 200) {
        projects.map((project) => {
          if (project.title === title) {
            project.approved = true;
          }
        });
        alert(`Project ${title} is approved by you`);
        navigate("/approval");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (title) => {
    try {
      const response = await axios.post("/api/v1/project/delete-project", {
        title,
      });

      if (response.status === 200) {
        setProjects(projects.filter((project) => !project.title === title));
        alert(
          `Project ${title} is not approved by you and deleted successfully`
        );
        navigate("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprovalJournal = async (title) => {
    try {
      const response = await axios.post("/api/v1/journal/approve-journal", {
        title,
      });
      if (response.status === 200) {
        journals.map((journal) => {
          if (journal.title === title) {
            journal.approved = true;
          }
        });
        alert(`Journal ${title} is approved by you`);
        navigate("/approval");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteJournal = async (title) => {
    try {
      const response = await axios.post("/api/v1/journal/delete-journal", {
        title,
      });

      if (response.status === 200) {
        setJournals(journals.filter((journal) => !journal.title === title));
        alert(
          `Journal ${title} is not approved by you and hence, deleted successfully`
        );
        navigate("/publications");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprovalUser = async (title) => {
    try {
      const response = await axios.post("/api/v1/users/approve-user", {
        title,
      });
      if (response.status === 200) {
        allUsers.map((user) => {
          if (user.title === title) {
            user.approved = true;
          }
        });
        alert(`Journal ${title} is approved by you`);
        navigate("/approval");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (title) => {
    try {
      const response = await axios.post("/api/v1/users/delete-user", {
        title,
      });

      if (response.status === 200) {
        setJournals(journals.filter((journal) => !journal.title === title));
        alert(
          `Journal ${title} is not approved by you and hence, deleted successfully`
        );
        navigate("/publications");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/v1/project/get-all-project");
        if (response.status === 200) {
          const fetchedProjects = response.data.data.allProject;
          console.log("fetchedProjects", fetchedProjects);
          setProjects(fetchedProjects);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response2 = await axios.post("/api/v1/journal/get-all-journal");
        if (response2.status === 200) {
          const fetchedJournals = response2.data.data.allJournals;
          console.log("fetchedJournals", fetchedJournals);
          setJournals(fetchedJournals);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response2 = await axios.post("/api/v1/users/get-all-users");
        if (response2.status === 200) {
          const Users = response2.data.data;
          console.log("Users", Users);
          setAllUser(Users);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  let user;
  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    user = JSON.parse(currUser);
    // setCurrentUser(user)
  }

  return (
    <div className="col-md-10 right">
      <div className="home">Approvals</div>

      <h3
        style={{
          margin: "10px 20px",
        }}
      >
        Project Approvals
      </h3>
      <div className="members">
        <div className="facultyData">
          <table className="tabledata">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Project Title</th>
                <th>Description</th>
                <th>Member</th>
                <th>Mentor</th>
                <th>Link</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{project.title.toUpperCase()}</td>
                    <td>{project.description}</td>
                    <td>{project.member}</td>
                    <td>{project.mentor}</td>
                    <td>
                      {project.link.length > 0 ? (
                        <Link
                          style={{ color: "lightBlue" }}
                          target="_blank"
                          to={project.link}
                        >
                          Drive or Github
                        </Link>
                      ) : (
                        <p>No Link</p>
                      )}
                    </td>
                    <td>
                      {user.email === "pkroynitp@gmail.com" ? (
                        <div>
                          {!project.approved ? (
                            <div key={project.title}>
                              <Link
                                style={{
                                  margin: "0px 4px",
                                }}
                                onClick={() =>
                                  handleApprovalProject(project.title)
                                }
                              >
                                &#9989;
                              </Link>
                              <Link
                                style={{
                                  margin: "0px 4px",
                                }}
                                onClick={() =>
                                  handleDeleteProject(project.title)
                                }
                              >
                                &#10062;
                              </Link>
                            </div>
                          ) : (
                            <div>Done</div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {project.approved ? (
                            <div
                              style={{
                                color: "green",
                              }}
                            >
                              Done
                            </div>
                          ) : (
                            <div
                              style={{
                                color: "yellow",
                              }}
                            >
                              Pending
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div>No rows to show</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <h3
        style={{
          margin: "10px 20px",
        }}
      >
        Journal Approvals
      </h3>
      <div className="members">
        <div className="facultyData">
          <table className="tabledata">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Journal Title</th>
                <th>Link</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {journals.length > 0 ? (
                journals.map((j, index) => (
                  <tr key={j.title}>
                    <td>{index + 1}</td>
                    <td>{j.title.toUpperCase()}</td>
                    <td>
                      <Link to={j.webLink}>drive</Link>
                    </td>
                    <td>
                      {user.email === "pkroynitp@gmail.com" ? (
                        <div>
                          {!j.approved ? (
                            <div key={j.title}>
                              <Link
                                style={{
                                  margin: "0px 4px",
                                }}
                                onClick={() => handleApprovalJournal(j.title)}
                              >
                                &#9989;
                              </Link>
                              <Link
                                style={{
                                  margin: "0px 4px",
                                }}
                                onClick={() => handleDeleteJournal(j.title)}
                              >
                                &#10062;
                              </Link>
                            </div>
                          ) : (
                            <div>Done</div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {j.approved ? (
                            <div
                              style={{
                                color: "green",
                              }}
                            >
                              Done
                            </div>
                          ) : (
                            <div
                              style={{
                                color: "yellow",
                              }}
                            >
                              Pending
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div>No rows to show</div>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <h3
        style={{
          margin: "10px 20px",
        }}
      >
        User Approvals
      </h3>

      <div className="members">
        <div className="facultyData">
          <table className="tabledata">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Username</th>
                <th>Institute</th>
                <th>Course/Designation</th>
                <th>Faculty</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{project.username.toUpperCase()}</td>
                    <td>{project.institute}</td>
                    <td>{project.descourse}</td>
                    <td>{project.faculty ? (<p>Yes</p>):(<p>No</p>)}</td>
                    <td>
                      {user.email === "pkroynitp@gmail.com" ? (
                        <div>
                          {!project.approved ? (
                            <div key={project.title}>
                              <Link
                                style={{
                                  margin: "0px 4px",
                                }}
                                onClick={() =>
                                  handleApprovalUser(project.title)
                                }
                              >
                                &#9989;
                              </Link>
                              <Link
                                style={{
                                  margin: "0px 4px",
                                }}
                                onClick={() =>
                                  handleDeleteUser(project.title)
                                }
                              >
                                &#10062;
                              </Link>
                            </div>
                          ) : (
                            <div>Done</div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {project.approved ? (
                            <div
                              style={{
                                color: "green",
                              }}
                            >
                              Done
                            </div>
                          ) : (
                            <div
                              style={{
                                color: "yellow",
                              }}
                            >
                              Pending
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div>No rows to show</div>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
