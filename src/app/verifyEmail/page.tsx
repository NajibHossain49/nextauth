// This is a Client Component
"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

// Create a client component that uses useSearchParams
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "verified" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const verifyUserEmail = async (token: string) => {
    try {
      setStatus("loading");
      console.log("Verifying with token:", token);

      const response = await axios.post('/api/users/verifyEmail', { token });
      console.log("Verification response:", response.data);

      setStatus("verified");
    } catch (error: any) {
      console.error("Verification error:", error);
      setStatus("error");
      setErrorMessage(error.response?.data?.message || "Failed to verify email");
    }
  };

  useEffect(() => {
    // Get token from URL query parameter
    const token = searchParams.get("token");

    // If no token is provided, show an appropriate message
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token provided");
      return;
    }

    // Otherwise, verify the email
    verifyUserEmail(token);
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">Email Verification</h1>

        {status === "idle" && (
          <p className="text-gray-600">Preparing to verify your email...</p>
        )}

        {status === "loading" && (
          <div className="py-4">
            <div className="animate-pulse flex justify-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600">Verifying your email...</p>
          </div>
        )}

        {status === "verified" && (
          <div className="py-4 space-y-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-medium">Your Email has been verified successfully!</p>
            </div>
            <p className="text-gray-600">You can now log in to your account.</p>
            <Link href="/Login">
              <button className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go to Login
              </button>
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="py-4 space-y-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-medium">Verification Failed</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Please try again or contact support if the problem persists.</p>
              <Link href="/">
                <button className="group relative flex w-full justify-center rounded-md bg-gray-200 py-2 px-3 text-sm font-semibold text-gray-800 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main page component with suspense
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-900">Email Verification</h1>
          <div className="py-4">
            <div className="animate-pulse flex justify-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading verification page...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}