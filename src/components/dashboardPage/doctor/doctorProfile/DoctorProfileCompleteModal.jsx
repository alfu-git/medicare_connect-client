"use client";

import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  useOverlayState,
  Select,
  ListBox,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const days = [
  {
    id: "Sunday",
    textValue: "Sunday",
    value: "Sunday",
  },
  {
    id: "Monday",
    textValue: "Monday",
    value: "Monday",
  },
  {
    id: "Tuesday",
    textValue: "Tuesday",
    value: "Tuesday",
  },
  {
    id: "Wednesday",
    textValue: "Wednesday",
    value: "Wednesday",
  },
  {
    id: "Thursday",
    textValue: "Thursday",
    value: "Thursday",
  },
  {
    id: "Friday",
    textValue: "Friday",
    value: "Friday",
  },
  {
    id: "Saturday",
    textValue: "Saturday",
    value: "Saturday",
  },
];

const timeSlots = [
  { id: "09:00", value: "09:00 AM" },
  { id: "10:00", value: "10:00 AM" },
  { id: "11:00", value: "11:00 AM" },
  { id: "12:00", value: "12:00 PM" },
  { id: "02:00", value: "02:00 PM" },
  { id: "03:00", value: "03:00 PM" },
  { id: "04:00", value: "04:00 PM" },
  { id: "05:00", value: "05:00 PM" },
];

const DoctorProfileCompleteModal = ({
  user,
  postDoctorDataFunctionWrapper,
}) => {
  const [specializationValue, setSpecializationValue] = useState("");
  const [qualificationsValue, setQualificationsValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [hospitalNameValue, setHospitalNameValue] = useState("");
  const [consultationValue, setConsultationValue] = useState(0);
  const [availableDaysValue, setAvailableDaysValue] = useState([]);
  const [availableTimeValue, setAvailableTimeValue] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const state = useOverlayState();

  const formInComplete =
    !specializationValue ||
    !qualificationsValue ||
    !experienceValue ||
    !hospitalNameValue ||
    consultationValue <= 0 ||
    availableDaysValue.length === 0 ||
    availableTimeValue.length === 0;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (formInComplete) {
      return;
    }

    const doctorData = {
      userId: user?.id,
      doctorName: user?.name || "Doctor",
      profileImage: user?.image || "",
      specialization: specializationValue || "",
      qualifications: qualificationsValue || "",
      experience: experienceValue || "",
      consultationFee: Number(consultationValue) || 0,
      hospitalName: hospitalNameValue || "",
      availableDays: availableDaysValue || [],
      availableSlots: availableTimeValue || [],
      verificationStatus: "pending",
    };

    try {
      setLoading(true);

      const res = await postDoctorDataFunctionWrapper(doctorData);

      if (res?.insertedId) {
        toast.success("Thank Your Update Your Information");
        router.refresh();
        state.close();
      }
    } catch (err) {
      toast.error("Something Went Wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal state={state}>
      <Button
        onPress={state.open}
        className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto shadow-md hover:shadow-lg transition"
      >
        Complete Now
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog
            className={`sm:max-w-2xl ${formInComplete ? "border-2 border-red-500" : ""}`}
          >
            <Modal.CloseTrigger />

            <Modal.Heading>
              {formInComplete && (
                <p className="text-red-500 text-sm text-center">
                  Please fill all the field
                </p>
              )}
            </Modal.Heading>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form onSubmit={handleOnSubmit} className="space-y-6">
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

                  {/* available days + slots */}
                  <div className="flex flex-col lg:flex-row gap-3 items-center">
                    <Select
                      className="w-full"
                      placeholder="Select days"
                      selectionMode="multiple"
                      value={availableDaysValue}
                      onChange={(value) => setAvailableDaysValue(value)}
                    >
                      <Label className="text-base color-tertiary">
                        Available Days
                      </Label>

                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox selectionMode="multiple">
                          {days.map((day, index) => (
                            <ListBox.Item
                              key={index}
                              id={day.id}
                              textValue={day.textValue}
                            >
                              {day.value}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    <Select
                      className="w-full"
                      placeholder="Select days"
                      selectionMode="multiple"
                      value={availableTimeValue}
                      onChange={(value) => setAvailableTimeValue(value)}
                    >
                      <Label className="text-base color-tertiary">
                        Available Time
                      </Label>

                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox selectionMode="multiple">
                          {timeSlots.map((time, index) => (
                            <ListBox.Item
                              key={index}
                              id={time.id}
                              textValue={time.value}
                            >
                              {time.value}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

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
                      isDisabled={formInComplete || loading}
                      type="submit"
                      className={
                        "bg-[#17a2b8] hover:bg-[#17a2b8]/80 active:bg-[#17a2b8]/90 rounded-md"
                      }
                    >
                      {loading ? "Please Wait..." : "Submit"}
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

export default DoctorProfileCompleteModal;
