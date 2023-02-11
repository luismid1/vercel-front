import { AuthContextProvider } from "@/context/authContext";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import type { AppProps } from "next/app";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "rgba(252,102,3,.867)",
      contrastText: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#063f37",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
