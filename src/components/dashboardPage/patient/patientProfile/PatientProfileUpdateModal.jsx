"use client";

import { authClient } from "@/lib/auth-client";
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
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const PatientProfileUpdateModal = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.image);
  const [name, setName] = useState(user?.name);

  const router = useRouter();
  const state = useOverlayState();

  const isChanged = name !== user?.name || !!imageFile;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await imageUpload(imageFile);

    try {
      setLoading(true);

      const { data, error } = await authClient.updateUser({
        name: name || user?.name,
        image: imageUrl?.url || user?.image,
      });

      setLoading(false);

      if (error) {
        toast.error(<p className="font-bold">Something Went Wrong!</p>);
      }

      if (data) {
        toast.success(<h6 className="font-bold">Update Successful</h6>);
        state.close();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
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
                  <TextField type="text" defaultValue={user?.name}>
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
                        className={"pl-3"}
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

                  {/* CTA */}
                  <Modal.Footer>
                    <Button
                      slot="close"
                      variant="secondary"
                      className={"rounded-md"}
                    >
                      Cancel
                    </Button>

                    <Button
                      isDisabled={loading || !isChanged}
                      type="submit"
                      className={
                        "bg-[#17a2b8] hover:bg-[#17a2b8]/80 active:bg-[#17a2b8]/90 rounded-md"
                      }
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
