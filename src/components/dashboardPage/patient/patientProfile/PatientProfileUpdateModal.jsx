"use client";

import { imageUpload } from "@/lib/helpers/image-upload";
import {
  Form,
  InputGroup,
  Modal,
  Surface,
  TextField,
  Label,
  Button,
  FieldError,
  useOverlayState,
  Input,
  RadioGroup,
  Radio,
} from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const PatientProfileUpdateModal = ({ user, updatePatientProfileWrapper }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.image);

  // Track form field changes
  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [number, setNumber] = useState(user?.number || "");
  const [gender, setGender] = useState(user?.gender || "Male");

  const state = useOverlayState();

  // ১. চেক করা হচ্ছে ডেটাতে কোনো পরিবর্তন এসেছে কিনা
  const hasChanges =
    name !== (user?.name || "") ||
    Number(age) !== Number(user?.age || 0) ||
    number !== (user?.number || "") ||
    gender !== (user?.gender || "Male") ||
    !!imageFile;

  // ২. আপনার দেওয়া নতুন ভ্যালিডেশন রুলস (Age >= 10 এবং Number এর লেন্থ ঠিক ১১ হতে হবে)
  const isValidInput = Number(age) >= 10 && number.trim().length === 11;

  // ডেটা পরিবর্তন হতে হবে এবং একই সাথে ইনপুট ভ্যালিড হতে হবে তবেই বাটন কাজ করবে
  const isChanged = hasChanges && isValidInput;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // 1. Only upload image if a new file was actually selected
    let imageUrl = user?.image;

    if (imageFile) {
      const uploadResult = await imageUpload(imageFile);
      imageUrl = uploadResult?.url || user?.image;
    }

    const updatedData = {
      name,
      image: imageUrl,
      age: Number(age),
      number,
      gender,
    };

    try {
      setLoading(true);

      const res = await updatePatientProfileWrapper(updatedData);

      if (res?.modifiedCount > 0) {
        toast.success("Profile Update Successful");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
      state.close();
    }
  };

  const inputGroupClass =
    "bg-[#FCFBF8] dark:bg-white/1 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#17a2b8] focus-within:shadow-lg-[#17a2b8] focus-within:shadow-[0_0_10px_#17a2b8] transition-all duration-500";

  return (
    <Modal state={state}>
      <Button
        onPress={state.open}
        className="flex items-center gap-2 px-5 py-2.5 text-white font-medium rounded-xl 
          bg-linear-to-r from-[#17a2b8] via-[#0b0b3b] to-[#0c2f25] 
          shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
      >
        <AiOutlineEdit className="text-lg" />
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form onSubmit={handleOnSubmit} className="space-y-6">
                  {/* name */}
                  <TextField type="text">
                    <Label className="text-base color-tertiary">
                      Full name
                    </Label>
                    <InputGroup className={inputGroupClass}>
                      <InputGroup.Prefix>
                        <FaRegUser className="size-4 text-primary" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        name="name"
                        placeholder="Enter your name"
                        className="pl-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                    <FieldError />
                  </TextField>

                  {/* image */}
                  <TextField type="file">
                    <Label>Profile Image</Label>
                    <div
                      className="relative flex flex-col items-center justify-center border-2 border-dashed border-[#17a2b8]/40 rounded-xl p-6 cursor-pointer bg-[#FCFBF8] dark:bg-white/5 hover:border-[#17a2b8] transition-all duration-300"
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
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
                          <p className="text-xs text-gray-400">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    <FieldError />
                  </TextField>

                  {/* age + number */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <TextField name="age" type="number" className="w-full">
                      <Label className="text-base mb-2">Age</Label>
                      <Input
                        max="150"
                        min="10"
                        placeholder="18 years"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </TextField>

                    <TextField name="number" className="w-full">
                      <Label className="text-base mb-2">Phone</Label>
                      <Input
                        placeholder="+880 000-0000"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </TextField>
                  </div>

                  {/* gender */}
                  <div className="flex flex-col gap-4">
                    <Label className="text-base">Gender</Label>
                    <RadioGroup
                      value={gender}
                      onChange={setGender}
                      name="gender"
                      orientation="horizontal"
                    >
                      <Radio value="Male">
                        <Radio.Content>
                          <Radio.Control>
                            <Radio.Indicator />
                          </Radio.Control>
                          Male
                        </Radio.Content>
                      </Radio>

                      <Radio value="Female">
                        <Radio.Content>
                          <Radio.Control>
                            <Radio.Indicator />
                          </Radio.Control>
                          Female
                        </Radio.Content>
                      </Radio>
                    </RadioGroup>
                  </div>

                  {/* CTA */}
                  <Modal.Footer>
                    <Button
                      slot="close"
                      variant="secondary"
                      className="rounded-md"
                    >
                      Cancel
                    </Button>

                    <Button
                      isDisabled={loading || !isChanged}
                      type="submit"
                      className="bg-[#17a2b8] hover:bg-[#17a2b8]/80 active:bg-[#17a2b8]/90 rounded-md text-white"
                    >
                      {loading ? "Updating..." : "Update"}
                    </Button>
                  </Modal.Footer>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default PatientProfileUpdateModal;
