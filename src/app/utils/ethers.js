import { ethers } from "ethers";
import contractABI from "../abi/sheshield.json"

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const connectWallet = async () => {
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

export const getName = async (tokenId) => {
    try {
        const contract = await getContract();
        return await contract.getName(tokenId);
    } catch (error) {
        console.error("Error getting NFT name:", error);
    }
}

export const getCid = async (tokenId) => {
    try {
        const contract = await getContract();
        return await contract.getCid(tokenId);
    } catch (error) {
        console.error("Error getting NFT CID:", error);
    }
}

// USER FUNCTIONS 

export const mint = async (userAddress, imageLink, tokenName, category) => {
    try {
        const contract = await getContract();

        // Call the `mint` function in your smart contract with the correct arguments
        const tx = await contract.mint(userAddress, imageLink, tokenName, category);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log("NFT minted successfully!");
    } catch (error) {
        console.error("Error minting NFT:", error);
        throw error; // Re-throw the error to handle it in the UI
    }
};

export default {
    connectWallet,
    getContract,
    getNftInfo,
    allNFT,
    ownerOfNft,
    mint,
    getWalletAddress,
    getName,
    getCid
};
