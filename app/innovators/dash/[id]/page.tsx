import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex">
      <main className="flex-grow p-6 bg-[#fcf9f5]">
        <section id='profile' className="flex p-10 px-[6vw]">
          <div >
            <Image src="/profile.jpg" className="w-[200px] rounded-full overflow-hidden m-5" alt={""} width={1080} height={1080}/>
          </div>
          <div className="p-10">
            <h1 className="text-[4rem] poppins-semibold"> Rhon S George</h1>
            <h2 className="text-[2.5rem] poppins-regular"> sub heading</h2>
          </div>
        </section>
        <section className="w-[80vw] mx-auto bg-[#ededed] p-10 rounded-2xl min-h-[400px] flex flex-col ">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-medium">My Innovations</h1>
            <Button
              className="px-2 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm"
              type="button"
            >
              <span>Create New</span>
            </Button>
          </div>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Innovation</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="w-full">
                <TableCell className="font-medium">Kozhi Koodu</TableCell>
                <TableCell className="text-left">Rhon needs a home.</TableCell>
                <TableCell>home</TableCell>
                <TableCell className="text-right">$ 200 | 500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
