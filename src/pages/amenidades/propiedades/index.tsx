import Head from "next/head";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { Property } from "@/interfaces";
import {
  Message,
  CustomSnackbar,
  AppContainer,
  CardProperty,
} from "@/Components";
import { API, DOORVEL_API } from "@/constants";

type Props = {
  properties: Property[];
};

const HousesBasedOnAmenities = ({ properties }: Props) => {
  const [message, setMessage] = useState<Message | undefined>(undefined);

  const handleBoughtProperty = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      const resp = await axios.post(
        `${API}/bought`,
        { property: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        message:
          "Felicidades por tu compra! Puedes ver tus transacciones en tu perfil.",
        severity: "success",
      });
    } catch (err: any) {
      setMessage({ message: err.response.data.msg, severity: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Doorvel | Propiedades con amenidades</title>
        <meta name="description" content="Doorvel, amenidades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContainer>
        <CustomSnackbar message={message} setMessage={setMessage} />
        <Box
          marginLeft="auto"
          marginRight="auto"
          maxWidth={1200}
          padding={{ xs: 2, md: 4 }}
        >
          {properties.length > 0 ? (
            <Grid
              alignItems="center"
              alignContent="center"
              container
              width="100%"
              rowSpacing={{ xs: 1, sm: 2, md: 4 }}
              columnSpacing={{ xs: 0, sm: 2, md: 4 }}
            >
              {properties.map((property, i) => (
                <Grid xs={12} sm={6} md={6} key={i} item>
                  <CardProperty
                    title={property.title}
                    subtitle={property.address_country}
                    image={property.photos[0]}
                    action={{
                      title: "Comprar propiedad",
                      onClick: () => handleBoughtProperty(property.id),
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>
              No se encontraron propiedades con esta amenidad.
            </Typography>
          )}
        </Box>
      </AppContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  try {
    const data = await axios.get(
      `${DOORVEL_API}/properties/?category=${query.category}`
    );
    return {
      props: {
        properties: data.data.results,
      },
    };
  } catch (err) {
    return {
      props: {
        properties: [],
      },
    };
  }
};

export default HousesBasedOnAmenities;
