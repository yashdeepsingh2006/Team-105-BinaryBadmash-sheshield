"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { mint, connectWallet, getWalletAddress } from "../../utils/ethers"; // Adjust the import path as needed

export default function MintPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        imageLink: "",
        tokenName: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Ensure wallet is connected and get the user's address
            await connectWallet();
            const userAddress = await getWalletAddress();

            // Call the `mint` function with the correct arguments
            const { imageLink, tokenName, category } = formData;
            await mint(userAddress, imageLink, tokenName, category);

            // Redirect to the home page or NFT detail page after minting
            router.push("/");
        } catch (err) {
            console.error("Error minting NFT:", err);
            setError("Failed to mint NFT. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white h-screen text-black">
            <h1 className="text-2xl font-bold mb-4">Mint a New NFT</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Image Link</label>
                    <input
                        type="text"
                        name="imageLink"
                        value={formData.imageLink}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter the image URL"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Token Name</label>
                    <input
                        type="text"
                        name="tokenName"
                        value={formData.tokenName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter the token name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter the category"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? "Minting..." : "Mint NFT"}
                </button>
            </form>
        </div>
    );
}