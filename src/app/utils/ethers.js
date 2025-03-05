import { ethers } from "ethers";
import contractABI from "../abi/sheshield.json"

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Connect to wallet function
const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const provider = new ethers.BrowserProvider(window.ethereum); // Updated to BrowserProvider
            const signer = await provider.getSigner(); // Await getSigner in v6
            return signer;
        } catch (error) {
            console.error("User rejected the request or an error occurred:", error);
            throw error;
        }
    } else {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider(); // Use read-only defaults
    }
};

// Get contract instance
const getContract = async () => {
    const signer = await connectWallet();
    if (!signer) {
        throw new Error("No signer available. Please connect to your wallet.");
    }
    return new ethers.Contract(contractAddress, contractABI, signer);
};


// VIEW ONLY FUNCTIONS 

// all info of nft using tokenid
export const getNftInfo = async (tokenId) => {
    try {
        const contract = await getContract();
        const tx = await contract.getNftInfo(tokenId);
        await tx.wait(); // Wait for transaction to be mined
    } catch (error) {
        console.error("Error reading from blockchain", error);
    }
}

// total no of nfts of person
export const allNFT = async (address) => {
    try {
        const contract = await getContract();
        const tx = await contract.allNFT(address);
        await tx.wait();
    } catch (error) {
        console.error("Error reading from blockchain", error);
    }
}

// check owner of specific tokenid 
export const ownerOfNft = async (tokenId) => {
    try {
        const contract = await getContract();
        const tx = await contract.ownerOf(tokenId);
        await tx.wait();
    } catch (error) {
        console.error("Error reading from blockchain", error);
    }
}


// USER FUNCTIONS 

// mints new token 
export const mint = async (tokenId) => {
    try {
        const contract = await getContract();
        const tx = await contract.mint(tokenId);
        await tx.wait(); // Wait for transaction to be mined
    } catch (error) {
        console.error("Error reading from blockchain", error);
    }
}



// Export all functions from this file
export default {
    connectWallet,
    getContract,
    getNftInfo,
    allNFT,
    ownerOfNft,
    mint
};