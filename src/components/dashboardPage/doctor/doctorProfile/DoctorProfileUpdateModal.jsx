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
} from "@heroui/react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const DoctorProfileUpdateModal = ({ doctor, updateDoctorProfileWrapper }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(doctor?.profileImage);

  const [name, setName] = useState(doctor?.doctorName || "");
  const [specializationValue, setSpecializationValue] = useState(
    doctor?.specialization || "",
  );
  const [qualificationsValue, setQualificationsValue] = useState(
    doctor?.qualifications || "",
  );
  const [experienceValue, setExperienceValue] = useState(
    doctor?.experience || "",
  );
  const [hospitalNameValue, setHospitalNameValue] = useState(
    doctor?.hospitalName || "",
  );
  const [consultationValue, setConsultationValue] = useState(
    doctor?.consultationFee || 0,
  );

  const state = useOverlayState();

  // ✅ check যদি কিছু change হয়
  const isChanged = useMemo(() => {
    return (
      name !== doctor?.doctorName ||
      specializationValue !== doctor?.specialization ||
      qualificationsValue !== doctor?.qualifications ||
      experienceValue !== doctor?.experience ||
      hospitalNameValue !== doctor?.hospitalName ||
      Number(consultationValue) !== doctor?.consultationFee ||
      imageFile !== null
    );
  }, [
    name,
    specializationValue,
    qualificationsValue,
    experienceValue,
    hospitalNameValue,
    consultationValue,
    imageFile,
    doctor,
  ]);

  // ✅ required validation
  const isValid = useMemo(() => {
    return (
      name &&
      specializationValue &&
      qualificationsValue &&
      experienceValue &&
      hospitalNameValue &&
      Number(consultationValue) > 0
    );
  }, [
    name,
    specializationValue,
    qualificationsValue,
    experienceValue,
    hospitalNameValue,
    consultationValue,
  ]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = doctor?.profileImage;

    try {
      setLoading(true);

      if (imageFile) {
        const uploadResult = await imageUpload(imageFile);
        imageUrl = uploadResult?.url || doctor?.profileImage;
      }

      // ✅ final payload
      const updatedData = {
        doctorName: name,
        specialization: specializationValue,
        qualifications: qualificationsValue,
        experience: experienceValue,
        hospitalName: hospitalNameValue,
        consultationFee: Number(consultationValue),
        profileImage: imageUrl,
      };

      const res = await updateDoctorProfileWrapper(updatedData);

      if (res?.modifiedCount > 0) {
        toast.success("Profile Updated Successfully!");
        state.close();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
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
          <Modal.Dialog className="sm:max-w-2xl">
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
                              setPreview(doctor?.profileImage);
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

                  {/* specialization + qualifications */}
                  <div className="flex flex-col md:flex-row gap-3 items-center">
                    <TextField className="w-full" name="specialization">
                      <Label className="text-base color-tertiary">
                        Specialization
                      </Label>

                      <Input
                        placeholder="Enter your specialization"
                        value={specializationValue}
                        onChange={(e) => setSpecializationValue(e.target.value)}
                      />
                    </TextField>

                    <TextField className="w-full" name="qualifications">
                      <Label className="text-base color-tertiary">
                        Qualifications
                      </Label>

                      <Input
                        placeholder="Enter your qualifications"
                        value={qualificationsValue}
                        onChange={(e) => setQualificationsValue(e.target.value)}
                      />
                    </TextField>
                  </div>

                  {/* experience + hospital +  consultation */}
                  <div className="flex flex-col lg:flex-row gap-3 items-center">
                    <TextField className="w-full" name="experience">
                      <Label className="text-base color-tertiary">
                        Experience
                      </Label>

                      <Input
                        placeholder="Enter your experience"
                        value={experienceValue}
                        onChange={(e) => setExperienceValue(e.target.value)}
                      />
                    </TextField>

                    <TextField className="w-full" name="hospitalName">
                      <Label className="text-base color-tertiary">
                        Hospital Name
                      </Label>

                      <Input
                        placeholder="Enter your hospital name"
                        value={hospitalNameValue}
                        onChange={(e) => setHospitalNameValue(e.target.value)}
                      />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="consultationFee"
                      type="number"
                    >
                      <Label className="text-base color-tertiary">
                        Consultation Fee
                      </Label>

                      <Input
                        placeholder="Enter your fee"
                        min={0}
                        value={consultationValue}
                        onChange={(e) => setConsultationValue(e.target.value)}
                      />
                    </TextField>
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
                      type="submit"
                      isDisabled={!isValid || !isChanged || loading}
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

export default DoctorProfileUpdateModal;
