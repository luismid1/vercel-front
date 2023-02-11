import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const AppContainer = ({ children, style }: Props) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();

    router.push("/auth/login");
  };

  return (
    <main style={style} className="appbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Box display="flex" width="100%" justifyContent="space-between">
            <Toolbar>
              <Link href="/">
                <Button color="inherit">Doorvel</Button>
              </Link>
            </Toolbar>
            <Box display="flex">
              <Toolbar>
                <Link href="/me">
                  <Button color="inherit">Mi perfil</Button>
                </Link>
              </Toolbar>
              <Toolbar>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </Toolbar>
            </Box>
          </Box>
        </AppBar>
      </Box>
      {children}
    </main>
  );
};

export default AppContainer;
