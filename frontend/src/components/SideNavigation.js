import React from "react";
import { Link } from "react-router-dom";

function SideNavigation() {
  return (
    <div className="side-nav">
      <Link className="Link" to="/profile">
          <h4 className="no-decoration">Profile</h4>
      </Link>
      <hr/>

      <Link className="Link" to="/schedulemeeting">
          <h4 className="no-decoration">Schedule</h4>
      </Link>
      <hr/>

      <Link className="Link" to="/futuremeetings">
          <h4 className="no-decoration">Future</h4>
      </Link>
      <hr/>

    </div>
  );
}

export default SideNavigation;
