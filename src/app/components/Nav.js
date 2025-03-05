"use client"

import React from 'react'
import Image from 'next/image'

export default function Nav() {
    return (
        <div>
            <nav className='flex flex-row justify-between px-5 py-2 bg-[#01292B] w-full'>

                {/* div containing logo */}
                <div className='w-1/2'>
                    <Image
                        height={80}
                        width={110}
                        src={'/images/logo.png'}
                        alt='Logo-mintify'
                    />
                </div>

                {/* div containing other nav items */}
                <div className='flex flex-row justify-between md:pr-10'>

                    {/* hamburger */}
                    <div className='hover:cursor-pointer'>
                        <button className='mt-3.5 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md'>
                            <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
