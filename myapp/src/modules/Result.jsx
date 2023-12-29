import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Result = () => {
    const state = useLocation();
    console.log(state);
    const { result , resultImg } = state.state;
    console.log(result)
  return (
    <div className="flex flex-col gap-5 py-14 px-6">
      <div className="flex items-end justify-center">
        <Link to={"/"}>
          <button className="btnback">Back</button>
        </Link>
      </div>
      <div className="w-full h-[500px] flex items-center justify-center border border-white rounded-xl ">
        <div className="flex items-center justify-center gap-3 w-1/2 h-full ">
          <div className="flex flex-col items-end justify-center h-full w-1/2 p-3 gap-3">
            {Array(3)
              .fill(0)
              .map((item, index) => (
                <img
                  src={resultImg}
                  alt="img"
                  className="h-1/4 w-3/5 rounded-lg"
                  key={index}
                />
              ))}
          </div>
          <div className="h-full w-1/2 p-3">
            <img
              src={resultImg}
              alt="img"
              className="h-full w-full rounded-lg"
            />
          </div>
        </div>
        <div className="w-1/2 p-5 text-white">
           <h1 className="flex items-center justify-center">
            {result}
           </h1>
        </div>
      </div>
    </div>
  );
};

export default Result;
