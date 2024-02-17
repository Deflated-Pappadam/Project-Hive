"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth, getUser } from "@/app/utils/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    return getUser((user) => {
      if (user) {
        console.log(user);
        router.push('/innovators/dash')
      }
    })
  }, [])

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
          <a href="/innovators/signUp" className="text-[#2e2f33]  text-2xl text-center">Create an Account</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
