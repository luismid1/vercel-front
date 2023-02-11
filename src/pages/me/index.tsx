import React, { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { AppContainer, CardProperty } from "@/Components";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { Bought, Property } from "@/interfaces";
import { BoughtGetResponse } from "../../interfaces/api.interface";
import { API, DOORVEL_API } from "@/constants";

const MeComponent = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [boughts, setBoughts] = useState<Bought[]>([]);

  useEffect(() => {
    const getBoughts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get<BoughtGetResponse>(`${API}/bought`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoughts(resp.data.data.boughts);
      } catch (err) {
        setBoughts([]);
      } finally {
        setLoading(false);
      }
    };

    getBoughts();
  }, []);

  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);
      try {
        const promises = boughts.map((bought) =>
          axios.get(`${DOORVEL_API}/properties/?id=${bought.property}`)
        );

        const result = await Promise.all(promises);
        setProperties(result.map((d) => d.data.results).flatMap((d) => d));
      } catch (err) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, [boughts]);

  return (
    <AppContainer>
      <Box
        marginLeft="auto"
        marginRight="auto"
        maxWidth={1200}
        padding={{ xs: 2, md: 4 }}
      >
        {loading ? (
          <Typography>Cargando</Typography>
        ) : (
          <>
            <Typography fontWeight={100} fontSize={30} marginBottom={1}>
              Hola, {user?.name! || ""}!
            </Typography>

            {properties.length > 0 ? (
              <>
                <Typography fontWeight={100} fontSize={20} marginBottom={1}>
                  Estas son tus ultimas compras!
                </Typography>
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
                        subtitle={property.address_county}
                        image={property.photos[0]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Typography>No cuentas con propiedades compradas.</Typography>
            )}
          </>
        )}
      </Box>
    </AppContainer>
  );
};

export default MeComponent;
