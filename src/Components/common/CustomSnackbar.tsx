import React from "react";

import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

export type Message = {
  message: string;
  severity: AlertColor;
};

type Props = {
  message: Message | undefined;
  setMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
};

const CustomSnackbar = ({ message, setMessage }: Props) => {
  const handleClose = () => {
    setMessage(undefined);
  };

  return (
    <Snackbar
      key={""}
      open={!!message}
      autoHideDuration={6000}
      onClose={handleClose}
      color="primary"
    >
      <Alert
        onClose={handleClose}
        severity={message && message.severity}
        sx={{ width: "100%" }}
      >
        {message?.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
