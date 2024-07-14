import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { Schema, defaultValues } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import {
  useDemora,
  useFuncion,
  useMediosTec,
  useOfi,
  useOficial,
  useTipoControl,
  useTipoPro,
  useTipoVuelo,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckBox } from "../../components/RHFCheckBox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFTextField } from "../../components/RHFTextField";
import { useEffect } from "react";

export function Planillas() {
  const tipoControlQuery = useTipoControl();
  const funcionQuery = useFuncion();
  const demoraQuery = useDemora();
  const medioTecQuery = useMediosTec();
  const tipoProQuery = useTipoPro();
  const tipoVueloQuery = useTipoVuelo();
  const oficialQuery = useOficial();

  const { unregister, watch, control, reset, setValue } =
    useFormContext<Schema>();

  const _id = useWatch({ name: "_id" });

  const ofiQuery = useOfi(_id);

  useEffect(() => {
    const sub = watch((value) => {
      value;
    });
    return () => sub.unsubscribe();
  }, [watch]);

  const handleOfiClick = (_id: string) => {
    setValue("datosPsa.responsable", _id);
  };

  useEffect(() => {
    if (ofiQuery.data) {
      reset(ofiQuery.data);
    }
  }, [reset, ofiQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container maxWidth="sm" component="form">
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List
          subheader={<ListSubheader>Oficiales</ListSubheader>}
          sx={{ padding: 2 }}
        >
          {oficialQuery.data?.map((oficial) => (
            <ListItem key={oficial._id} disablePadding>
              <ListItemButton
                onClick={() => handleOfiClick(oficial._id)}
                selected={_id === oficial._id}
              >
                <ListItemText
                  primary={oficial.firstname + " " + oficial.lastname}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {_id ? (
            <Box>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {ofiQuery.data?.lastname}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {ofiQuery.data?.firstname}
                  </Typography>
                  <Typography variant="body2">
                    {ofiQuery.data?.legajo}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ) : null}
        </List>
        <Stack
          justifyContent="flex-start"
          sx={{ gap: 2, py: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <RHFTextField<Schema> name="datosPsa.responsable" label="Nombre" />
          <RHFTextField<Schema> name="datosVuelo.aerolinea" label="E-Mail" />

          <RHFAutocomplete<Schema>
            name="datosPsa.tipoControl"
            options={tipoControlQuery.data}
            label="Tipo de Controles"
          />
          <RHFToggleButtonGroup<Schema>
            name="datosTerrestre"
            options={funcionQuery.data}
          ></RHFToggleButtonGroup>
          <RHFRadioGroup<Schema>
            name="datosVuelo.demora"
            options={demoraQuery.data}
            label="Demora"
          ></RHFRadioGroup>
          <RHFCheckBox<Schema>
            name="datosPsa.medioTec"
            options={medioTecQuery.data}
            label="Medios Técnicos"
          ></RHFCheckBox>
          <RHFDateTimePicker<Schema>
            name="datosPsa.horaIni"
            label="Comienzo Vuelo"
          />
          <RHFCheckBox<Schema>
            name="datosPsa.tipoPro"
            options={tipoProQuery.data}
            label="Tipo de Procedimientos"
          ></RHFCheckBox>
          <RHFRadioGroup<Schema>
            name="datosVuelo.tipoVuelo"
            options={tipoVueloQuery.data}
            label="Tipo de Vuelo"
          ></RHFRadioGroup>

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">New User</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
