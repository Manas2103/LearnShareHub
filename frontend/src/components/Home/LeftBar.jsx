import React from "react";
import { Link } from "react-router-dom";

export default function LeftBar() {
  const style1 = {
      color : "white",
      fontWeight: "700",
      fontSize: "medium"
  }

  const style2 = {
    paddingLeft: "14px",
    fontSize: "small"
  }
  return (
    <div className="col-md-2 left">
      <div className="row contact-us">
        <div
          style={style1}
        >
          Contact Us
        </div>
        <div style={style2} className="pt-2">
          <h6>
          <strong>Dr. Pradeep Kumar Roy</strong>
          </h6>
          <p>
            Assistant Professor Computer Science and Engineering Dept. Indian
            Institute of Information Technology Surat
          </p>
        </div>
      </div>
      <div className="row visitors text-white">
      </div>
      <div className="meta row">
        <div
          style={style1}
        >
          Meta
        </div>
        <div style={style2} className="">
          <div>
            <div> <Link to={"https://scholar.google.com/citations?user=sx_ZEBcAAAAJ&hl=enhttps://scholar.google.com/citations?user=sx_ZEBcAAAAJ&hl=en"}>Google Scholar</Link></div>
            <div> <Link to={"https://www.scopus.com/authid/detail.uri?authorId=56900440500"}>Scopus</Link></div>
            <div> <Link to={"https://orcid.org/0000-0001-5513-2834"}>ORCID</Link></div>
            <div> <Link to={"https://www.researchgate.net/profile/Pradeep-Roy"}>ResearchGate</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
