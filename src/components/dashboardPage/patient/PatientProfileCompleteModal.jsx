"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  useOverlayState,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PatientProfileCompleteModal = ({ completePatientProfileWrapper }) => {
  const [ageValue, setAgeValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const state = useOverlayState();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const formInComplete = !ageValue || numberValue.length !== 11;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const res = await completePatientProfileWrapper(userData);

      if (res?.modifiedCount > 0) {
        toast.success(
          `${user?.name || "Mr. Patient"}, thanks for update your profile`,
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
      state.close();
      router.push("/dashboard/patient/profile");
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
            className={`sm:max-w-xl ${formInComplete ? "border-2 border-red-500" : ""}`}
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
                  {/* gender */}
                  <div className="flex flex-col gap-4">
                    <Label className="text-base">Gender</Label>

                    <RadioGroup
                      defaultValue="Male"
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

                  {/* age + number */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <TextField
                      name="age"
                      type="number"
                      className={"w-full"}
                      value={ageValue}
                      onChange={(value) => setAgeValue(value)}
                    >
                      <Label className="text-base mb-2">Age</Label>

                      <Input max="150" min="10" placeholder="18 years" />
                    </TextField>

                    <TextField
                      name="number"
                      className={"w-full"}
                      value={numberValue}
                      onChange={(value) => setNumberValue(value)}
                    >
                      <Label className="text-base mb-2">Phone</Label>

                      <Input placeholder="+880 000-0000" />
                    </TextField>
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
                      {loading ? "Please Wait..." : "Update"}
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

export default PatientProfileCompleteModal;
