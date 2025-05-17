// app/auth/layout.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Auth Form */}
      <motion.div
        className="w-full md:w-1/2 p-8 flex items-center justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Sign in to access your account
            </p> */}
            {children}
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Decorative */}
      <motion.div
        className="hidden md:block md:w-1/2 bg-indigo-600 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800">
          <div className="absolute inset-0 opacity-20">
            {/* Abstract pattern */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-white opacity-10"></div>
            <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-white opacity-10"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <motion.div
            className="text-white text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Explore the Platform</h2>
            <p className="mb-4">
              Access all features with your secure account. Manage your data
              efficiently and safely.
            </p>
            <Link
              href="/"
              className="text-gray-200 hover:text-gray-100 hover:underline transition duration-300 flex items-center justify-center gap-2"
            >
              <FaHome /> Return Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
