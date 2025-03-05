"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { getWalletAddress } from '../utils/ethers';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const walletAddress = await getWalletAddress();
                if (walletAddress) {
                    setAccount(walletAddress);
                }
            } catch (error) {
                console.error("Error fetching wallet:", error);
            }
        };

        fetchAccount();
    }, []);

    const connectAccount = async () => {
        try {
            const walletAddress = await getWalletAddress();
            if (walletAddress) {
                setAccount(walletAddress);
            }
            return walletAddress;
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            return null;
        }
    };

    return (
        <AccountContext.Provider value={{ account, connectAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);
