import React, { useEffect, useState } from "react";
import InputBtn from "./InputBtn";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";

export default function Publications() {
  const { isLoggedIn } = useContext(AuthContext);
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/journal/get-all-journal");
        if (response.status === 200) {
          const fetchedJournals = response.data.data.allJournals;
          console.log("fetchedJournals", fetchedJournals);
          setJournals(fetchedJournals.filter((journal) => journal.approved));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteJournal = async (title) => {
    try {
      const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/journal/delete-journal", {
        title,
      });

      if (response.status === 200) {
        setJournals(journals.filter((journal) => !journal.title === title));
        alert(
          `Journal ${title} is removed`
        );
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
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
      <div className="home">Publications</div>
      <div className="members">
        <div className="facultyData">
          <table className="tabledata">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Title of the Paper</th>
                <th>Weblink</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {journals.length > 0 ? (
                journals.map((journal, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{journal.title}</td>
                    <td>
                      <Link style={{ color: "black" }} to={journal.webLink}>
                        weblink
                      </Link>
                    </td>
                    <td>
                      {user?.email === "pkroynitp@gmail.com" ? (
                        <i
                          style={{
                            color : "green"
                          }}
                          class="fa fa-trash-o"
                          onClick={() => {
                            handleDeleteJournal(journal.title);
                          }}
                        ></i>
                      ) : (
                        <i style={{
                          color : "red"
                        }} class="fa fa-trash-o"></i>
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
      {(isLoggedIn && user.approved) || user?.email === "pkroynitp@gmail.com" ? (
        <div className="add-project">
          <InputBtn children={"Add Publication"} path={"/addPublication"} />
        </div>
      ) : (
        <div className="add-project">Approved users can Add Publication</div>
      )}
    </div>
  );
}
