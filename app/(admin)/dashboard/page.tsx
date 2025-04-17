"use client";

import React from "react";
import { signOut } from "next-auth/react";

const Page = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};
export default Page;
