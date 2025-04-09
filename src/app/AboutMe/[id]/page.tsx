// app/AboutMe/[id]/page.tsx
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface UserProfileProps {
    params: {
        id: string;
    };
}

interface UserData {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function UserProfile({ params }: UserProfileProps) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUserDetails = async (): Promise<void> => {
            try {
                // Make sure your API endpoint is set up to handle this route
                const res = await axios.get(`/api/users/user/${params.id}`);
                setUserData(res.data.data);
                setLoading(false);
            } catch (error: any) {
                console.error("Error fetching user details:", error);
                setError(error.response?.data?.message || "Could not load user details");
                setLoading(false);
            }
        };

        if (params.id) {
            fetchUserDetails();
        }
    }, [params.id]);

    const formatDate = (dateString: string): string => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <p>Loading user profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <p className="text-red-500">{error}</p>
                <Link href="/AboutMe" className="mt-4 text-blue-500 hover:underline">
                    Back to Profile
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <hr className="w-full max-w-md mb-6" />

            <div className="bg-gray-400 p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <h2 className="text-purple-600 text-lg font-semibold mb-1">User ID:</h2>
                    <p className="text-gray-700 bg-orange-200 p-2 rounded">{params.id}</p>
                </div>

                {userData && (
                    <>
                        <div className="mb-4">
                            <h2 className="text-purple-600 text-lg font-semibold mb-1">Username:</h2>
                            <p className="text-gray-700 bg-green-100 p-2 rounded">{userData.username}</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-purple-600 text-lg font-semibold mb-1">Email:</h2>
                            <p className="text-gray-700 bg-blue-100 p-2 rounded">{userData.email}</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-purple-600 text-lg font-semibold mb-1">Account Status:</h2>
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded ${userData.isVerified ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {userData.isVerified ? 'Verified' : 'Not Verified'}
                                </span>
                                {userData.isAdmin && (
                                    <span className="px-2 py-1 rounded bg-purple-500 text-white">
                                        Admin
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-purple-600 text-lg font-semibold mb-1">Member Since:</h2>
                            <p className="text-gray-700 bg-yellow-100 p-2 rounded">{formatDate(userData.createdAt)}</p>
                        </div>
                    </>
                )}
            </div>

            <Link href="/AboutMe" className="mt-6 text-blue-500 hover:underline">
                Back to Profile
            </Link>
        </div>
    );
}