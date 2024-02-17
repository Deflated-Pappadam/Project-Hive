"use client";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import {
  JSX,
  ClassAttributes,
  HTMLAttributes,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Navbar from "@/app/components/Navbar";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/utils/firebase";
import { useRouter } from "next/navigation";

export default function Component() {
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [investments, setInvestments] = useState<DocumentData[]>([]);
  const router = useRouter()
  useEffect(() => {
    setIsConnected(Boolean(accounts[0]));
  }, [isConnected, accounts]);

  useEffect(() => {
    if (!accounts[0]) return;
    const investorRef = collection(db, "investors", accounts[0], "investments");
    getDocs(investorRef).then((docs) => {
      const ideaData: DocumentData[] = [];
      const ideaDataPromises: Promise<any>[] = [];
      docs.forEach((document) => {
        const ideaRef = doc(db, "innovations", document.id);
        const promise = getDoc(ideaRef).then((d) => {
          if (d.exists()) {
            ideaData.push({id: document.id, data: d.data()!});
          }
        });
        ideaDataPromises.push(promise);
      });
      Promise.all(ideaDataPromises).then(() => {
        setInvestments(ideaData);
        console.log(ideaData);
      });
    });
  }, [accounts]);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };
  return (
    <div className="bg-[#fcf9f5] min-h-screen relative">
      <Navbar />
      {!isConnected ? (
        <div className="absolute w-full h-full flex items-center justify-center">
          <button
            onClick={connectAccount}
            className="p-2 bg-[#4b5443] rounded-md text-white font-semibold"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className=" mx-auto bg-[#f9f7f6] rounded-3xl shadow-2xl p-[5vw]  gap-6">
          <main className="col-span-9">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>
            <div className="grid grid-cols-2 gap-6">
              <Card className="col-span-1 bg-[#635FC7] text-white rounded-xl p-4">
                <CardHeader>
                  <CardTitle>Total Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">${investments.reduce((acc, curr) => acc + curr.data.totalInvested, 0)}</p>
                  <p className="pt-5">Wallet Number</p>
                  <p className="text-lg ">{accounts[0]}</p>
                  <p className="text-sm"></p>
                </CardContent>
              </Card>
              <div className="col-span-1">
                <CurvedlineChart className="w-full h-[200px]" />
                <div className="flex justify-between text-sm mt-2">
                  <span>USD</span>
                  <span>IDR</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a href="/innovations" className="bg-[#2e2f33] px-4 py-2 w-fit text-white poppins-regular text-3xl justify-end flex hover:rounded-[1.5rem] hover:cursor-pointer transition-all duration-300">Explore </a>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Innovation</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Total Invested</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((d, i) => (
                    <TableRow onClick={()=> router.push(`/idea/${d.id}`)} key={i}>
                      <TableCell className="font-medium">{d.data.Name}</TableCell>
                      <TableCell className="text-left">{d.data.Description}</TableCell>
                      <TableCell className="text-right">
                        {d.data.totalInvested}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

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
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
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
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
