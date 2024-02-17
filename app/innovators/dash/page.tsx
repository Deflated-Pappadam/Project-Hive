"use client";

import { db, getUser } from "@/app/utils/firebase";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { User } from "firebase/auth";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
  const [curruser, setcurruser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<DocumentData>();
  const [data, setData] = useState<{ id: string; data: DocumentData }[]>([]);
  const router = useRouter();

  useEffect(() => {
    return getUser(async (user) => {
      if (!user) {
        router.push("innovators/login");
      } else {
        setcurruser(user);
        const docs = await getDoc(doc(db, "user", user.uid));
        setUserDetails(docs.data());
      }
    });
  }, [curruser]);

  useEffect(() => {
    const unsubscribe = () => {
      if (!curruser) return;
      else {
        const q = query(
          collection(db, "innovations"),
          where("User", "==", curruser.uid)
        );
        return onSnapshot(q, (snapshot) => {
          setData(
            snapshot.docs.map((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          );
        });
      }
    };

    return unsubscribe();
  }, [curruser]);

  return (
    <div className="flex">
      <main className="flex-grow p-6 bg-[#fcf9f5]">
        <section id="profile" className="flex p-10 px-[6vw]">
          <div>
            <img
              src="/profile.jpg"
              className="w-[200px] rounded-full overflow-hidden m-5"
            ></img>
          </div>
          <div className="p-10">
            <h1 className="text-[4rem] poppins-semibold">
              {userDetails?.name}{" "}
            </h1>
            <h2 className="text-[2.5rem] poppins-regular"> Innovator</h2>
          </div>
        </section>
        <section className="w-[80vw] mx-auto bg-[#2e2f33] p-10 rounded-2xl min-h-[400px] flex flex-col ">
          <div className="flex justify-between items-center mb-4">
            <h1 className=" poppins-medium text-[3rem] text-white">My Innovations</h1>
            <Button
              className="px-3 py-3 text-md bg-[#fcf9f5] text-[#2e2f33] rounded-lg flex items-center space-x-2  poppins-regular "
              type="button"
            >
              <span onClick={() => router.push("/innovators/submit")}>
                Create New
              </span>
            </Button>
          </div>
          <Table className="text-white poppins-regular text-xl">
            <TableHeader>
              <TableRow className="text-white">
                <TableHead>Innovation</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((doc) => {
                return (
                  <TableRow
                    key={doc.id}
                    className="w-full"
                    onClick={() => router.push(`/innovators/idea/${doc.id}`)}
                  >
                    <TableCell className="font-medium">
                      {doc.data.Name}
                    </TableCell>
                    <TableCell className="text-left">
                      {doc.data.Description}
                    </TableCell>
                    <TableCell>{doc.data.Requirements}</TableCell>
                    <TableCell className="text-right">
                      {doc.data.Milestones[2].cost}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
