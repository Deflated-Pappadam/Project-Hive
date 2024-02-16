"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { auth, db } from "@/app/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";

 function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadharno, setAadharno] = useState("");
  
  const handleLogin = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userDetails) => {
      console.log(userDetails);
      await setDoc(doc(db, 'user', userDetails.user.uid), {
        name: username,
        aadhar: aadharno,
        role: 'innovators'
      }).then(()=> console.log("created user!")).catch((e)=> console.log(e))
  })
  }

  // console.log("Email is " + email);
  // console.log("Password is " + password);


  return (
    <div>
      <h1>Sign up</h1>
      <form action="">
      <input
          type="text"
          id="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="inputField"
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="inputField"
        />
        <input
          type="text"
          id="Aadhar no"
          placeholder="Aadhar no"
          value={aadharno}
          onChange={(e) => {
            setAadharno(e.target.value);
          }}
          className="inputField"
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="inputField"
        />
     
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Signup;
