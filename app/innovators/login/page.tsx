"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { auth, db } from "@/app/utils/firebase";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userDetails) => {
        router.push("/innovators/dash");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen h-screen flex  justify-center items-center gap-10">
      <div className="w-[50vw] h-full flex justify-center items-center">
        <img src='/innovator.png'/>
      </div>
      <div className="w-[50vw] h-full flex flex-col justify-center p-[10vw] ">
        <h1 className="text-[6rem] poppins-medium py-5 text-start">Log In</h1>
        <form className="flex flex-col">
          <h1 className="text-4xl poppins-light  justify-start py-2">Email</h1>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="h-[50px] border-2 focus:border-black rounded-lg p-4"
          />

          <h1 className="text-4xl poppins-light  justify-start py-2">Password</h1>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="h-[50px] border-2 focus:border-black rounded-lg p-4"
          />

          <button onClick={handleLogin} className="bg-[#2e2f33] wfit px-4 py-3 text-white my-10 text-2xl ">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
