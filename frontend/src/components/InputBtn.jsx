import React from "react";
import { Link } from "react-router-dom";

export default function InputBtn({children, path}) {
  return (
    <>
      <Link to={path} className="searchbtn px-3 p-2" value="Search">
        {children}
      </Link>
    </>
  );
}
