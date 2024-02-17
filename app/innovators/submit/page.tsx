"use client";

import { ethers } from "ethers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, getUser } from "@/app/utils/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import FishTank from "@/abi/FishTank.json";

export default function Component() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [Equity, setEquity] = useState(false);
  const [curruser, setCurrUser] = useState<User | null>(null);
  const [milestones, setMilestone] = useState<
    { cost: number; description: string }[]
  >([
    { cost: 0, description: "" },
    { cost: 0, description: "" },
    { cost: 0, description: "" },
  ]);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


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
    return getUser((user) => {
      if (!user) {
        router.push("/innovators/login");
      } else {
        console.log(user);
        setCurrUser(user);
      }
    });
  }, [router]);

  const issueIdea = async () => {
    const contractAddress = '0x6BFb29fae7e780e85e462E175190753F03DC9585';
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider?.getSigner();
      const contract = new ethers.Contract(contractAddress, FishTank.abi, signer);
      try {
        setIsProcessing(true);
        const id = await contract.count();
        console.log(id);
        const response = await contract.launch([milestones[0].cost, milestones[1].cost, milestones[2].cost], 1708628388);
        await response.wait();
        console.log(response);
        setIsProcessing(false);
        const NEW_ID = Number(id);
        handleSubmit(NEW_ID.toString());
        console.log("response:", response);
      } catch (err) {
        setIsProcessing(false);
        console.log("error:", err);
      }
    }
  }

  const handleSubmit = async (id: string) => {  

    await setDoc(doc(db, "innovations", id), {
      User: curruser?.uid,
      Name: Name,
      Description: Description,
      Requirements: requirements,
      Equity: Equity,
      Milestones: milestones,
      totalInvested: 0,
    });
    router.push('/innovators/dash')
  };

  return (
    <div className="w-full h-full flex justify-center items-center  mx-auto">
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
        <div className="container px-4 max-w-[50vw]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
              Submit your idea
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Have a great idea? Submit it here and we&apos;ll take a look.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold tracking-wide peer"
                htmlFor="idea-name"
              >
                Idea Name
              </label>
              <Input
                className="peer h-10"
                id="idea-name"
                placeholder="Enter the name of your idea"
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold tracking-wide peer"
                htmlFor="idea-description"
              >
                Description
              </label>
              <Textarea
                className="peer h-[120px]"
                id="idea-description"
                placeholder="Enter the description of your idea"
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold tracking-wide peer"
                htmlFor="idea-requirements"
              >
                Requirements
              </label>
              <Textarea
                className="peer h-[120px]"
                id="idea-requirements"
                placeholder="Enter the requirements of your idea"
                onChange={(e) => setRequirements(e.target.value)}
                value={requirements}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold tracking-wide peer"
                htmlFor="idea-requirements"
              >
                Milestone 1
              </label>
              <input
                className="peer h-10 w-full rounded-md border p-4"
                id="milestone1"
                placeholder="Enter the amount"
                onChange={(e) => {
                  milestones[0].cost = Number(e.target.value);
                  setMilestone([...milestones]);
                }}
                value={milestones[0].cost}
              />
              <textarea
                className="flex min-h-[80px] w-full rounded-md border p-4 "
                placeholder="Milestone description"
                id="milestone1-description"
                onChange={(e) => {
                  milestones[0].description = e.target.value;
                  setMilestone([...milestones]);
                }}
                value={milestones[0].description}
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-semibold tracking-wide peer"
                htmlFor="idea-requirements"
              >
                Milestone 2
              </label>
              <input
                className="peer h-10 w-full rounded-md border p-4"
                id="milestone2"
                placeholder="Enter the amount"
                onChange={(e) => {
                  milestones[1].cost = Number(e.target.value);
                  setMilestone([...milestones]);
                }}
                value={milestones[1].cost}
              />
              <textarea
                className="flex min-h-[80px] w-full rounded-md border p-4 "
                placeholder="Milestone description"
                id="milestone2-description"
                onChange={(e) => {
                  milestones[1].description = e.target.value;
                  setMilestone([...milestones]);
                }}
                value={milestones[1].description}
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-semibold tracking-wide peer"
                htmlFor="idea-requirements"
              >
                Milestone 3
              </label>
              <input
                className="peer h-10 w-full rounded-md border p-4"
                id="milestone3"
                placeholder="Enter the amount"
                onChange={(e) => {
                  milestones[2].cost = Number(e.target.value);
                  setMilestone([...milestones]);
                }}
                value={milestones[2].cost}
              />
              <textarea
                className="flex min-h-[80px] w-full rounded-md border p-4 "
                placeholder="Milestone description"
                id="milestone3-description"
                onChange={(e) => {
                  milestones[2].description = e.target.value;
                  setMilestone([...milestones]);
                }}
                value={milestones[2].description}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="equity" onChange={() => setEquity(!Equity)} />
              <label className="text-sm leading-none" htmlFor="equity">
                Require equity for this idea
              </label>
            </div>
            <Button onClick={issueIdea}>Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
}
