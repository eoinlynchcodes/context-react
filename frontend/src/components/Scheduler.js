import React, { useState } from "react";
import axios from "axios";

function Scheduler() {
  const [meeting, setMeeting] = useState({
    date: "",
    agenda: "",
    context: "",
    whoisneeded: "",
    meetingtitle: "",
    starttime: "",
    endtime: "",
    meetingtype: "",
    inputs: "",
  });

  const changeHandler = (event) => {
    setMeeting({ ...meeting, [event.target.name]: event.target.value });
  };


  // :id needs to be added to endpoint with the userid of the logged in user returned
  const sendMeetingData = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_DATABASE_URL}/api/meetings/`, meeting)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form  onSubmit={sendMeetingData} className="schedule-form">
        <h2>Next meeting:</h2>        
        <label>Date:</label>
          <input 
          name="date"
          placeholder="Date:"
          onChange={(event) => changeHandler(event)}
          />
        <br />

        <label>Start Time:</label>
          <input
            name="starttime"
            placeholder="Start Time:"
            onChange={(event) => changeHandler(event)}
          />
        <br />

        <label>End Time:</label>
          <input
            name="endtime"
            placeholder="End Time:"
            onChange={(event) => changeHandler(event)}
          />
        <br />

        <label>Meeting Title:</label>
          <input
            name="meetingtitle"
            placeholder="Meeting title"
            onChange={(event) => changeHandler(event)}
          />
          <br />

        <label>Who is Needed?</label>
          <input
            name="whoisneeded"
            placeholder="Who is needed?"
            onChange={(event) => changeHandler(event)}
          />
        <br />

        <label>Meeting Type:</label>
          <select name="meetingtype" onChange={(event) => changeHandler(event)}>
            <option value="decisionmaker">Decision Maker</option>
            <option value="relayinformation">Relay Information</option>
            <option value="worktogether">Work Together</option>
            <option value="brainstorm">Brainstorm</option>
            <option value="feedback">Feedback</option>
            <option value="social">Social</option>
            <option value="recurring">Recurring</option>
          </select>
        <br />
        
        <label>Context:</label>
          <textarea 
          name="context"
          placeholder="Context:"
          rows="6"
          onChange={(event) => changeHandler(event)}
          />
        <br />

        <label>Inputs:</label>
          <textarea
            rows="6"
            name="inputs"
            placeholder="Eg.Decisions / Questions / Points of discussion:"
            onChange={(event) => changeHandler(event)}
          />
        <br />
        <input type="submit" value="Schedule" />
      </form>
    </div>
  );
}

export default Scheduler;
