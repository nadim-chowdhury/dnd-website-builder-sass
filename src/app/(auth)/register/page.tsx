"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const { user } = useUser();

  if (!user)
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SignUp />{" "}
      </motion.div>
    );

  return <div>Welcome!</div>;
}
