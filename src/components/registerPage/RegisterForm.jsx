"use client";

import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  InputGroup,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { LuLock } from "react-icons/lu";
import Image from "next/image";
import { imageUpload } from "@/lib/helpers/image-upload";

const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { name, email, password, role } = userData;

    if (!name || !email || !password || !imageFile || !role) {
      setFormError("Please fill in all fields before submitting.");
      return;
    }

    const imageUrl = await imageUpload(imageFile);

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: name,
        email: email,
        image: imageUrl?.url,
        password: password,
        role,
      });

      setLoading(false);

      if (error) {
        toast.error(<p className="font-bold">Something Went Wrong!</p>);
      }

      if (data) {
        toast.success(<h6 className="font-bold">Register Completed</h6>);
        router.push("login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputGroupClass =
    "bg-[#FCFBF8] dark:bg-white/1 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#17a2b8] focus-within:shadow-lg-[#17a2b8] focus-within:shadow-[0_0_10px_#17a2b8] transition-all duration-500";

  return (
    <div
      className={`px-5 sm:px-10 pt-5 sm:pt-10 pb-10 sm:pb-20 bg-white rounded-2xl shadow-[0_0_20px_#17a2b8] ${formError ? "border border-red-500" : ""}`}
    >
      {formError && (
        <div className="mb-4 text-red-500 text-sm font-medium">{formError}</div>
      )}

      <Form onSubmit={handleOnSubmit} className="space-y-6">
        {/* name */}
        <TextField type="text">
          <Label className="text-base color-tertiary">Full name</Label>

          <InputGroup className={inputGroupClass}>
            <InputGroup.Prefix>
              <FaRegUser className="size-4 text-primary" />
            </InputGroup.Prefix>

            <InputGroup.Input
              name="name"
              placeholder="Enter your name"
              className={"pl-3"}
            />
          </InputGroup>

          <FieldError />
        </TextField>

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
          <Label>Email address</Label>

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

        {/* image */}
        <TextField type="file">
          <Label>Profile Image</Label>

          <div
            className="relative flex flex-col items-center justify-center border-2 border-dashed border-[#17a2b8]/40 rounded-xl p-6 cursor-pointer bg-[#FCFBF8] dark:bg-white/5 hover:border-[#17a2b8] transition-all duration-300"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const maxSize = 5 * 1024 * 1024;

                if (file.size > maxSize) {
                  alert("Image size must be less than 5MB");
                  e.target.value = "";
                  return;
                }

                setImageFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview ? (
              <div className="relative">
                <Image
                  src={preview}
                  alt="preview"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#17a2b8]"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setImageFile(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#17a2b8]/10 flex items-center justify-center">
                  📷
                </div>

                <p className="text-sm text-gray-600 dark:text-white/70">
                  Click to upload
                </p>

                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>

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
          <Label>Password</Label>

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

        {/* role */}
        <div>
          <RadioGroup name="role" value={value} onChange={setValue}>
            <Label className="color-tertiary">Role</Label>

            <div className="flex gap-5 items-center">
              <Radio value="patient">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>

                  <span className="color-tertiary">Patient</span>
                </Radio.Content>
              </Radio>

              <Radio value="doctor">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>

                  <span className="color-tertiary">Doctor</span>
                </Radio.Content>
              </Radio>
            </div>
          </RadioGroup>
        </div>

        {/* register button */}
        <Button
          isDisabled={loading}
          type="submit"
          className={
            "w-full bg-[#17a2b8] hover:bg-[#17a2b8]/80 active:bg-[#17a2b8]/90 rounded-md"
          }
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>

      <p className="my-6 flex gap-1 flex-wrap justify-center color-tertiary text-xs text-center">
        <span>By creating an account, you agree to our</span>
        <Link href={"/"} className="text-[#17a2b8] hover:text-[#17a2b8]/80">
          Terms of Service
        </Link>
        and
        <Link href={"/"} className="text-[#17a2b8] hover:text-[#17a2b8]/80">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center color-tertiary text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#17a2b8] hover:text-[#17a2b8]/80"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
