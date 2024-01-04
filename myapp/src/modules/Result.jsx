import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Progressbar from "../components/Progressbar/Progressbar";

const Result = () => {
  const state = useLocation();
  const { result } = state.state;

  useEffect(() => {
    result.forEach((item, index) => {
      console.log(`Result at index ${index}:`, item);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 py-14 px-6">
      <div className="flex items-end justify-center">
        <Link to={"/"}>
          <button className="btnback">Back</button>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-y-[30px] items-center justify-center border border-white rounded-xl p-[30px]">
        {result.map((res, index) => (
          <>
            <div key={index} className="grid min-h-[100px] w-[60%] place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <figure className="relative w-[60%] h-96">
                <img className="object-cover object-center w-full h-full rounded-xl brightness-125" src={res[2]} alt={`Result ${index}`} />
                <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                  <div className="flex flex-col gap-[20px] w-[60%]">
                    <span className='inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent'>
                      Product {index + 1}
                    </span>
                    <span className='flex items-center mx-auto text-[25px] animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent'>
                      {res[0]}
                    </span>
                  </div>

                </figcaption>
              </figure>
            </div>
            <div className="flex items-center gap-2">
              <span><strong>{res[0]}:</strong></span>
              <Progressbar percent={res[1]} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Result;
