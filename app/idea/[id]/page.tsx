"use client";
import { db, getUser } from "@/app/utils/firebase";
import { ResponsiveLine } from "@nivo/line";
import { User } from "firebase/auth";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClassAttributes, HTMLAttributes, useEffect, useState } from "react";

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
            id: "Desktop",
            data: [
              { x: "Jan", y: 0 },
              { x: "Feb", y: 10 },
              { x: "Mar", y: 20 },
              { x: "Apr", y: 80 },
              { x: "May", y: 90 },
              { x: "Jun", y: 114 },
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

export default function Component({params} : {params: {id: string}}) {
  const [progress, setprogress] = useState(50);
  const [curuser, setCuruser] = useState<User | null>()
  const [ideaDetails, setIdeaDetails] = useState<DocumentData>()
  const [userDetails, setUserDetails] = useState<DocumentData>()
  const router = useRouter()

  useEffect(() => {
    return getUser( async (user) => {
      if(!user) {
        router.push('/login');
      }
      else{
        setCuruser(user);
        const docs = await getDoc(doc(db, 'user', user.uid))
        console.log(docs.data())
        setUserDetails(docs.data())
        const d = await getDoc(doc(db, 'innovations', params.id))
        console.log(d.data());
        setIdeaDetails(d.data());
      }
    })
  }, [curuser])

  return (
    <div className="w-full">
      <div className="bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-4 mx-auto items-center space-y-4  lg:grid-cols-2  md:py-10 ">
            <div className="space-y-2">
              <h1 className="text-[7rem] poppins-medium">
                {ideaDetails?.Name}
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-7">
                {ideaDetails?.Description}
              </p>
              <button className="p-5 w-[200px] bg-green-400 text-white rounded-2xl" style={{display: userDetails?.role=='innovators'? 'none': 'block'}}>Invest</button>
            </div>
            <div className="mx-auto">
              <Image
                alt="Hero image"
                className="rounded-xl aspect-video overflow-hidden object-cover"
                height="200"
                src="/placeholder.svg"
                width="600"
              />
            </div>
          </div>
        </div>
      </div>
      <section id="milestone" className="my-10 border-t  border-gray-700 p-10">
        <h1 className="text-[4rem] poppins-regular"> Milestones</h1>
        <div className="relative flex w-[90vw] bg-[#2e2f33]  rounded-full mx-auto h-[30px]   items-center">
          <div
            className={` h-[30px] bg-green-300 rounded-full`}
            style={{ width: `${progress}vw` }}
          ></div>

          <div
            className={`absolute  flex flex-col top-[-1.7vw]  h-[30px]`}
            style={{ left: `${progress}vw` }}
          >
            <div> Progress : {progress}%</div>
            <div className="w-[10px] h-[15px] bg-[#2e2f33] rounded-full"></div>
          </div>

          <div className="absolute left-[30vw]  text-center w-[40px] h-[40px] bg-green-700 rounded-full flex justify-center items-center z-[10]">
            1
          </div>
          <div className="absolute left-[60vw] text-center w-[40px] h-[40px] bg-yellow-300 rounded-full flex justify-center items-center">
            2
          </div>
          <div className="absolute left-[88vw] text-center w-[40px] h-[40px] bg-red-700 rounded-full flex justify-center items-center">
            3
          </div>
        </div>
      </section>
      <div className="border-t border-b border-gray-100 dark:border-gray-800">
        <div className="container grid gap-8 px-4 py-12 mx-auto md:grid-cols-2 md:px-6 md:py-16">
          <div className="space-y-4 md:pr-12">
            <h2 className="text-2xl font-bold tracking-tight">Key Points</h2>
            <ul className="grid gap-2 list-disc list-inside text-sm text-gray-500 md:text-base lg:text-sm/relaxed dark:text-gray-400">
              <li>Minimum initial investment of $100</li>
              <li>Valid government-issued ID</li>
              <li>Proof of address (utility bill or bank statement)</li>
              <li>Completed investor profile questionnaire</li>
            </ul>
          </div>
          <CurvedlineChart className="w-full h-[200px] " />
        </div>
      </div>
    </div>
  );
}
