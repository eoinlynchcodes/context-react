import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FutureMeetings() {
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DATABASE_URL}/api/meetings/`)
      .then(response => {
        setMeetingData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteHandler = (id) => {
    axios.delete(`${process.env.REACT_APP_DATABASE_URL}/api/meetings/${id}`);
    window.location.reload();
  }

  return (
    <div>
      <div className="">
      <h2>Future Meetings:</h2>
        {meetingData.map(( item, key ) => {
          return (
            <div className="linebreaks individual-meeting">
              <h2>{item.meetingtitle}</h2>
              <button onClick={ () =>  deleteHandler(item.id)}>Delete</button>
              <p><u><b>When?</b></u><br/>{item.startTime}-{item.endTime}, {item.date}</p>
              <p><u><b>Context:</b></u><br/> {item.context}</p>
              <p><u><b>Inputs:</b></u><br/> {item.inputs} </p>
              <p><u><b>Who is needed:</b></u><br/> {item.whoIsneeded} </p>
              <p><u><b>Date:</b></u><br/> {item.date} </p>
              <p><u><b>Inputs:</b></u><br/>{item.inputs}
              </p>
              <Link className="goToMeetingText"
                to={{
                  pathname: "/ongoingmeeting",
                  state: {
                    item: item
                  }
                }}>
                <h5 className="goToMeetingText" >Go To Meeting</h5>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FutureMeetings;
