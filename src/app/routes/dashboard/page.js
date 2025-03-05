"use client"
import React, { useEffect, useState } from 'react'
import { allNFT, getNftInfo } from '../../utils/ethers'
import { useAccount } from '../../context/AccountContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [nfts, setNfts] = useState([]);
    const [sample, setSample] = useState([]);
    const { account } = useAccount();
    

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                if (!account) return;  // Fix condition

                // Get all token IDs owned by user
                const tokenIds = await allNFT(account);

                const nftData = await Promise.all(
                    tokenIds.map(async (id) => {
                        const tokenInfo = await getNftInfo(id);
                        return {
                            id: id,
                            title: tokenInfo?.name || `title ${id}`
                        };
                    })
                );

                setSample(nftData);
                setNfts(tokenIds);
            } catch (error) {
                console.error("Error fetching NFTs:", error);
                setSample([
                    { id: 1, title: 'Title 1' },
                    { id: 2, title: 'Title 2' },
                    { id: 3, title: 'Title 3' },
                    { id: 4, title: 'Title 4' },
                    { id: 5, title: 'Title 5' }
                ]);
            }
        };

        fetchNFTs();
    }, [account]);

    

    return (
        <div className='flex flex-col items-center h-screen text-black bg-white'>
            <h1 className='text-5xl mt-10 font-bold'>Dashboard</h1>

            <div className='flex flex-col items-center mt-10 mx-20 border border-gray-500 rounded-lg w-[75%] py-10 gap-5'>
                {sample.map(item => (
                    <div 
                        key={item.id} 
                        className='flex flex-row border border-gray-600 py-2 px-4 rounded-lg w-[75%] cursor-pointer'
                        onClick={() => router.push(`/routes/detail/${item.id}`)}
                    >
                        <h2 className='text-lg font-light'>{item.id}</h2>
                        <h2 className='text-xl ml-16 font-light'>{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
