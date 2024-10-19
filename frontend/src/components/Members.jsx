import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Members() {
  let teachers = [];
  let student = [];
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/users/get-all-users");
        if (response.status === 200) {
          const fetchedUsers = response.data.data;
          console.log("fetchedUsers", response.data.data.users);
          setUsers(fetchedUsers);

          teachers = [];
          student = [];
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (users?.length > 0) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].faculty == true) {
        teachers.push(users[i]);
      } else {
        student.push(users[i]);
      }
    }
  }

  let user;
  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    user = JSON.parse(currUser);
    // setCurrentUser(user)
  }

  console.log("teachers", teachers);
  console.log("student", student);

  return (
    <div className="col-md-10 right">
      <div className="home">Members</div>
      <div className="members">
        <div className="facultyData">
          <h3>Faculties</h3>
          <table className="tabledata">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Institute</th>
                <th>Designation</th>
                <th>Research Area</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.institute}</td>
                    <td>{user.descourse}</td>
                    <td>{user.researchArea}</td>
                    <td>
                      <Link
                        to="javascript:void(0)"
                        onClick={() =>
                          (window.location = `mailto:${user.email}`)
                        }
                        style={{
                          color: "black",
                        }}
                      >
                        Contact Me
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <div>No Faculties to show</div>
              )}
            </tbody>
          </table>
        </div>
        <div className="studentsData">
          <h3>Students</h3>
          <table className="tabledata">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Institute</th>
                <th>Course</th>
                <th>Research Area</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {student.length > 0 ? (
                student.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.institute}</td>
                    <td>{user.descourse}</td>
                    <td>{user.researchArea}</td>
                    <td>
                      <Link
                        to="javascript:void(0)"
                        onClick={() =>
                          (window.location = `mailto:${user.email}`)
                        }
                        style={{
                          color: "black",
                        }}
                      >
                        Contact Me
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <div>
                  <h4>No Student to show</h4>
                </div>
              )}
            </tbody>
          </table>
        </div>
        {user?.email === "pkroynitp@gmail.com" ? (
          <div>Add more members<Link style={{
            color : "blue"
          }} to="/signup"> Click Here</Link></div>
        ) : (
          <div></div>
        )}
        
      </div>
    </div>
  );
}
