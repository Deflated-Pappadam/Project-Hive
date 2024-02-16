import React from "react";

function Navbar() {
  return (
    <nav className="w-[80%] mx-auto flex justify-between items-center text-[#2e2f33] bg-[#fcf9f5] p-5 rounded-xl">
      <div></div>
      <h1 className="protest-strike-regular text-4xl">FishTank</h1>
      <div className="border-[2px] border-black px-4 py-2 rounded-lg poppins-semibold">
        Login
      </div>
    </nav>
  );
}

export default Navbar;
