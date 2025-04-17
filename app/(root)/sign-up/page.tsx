"use client";

import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signupSchema } from "@/lib/validation";
import NewCustomerBox from "@/components/NewCustomerBox";
import { signUp } from "@/lib/actions/auth";

const Page = () => {
  return (
    <div>
      <h1 className="main-title">Customer Registration</h1>

      <div className="flex justify-center gap-10 mt-5">
        <AuthForm
          schema={signupSchema}
          defaultValues={{ name: "", email: "", password: "" }}
          onSubmit={signUp}
          type={"SIGN_UP"}
        />
        <NewCustomerBox type={"SIGN_UP"} />
      </div>
    </div>
  );
};
export default Page;
