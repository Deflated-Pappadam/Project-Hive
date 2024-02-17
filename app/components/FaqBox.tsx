"use client";
import { ArrowBigDown, ArrowDown, BellRingIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
 question:string;
 answer:string;
};

function FaqBox(props:Props) {
  const [height, setHeight] = useState(100);
  
  return (
    <div
      className="flex w-full  bg-[#2e2f33] rounded-[1rem] justify-between items-center px-10 transition-all overflow-hidden duration-300"
      style={{ height: height }}
      onClick={() => setHeight(height === 100 ? 280 : 100)}
    >
      <div>
        
        <h1 className="text-white md:text-3xl text-sm  md:px-5 py-5 poppins-medium text-start">{props.question}</h1>
        <h2 className={`text-white ${height == 100 ? "hidden" : "flex"} md:px-5 md:text-2xl text-sm poppins-light`}>
          {props.answer}
        </h2>
      </div>
      <button
        className={`text-white ${height == 100 ? "rotate-0" : "rotate-180"} transition-all duration-200 md:p-5`}
        
      >
        <ArrowDown />{" "}
      </button>
    </div>
  );
}

export default FaqBox;
