import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function Custom500() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-red-500 text-5xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Server Error
          </h1>
          <p className="text-gray-600 mb-6">
            Something went wrong on our end. We're working to fix it.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Error Code: 500</p>
        </div>
      </div>
    </div>
  );
}