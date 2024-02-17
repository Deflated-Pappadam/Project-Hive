"use client";
import { db, getUser } from "@/app/utils/firebase";
import { ResponsiveLine } from "@nivo/line";
import { BigNumberish, ethers } from "ethers";
import { User } from "firebase/auth";
import {
  DocumentData,
  FieldValue,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import FishTank from "@/abi/FishTank.json";
import Pappadam from "@/abi/Pappadam.json";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ClassAttributes,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

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

export default function Component({ params }: { params: { id: string } }) {
  const [progress, setprogress] = useState(50);
  const [curuser, setCuruser] = useState<User | null>();
  const [ideaDetails, setIdeaDetails] = useState<DocumentData>();
  const [userDetails, setUserDetails] = useState<DocumentData>();
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);
  const [amount, setAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankyouMsg, setshowThankyouMsg] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setAmount(value);
  };

  const investIdea = async () => {
    if (window.ethereum) {
      const pdmcontractAddr = "0x16b71a661E19a1D769Ea5D221BE44fb165180A4D";
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider?.getSigner();
      const pdmcontract = new ethers.Contract(
        pdmcontractAddr,
        Pappadam.abi,
        signer
      );
      try {
        let amt = 0;
        if (amount) amt = amount;
        let len = amt.toString().length;
        let cost = "0." + "0".repeat(18 - len!) + amt.toString();
        console.log(cost);
        setIsProcessing(true);
        const response = await pdmcontract.buy({
          value: ethers.parseEther(cost),
        });
        await response.wait();

        const innovationsRef = doc(db, "innovations", params.id);
        updateDoc(innovationsRef, {
          totalInvested: increment(amt),
        });

        const investorsRef = doc(db, 'investors', accounts[0], 'investments', params.id);
        const investdoc = await getDoc(investorsRef)
        if(!investdoc.exists()){
          setDoc(investorsRef, {
            totalInvested: amt
          })
        }
        else {
        updateDoc(investorsRef, { 
            totalInvested: increment(amt),
        });
      }

        setIsProcessing(false);
        setshowThankyouMsg(true);
      } catch (err) {
        setIsProcessing(false);
        console.log("error:", err);
      }
    }
  };
  useEffect(() => {
    console.log(accounts);
    setIsConnected(Boolean(accounts[0]));
  }, [isConnected, accounts]);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  const router = useRouter();

  useEffect(() => {
    return getUser(async (user) => {
      const d = await getDoc(doc(db, "innovations", params.id));
      console.log(d.data());
      setIdeaDetails(d.data());
    });
  }, [params.id, router]);

  return (
    <div className={`w-full relative ${showThankyouMsg && `h-screen overflow-hidden`}`}>
      {showThankyouMsg && (
        <div className="absolute w-full h-screen backdrop-blur-xl z-50 flex justify-center items-center">
          <div className="bg-white absolute z-40 w-4/12 shadow-xl text-black rounded-lg p-5">
            <h2 className="font-bold text-5xl mb-4 text-[#57a00d]">
              Thank You! 🎉
            </h2>
            <p>
              A huge thank you for supporting this initiative.
            </p>
            <p>
              We would like to extend our token of appreciation for such a
              generous contribution. To reciprocate your kindness, you have been
              rewarded {Math.floor(amount! / 100)} PDM credits which can be traded in our <a>marketplace</a>.
            </p>
            <button
              onClick={() => setshowThankyouMsg(false)}
              className="p-1 px-4 mt-5 border-4 rounded-lg font-semibold text-[#57a00d] border-[#57a00d] hover:bg-[#57a00d] hover:text-white"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {isProcessing && (
        <div className="w-full h-full absolute z-50 bg-white flex justify-center items-center">
          <h1 className="text-4xl font-bold text-[#57a00d] ">
            Your transaction is being processed
          </h1>
        </div>
      )}
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
              <button className="p-5 w-[200px] bg-green-400 text-white rounded-2xl">
                Invest
              </button>
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
            className={`absolute flex flex-col top-[-1.7vw]  h-[30px]`}
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
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className=" w-[300px text-black rounded-lg p-5">
            <h2 className="font-semibold">Currency</h2>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-md">
              <Image
                alt="matic"
                src={"/polygon-matic-logo.svg"}
                height={15}
                width={15}
              />

              <p>Matic &#40;MATIC&#41;</p>
            </div>
            <h2 className="font-semibold">Amount</h2>
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex text-md flex-col bg-slate-100 p-1 rounded-md"
            >
              <div className="flex justify-end bg-slate-100 p-1 rounded-md">
                <input
                  ref={inputRef}
                  className="appearance-none w-full px-2 start-0 text-right text-sm font-semibold border-0 bg-transparent focus:outline-none"
                  type="number"
                  onChange={onAmountChange}
                  min={100}
                  value={amount ?? ""}
                  name=""
                  id=""
                />
                <p className="w-[50px] text-md font-semibold">INR</p>
              </div>
              <div className="flex text-right text-sm font-medium justify-end w-full bg-slate-100 p-1 rounded-md">
                <p dir="rtl" className="w-full px-2 start-0">
                  {typeof amount == "number" ? amount * 0.012 : "0"}
                </p>
                <p className="w-[50px]">MATIC*</p>
              </div>
            </div>
            {!isConnected ? (
              <div className="w-full mt-5 flex items-center justify-center">
                <button
                  onClick={connectAccount}
                  className="p-2 bg-[#57a00d] rounded-md text-white font-semibold"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="w-full mt-5 flex items-center justify-center">
                <button
                  onClick={investIdea}
                  className="p-2 bg-[#57a00d] text-white font-semibold rounded-lg mt-4"
                >
                  Invest
                </button>
              </div>
            )}
          </div>
          {/* <div className="border-gray-100 text-black shadow-lg border-2 rounded-md mt-10 p-5">
              <h1 className="font-bold">Some Heading</h1>
              <p>Dolor dolores repudiandae doloribus. Rerum sunt aut eum. Odit omnis non voluptatem sunt eos nostrum.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
