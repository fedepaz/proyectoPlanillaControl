import React from "react";
import type {
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

  // Create rows for personnel tables (minimum rows based on form)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createPersonnelRows = (personnel: any[], minRows = 4) => {
    const rows = [...personnel];
    while (rows.length < minRows) {
      rows.push(null);
    }
    return rows;
  };

  const capitalizeAllWords = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const nameToDisplayResponsable = () => {
    const firstname = planillaData.datosPsa.responsable.firstname;
    const lastname = planillaData.datosPsa.responsable.lastname;

    const capitalizedFirstname = capitalizeAllWords(firstname);
    const capitalizedLastname = capitalizeAllWords(lastname);

    return `${capitalizedFirstname} ${capitalizedLastname}`;
  };

  const nameToDisplayEmpleado = (firstname: string, lastname: string) => {
    const capitalizedFirstname = capitalizeAllWords(firstname);
    const capitalizedLastname = capitalizeAllWords(lastname);

    return `${capitalizedFirstname} ${capitalizedLastname}`;
  };

  const Checkbox: React.FC<{
    checked: boolean;
    label: string;
    fontSize?: string;
  }> = ({ checked, label, fontSize = tableFontSize }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        marginRight: "8px",
        fontSize,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: isA4 ? "10px" : "12px",
          height: isA4 ? "10px" : "12px",
          border: "1px solid #000",
          marginRight: "3px",
          textAlign: "center",
          lineHeight: isA4 ? "8px" : "10px",
          fontSize: isA4 ? "7px" : "8px",
          fontWeight: "bold",
          backgroundColor: checked ? "grey" : "white",
        }}
      ></span>
      {label}
    </span>
  );

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

  const isA4 = paperSize.label === "A4";
  const isLetter = paperSize.label === "Oficio";

  // Base font sizes and spacing
  const baseFontSize = isA4 ? "12px" : isLetter ? "13px" : "14px";
  const smallFontSize = isA4 ? "11px" : isLetter ? "12px" : "13px";
  const headerFontSize = isA4 ? "14px" : isLetter ? "15px" : "16px";
  const tableFontSize = isA4 ? "11px" : isLetter ? "12px" : "13px";

  // Common styles
  const pageStyle: React.CSSProperties = {
    width: paperSize.width,
    minHeight: paperSize.height,
    maxHeight: paperSize.height,
    margin: "0 auto",
    backgroundColor: "white",
    padding: isA4 ? "12mm" : "14mm",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    fontSize: baseFontSize,
    lineHeight: "1.1",
    color: "#000",
    pageBreakAfter: "always",
    overflow: "hidden",
  };

  const sectionStyle: React.CSSProperties = {
    border: "2px solid #000",
    marginBottom: isA4 ? "4px" : "5px",
  };

  const sectionHeaderStyle: React.CSSProperties = {
    backgroundColor: "#f8f8f8",
    padding: isA4 ? "4px 8px" : "5px 9px",
    borderBottom: "1px solid #000",
    fontWeight: "bold",
    fontSize: smallFontSize,
    textAlign: "center",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: tableFontSize,
  };

  const tableCellStyle: React.CSSProperties = {
    border: "1px solid #000",
    padding: "5px 8px",
    textAlign: "left",
    verticalAlign: "top",
  };

  const Header = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: isA4 ? "6px" : "7px",
        padding: "0 20px",
      }}
    >
      {/* PSA Logo */}
      <div
        style={{
          width: isA4 ? "110px" : "120px",
          height: isA4 ? "110px" : "120px",
          border: "1px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          color: "white",
        }}
      >
        <span
          style={{
            fontSize: isA4 ? "8px" : "10px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          PSA
        </span>
      </div>

      {/* Official Logo */}
      <div
        style={{
          width: isA4 ? "110px" : "120px",
          height: isA4 ? "110px" : "120px",
          border: "1px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          color: "white",
        }}
      >
        <span
          style={{
            fontSize: isA4 ? "6px" : "7px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          OFFICIAL
        </span>
      </div>
    </div>
  );

  // Front Page Content
  const FrontPageContent = () => (
    <>
      {/* Title Section */}
      <div
        style={{
          ...sectionStyle,
          marginBottom: isA4 ? "3px" : "4px",
          textAlign: "center",
          padding: isA4 ? "6px" : "7px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div
          style={{
            fontSize: headerFontSize,
            fontWeight: "bold",
            lineHeight: "1.2",
          }}
        >
          PLANILLA DE CONTROL DE BODEGA UOSP {headerConfig.location}
        </div>
        {headerConfig.airportName && (
          <div
            style={{
              fontSize: isA4 ? "7px" : "8px",
              fontStyle: "italic",
              color: "#666",
              marginTop: "2px",
              marginBottom: "4px",
              fontWeight: "normal",
            }}
          >
            {headerConfig.airportName}
          </div>
        )}

        {/* Patrol and Service Order */}
        <table style={{ ...tableStyle, marginBottom: "3px" }}>
          <tbody>
            <tr>
              <td
                style={{ ...tableCellStyle, width: "50%", fontWeight: "bold" }}
              >
                PATRULLA:
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                ORDEN DE SERVICIO Nro: ___________________/2024.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PSA Control Data */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>DATOS DEL CONTROL PSA</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td
                style={{ ...tableCellStyle, width: "16%", fontWeight: "bold" }}
              >
                Fecha de Control:
              </td>
              <td style={{ ...tableCellStyle, width: "17%" }}>
                {formatDate(planillaData.datosPsa.fecha)}
              </td>
              <td
                style={{ ...tableCellStyle, width: "16%", fontWeight: "bold" }}
              >
                Responsable PSA:
              </td>
              <td style={{ ...tableCellStyle, width: "17%" }}>
                {nameToDisplayResponsable()}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Hora de Inicio:
              </td>
              <td style={tableCellStyle}>
                {formatTime(planillaData.datosPsa.horaIni)}
              </td>
              <td
                style={{ ...tableCellStyle, width: "17%", fontWeight: "bold" }}
              >
                Hora de finalización:
              </td>
              <td style={tableCellStyle}>
                {formatTime(planillaData.datosPsa.horaFin)}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Cantidad Personal:
              </td>
              <td style={tableCellStyle}>{planillaData.datosPsa.cant}</td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Tipos de Controles:
              </td>
              <td style={tableCellStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  {tipoControlOptions.map((option) => (
                    <Checkbox
                      key={option.label}
                      checked={option.checked}
                      label={option.label}
                    />
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Medios Técnicos:
              </td>
              <td style={tableCellStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  {medioTecOptions.map((option) => (
                    <Checkbox
                      key={option.label}
                      checked={option.checked}
                      label={option.label}
                    />
                  ))}
                </div>
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Tipo Procedimiento
              </td>
              <td colSpan={3} style={tableCellStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  {tipoProOptions.map((option) => (
                    <Checkbox
                      key={option.label}
                      checked={option.checked}
                      label={option.label}
                    />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Flight Data */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>DATOS DEL VUELO:</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td
                style={{ ...tableCellStyle, width: "16%", fontWeight: "bold" }}
              >
                Empresa:
              </td>
              <td style={{ ...tableCellStyle, width: "17%" }}>
                {planillaData.datosVuelo.empresa.empresa}
              </td>
              <td
                style={{ ...tableCellStyle, width: "16%", fontWeight: "bold" }}
              >
                Código de Vuelo:
              </td>
              <td style={{ ...tableCellStyle, width: "17%" }}>
                {planillaData.datosVuelo.codVuelo.codVuelo}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>Origen:</td>
              <td style={tableCellStyle}>
                {planillaData.datosVuelo.codVuelo.origen.codIATA}
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Destino:
              </td>
              <td style={tableCellStyle}>
                {planillaData.datosVuelo.codVuelo.destino.codIATA}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Hora arribo:
              </td>
              <td style={tableCellStyle}>
                {formatTime(planillaData.datosVuelo.horaArribo)}
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Hora de Partida:
              </td>
              <td style={tableCellStyle}>
                {formatTime(planillaData.datosVuelo.horaPartida)}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Con demora:
              </td>
              <td style={tableCellStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <Checkbox
                    checked={
                      planillaData.datosVuelo.demora.label === "SI"
                        ? true
                        : false
                    }
                    label="SI"
                  />
                  <Checkbox
                    checked={
                      planillaData.datosVuelo.demora.label === "NO"
                        ? true
                        : false
                    }
                    label="NO"
                  />
                </div>
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Tipo de Vuelo:
              </td>
              <td style={tableCellStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <Checkbox
                    checked={
                      planillaData.datosVuelo.tipoVuelo.label === "Arribo"
                    }
                    label="Arribo"
                  />
                  <Checkbox
                    checked={
                      planillaData.datosVuelo.tipoVuelo.label === "Partida"
                    }
                    label="Partida"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Matrícula Aeronave:
              </td>
              <td style={tableCellStyle}>
                {planillaData.datosVuelo.matriculaAeronave.matriculaAeronave}
              </td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Posición Plataforma:
              </td>
              <td style={tableCellStyle}>{planillaData.datosVuelo.posicion}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ground Personnel */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA:{"  "}
          <span style={{ fontWeight: "normal" }}>
            {planillaData.datosTerrestre[0]?.personalEmpresa[0]?.empresa
              .empresa || ""}
          </span>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Apellido y Nombre:
              </th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>DNI:</th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>Legajo:</th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Función:
              </th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>Grupo:</th>
            </tr>
          </thead>
          <tbody>
            {createPersonnelRows(
              planillaData.datosTerrestre.flatMap((dt) => dt.personalEmpresa),
              7
            ).map((person, index) => (
              <tr key={index}>
                <td
                  style={{ ...tableCellStyle, height: isA4 ? "20px" : "22px" }}
                >
                  {person
                    ? nameToDisplayEmpleado(person.firstname, person.lastname)
                    : ""}
                </td>
                <td style={tableCellStyle}>{person ? person.dni : ""}</td>
                <td style={tableCellStyle}>{person ? person.legajo : ""}</td>

                <td style={tableCellStyle}>
                  <div style={{ fontSize: isA4 ? "6px" : "7px" }}>
                    <Checkbox
                      checked={
                        person
                          ? planillaData.datosTerrestre[index]?.funcion
                              ?.label === "Supervisor"
                          : false
                      }
                      label={"Sup"}
                      fontSize={isA4 ? "6px" : "7px"}
                    />
                    <Checkbox
                      checked={
                        person
                          ? planillaData.datosTerrestre[index]?.funcion
                              ?.label === "Bodega"
                          : false
                      }
                      label="Bod"
                      fontSize={isA4 ? "6px" : "7px"}
                    />
                    <Checkbox
                      checked={
                        person
                          ? planillaData.datosTerrestre[index]?.funcion
                              ?.label === "Cinta"
                          : false
                      }
                      label="Cin"
                      fontSize={isA4 ? "6px" : "7px"}
                    />
                    <Checkbox
                      checked={
                        person
                          ? planillaData.datosTerrestre[index]?.funcion
                              ?.label === "Tractor"
                          : false
                      }
                      label="Tra"
                      fontSize={isA4 ? "6px" : "7px"}
                    />
                    <Checkbox
                      checked={
                        person
                          ? planillaData.datosTerrestre[index]?.funcion
                              ?.label === "Otros"
                          : false
                      }
                      label="Otr"
                      fontSize={isA4 ? "6px" : "7px"}
                    />
                  </div>
                </td>
                <td style={tableCellStyle}>
                  {person ? planillaData.datosTerrestre[0]?.grupo : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security Personnel */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>DATOS DEL PERSONAL DE SEGURIDAD:</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Apellido y Nombre:
              </th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>DNI:</th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>Legajo:</th>
              <th style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Empresa:
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
                  style={{ ...tableCellStyle, height: isA4 ? "20px" : "24px" }}
                >
                  {person
                    ? nameToDisplayEmpleado(person.firstname, person.lastname)
                    : ""}
                </td>
                <td style={tableCellStyle}>{person ? person.dni : ""}</td>
                <td style={tableCellStyle}>{person ? person.legajo : ""}</td>
                <td style={tableCellStyle}>
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
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          DATOS DE LOS VEHICULOS CONTROLADOS:
        </div>
        <table style={tableStyle}>
          <tbody>
            {createPersonnelRows(planillaData.datosVehiculos, 2).map(
              (vehiculo, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      style={{
                        ...tableCellStyle,
                        width: "20%",
                        fontWeight: "bold",
                      }}
                    >
                      Tipo de Vehículo:
                    </td>
                    <td style={{ ...tableCellStyle, width: "30%" }}>
                      {vehiculo?.vehiculo.tipoVehiculo.label.toUpperCase() ||
                        ""}
                    </td>
                    <td
                      style={{
                        ...tableCellStyle,
                        width: "20%",
                        fontWeight: "bold",
                      }}
                    >
                      Empresa:
                    </td>
                    <td style={tableCellStyle}>
                      {vehiculo?.vehiculo.empresa.empresa || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                      Nº Interno:
                    </td>
                    <td style={tableCellStyle}>
                      {vehiculo?.vehiculo.numInterno || ""}
                    </td>
                    <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                      Operador:
                    </td>
                    <td style={tableCellStyle}>
                      {vehiculo
                        ? nameToDisplayEmpleado(
                            vehiculo.operadorVehiculo.firstname,
                            vehiculo.operadorVehiculo.lastname
                          )
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                      Observaciones:
                    </td>
                    {vehiculo ? (
                      <td
                        colSpan={3}
                        style={{
                          ...tableCellStyle,
                          height: isA4 ? "25px" : "30px",
                        }}
                      >
                        {vehiculo.isObservaciones
                          ? vehiculo.observacionesVehiculo
                          : " Sin Novedad"}
                      </td>
                    ) : (
                      <td
                        colSpan={3}
                        style={{
                          ...tableCellStyle,
                          height: isA4 ? "25px" : "30px",
                        }}
                      >
                        <div
                          style={{
                            alignContent: "center",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: isA4 ? "12px" : "16px",
                          }}
                        ></div>
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );

  // Back Page Content
  const BackPageContent = () => (
    <>
      <Header />

      {/* Personnel Inspection Incidents */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          NOVEDADES SOBRE LA INSPECCION DEL PERSONAL.
        </div>
        <div style={{ padding: isA4 ? "8px" : "12px" }}>
          <div
            style={{
              minHeight: isA4 ? "80px" : "100px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {planillaData.novInspeccion.isRequired ? (
              <div>{planillaData.novInspeccion.observaciones}</div>
            ) : (
              <div
                style={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: isA4 ? "12px" : isLetter ? "13px" : "14px",
                }}
              >
                Sin Novedades
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Equipment Incidents */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          NOVEDADES SOBRE LOS EQUIPAJES/CARGAS DESPACHADAS.
        </div>
        <div style={{ padding: isA4 ? "8px" : "12px" }}>
          <div
            style={{
              minHeight: isA4 ? "80px" : "100px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {planillaData.novEquipajes.isRequired ? (
              <div>{planillaData.novEquipajes.observaciones}</div>
            ) : (
              <div
                style={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: isA4 ? "12px" : isLetter ? "13px" : "14px",
                }}
              >
                Sin Novedades
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other Incidents */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>OTRAS NOVEDADES.</div>
        <div style={{ padding: isA4 ? "8px" : "12px" }}>
          <div
            style={{
              minHeight: isA4 ? "80px" : "100px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {planillaData.novOtras.isRequired ? (
              <div>{planillaData.novOtras.observaciones}</div>
            ) : (
              <div
                style={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: isA4 ? "12px" : isLetter ? "13px" : "14px",
                }}
              >
                Sin Novedades
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsible PSA Data */}
      <div
        style={{
          ...sectionStyle,
          backgroundColor: "#f4f4f4",
          width: isA4 ? "70%" : "75%",
          margin: "20px auto",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <div style={sectionHeaderStyle}>Datos del Responsable PSA</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td
                style={{ ...tableCellStyle, width: "25%", fontWeight: "bold" }}
              >
                Firma:
              </td>
              <td
                style={{ ...tableCellStyle, height: isA4 ? "40px" : "50px" }}
              ></td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                Aclaración:
              </td>
              <td style={{ ...tableCellStyle, height: isA4 ? "25px" : "30px" }}>
                {planillaData.datosPsa.responsable.lastname.toUpperCase()},{" "}
                {planillaData.datosPsa.responsable.firstname.toUpperCase()}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                N° Legajo:
              </td>
              <td style={{ ...tableCellStyle, height: isA4 ? "25px" : "30px" }}>
                {planillaData.datosPsa.responsable.legajo}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>DNI:</td>
              <td style={{ ...tableCellStyle, height: isA4 ? "25px" : "30px" }}>
                {planillaData.datosPsa.responsable.dni}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <>
      {/* Front Page */}
      <div style={pageStyle}>
        <Header />
        <FrontPageContent />
      </div>

      {/* Back Page */}
      <div style={{ ...pageStyle, pageBreakBefore: "always" }}>
        <BackPageContent />
      </div>
    </>
  );
};

export default PlanillaPrintForm;
