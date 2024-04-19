import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputBtn from "./InputBtn";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/v1/users/logout");

    if (response.status === 200) {
      logoutUser();
      localStorage.removeItem("currUser");
      alert("User logged out");
      navigate("/");
    } else {
      alert("error while logging out");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await axios.get("/api/v1/users/delete-user");

    if (response.status === 200) {
      logoutUser();
      navigate("/home");
      alert("User Deleted successfully");
    } else {
      alert("error while deleting user");
    }
  };

  const [currentUser, setCurrentUser] = useState({});

  let user;
  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    user = JSON.parse(currUser);
    // setCurrentUser(user)
  }

  // useEffect(() => {
  //   (async () => {
  //     if (isLoggedIn) {
  //       try {
  //         const response = await axios.post("/api/v1/users/get-current-user");
  //         if (response.status === 200) {
  //           const currentUser = response.data.data;
  //           console.log("Current User", currentUser.email);
  //           setCurrentUser(currentUser);
  //           //setOpinon(fetchedOpinions);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, []);

  //setTimeout(()=>{}, 3000)
  return (
    <div className="">
      <div className="top">
        <div className="row cont">
          <div className="col-md-9" style={{ color: "#555555" }} id="head">
            <h3>Deep Learning for Research and Development</h3>
            <h5>Learn research and apply</h5>
          </div>
          <div className="col-md-3">
            {/* <form action="">
            <input
              type="text"
              placeholder="   Search...."
              className="p-2 mt-2"
              id="search"
            />
            <input
              type="submit" className="searchbtn px-3 p-2" value="Search" />
          </form> */}

            <div className="logsig">
              {isLoggedIn ? (
                <div style={{
                  textAlign : "end"
                }}>
                  {/* <form
                    action=""
                    onSubmit={handleSubmit}
                    style={{
                      display: "inline",
                    }}
                  >
                    <input type="submit" className="searchbtn" value="logout" />
                  </form>

                  <form
                    action=""
                    onSubmit={handleDelete}
                    style={{
                      display: "inline",
                    }}
                  >
                    <input type="submit" className="searchbtn" value="Delete" />
                  </form> */}

                  <img
                    style={{
                      margin: "0px 30px",
                      border: "2px solid black",
                      borderRadius: "20px",
                      boxShadow: "2px 2px 2px 2px rgb(98, 102, 104)",
                    }}
                    height={40}
                    width={40}
                    src = {user ? (user.image) : ("https://res.cloudinary.com/dptzi4pda/image/upload/v1712773036/vdglekm53t5fwfv95mgi.jpg")}
                    // src="https://res.cloudinary.com/dptzi4pda/image/upload/v1712773036/vdglekm53t5fwfv95mgi.jpg"
                    alt="User"
                    onClick={() => navigate("/current-user")}
                  />
                </div>
              ) : (
                <>
                  <InputBtn children={"Signup"} path={"/signup"} />
                  <InputBtn children={"Login"} path={"/login"} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="nav">
          <ul>
            <li>
              <Link to="/home"> Home </Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/members"> Members </Link>
            </li>

            <li>
              <Link to="/research"> Research </Link>
            </li>

            {true ? (
              <>
                <li>
                  <Link to="/projects"> Projects </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="#"> Projects </Link>
                </li>
              </>
            )}

            {true ? (
              <>
                <li>
                  <Link to="/publications"> Publications </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="#"> Publications </Link>
                </li>
              </>
            )}
            {true ? (
              <>
                <li>
                  <Link to="/teaching"> Teaching </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="#"> Teaching </Link>
                </li>
              </>
            )}

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/approval"> Approvals </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="#"> Approvals </Link>
              </li>
            )}
            {/* <li>\</li>
          <li>
            
          </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
