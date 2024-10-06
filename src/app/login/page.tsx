"use client"  // for useEffect and useState

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast' // SMALL POP UP
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user)
      console.log("---- src/app/login (axios res of post-/api/users/login) Login success", response.data)
      // console.log("---- src/app/signup (axios res of post-/api/users/signup) Signup success", response)


      // signup success
      router.push("/profile");

    } catch (err: any) {
      console.log("---- src/app/login -- Login failed!");
      toast.error(err.message);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='
    flex flex-col items-center justify-center min-h-screen py-2
    '>
      <h1 className='mb-6'>{loading ? "Processing..wait for a sec!" : "login"}</h1>
     
      <label htmlFor='email'>email:</label>
      <input
        id='email'
        placeholder='email'
        type='text'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor='password'>password:</label>
      <input
        id='password'
        placeholder='password'
        type='password'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
      />




      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? "Fill the form to login" : "login"}
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  )
}

