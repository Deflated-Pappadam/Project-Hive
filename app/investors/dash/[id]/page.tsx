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
import { JSX, ClassAttributes, HTMLAttributes } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Navbar from "@/app/components/Navbar";
import TagBox from "@/app/components/TagBox";

export default function Component() {
  return (
    <div className="bg-[#fcf9f5] min-h-screen p-8">
      <Navbar />
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
                <p className="text-3xl">$ 53,250</p>
                <p className="pt-5">Wallet Number</p>
                <p className="text-lg "> xxxxxx - xxxxxxx -xxxx002238 </p>
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
            <Table>
              <TableHeader>
                <TableRow>
                <TableHead>Innovation</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Innovator</TableHead>
              <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Kozhi Koodu</TableCell>
                  <TableCell className="text-left">
                    Rhon needs a home.
                  </TableCell>
                  <TableCell>home</TableCell>
                  <TableCell>Rhon S George</TableCell>
                 
                  <TableCell className="text-right">$200/5000+</TableCell>
                </TableRow>
                
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
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
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
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
