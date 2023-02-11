import React from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { AppContainer } from "@/Components";
import {
  AmentiesChildResponse,
  AmenityParent,
  AmenityChild,
} from "@/interfaces";
import { DOORVEL_API } from "@/constants";

type Props = {
  amenities: AmenityParent[];
  amenitiesChilds: Record<string, AmenityChild[]>;
};

const Amenities = ({ amenities, amenitiesChilds }: Props) => {
  return (
    <>
      <Head>
        <title>Doorvel | Amenidades</title>
        <meta name="description" content="Doorvel, amenidades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContainer>
        <Box
          marginLeft="auto"
          marginRight="auto"
          maxWidth={1200}
          width="100%"
          padding={{ xs: 2, md: 4 }}
        >
          {amenities.map((amenity) => (
            <Accordion style={{ width: "100%" }} key={amenity.id}>
              <AccordionSummary
                style={{ width: "100%" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{amenity.name}</Typography>
              </AccordionSummary>
              {amenitiesChilds[amenity.id]?.map((child) => (
                <AccordionDetails
                  style={{ padding: 16, border: "1px solid lightgray" }}
                  key={child.id}
                >
                  <Typography>{child.name}</Typography>
                  <Box display="flex" justifyContent="flex-end" marginTop={1}>
                    <Link
                      href={`/amenidades/propiedades?category=${child.property_category}`}
                    >
                      <Button>Propiedades con la misma categoria</Button>
                    </Link>
                  </Box>
                </AccordionDetails>
              ))}
            </Accordion>
          ))}
        </Box>
      </AppContainer>
    </>
  );
};

export async function getStaticProps() {
  let parents: AmenityParent[] = [];

  try {
    const res = await axios.get<{ data: any[] }>(
      `${DOORVEL_API}/cat-amenities-parents`
    );

    parents = res.data.data;
  } catch (err: any) {
    parents = err.response.data.data;
  }

  const promises = parents.map((parent) =>
    axios.get<AmentiesChildResponse>(
      `${DOORVEL_API}/cat-amenities-childs/?id=&property_category_id=&amenity_parent_id=${parent.id}&name=&seo_friendly=&active_record=`
    )
  );

  const data = await Promise.all(promises);

  const allResults = data.map((d) => d.data.results);

  //Not working
  // const parentsMap = new Map();

  // parents.map((parent) => parentsMap.set(parent.id, parent));

  // const dataMap = new Map<number, AmenityChild[]>();

  // allResults.map((d) => d.length > 0 && dataMap.set(d[0].amenity_parent, d));

  const dataMap = allResults.reduce((a, b) => {
    if (b.length < 1) return a;

    return { ...a, [b[0].amenity_parent]: b };
  }, {});

  return {
    props: {
      amenities: parents,
      amenitiesChilds: dataMap,
    },
  };
}
export default Amenities;
