"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <motion.footer
      className="bg-secondary text-white"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <Link href={"/"} className="flex items-center gap-2 mb-3">
              <Image
                src="/images/medicare-logo.png"
                alt="logo"
                width={40}
                height={40}
                className="w-8 h-8"
              />

              <span className="text-lg font-bold">MediCare</span>
            </Link>

            <p className="text-sm opacity-80">
              Trusted healthcare platform to find doctors, book appointments,
              and get medical support anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white! mb-3">Quick Links</h3>

            <ul className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="max-w-fit opacity-80 hover:text-[#17a2b8]"
              >
                Home
              </Link>

              <Link
                href="/find-doctors"
                className="max-w-fit opacity-80 hover:text-[#17a2b8]"
              >
                Find Doctors
              </Link>

              <Link
                href="/about-us"
                className="max-w-fit opacity-80 hover:text-[#17a2b8]"
              >
                About Us
              </Link>

              <Link
                href="/contact-us"
                className="max-w-fit opacity-80 hover:text-[#17a2b8]"
              >
                Contact Us
              </Link>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-3 text-white!">Contact</h3>

            <ul className="flex flex-col gap-2 text-sm">
              <li className="opacity-95">Email: medicare@gmail.com</li>
              <li className="opacity-95">Phone: +880 1819769176</li>
              <li className="opacity-95 flex gap-2 items-center">
                <span>Location:</span>
                <address>Khulna, Bangladesh</address>{" "}
              </li>
            </ul>
          </div>

          {/* Emergency + Social */}
          <div>
            <h3 className="font-semibold mb-3 text-white!">Emergency</h3>

            <p className="text-lg font-bold color-primary mb-3">999</p>

            <h4 className="text-sm font-medium mb-2 text-white! opacity-95">
              Follow Us
            </h4>

            <div className="flex gap-3">
              <Link
                href={"/"}
                className="p-2 rounded-full border hover:bg-[#17a2b8] hover:text-white transition"
              >
                <FaFacebookF size={14} />
              </Link>

              <Link
                href={"/"}
                className="p-2 rounded-full border hover:bg-[#17a2b8] hover:text-white transition"
              >
                <FaTwitter size={14} />
              </Link>

              <Link
                href={"/"}
                className="p-2 rounded-full border hover:bg-[#17a2b8] hover:text-white transition"
              >
                <FaLinkedinIn size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-5 text-center text-sm opacity-80">
          © {new Date().getFullYear()} MediCare. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
