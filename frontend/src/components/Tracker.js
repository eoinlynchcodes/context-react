import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Tracker(props) {
  const currentMeetingData = props.currentMeetingData;

  const history = useHistory();

  const [fromMeeting, setFromMeeting] = useState({
    agenda: currentMeetingData.agenda,
    context: currentMeetingData.context,
    date: Date.now(),
    inputs: currentMeetingData.inputs,
    whoIsneeded: currentMeetingData.whoisneeded,
    meetingtitle: currentMeetingData.meetingtitle,
    originalmeetingid: currentMeetingData.id,
    notes: "",
  });

  const changeHandler = (event) => {
    setFromMeeting({
      ...fromMeeting,
      [event.target.name]: event.target.value,
    });
  };

  const endMeeting = (event) => {
    event.preventDefault();
    console.log(`${process.env.REACT_APP_DATABASE_URL}`);
    axios.post(`${process.env.REACT_APP_DATABASE_URL}/api/meetings/meetingreport`, fromMeeting)
      .then(response => {
        console.log(response);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="meeting-tracker-component linebreaks">
      <h3 className="whiteText">{currentMeetingData.meetingtitle}</h3>
      <p className="whiteText">
        {currentMeetingData.whoisneeded ? <u><b>Who is needed:</b></u> : null }
      </p>
      {/* <p className="whiteText">
        {currentMeetingData.context ? (<u><b>Context:</b></u> {currentMeetingData.context} ) : null}
      </p> */}
      {console.log(currentMeetingData)}
      <p className="whiteText">
        {currentMeetingData.agenda ? <u><b>Agenda:</b></u> : null}
      </p>
      <p className="whiteText">
        {currentMeetingData.context ?  <p className="whiteText"><u><b>Context:</b></u><br/> {currentMeetingData.context}</p> : null}
      </p>
      <p className="whiteText">
        {currentMeetingData.inputs ?  <p className="whiteText"><u><b>Inputs:</b></u><br/> {currentMeetingData.inputs}</p> : null}
      </p>
      <br />

      <form className="ongoingmeetingform" onSubmit={endMeeting}>
      <label className="whiteText">Outputs:</label>
        <br />
        <textarea
          name="notes"
          rows="20"
          placeholder="Eg. Decisions made, actions to take, next steps, etc.:"
          onChange={(event) => changeHandler(event)}
        />
        <br />
        <br />      
          <h5 onClick={endMeeting} type="submit" className="save-meeting-button">Save Meeting</h5>
      </form>
    </div>
  );
}

export default Tracker;
