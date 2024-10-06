"use client";
import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        try {
            const res = await axios.post("/api/users/me");
            console.log(res.data.data);
            setData(res.data.data._id);

        } catch (error: any) {
            console.log("err in getuserdetailsFn section, src/app/profile", error.message)
            toast.error(error.message)
        }
    }
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("logout success!")
            router.push("/login")
        } catch (error: any) {
            console.log("err in logoutFn section src/app/profile ", error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h2 className='p-2 bg-orange-500 text-black'>Profile Page</h2>
            <h2>
                {data === "nothing" ? "Nothing"
                    : <Link href={`/profile/${data}`}>Test: {data}</Link>}
            </h2>
            <button
                className='bg-blue-500 p-2 mt-4 hover:bg-blue-700 text-white font-bold'
                onClick={logout}
            >logout</button>
            <button
                className='bg-green-700 p-2 mt-4 hover:bg-green-900 text-white font-bold'
                onClick={getUserDetails}
            >Get User Deatails</button>
        </div>
    )
}

