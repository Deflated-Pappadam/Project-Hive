"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/firebase";

 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("Email is " + email);
  console.log("Password is " + password);


  return (
    <div>
      <h1>Login</h1>
      <form action="">
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
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="inputField"
        />
        <input type="text" />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
