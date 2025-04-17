import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SidebarStoreProvider } from "@/providers/SidebarStoreProvider";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  if (session.user?.role === "USER") redirect("/");

  return (
    <SidebarStoreProvider>
      <div className="bg-neutral-custom-100">
        <Header session={session} />
        <main>{children}</main>
        <Sidebar />
      </div>
    </SidebarStoreProvider>
  );
};
export default Layout;
