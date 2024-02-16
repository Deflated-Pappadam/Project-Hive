import LineGraph from "@/app/components/LineGraph";
import Navbar from "@/app/components/Navbar";
import React from "react";



function dashboard() {
  return (
    <main className="min-h-screen w-full h-full flex flex-col bg-[#2e2f33] ">
      <Navbar />
      <div className="flex bg-[#2e2f33] h-[40vh] justify-between items-center">
        <div className=" py-[8vw] px-[10vw]">
          <h2 className="text-[#fcf9f5] text-2xl poppins-regular uppercase">
            Total Investment
          </h2>
          <h1 className="text-green-400 text-4xl poppins-regular uppercase">
            $ 5000
          </h1>
          <h3 className="text-blue-400 text-xl py-5" >Invested Communities : 5</h3>
        </div>
        <div className="text-6xl text-white">Img Placeholder</div>
      </div>
      <div className="bg-[#fcf9f5] h-[60vh] p-10">
        <h1 className="text-4xl poppins-regular">+ Innovators</h1>
      </div>
    </main>
  );
}

export default dashboard;
