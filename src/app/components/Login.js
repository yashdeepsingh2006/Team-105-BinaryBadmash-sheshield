"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Login() {

  const router = useRouter();

  // State to track wallet connection
  const [account, setAccount] = useState('');
  const [connected, setConnected] = useState(false);

  // Function to connect to wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setConnected(true);
        console.log('Connected to wallet:', accounts[0]);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.log('No wallet detected. Please install MetaMask or another wallet provider.');
    }
  };

  // Connect wallet when component mounts
  useEffect(() => {
    connectWallet();
  }, []);

  const proceed = async () => {
    router.push('/routes/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 ">

        <div className="flex bg-white p-8 rounded-lg shadow-md w-full max-w-4xl gap-8 ">
          <div className="w-full max-w-md flex items-center justify-center  ">
            <Image className='rounded-lg'
              src={"/login/bg.png"}
              width={400} // Set appropriate width
              height={400} // Set appropriate height
                alt="Login Image"
              />
              </div>

              <div className="w-full max-w-md"></div>









          <div className="w-full max-w-md mr-20">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">LOGIN</h2>
            <form>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  University
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="university"
                  name="university"
                >
                  <option value="1">Chitkara university</option>
                  <option value="2">Thapar University</option>
                  <option value="3">Punjab University</option>
                  <option value="4">Punjabi University</option>
                  <option value="5">Chandigarh University</option>
                </select>
              </div>
              <div className="flex items-center justify-center">

                <button
                onClick={proceed}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
                
              </div>
            </form>
          </div>












        </div>
      </main>

      {/* Footer */}
      <footer className="foot flexbox bg-blue-500" style={{ justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '60px' }}>
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <div className="menu">
          <div className="logo">
            <Image
              src="/wave.jpg" // Route of the image file in the public directory
              width={200} // Set appropriate width
              height={20} // Set appropriate height
              alt="image"
            />
          </div>
          <div className="logo">
            <Image
              src="/wave2.jpg" // Route of the image file in the public directory
              width={200} // Set appropriate width
              height={20} // Set appropriate height
              alt="image"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}