"use client";

import React, { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { authClient } from "@/lib/auth-client";
import AvatarDropdown from "./AvatarDropdown";
import DNALoader from "../loading/DNALoader";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className={`text-sm ${pathname === "/" ? "color-primary font-semibold" : "color-tertiary"}`}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/find-doctors"
          className={`text-sm ${pathname === "/find-doctors" ? "color-primary font-semibold" : "color-tertiary"}`}
        >
          Find Doctors
        </Link>
      </li>

      <li>
        <Link
          href="/about-us"
          className={`text-sm ${pathname === "/about-us" ? "color-primary font-semibold" : "color-tertiary"}`}
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          href="/contact-us"
          className={`text-sm ${pathname === "/contact-us" ? "color-primary font-semibold" : "color-tertiary"}`}
        >
          Contact Us
        </Link>
      </li>

      {user?.email && (
        <li>
          <Link
            href={`/dashboard/${user?.role}`}
            className={`text-sm ${pathname === `/dashboard/${user?.role}` ? "color-primary font-semibold" : "color-tertiary"}`}
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <motion.nav
      className="sticky top-0 z-40 w-full bg-white border-b border-separator"
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <header className="flex h-16 items-center justify-between max-w-7xl mx-auto px-5">
        <div className="flex items-center gap-4">
          <Button
            className="md:hidden px-0 h-auto bg-transparent color-tertiary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <RxCross2 /> : <RiMenu2Line />}
          </Button>

          <Link href="/" className={"flex gap-1 items-center"}>
            <Image
              src={"/images/medicare-logo.png"}
              alt="MediCare Logo"
              width={40}
              height={30}
              className="w-8 h-8"
            />

            <span className="text-lg font-bold color-tertiary">MediCare</span>
          </Link>
        </div>

        <ul className="hidden items-center gap-4 md:flex">{navLinks}</ul>

        <div>
          {isPending ? (
            <DNALoader height={"40"} width={"40"} />
          ) : user ? (
            <AvatarDropdown user={user} />
          ) : (
            <div className="flex items-center">
              <Link href="/login">
                <Button className={"px-0 h-auto bg-transparent color-tertiary"}>
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className={"px-0 h-auto bg-transparent color-primary"}>
                  /Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* toggle menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute md:hidden mx-5 mt-1 max-w-fit rounded-xl backdrop-blur-xl border border-[#17a2b8] shadow-lg"
          >
            <ul className="flex flex-col gap-1.5 p-3">{navLinks}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
