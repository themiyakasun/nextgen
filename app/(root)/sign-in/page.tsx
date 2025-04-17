"use client";

import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signinSchema } from "@/lib/validation";
import NewCustomerBox from "@/components/NewCustomerBox";
import { signInWithCredentials } from "@/lib/actions/auth";

const Page = () => {
  return (
    <div>
      <h1 className="main-title">Customer Sign In</h1>
      <div className="flex justify-center gap-10 mt-5">
        <AuthForm
          schema={signinSchema}
          defaultValues={{ email: "", password: "" }}
          onSubmit={signInWithCredentials}
          type={"SIGN_IN"}
        />
        <NewCustomerBox type={"SIGN_IN"} />
      </div>
    </div>
  );
};
export default Page;
