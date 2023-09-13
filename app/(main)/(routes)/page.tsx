import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <p className="font-bold text-indigo-500">
      This is a protected Route
      <UserButton afterSignOutUrl="/" />
    </p>
  );
}
