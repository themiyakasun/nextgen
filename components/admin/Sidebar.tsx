"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import LogoutIcon from "@mui/icons-material/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useSidebarStore } from "@/providers/SidebarStoreProvider";

const Sidebar = () => {
  const { sidebarVisibility, toggleSidebarShrink, sidebarShrink } =
    useSidebarStore((state) => state);

  return (
    <div
      className={`${sidebarShrink ? "w-content" : "w-[280px]"} fixed ${sidebarVisibility ? "left-0" : "left-[-120%]"} md:left-0 top-0 bottom-0 z-30 bg-white px-8 py-4 flex flex-col items-start shadow-2xl md:shadow-md sidebar`}
    >
      <div className="flex flex-col gap-10 w-full">
        <div className="flex items-center justify-between w-full">
          <Image src="/images/Logo.png" alt="logo" width={60} height={60} />

          <button
            className={`scale-x-[-1] ${sidebarShrink ? "hidden" : "block"}`}
            onClick={toggleSidebarShrink}
          >
            <LogoutIcon className="text-black hidden" />
          </button>
        </div>

        <div className="w-full">
          <h3>General</h3>
          <ul className="w-full mt-[10px]">
            <li className="w-full">
              <Link
                href="/dashboard"
                className="group hover:bg-cerulean-blue-100 w-full flex items-center gap-2 p-2 rounded-[12px]"
              >
                <DashboardOutlinedIcon className="text-2xl text-neutral-custom-400 group-hover:text-neutral-custom-800" />
                <span
                  className={`${sidebarShrink ? "hidden" : "block"} text-sm text-neutral-custom-400 group-hover:font-bold group-hover:text-neutral-custom-800`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="w-full">
              <button className="group hover:bg-cerulean-blue-100 w-full flex items-center gap-2 p-2 rounded-[12px]">
                <StorefrontIcon className="text-2xl text-neutral-custom-400 group-hover:text-neutral-custom-800" />
                <span
                  className={`${sidebarShrink ? "hidden" : "block"} text-sm text-neutral-custom-400 group-hover:font-bold group-hover:text-neutral-custom-800`}
                >
                  Products
                </span>
              </button>
            </li>
            <li className="w-full">
              <Link
                href="/"
                className="group hover:bg-cerulean-blue-100 w-full flex items-center gap-2 p-2 rounded-[12px]"
              >
                <PeopleAltOutlinedIcon className="text-2xl text-neutral-custom-400 group-hover:text-neutral-custom-800" />
                <span
                  className={`${sidebarShrink ? "hidden" : "block"} text-sm text-neutral-custom-400 group-hover:font-bold group-hover:text-neutral-custom-800`}
                >
                  Customers
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/"
                className="group hover:bg-cerulean-blue-100 w-full flex items-center gap-2 p-2 rounded-[12px]"
              >
                <ReceiptLongOutlinedIcon className="text-2xl text-neutral-custom-400 group-hover:text-neutral-custom-800" />
                <span
                  className={`${sidebarShrink ? "hidden" : "block"} text-sm text-neutral-custom-400 group-hover:font-bold group-hover:text-neutral-custom-800`}
                >
                  Transactions
                </span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/"
                className="group hover:bg-cerulean-blue-100 w-full flex items-center gap-2 p-2 rounded-[12px]"
              >
                <TrendingUpOutlinedIcon className="text-2xl text-neutral-custom-400 group-hover:text-neutral-custom-800" />
                <span
                  className={`${sidebarShrink ? "hidden" : "block"} text-sm text-neutral-custom-400 group-hover:font-bold group-hover:text-neutral-custom-800`}
                >
                  Sales
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full">
          <h3>Tools</h3>
          <ul className="w-full mt-[10px]">
            <li className="w-full">
              <Link
                href="/"
                className="group hover:bg-cerulean-blue-100 w-full flex items-center gap-2 p-2 rounded-[12px]"
              >
                <SettingsOutlinedIcon className="text-2xl text-neutral-custom-400 group-hover:text-neutral-custom-800" />
                <span
                  className={`${sidebarShrink ? "hidden" : "block"} text-sm text-neutral-custom-400 group-hover:font-bold group-hover:text-neutral-custom-800`}
                >
                  Account & Settings
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
