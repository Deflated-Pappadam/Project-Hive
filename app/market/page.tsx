import React from "react";
import MarketItem from "../components/MarketItem";
import Marquee from "react-fast-marquee";

function page() {
  return (
    <div className="flex flex-col items-center bg-slate-50">
      <h1 className="font-bold text-5xl my-6">Credit Store</h1>
      <div className="absolute top-[40%] rotate-[-25deg]">
        <Marquee direction="right">
          <h1 className="font-medium text-5xl my-6">
            Currently under Maintanance
          </h1>
          <h1 className="font-medium text-5xl my-6">...</h1>
          <h1 className="font-medium text-orange-500 text-5xl my-6">
            Currently under Maintanance
          </h1>
          <h1 className="font-medium text-5xl my-6">...</h1>
          <h1 className="font-medium text-5xl  my-6">
            Currently under Maintanance
          </h1>
          <h1 className="font-medium text-5xl my-6">...</h1>
          <h1 className="font-medium text-5xl text-orange-500  my-6">
            Currently under Maintanance
          </h1>
          <h1 className="font-medium text-5xl my-6">...</h1>
          <h1 className="font-medium text-5xl my-6">
            Currently under Maintanance
          </h1>
          <h1 className="font-medium text-5xl my-6">...</h1>
          <h1 className="font-medium text-5xl text-orange-500 my-6">
            Currently under Maintanance
          </h1>
          <h1 className="font-medium text-5xl my-6">...</h1>
        </Marquee>
        <div className="w-full h-11 bg-orange-500"></div>
        </div>
      <div className="flex">
        <div className="w-[25%] p-5 m-5 h bg-white rounded-2xl shadow-black shadow-md flex flex-col">
          <h1 className="my-3 font-medium text-lg">Credit Balance: 200</h1>
          <input
            type="text"
            placeholder="search"
            className="border-2 border-black h-[60px] px-6 rounded-xl text-lg"
          />
        </div>
        <div className="flex flex-wrap gap-9 justify-center w-full h-full bg-white shadow-black shadow-md rounded-2xl p-10 m-5">
          <MarketItem
            name={"Cake"}
            Tokencost={"100"}
            imageUrl={"/carrot.png"}
          />
          <MarketItem
            name={"Feed Bag"}
            Tokencost={"75"}
            imageUrl={"/feedbag.png"}
          />
          <MarketItem
            name={"Leather"}
            Tokencost={"10"}
            imageUrl={"/leather.png"}
          />
          <MarketItem
            name={"Sapling"}
            Tokencost={"30"}
            imageUrl={"/sapling.png"}
          />
          <MarketItem
            name={"Saddle"}
            Tokencost={"60"}
            imageUrl={"/saddle.png"}
          />
          <MarketItem
            name={"Fabric"}
            Tokencost={"5"}
            imageUrl={"/fabric.png"}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
