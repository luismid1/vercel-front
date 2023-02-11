import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { CustomSnackbar } from "@/Components";
import { Message } from "../common/CustomSnackbar";

type Props = {
  message: Message | undefined;
  setMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  children: React.ReactNode;
  title: string;
};

const AuthContainer = ({
  message,
  setMessage,
  handleSubmit,
  children,
  title,
}: Props) => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomSnackbar message={message} setMessage={setMessage} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default AuthContainer;
