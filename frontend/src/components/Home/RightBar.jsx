import React, { useState } from "react";
import Carousel from "../Corousel/Carousel";
import { Link , useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import InputBtn from "../InputBtn";
import { useEffect } from "react";

// import images from "../../assets/images"
export default function RightBar() {

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const [opinions, setOpinon] = useState([]);


  useEffect(() => {
    (async () => {
      // handleCurrentUser();
      try {
        const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/opinion/get-all-opinion",{},{ withCredentials: true });
        if (response.status === 200) {
          const fetchedOpinions = response.data.data.allOpinion;
          console.log("fetchedUsers", fetchedOpinions);
          setOpinon(fetchedOpinions);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleCurrentUser = async ()=> {
    const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/users/get-current-user");
    console.log(response);
    if(response.status === 200){
      console.log(response.data);
    }
    else{
      console.log(response.status);
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const responseUser = await axios.post("https://learnsharehub-1.onrender.com/api/v1/users/get-current-user")
  //       console.log(responseUser);
  //       if(responseUser.status === 200){
  //         console.log("curr User", responseUser.data. data)
  //         localStorage.setItem("currUser", JSON.stringify(responseUser.data.data))
  //       }
  //       else{
  //         console.log(responseUser.status);
          
  //       }
  //     } catch (error) {
  //       console.log("Get current user error : ", error)
  //     }
  //   })();
  // }, [])

  let count = 0;
  const { isLoggedIn } = useContext(AuthContext);

  let user;
  const currUser = localStorage.getItem("currUser");
  if (currUser) {
    user = JSON.parse(currUser);
    // setCurrentUser(user)
  }

  const handleDelete = async (username) => {
    const sure = parseInt(prompt("Are sure you want to delete ??(1/0)"));
    if(sure){
      try {
        const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/opinion/delete-opinion", {
          username
        });
  
        if (response.status === 200) {
          setOpinon(opinions.filter((opinion) => !opinion.username === username));
          navigate("/research");
          alert(
            `Opinion of ${username} removed`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <div className="col-md-10 right">
      <div className="home">Home</div>
      <div className="rel">
        <Carousel />
        <div className="overlap">
          <div className="box o1">
            <div className="heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                width="60"
                height="60"
              >
                <path
                  d="M10,10h20v40H10V10z"
                  fill="#476471"
                  stroke="#000"
                  strokeWidth="2"
                />

                <path
                  d="M30,10h20v40H30V10z"
                  fill="#476471"
                  stroke="#000"
                  strokeWidth="2"
                />

                <path d="M30,10v40" fill="none" stroke="#000" strokeWidth="2" />
              </svg>
              <p>Learning</p>
            </div>
            <div>We help you to Learn Deep Learning form Basic to advance</div>
          </div>
          <div className="box o2">
            <div className="heading">
              <svg
                className="magnifying-glass"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              <p>Research</p>
            </div>
            <div>
              We provide the guidance to apply your deep Learning knowledge in
              research
            </div>
          </div>
          <div className="box o3">
            <div className="heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                width="60"
                height="60"
              >
                <rect
                  x="10"
                  y="10"
                  width="40"
                  height="30"
                  fill="#476471"
                  stroke="#000"
                  strokeWidth="2"
                />
                <rect
                  x="12"
                  y="13"
                  width="36"
                  height="24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                />

                <rect
                  x="12"
                  y="40"
                  width="36"
                  height="8"
                  fill="#476471"
                  stroke="#000"
                  strokeWidth="2"
                />
                <rect
                  x="18"
                  y="42"
                  width="8"
                  height="4"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="2"
                />
                <rect
                  x="28"
                  y="42"
                  width="12"
                  height="4"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="2"
                />

                <line
                  x1="18"
                  y1="20"
                  x2="42"
                  y2="20"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <line
                  x1="18"
                  y1="25"
                  x2="42"
                  y2="25"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <line
                  x1="18"
                  y1="30"
                  x2="42"
                  y2="30"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </svg>
              <p>Development</p>
            </div>
            <div>We Provide the product of deep learning</div>
          </div>
        </div>
      </div>
      {true ? (
        <div className="students">
          <div className="stud">
            <h5>What Our Students Have to Say</h5>
            {(isLoggedIn && user?.approved) ? (
              <Link to="/opinion">Add Opinion</Link>
            ) : (
              <p>You need to login or approved to add opinion</p>
            )}
          </div>
          <div className="std-box">
            <div className="row content-op">
              {opinions.length > 0 ? (
                opinions.map((ele, index) => (
                  <div className="op col-md-5 st" key={index + 1}>
                    <div className="opinion-content">
                      <p>{ele.opinion}</p>
                    </div>
                    <div className="opinion-user">
                      <img
                        className="opinion-image"
                        src={ele.image}
                        height={50}
                        width={50}
                        style={{
                          borderRadius: "50px",
                        }}
                        alt="user"
                      />
                      <div>
                        <h5>{ele.username}</h5>
                        <h5>{ele.institute}</h5>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {((user?.username === ele.username && isLoggedIn) || user?.email === "pkroynitp@gmail.com") ? (
                        <div>
                        <Link className="searchbtn px-3 p-2" onClick={() => handleDelete(ele.username)} >Delete</Link>
                      </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <h6>No Opinion present</h6>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="students"
          style={{ textAlign: "center", margin: "100px 5px" }}
        >
          <h5>You have to be Logged In or approved to add Student Opinion</h5>
        </div>
      )}
    </div>
  );
}
