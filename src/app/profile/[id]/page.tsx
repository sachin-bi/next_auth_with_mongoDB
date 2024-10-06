"use client"
import React from 'react'

export default function page({ params }: any) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h2 className='p-2 bg-orange-500 text-black'>Profile Page</h2>

            <h2 className='bg-blue-500 mt-4 hover:bg-blue-700 p-3 text-white font-bold'>
                ${params.id}
            </h2>
        </div>
    )
}

