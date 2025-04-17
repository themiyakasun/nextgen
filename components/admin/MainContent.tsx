"use client";

import React, { ReactNode } from "react";

import { useSidebarStore } from "@/providers/SidebarStoreProvider";

const MainContent = ({ children }: { children: ReactNode }) => {
  const { sidebarShrink } = useSidebarStore((state) => state);

  return (
    <div className={`main-container ${sidebarShrink ? "shrink" : ""}`}>
      {children}
    </div>
  );
};
export default MainContent;
