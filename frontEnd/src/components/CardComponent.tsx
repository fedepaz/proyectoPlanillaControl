"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { OficialSchemaInput } from "../planillas/types/apiSchema";

interface CardComponentProps {
  oficialObject: OficialSchemaInput;
}

export default function CardComponent({ oficialObject }: CardComponentProps) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        textAlign: "center",
        boxShadow: 3,
        border: "1px solid",
        borderColor: "primary.light",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5">
          {oficialObject.firstname} {oficialObject.lastname}
        </Typography>
        <Typography gutterBottom sx={{ color: "text.secondary" }}>
          Dni {oficialObject.dni}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Legajo {oficialObject.legajo}
        </Typography>
      </CardContent>
    </Card>
  );
}
