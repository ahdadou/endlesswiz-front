"use client";

import { useParams, useRouter } from "next/navigation";

const AuthError = () => {
  const router = useRouter();
  const params = useParams();
  const error = params.error as string;

  const errorMessage = error
    ? {
        AccessDenied: "Access was denied. Please check your credentials.",
        Configuration: "There’s a configuration issue. Contact support.",
        Default: "Something went wrong during authentication.",
      }[error] || `Authentication failed: ${error}`
    : "Something went wrong during authentication.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          Oops! Something Went Wrong
        </h1>
        <p className="mt-2 text-gray-600">{errorMessage}</p>
        <button
          onClick={() => router.push("/auth/login")}
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default AuthError;
