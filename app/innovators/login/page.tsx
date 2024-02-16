"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { auth, db } from "@/app/utils/firebase";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";

 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userDetails) => {
      router.push('/');
    })
.catch((err)=> console.log(err))
  }


  return (

    <div className='w-screen h-screen flex flex-col justify-center items-center gap-10'>
      <h1>Login</h1>
    <form className='flex flex-col  gap-5'>
        <h1>Email</h1>
        <input
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
        setEmail(e.target.value);
        }  }
        className="inputField"/>
        <h1>Email</h1>
      <  input
        type="text"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
           setPassword(e.target.value);
        }  }
        className="inputField"
      />
   
      < button onClick={handleLogin}>Login</button>
    </form>
  </div>
  );
}

export default Login;
