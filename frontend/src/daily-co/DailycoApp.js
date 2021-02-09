import React from 'react';
import VideoCallFrame from './VideoCallFrame';

function DailycoApp() {
  return (
    <div className="video-box">
        <VideoCallFrame className="iframe"
          url={ process.env.REACT_APP_DAILY_ROOM_URL }
        ></VideoCallFrame>
    </div>
  );
}

export default DailycoApp;
