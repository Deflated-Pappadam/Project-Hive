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
import Navbar from "@/app/components/Navbar";

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

        const investorsRef = doc(
          db,
          "investors",
          accounts[0],
          "investments",
          params.id
        );
        const investdoc = await getDoc(investorsRef);
        if (!investdoc.exists()) {
          setDoc(investorsRef, {
            invInvested: amt,
          });
        } else {
          updateDoc(investorsRef, {
            invInvested: increment(amt),
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
      setUserDetails(d.data());
      setIdeaDetails(d.data());
      setprogress(
        Number.parseFloat(
          (
            (d.data()?.totalInvested / d.data()?.Milestones[2].cost) *
            100
          ).toFixed(2)
        )
      );
    });
  }, [params.id, router]);

  return (
    <div
      className={`w-full relative ${
        showThankyouMsg && `h-screen overflow-hidden`
      }`}
    >
      {showThankyouMsg && (
        <div className="absolute w-full h-screen backdrop-blur-xl z-50 flex justify-center items-center">
          <div className="bg-white absolute z-40 w-4/12 shadow-xl text-black rounded-lg p-5">
            <h2 className="font-bold text-5xl mb-4 text-[#57a00d]">
              Thank You! 🎉
            </h2>
            <p>A huge thank you for supporting this initiative.</p>
            <p>
              We would like to extend our token of appreciation for such a
              generous contribution. To reciprocate your kindness, you have been
              rewarded {Math.floor(amount! / 100)} PDM credits which can be
              traded in our <a>marketplace</a>.
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

      <div className="w-full">
      <Navbar />
        <div className="flex p-[5vw] justify-between ">
          <div>
            <h1 className="text-[4rem] poppins-medium px-10 ">
              {ideaDetails?.Name}
            </h1>
            <p className="text-black text-xl poppins-light  mb-7 p-10">
              {ideaDetails?.Description}
            </p>

            <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col container gap-8 px-4 py-8 mx-auto md:px-6 ">
                <div className="space-y-4 md:px-12">
                  <h2 className="text-[3rem] poppins-regular tracking-tight">
                    Milestones
                  </h2>
                  <ul className=" list-disc list-inside text-2xl text-black ">
                    <li>{ideaDetails?.Milestones[0].description}</li>
                    <li>{ideaDetails?.Milestones[1].description}</li>
                    <li>{ideaDetails?.Milestones[2].description}</li>
                  </ul>
                </div>
                <CurvedlineChart className="w-full h-[200px] " />
              </div>
            </div>
          </div>
          <section
            id="milestone"
            className="my-10 border  border-gray-700  flex flex-col justify-between "
          >
            <div className="space-y-5  border-gray-700 border-b bg-blue-100 py-[6vw] px-10">
            <h1 className="text-[2.5rem] poppins-regular py-5"> Progress</h1>
            <div className="relative flex w-[30vw] bg-[#2e2f33]  rounded-full mx-auto h-[30px]   items-center ">
              <div
                className={` h-[30px] bg-green-300 rounded-full`}
                style={{ width: `${(progress / 100) * 30}vw` }}
              ></div>
              <div
                className={`absolute  flex flex-col top-[-1.7vw]  h-[30px]`}
                style={{ left: `${(progress / 100) * 30}vw` }}
              >
                <div>{ideaDetails?.totalInvested} $</div>
                <div className="w-[10px] h-[15px] bg-[#2e2f33] rounded-full"></div>
                {progress >= 33.33 && (
                  <span className="text-red-700 mt-[40px]">
                    * awaiting confirmation
                  </span>
                )}
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
            </div>

            
              <div
                className="flex flex-col justify-center items-center w-full bg-green-300 text-white h-full  "
                style={{
                  display: userDetails?.role == "innovators" ? "none" : "block",
                }}
              >
                <div className=" w-[80%] flex flex-col items-center h-full justify-center mx-auto">
                  <div className=" w-full flex flex-col justify-center items-center">
                    <div className=" w-full text-black rounded-lg p-5">
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
                  </div>
                </div>
           
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
