import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <nav className="md:w-[80%] mx-auto flex justify-between items-center text-[#2e2f33] bg-[#fcf9f5] p-5 rounded-xl ">
      <a href="/" className="md:min-w-[300px] ">
        <img alt="" src="logo.png " className="w-[50px]" />
      </a>
      <h1 className="protest-strike-regular text-4xl">Project Hive</h1>
      <div className="flex justify-center md:min-w-[300px]">
        <a href="/abstract.pdf" download className="md:flex hidden w-fit border-[2px] border-black md:px-4 py-2 rounded-lg poppins-semibold md:text-xl text-sm ">
          Download Abstract
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
