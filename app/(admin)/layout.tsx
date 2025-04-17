import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SidebarStoreProvider } from "@/providers/SidebarStoreProvider";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  if (session.user?.role === "USER") redirect("/");

  return <SidebarStoreProvider>{children}</SidebarStoreProvider>;
};
export default Layout;
