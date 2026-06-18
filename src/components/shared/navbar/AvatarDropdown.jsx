"use client";

import React, { useState } from "react";
import { Avatar, Dropdown } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";

const AvatarDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown onOpenChange={(open) => setIsOpen(open)}>
      <Dropdown.Trigger className="mr-1 sm:mr-3 lg:mr-6 flex gap-1 lg:gap-2 items-center rounded-full">
        {isOpen ? (
          <IoMdArrowDropup className="text-tertiary" />
        ) : (
          <IoMdArrowDropdown className="text-tertiary" />
        )}

        {/* animated glow */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary blur-sm animate-pulseGlow" />

          <Avatar className="relative z-10 cursor-pointer transition-transform duration-300">
            <Avatar.Image alt={user?.name} src={user?.image} />

            <Avatar.Fallback delayMs={600}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar.Fallback>
          </Avatar>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Popover className={"bg-secondary border border-[#5C53FE]"}>
        <div className="px-3 pt-3 pb-1 ">
          <div className="flex items-center gap-2">
            <Avatar size="sm" className="border border-[#17a2b8]">
              <Avatar.Image alt={user?.name} src={user?.image} />

              <Avatar.Fallback delayMs={600}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col gap-0">
              <p className="text-white text-sm leading-5 font-medium">
                {user?.name}
              </p>

              <p className="text-xs leading-none text-white opacity-80">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={handleLogOut}
            disabled={loading}
            className="flex items-center justify-between gap-2 hover:bg-transparent text-red-500 cursor-pointer"
          >
            <span>{loading ? "Logging out..." : "Log Out"}</span>
            <IoExitOutline className="size-3.5" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default AvatarDropdown;
