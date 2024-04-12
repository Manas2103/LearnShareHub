import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import RightBar from "./components/Home/RightBar.jsx";
import About from "./components/About.jsx";
import Opinion from "./components/Opinion.jsx";
import Research from "./components/Research.jsx";
import Members from "./components/Members.jsx";
import Projects from "./components/Projects.jsx";
import Teaching from "./components/Teaching.jsx";
import Publications from "./components/Publications.jsx";
import AddProject from "./components/AddProject.jsx";
import AddPublication from "./components/AddPublication.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Approvals from "./components/Approvals.jsx";
import CurrUser from "./contexts/CurrUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RightBar />,
      },
      {
        path: "/home",
        element: <RightBar />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/opinion",
        element: <Opinion />,
      },
      {
        path : "/research",
        element : <Research/>
      },
      {
        path : "/members",
        element : <Members/>
      },
      {
        path : "/projects",
        element : <Projects/>
      },
      {
        path : "/publications",
        element : <Publications/>
      },
      {
        path : "/teaching",
        element : <Teaching/>
      },
      {
        path : "/addProject",
        element : <AddProject/>
      },
      {
        path : "/addPublication",
        element : <AddPublication/>
      },
      {
        path : "/addCourse",
        element : <AddCourse/>
      },
      {
        path : "/approval",
        element : <Approvals/>
      },
      {
        path : "/current-user",
        element : <CurrUser/>
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
