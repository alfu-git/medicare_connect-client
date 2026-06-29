"use client";

import { Gear, Factory } from "@gravity-ui/icons";
import Link from "next/link";
import { FaMoneyBill } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import {
  MdOutlineDashboard,
  MdOutlineDateRange,
  MdOutlineHistory,
  MdReviews,
} from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { TbBriefcase2 } from "react-icons/tb";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@heroui/react";
import { CgProfile } from "react-icons/cg";
import { FaUserDoctor } from "react-icons/fa6";
import { IoAnalyticsOutline } from "react-icons/io5";

const DashboardNavContent = ({ user }) => {
  const pathname = usePathname();

  const allNavItems = {
    patient: [
      {
        icon: MdOutlineDashboard,
        href: "/dashboard/patient",
        label: "Dashboard",
      },
      {
        icon: RiPagesLine,
        href: "/dashboard/patient/my-appointments",
        label: "My Appointments",
      },
      {
        icon: MdOutlineHistory,
        href: "/dashboard/patient/payment-history",
        label: "Payment History",
      },
      {
        icon: MdReviews,
        href: "/dashboard/patient/my-reviews",
        label: "My Reviews",
      },
      {
        icon: CgProfile,
        href: "/dashboard/patient/profile",
        label: "Profile",
      },
    ],
    doctor: [
      {
        icon: MdOutlineDashboard,
        href: "/dashboard/doctor",
        label: "Dashboard",
      },
      {
        icon: RiPagesLine,
        href: "/dashboard/doctor/manage-schedule",
        label: "Manage Schedule",
      },
      {
        icon: MdOutlineHistory,
        href: "/dashboard/doctor/appointment-requests",
        label: "Appointment Requests",
      },
      {
        icon: MdReviews,
        href: "/dashboard/doctor/prescription-management",
        label: "Prescription Management",
      },
      {
        icon: CgProfile,
        href: "/dashboard/doctor/profile",
        label: "Profile",
      },
    ],
    admin: [
      {
        icon: MdOutlineDashboard,
        href: "/dashboard/admin",
        label: "Dashboard",
      },
      {
        icon: LuUsers,
        href: "/dashboard/admin/manage-users",
        label: "Manage Users",
      },
      {
        icon: FaUserDoctor,
        href: "/dashboard/admin/manage-doctors",
        label: "Manage Doctors",
      },
      {
        icon: MdOutlineDateRange,
        href: "/dashboard/admin/manage-appointments",
        label: "Manage Appointments",
      },
      {
        icon: FaMoneyBill,
        href: "/dashboard/admin/payment-management",
        label: "Payment Management",
      },
      {
        icon: IoAnalyticsOutline,
        href: "/dashboard/admin/analytics",
        label: "Analytics",
      },
    ],
  };

  const navLinks = allNavItems[user?.role] || [];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navLinks.map((link) => (
        <Link
          href={link?.href}
          key={link.label}
          className="block w-full hover:bg-black/20"
        >
          <Button
            className={`h-auto bg-transparent flex items-center gap-3 rounded-xl px-7 py-1.5 text-sm transition-colors ${pathname === link?.href ? "text-white!" : "color-muted"}`}
            type="button"
          >
            <link.icon className="size-5" />
            {link.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return navContent;
};

export default DashboardNavContent;
