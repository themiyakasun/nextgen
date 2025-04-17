"use client";

import React from "react";
import { Session } from "next-auth";
import Image from "next/image";

import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSidebarStore } from "@/providers/SidebarStoreProvider";

const Header = ({ session }: { session: Session | null }) => {
  const {
    showSidebar,
    sidebarVisibility,
    hideSidebar,
    toggleSidebarShrink,
    sidebarShrink,
  } = useSidebarStore((state) => state);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-20 ${sidebarShrink ? "md:ml-[120px]" : "md:ml-[280px]"} bg-white shadow-lg`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center justify-center gap-5 md:order-1">
          <div className="w-10 h-9 border border-black rounded-md">
            {session?.user?.image && (
              <Image
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={40}
                height={36}
              />
            )}
          </div>
          <div>
            <h3 className="capitalize text-sm leading-2">
              {session?.user?.name}
            </h3>
            <span className="text-xs text-secondary-custom leading-0">
              Admin
            </span>
          </div>
        </div>
        {sidebarVisibility ? (
          <button onClick={hideSidebar} className="md:hidden">
            <CloseOutlinedIcon className="text-black" />
          </button>
        ) : (
          <button onClick={showSidebar} className="md:hidden">
            <MenuIcon className="text-black" />
          </button>
        )}

        <button onClick={toggleSidebarShrink} className="hidden md:block">
          <MenuIcon className="text-black" />
        </button>
      </div>
    </div>
  );
};
export default Header;
