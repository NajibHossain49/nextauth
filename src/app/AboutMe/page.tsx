"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserData {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<{
        id: string;
        username: string;
        email: string;
    }>({
        id: "nothing",
        username: "",
        email: ""
    });
    const [loading, setLoading] = useState<boolean>(false);

    const logout = async (): Promise<void> => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/Login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await axios.get('/api/users/AboutMe');
            console.log(res.data);
            setUserData({
                id: res.data.data._id,
                username: res.data.data.username,
                email: res.data.data.email
            });
            toast.success("User details loaded successfully");
        } catch (error: any) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to load user details");
        } finally {
            setLoading(false);
        }
    }

    // Auto-load user details when component mounts
    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <hr className="w-full max-w-md mb-6" />

            {loading ? (
                <p>Loading user data...</p>
            ) : (
                <div className="bg-gray-300 p-6 rounded-lg shadow-md w-full max-w-md">
                    <div className="mb-4">
                        <h2 className=" text-purple-700 text-lg font-semibold mb-1">User ID:</h2>
                        {userData.id === 'nothing' ? (
                            <p className="text-gray-500">Not loaded</p>
                        ) : (
                            <Link href={`/AboutMe/${userData.id}`} className="text-blue-500 hover:underline">
                                {userData.id}
                            </Link>
                        )}
                    </div>

                    <div className="mb-4">
                        <h2 className=" text-purple-700 text-lg font-semibold mb-1">Username:</h2>
                        <p className="text-gray-600 bg-green-100 p-2 rounded">{userData.username || "Not available"}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className=" text-purple-700 text-lg font-semibold mb-1">Email:</h2>
                        <p className="text-gray-600 bg-blue-100 p-2 rounded">{userData.email || "Not available"}</p>
                    </div>
                </div>
            )}

            <div className="flex gap-4 mt-6">
                <button
                    onClick={logout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Logout
                </button>

                <button
                    onClick={getUserDetails}
                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-colors"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh User Details"}
                </button>
            </div>
        </div>
    );
}