'use client';

import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 to-rose-50">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-red-500 text-5xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Something went wrong!
              </h1>
              <p className="text-gray-600 mb-6">
                An unexpected error occurred. Please try again.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors mr-4"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold rounded-lg transition-colors"
              >
                <FaHome className="mr-2" />
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}