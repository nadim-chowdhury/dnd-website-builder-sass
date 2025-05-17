"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user } = useUser();

  if (!user)
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SignIn />
      </motion.div>
    );

  return <div>Welcome!</div>;
}
