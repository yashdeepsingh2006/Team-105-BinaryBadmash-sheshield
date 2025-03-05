"use client"
import React from 'react'
import { useState, useEffect } from 'react';

import { useParams } from 'next/navigation'; // Fix the missing import
import { getNftInfo } from '../../../utils/ethers';

export default function page() {

    const {id} = useParams();

    const [nftData, setNftData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNFTDetails() {
            try {
                const data = await getNftInfo(id);
                setNftData(data);
                
            } catch (err) {
                setError(err.message);
                
            }
        }
        
        fetchNFTDetails();
    }, [id]);

return (
    <div className='bg-white text-black'>
            <h1>Detail Page</h1>
            <h2>{id}</h2>
    </div>
)
}
