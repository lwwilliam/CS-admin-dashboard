"use client"; 

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter()
	const [clubUsername, setclubUsername] = useState("")
	const [password, setPassword] = useState("")
	const [wrongPassword, setWrongPassword] = useState(false)
	
	function signInFunction(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
		const data = { "clubUsername": clubUsername, "password": password };
		fetch(`${BACKEND_URL}/api/admin/clubsLogin`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
				body: JSON.stringify(data), 
    })
    .then(response => {
      if (!response.ok) {
        setWrongPassword(true)
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      const expires = new Date();
      expires.setDate(expires.getDate() + 2);
      setCookie('token', data.jwt_token, { expires });
      router.push('/clubDashboard');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <>
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-10/12 md:w-1/3 bg-white h=3/5 md:h-2/5 rounded-2xl relative items-center p-5">
        <div className='flex-col flex items-center w-full'>
          <Image className="relative m-5" src="/icons/42clubs_logo_black.png"
            alt="Logo"
            width={70}
            height={70}
          />
          <form onSubmit={signInFunction} className='flex-col flex items-center w-full'>
            <div className="w-[80%] h-full pb-5">
              <input className="w-full h-12 rounded-md bg-neutral-200 shadow-inner pl-5 font-poppins font-medium"
                placeholder="Username"
                onChange={e => setclubUsername(e.target.value)}
                name='username'
                autoComplete="username"
              />
            </div>
            <div className="w-[80%] h-full pb-5 relative">
              <input className="w-full h-12 rounded-md bg-neutral-200 shadow-inner pl-5 font-poppins font-medium"
                placeholder="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                name='password'
                autoComplete="current-password"
              />
              <div className={`text-red-500 absolute bottom-[0.3px] ${wrongPassword ? '' : 'hidden'}`}>Incorrect Password</div>
            </div>
            <div className="w-[25%] h-14 pb-3">
              <button type="submit" className="w-full h-full rounded-3xl bg-lightmode-red font-poppins font-medium transform transition-all duration-200 hover:scale-105 cursor-pointer">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    </>
  );
}
