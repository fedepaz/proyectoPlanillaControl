import React from "react";
import {
  HeaderConfig,
  PaperSize,
  PlanillaDetailData,
} from "../../types/searchById";
import { formatDate, formatTime } from "../../types/searchTypes";

const PlanillaPrintForm: React.FC<{
  planillaData: PlanillaDetailData;
  headerConfig: HeaderConfig;
  paperSize: PaperSize;
}> = ({ planillaData, headerConfig, paperSize }) => {
  const getCheckboxes = (
    options: Array<{ label: string }>,
    availableOptions: string[]
  ) => {
    return availableOptions.map((option) => ({
      label: option,
      checked: options.some((opt) => opt.label === option),
    }));
  };

  // Create rows for personnel tables (minimum 4 rows each)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createPersonnelRows = (personnel: any[], minRows = 4) => {
    const rows = [...personnel];
    while (rows.length < minRows) {
      rows.push(null);
    }
    return rows;
  };

  const tipoControlOptions = getCheckboxes(planillaData.datosPsa.tipoControl, [
    "Personas",
    "Equipos",
    "Cargas",
  ]);
  const medioTecOptions = getCheckboxes(planillaData.datosPsa.medioTec, [
    "Móvil",
    "Paletas",
    "Otros",
  ]);
  const tipoProOptions = getCheckboxes(planillaData.datosPsa.tipoPro, [
    "OSVC",
    "Aleatorio",
    "Rutina",
  ]);

  return (
    <div
      style={{
        width: paperSize.width,
        minHeight: paperSize.height,
        margin: "0 auto",
        backgroundColor: "white",
        padding: "15mm",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        fontSize: "10px",
        lineHeight: "1.2",
        color: "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            border: "2px solid #000",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "8px", fontWeight: "bold" }}>
            PSA
            <br />
            LOGO
          </span>
        </div>
        <div style={{ textAlign: "center", flex: 1, margin: "0 20px" }}>
          <div
            style={{
              border: "2px solid #000",
              padding: "8px",
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            PLANILLA DE CONTROL DE BODEGA UOSP {headerConfig.location}
          </div>
          {headerConfig.airportName && (
            <div
              style={{
                fontSize: "8px",
                fontStyle: "italic",
                color: "#666",
                marginTop: "2px",
                fontWeight: "normal",
              }}
            >
              {headerConfig.airportName}
            </div>
          )}
        </div>
        <div
          style={{
            width: "80px",
            height: "80px",
            border: "2px solid #000",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "8px", fontWeight: "bold" }}>
            OFFICIAL
            <br />
            LOGO
          </span>
        </div>
      </div>

      {/* Patrol and Service Order */}
      <div style={{ display: "flex", marginBottom: "15px" }}>
        <div
          style={{
            border: "1px solid #000",
            padding: "5px",
            width: "50%",
            marginRight: "10px",
          }}
        >
          <strong>PATRULLA:</strong>
        </div>
        <div style={{ border: "1px solid #000", padding: "5px", width: "50%" }}>
          <strong>ORDEN DE SERVICIO Nro:</strong> ___________________/2025.
        </div>
      </div>

      {/* PSA Control Data */}
      <div style={{ border: "2px solid #000", marginBottom: "15px" }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderBottom: "1px solid #000",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          DATOS DEL CONTROL PSA
        </div>
        <div style={{ padding: "8px" }}>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Fecha de Control:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {formatDate(planillaData.datosPsa.fecha)}
              </span>
            </div>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Responsable PSA:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosPsa.responsable.firstname}{" "}
                {planillaData.datosPsa.responsable.lastname}
              </span>
            </div>
            <div style={{ width: "33%" }}>
              <strong>Cantidad Personal:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosPsa.cant}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Hora de Inicio:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {formatTime(planillaData.datosPsa.horaIni)}
              </span>
            </div>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Hora de finalización:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {formatTime(planillaData.datosPsa.horaFin)}
              </span>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Tipos de Controles:</strong>
              <br />
              {tipoControlOptions.map((option) => (
                <span key={option.label} style={{ marginRight: "10px" }}>
                  [{option.checked ? "X" : " "}] {option.label}
                </span>
              ))}
            </div>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Medios Técnicos:</strong>
              <br />
              {medioTecOptions.map((option) => (
                <span key={option.label} style={{ marginRight: "10px" }}>
                  [{option.checked ? "X" : " "}] {option.label}
                </span>
              ))}
            </div>
            <div style={{ width: "33%" }}>
              <strong>Tipo Procedimiento:</strong>
              <br />
              {tipoProOptions.map((option) => (
                <span key={option.label} style={{ marginRight: "10px" }}>
                  [{option.checked ? "X" : " "}] {option.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flight Data */}
      <div style={{ border: "2px solid #000", marginBottom: "15px" }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderBottom: "1px solid #000",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          DATOS DEL VUELO
        </div>
        <div style={{ padding: "8px" }}>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ width: "50%", marginRight: "10px" }}>
              <strong>Empresa:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosVuelo.empresa.empresa}
              </span>
            </div>
            <div style={{ width: "50%" }}>
              <strong>Código de Vuelo:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosVuelo.codVuelo.codVuelo}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ width: "50%", marginRight: "10px" }}>
              <strong>Origen:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosVuelo.codVuelo.origen.codIATA}
              </span>
            </div>
            <div style={{ width: "50%" }}>
              <strong>Destino:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosVuelo.codVuelo.destino.codIATA}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Hora arribo:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {formatTime(planillaData.datosVuelo.horaArribo)}
              </span>
            </div>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Hora de Partida:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {formatTime(planillaData.datosVuelo.horaPartida)}
              </span>
            </div>
            <div style={{ width: "33%" }}>
              <strong>Con demora:</strong>
              <br />
              <span>
                [{planillaData.datosVuelo.demora.label === "SI" ? "X" : " "}] SI
                [{planillaData.datosVuelo.demora.label === "NO" ? "X" : " "}] NO
              </span>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Matrícula Aeronave:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosVuelo.matriculaAeronave.matriculaAeronave}
              </span>
            </div>
            <div style={{ width: "33%", marginRight: "10px" }}>
              <strong>Tipo de Vuelo:</strong>
              <br />
              <span>
                [
                {planillaData.datosVuelo.tipoVuelo.label === "Arribo"
                  ? "X"
                  : " "}
                ] Arribo [
                {planillaData.datosVuelo.tipoVuelo.label === "Salida"
                  ? "X"
                  : " "}
                ] Salida
              </span>
            </div>
            <div style={{ width: "33%" }}>
              <strong>Posición Plataforma:</strong>
              <br />
              <span style={{ textDecoration: "underline" }}>
                {planillaData.datosVuelo.posicion}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ground Personnel */}
      <div style={{ border: "2px solid #000", marginBottom: "15px" }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderBottom: "1px solid #000",
            fontWeight: "bold",
          }}
        >
          DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA:{" "}
          {planillaData.datosTerrestre[0]?.personalEmpresa[0]?.empresa
            .empresa || ""}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Apellido y Nombre
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                DNI
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Legajo
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Función
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Grupo
              </th>
            </tr>
          </thead>
          <tbody>
            {createPersonnelRows(
              planillaData.datosTerrestre.flatMap((dt) => dt.personalEmpresa),
              7
            ).map((person, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "4px",
                    height: "25px",
                  }}
                >
                  {person ? `${person.lastname}, ${person.firstname}` : ""}
                </td>
                <td style={{ border: "1px solid #000", padding: "4px" }}>
                  {person ? person.dni : ""}
                </td>
                <td style={{ border: "1px solid #000", padding: "4px" }}>
                  {person ? person.legajo : ""}
                </td>
                <td style={{ border: "1px solid #000", padding: "4px" }}>
                  {person
                    ? planillaData.datosTerrestre.find((dt) =>
                        dt.personalEmpresa.includes(person)
                      )?.funcion.label
                    : ""}
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "4px",
                    fontSize: "8px",
                  }}
                >
                  <span>
                    [{person ? "X" : " "}] Sup [ ] Bod [ ] Cin [ ] Tra [ ] Otr
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security Personnel */}
      <div style={{ border: "2px solid #000", marginBottom: "15px" }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderBottom: "1px solid #000",
            fontWeight: "bold",
          }}
        >
          DATOS DEL PERSONAL DE SEGURIDAD
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Apellido y Nombre
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                DNI
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Legajo
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "4px",
                  fontSize: "9px",
                }}
              >
                Empresa
              </th>
            </tr>
          </thead>
          <tbody>
            {createPersonnelRows(
              planillaData.datosSeguridad.flatMap(
                (ds) => ds.personalSegEmpresa
              ),
              4
            ).map((person, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "4px",
                    height: "25px",
                  }}
                >
                  {person ? `${person.lastname}, ${person.firstname}` : ""}
                </td>
                <td style={{ border: "1px solid #000", padding: "4px" }}>
                  {person ? person.dni : ""}
                </td>
                <td style={{ border: "1px solid #000", padding: "4px" }}>
                  {person ? person.legajo : ""}
                </td>
                <td style={{ border: "1px solid #000", padding: "4px" }}>
                  {person
                    ? planillaData.datosSeguridad.find((ds) =>
                        ds.personalSegEmpresa.includes(person)
                      )?.empresaSeguridad.empresa
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vehicles */}
      <div style={{ border: "2px solid #000", marginBottom: "15px" }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderBottom: "1px solid #000",
            fontWeight: "bold",
          }}
        >
          DATOS DE LOS VEHICULOS CONTROLADOS
        </div>
        <div style={{ padding: "8px" }}>
          {createPersonnelRows(planillaData.datosVehiculos, 2).map(
            (vehiculo, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "15px",
                  border: "1px solid #000",
                  padding: "5px",
                }}
              >
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <div style={{ width: "50%", marginRight: "10px" }}>
                    <strong>Tipo de Vehículo:</strong>{" "}
                    {vehiculo?.vehiculo.tipoVehiculo.label || ""}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Empresa:</strong>{" "}
                    {vehiculo?.vehiculo.empresa.empresa || ""}
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <div style={{ width: "50%", marginRight: "10px" }}>
                    <strong>Nº Interno:</strong>{" "}
                    {vehiculo?.vehiculo.numInterno || ""}
                  </div>
                  <div style={{ width: "50%" }}>
                    <strong>Operador:</strong>{" "}
                    {vehiculo
                      ? `${vehiculo.operadorVehiculo.firstname} ${vehiculo.operadorVehiculo.lastname}`
                      : ""}
                  </div>
                </div>
                <div>
                  <strong>Observaciones:</strong>
                  <br />
                  <div
                    style={{
                      border: "1px solid #000",
                      minHeight: "20px",
                      padding: "3px",
                    }}
                  >
                    {vehiculo?.observacionesVehiculo || ""}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Incidents */}
      <div style={{ border: "2px solid #000" }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderBottom: "1px solid #000",
            fontWeight: "bold",
          }}
        >
          NOVEDADES SOBRE LOS EQUIPAJES/CARGAS DESPACHADAS
        </div>
        <div style={{ padding: "8px", minHeight: "60px" }}>
          {planillaData.novEquipajes.isRequired && (
            <div>
              <strong>Equipajes:</strong>{" "}
              {planillaData.novEquipajes.observaciones}
            </div>
          )}
          {planillaData.novInspeccion.isRequired && (
            <div>
              <strong>Inspección:</strong>{" "}
              {planillaData.novInspeccion.observaciones}
            </div>
          )}
          {planillaData.novOtras.isRequired && (
            <div>
              <strong>Otras:</strong> {planillaData.novOtras.observaciones}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanillaPrintForm;
