"use client";
import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

// import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { BsEnvelope } from "react-icons/bs";
import { LuLock } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import GoogleLoginBtn from "../shared/GoogleLoginBtn";

const LogInForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        callbackURL: "/",
      });

      setLoading(false);

      if (error) {
        toast.error(<h6 className="font-bold">{error.message}</h6>);
      }

      if (data) {
        toast.success(<h6 className="font-bold">Login Successful</h6>);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      toast.error(<h6 className="font-bold">{error.message}</h6>);
    }

    if (data) {
      toast.success(<h6 className="font-bold">Login Successful</h6>);
      router.push("/");
    }
  };

  const inputGroupClass =
    "bg-[#FCFBF8] dark:bg-white/1 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#17a2b8] focus-within:shadow-lg-[#17a2b8] focus-within:shadow-[0_0_10px_#17a2b8] transition-all duration-500";

  return (
    <div
      className={`px-5 sm:px-10 pt-5 sm:pt-10 pb-10 sm:pb-20 bg-white rounded-2xl shadow-[0_0_20px_#17a2b8]`}
    >
      <Form onSubmit={handleOnSubmit} className="space-y-6">
        {/* email */}
        <TextField
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label className="color-tertiary">Email address</Label>

          <InputGroup className={inputGroupClass}>
            <InputGroup.Prefix>
              <BsEnvelope className="size-4 text-primary" />
            </InputGroup.Prefix>

            <InputGroup.Input
              name="email"
              placeholder="you@example.com"
              className={"pl-3"}
            />
          </InputGroup>

          <FieldError />
        </TextField>

        {/* password */}
        <TextField
          minLength={8}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
              return "Password must contain at least one special character";
            }

            return null;
          }}
        >
          <Label className="color-tertiary">Password</Label>

          <InputGroup className={inputGroupClass}>
            <InputGroup.Prefix>
              <LuLock className="size-4 text-primary" />
            </InputGroup.Prefix>

            <InputGroup.Input
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="Create a password"
              className={"pl-3"}
            />

            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <FaRegEye className="size-4" />
                ) : (
                  <FaRegEyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <Description>Must be at least 8 characters</Description>

          <FieldError />
        </TextField>

        {/* login button */}
        <Button
          isDisabled={loading}
          type="submit"
          className={
            "w-full bg-[#17a2b8] hover:bg-[#17a2b8]/80 active:bg-[#17a2b8]/90 rounded-md"
          }
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>

      <div className="my-6 flex items-center">
        <div className="grow border-t border-[#9b9b9b]"></div>

        <span className="mx-2 color-muted dark:text-white/80 text-sm uppercase">
          OR
        </span>

        <div className="grow border-t border-[#9b9b9b]"></div>
      </div>

      <GoogleLoginBtn />

      <p className="mt-6 color-tertiary text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[#17a2b8] hover:text-[#17a2b8]/80"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LogInForm;
