// This is a Client Component
"use client";

import Link from "next/link";
import React from "react";

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Check your Email
          </h2>
          <div className="mt-8 text-6xl flex justify-center">
            ✉️
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <p className="text-gray-600">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  If you don't see the Email, check your spam folder.
                </p>
              </div>
            </div>
          </div>
          
          {/* <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Already verified your email?
            </p>
            <Link href="/Login">
              <button className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go to Login
              </button>
            </Link>
          </div> */}
          
          {/* <div className="pt-4 border-t border-gray-200">
            <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
              Return to Home
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}