import React, { useState, useEffect } from "react";

export default function Progressbar({ percent }) {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setInterval(() => {
        setIsRunning(true);
    
        const target = parseFloat(percent);
        const step = 2; // Điều chỉnh bước tăng giảm theo mong muốn
    
        if (filled < target && isRunning) {
          const timerId = setInterval(() => {
            setFilled((prev) => {
              const next = Math.min(prev + step, target);
              if (next === target) {
                setIsRunning(false);
                clearInterval(timerId);
              }
              return next;
            });
          }, 50);
        }
    },500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filled, isRunning, percent]);

  return (
    <div>
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="progressPercent">{filled.toFixed(2)}%</span>
      </div>
    </div>
  );
}
