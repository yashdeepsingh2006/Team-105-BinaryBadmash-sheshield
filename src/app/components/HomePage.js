"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function Landingpage() {


    return (
        <div className='landingBg bg-contain h-[90vh] flex flex-col cursor-default'>


            <div className='self-center flex flex-col'>

                <h1 className='self-center mt-44 text-6xl md:text-7xl lg:mt-12 lg:text-8xl font-black text-gray-800 michroma-regular md:tracking-wider cursor-default'>SheShield</h1>
                <h1 className='self-center text-lg lg:text-2xl md:text-xl lg:font-extralight text-gray-600 mt-3 md:tracking-wider cursor-default'>Where Creativity Meets Ownership</h1>
            </div>


            {/* BUTTONS */}
            <div className='flex bg-[#fdfbef] flex-col md:flex-row self-center mt-8'>
                
                <Link href="/routes/login"><button className="btn btn1 my-4 md:mx-6">Get started</button></Link>

            </div>
            <div>
                

                

                {/* last text */}
                {/* <div className='bg-zinc-950 text-white text-center text-xs lg:text-xl michroma-regular tracking-widest  font-bold py-10'>
                    <h1 className='lg:text-4xl'>Join the Future of Digital Ownership</h1>
                    <h2>Start securing and selling your creative work today</h2>
                </div> */}

            </div>
        </div>
    )
}

