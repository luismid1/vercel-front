import Head from "next/head";

import Box from "@mui/material/Box";
import Link from "next/link";
import { AppContainer } from "@/Components";
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Doorvel</title>
        <meta name="description" content="Doorvel, venta de propiedades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContainer style={{ minHeight: "100vh" }}>
        <Box flex={1} textAlign="center">
          <Typography fontSize={36} variant="h1" marginBottom={1}>
            Bienvenido a Doorvel
          </Typography>
          <Link href={"/amenidades"}>
            <Button variant="contained">Conoce nuestras amenidades</Button>
          </Link>
        </Box>
      </AppContainer>
    </>
  );
}
