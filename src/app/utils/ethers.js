import { ethers } from "ethers";
import contractABI from "../abi/sheshield.json"

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            return signer.getAddress() ? signer : null;
        } catch (error) {
            console.error("User rejected the request or an error occurred:", error);
            throw error;
        }
    } else {
        console.log("MetaMask not installed; using read-only defaults")
        return ethers.getDefaultProvider();
    }
};

export const getWalletAddress = async () => {
    try {
        const signer = await connectWallet();
        if (!signer) {
            throw new Error("No signer available. Please connect to your wallet.");
        }
        return signer.getAddress();
    } catch (error) {
        console.error("Error getting wallet address:", error);
        throw error;
    }
};

const getContract = async () => {
    const signer = await connectWallet();
    if (!signer) {
        throw new Error("No signer available. Please connect to your wallet.");
    }
    return new ethers.Contract(contractAddress, contractABI, signer);
};

// FIXED FUNCTIONS

export const getNftInfo = async (tokenId) => {
    try {
        const contract = await getContract();
        // The method might be named tokenURI or getTokenURI in the contract
        return await contract.tokenURI(tokenId);
    } catch (error) {
        console.error("Error reading NFT info:", error);
        throw error; // Re-throw to allow error handling by caller
    }
};

export const allNFT = async (address) => {
    try {
        const contract = await getContract();
        return await contract.allNFT(address);
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        return [];
    }
};

export const ownerOfNft = async (tokenId) => {
    try {
        const contract = await getContract();
        return await contract.ownerOf(tokenId);
    } catch (error) {
        console.error("Error checking NFT owner:", error);
    }
};

// USER FUNCTIONS 

export const mint = async (tokenId) => {
    try {
        const contract = await getContract();
        const tx = await contract.mint(tokenId);
        await tx.wait(); 
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
};

export default {
    connectWallet,
    getContract,
    getNftInfo,
    allNFT,
    ownerOfNft,
    mint,
    getWalletAddress
};
