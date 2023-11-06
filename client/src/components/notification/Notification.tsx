import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

import styles from "./styles.module.scss";

export const Notification = (): React.ReactElement => {
  const [open, setOpen] = useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.notification}
    >
      <DialogTitle id="alert-dialog-title">
        <strong>Thanks for checking out my demo app!</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please wait a few minutes while we wake up our hosting provider - it`s
          like a Monday morning for them.
        </DialogContentText>
        <DialogContentText>
          In a few minutes, we`ll be up and running at full speed!
        </DialogContentText>
        <img
          width="300px"
          height="215px"
          src="https://media.giphy.com/media/Vbu1MROenErCauNAet/giphy.gif"
          alt="wake-up"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
