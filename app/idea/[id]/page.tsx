"use client";
import { db, getUser } from "@/app/utils/firebase";
import { ResponsiveLine } from "@nivo/line";
import { User } from "firebase/auth";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClassAttributes, HTMLAttributes, useEffect, useState } from "react";



export default function Component({ params }: { params: { id: string } }) {
  const [progress, setprogress] = useState(0);
  const [curuser, setCuruser] = useState<User | null>();
  const [ideaDetails, setIdeaDetails] = useState<DocumentData>();
  const [userDetails, setUserDetails] = useState<DocumentData>();
  const router = useRouter();

  function CurvedlineChart(
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
  ) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "MileStone",
              data: [
                { x: "Milestone 1", y: ideaDetails?.Milestones[0].cost },
                { x: "Milestone 2", y: ideaDetails?.Milestones[1].cost },
                { x: "Milestone 3", y: ideaDetails?.Milestones[2].cost },
               
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
        />
      </div>
    );
  }

  useEffect(() => {
    return getUser(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCuruser(user);
        const docs = await getDoc(doc(db, "user", user.uid));
        console.log(docs.data());
        setUserDetails(docs.data());
        const d = await getDoc(doc(db, "innovations", params.id));
      
        setIdeaDetails(d.data());
        setprogress(d.data()?.totalInvested)
       
      }
    });
  }, [params.id, router]);

  return (
    <div className="w-full">
      <div className="flex p-[5vw] justify-between ">
        <div>
          <h1 className="text-[4rem] poppins-medium px-10 ">{ideaDetails?.Name}</h1>
          <p className="text-black text-xl poppins-light  mb-7 p-10">
            {ideaDetails?.Description}
          </p>
        </div>
        <section id="milestone" className="my-10 border  border-gray-700 p-10">
          <h1 className="text-[4rem] poppins-regular p-5"> Progress</h1>
          <div className="relative flex w-[30vw] bg-[#2e2f33]  rounded-full mx-auto h-[30px]   items-center">
            <div
              className={` h-[30px] bg-green-300 rounded-full`}
              style={{ width: `${(progress/100)*30}vw` }}
            ></div>
            <div
              className={`absolute  flex flex-col top-[-1.7vw]  h-[30px]`}
              style={{ left: `${(progress/100)*30}vw` }}
            >
              <div> Progress : {progress}%</div>
              <div className="w-[10px] h-[15px] bg-[#2e2f33] rounded-full"></div>
            </div>
            <div className="absolute left-[9vw]  text-center w-[40px] h-[40px] bg-green-700 rounded-full flex justify-center items-center z-[10]">
              1
            </div>
            <div className="absolute left-[19vw] text-center w-[40px] h-[40px] bg-yellow-300 rounded-full flex justify-center items-center">
              2
            </div>
            <div className="absolute left-[29vw] text-center w-[40px] h-[40px] bg-red-700 rounded-full flex justify-center items-center">
              3
            </div>
          </div>

         <div className="w-full flex justify-center items-center">
         <button
          className="p-5 w-[200px] bg-green-400 text-white rounded-2xl my-10 "
          style={{
            display: userDetails?.role == "innovators" ? "none" : "block",
          }}
        >
          Invest
        </button>
         </div>
        </section>
      
      </div>

      <div className="border-t border-b border-gray-100 dark:border-gray-800">
        <div className="container grid gap-8 px-4 py-12 mx-auto md:grid-cols-2 md:px-6 md:py-16">
          <div className="space-y-4 md:pr-12">
            <h2 className="text-4xl font-bold tracking-tight">Milestones</h2>
            <ul className=" list-disc list-inside text-xl text-black ">
              <li>{ideaDetails?.Milestones[0].description}</li>
              <li>{ideaDetails?.Milestones[1].description}</li>
              <li>{ideaDetails?.Milestones[2].description}</li>
            </ul>
          </div>
          <CurvedlineChart className="w-full h-[200px] " />
        </div>
      </div>
      <div></div>
    </div>
  );
}
