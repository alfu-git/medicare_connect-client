"use client";

import { AlertDialog, Button } from "@heroui/react";
import React, { useState } from "react";

const DeleteAlertDialog = ({
  triggerBtnClass = "",
  triggerBtnText = "Delete",
  dialogHeading = "Delete permanently?",
  dialogDesBoldText = "Forever",
  functionName,
  functionParams,
  deleteCancelBtnText = "Cancel",
  deleteConfirmBtnText = "Delete",
  loadingValue = false,
  loadingTimeText = "Deleting...",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (functionName) {
      functionParams ? functionName(functionParams) : functionName();
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="danger" className={triggerBtnClass}>
        {triggerBtnText}
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>{dialogHeading}</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{dialogDesBoldText}</strong> and all of its data. This
                action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                {deleteCancelBtnText}
              </Button>

              <Button
                variant="danger"
                isDisabled={loadingValue}
                onClick={handleDeleteConfirm}
              >
                {loadingValue ? loadingTimeText : deleteConfirmBtnText}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
