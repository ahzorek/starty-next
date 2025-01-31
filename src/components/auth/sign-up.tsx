"use client"
import { signUp } from "@/lib/auth-client"; //import the auth client
import { useState } from 'react';
 
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 
  const signUpAction = async () => {
    const { data, error } = await signUp.email({ 
        email, 
        password, 
        name, 
     }, { 
        onRequest: (ctx) => { 
         console.log("CONTEXT RUNNING:  ", ctx)
         return ctx
        }, 
        onSuccess: (ctx) => { 
          //redirect to the dashboard
        }, 
        onError: (ctx) => { 
          alert(ctx.error.message); 
        }, 
      }); 
  };
 
  return (
    <div className="grid w-full gap-2 bg-white p-2">
      <input className="border border-gray-200 text-gray-500 p-1 "  type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
      <input className="border border-gray-200 text-gray-500 p-1 "  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input className="border border-gray-200 text-gray-500 p-1 "  type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
      <button className="bg-blue-600 text-white p-4" onClick={signUpAction}>Sign Up</button>
    </div>
  );
}