import { useEffect, useRef } from "react";

import "./style.css";

function App() {
  const coursorRef = useRef(null);

  useEffect(() => {
    const eyes = document.querySelectorAll(".eye");

    const handleMouseMove = (event) => {
      // Update eyes movement
      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const x = rect.left + eye.clientWidth / 2;
        const y = rect.top + eye.clientHeight / 2;

        const radian = Math.atan2(event.pageX - x, event.pageY - y);
        const rotation = radian * (180 / Math.PI) * -1 + 270;

        eye.style.transform = `rotate(${rotation}deg)`;
      });

      // Update custom cursor movement
      if (coursorRef.current) {
        coursorRef.current.style.top = `${event.pageY}px`;
        coursorRef.current.style.left = `${event.pageX}px`;
        coursorRef.current.style.display = "block";
      }
    };

    const handleMouseOut = () => {
      if (coursorRef.current) {
        coursorRef.current.style.display = "none";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
    <div className="coursor" ref={coursorRef}></div>
      <div className="face">
        <div className="eyes">
          <div className="eye leftEye"></div>
          <div className="eye rightEye"></div>
        </div>
      </div>
    </>
  )
}

export default App
