import React from "react";
import Countdown from "react-countdown";

function CountDown({ setResend,timeInterval }) {
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {`${Math.floor(minutes)}`.padStart(2, 0)}:
        {`${seconds % 60}`.padStart(2, 0)}
      </span>
    );
  };
  return (
    <div>
      <Countdown
        date={Date.now() + timeInterval}
        renderer={renderer}
        onComplete={() => setResend(true)}
      />
    </div>
  );
}

export default CountDown;
