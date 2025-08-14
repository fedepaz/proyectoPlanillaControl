"use client";

import type React from "react";
import { useState, useRef } from "react";

import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Visibility from "@mui/icons-material/Visibility";
import Close from "@mui/icons-material/Close";

import {
  type PaperSize,
  PAPER_SIZES,
  type PlanillaDetailData,
  type HeaderConfig,
} from "../../types/searchById";
import PlanillaPrintForm from "./PlanillaPrintForm";
import { useAuth } from "../../../hooks/useAuth";
import { locationMap } from "../../types/searchTypes";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import instructionsMarkdown from "./instructions";
import ProfessionalDocument from "./ProfessionalDocument";

const PlanillaPDFGenerator: React.FC<{
  planillaData: PlanillaDetailData;
}> = ({ planillaData }) => {
  const { userInfo } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isGenerating, setIsGenerating] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [selectedPaperSize, setSelectedPaperSize] = useState<PaperSize>(
    PAPER_SIZES[0]
  );
  const printRef = useRef<HTMLDivElement>(null);

  const generateHeaderConfig = (): HeaderConfig => {
    const airportCodIata = userInfo?.user?.oficialId?.currentAirportId?.codIATA;
    const location = locationMap[airportCodIata] || airportCodIata;

    return {
      location,
      airportName: userInfo?.user?.oficialId?.currentAirportId?.aeropuerto,
      logoUrl: userInfo?.user?.oficialId?.currentAirportId?.codOACI,
      officialLogoUrl: userInfo?.user?.oficialId?.currentAirportId?.codOACI,
    };
  };

  const headerConfig = generateHeaderConfig();

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleInstructions = () => {
    setInstructionsOpen(true);
  };

  const getDisplayInfo = () => {
    const empresaName = planillaData.datosVuelo.empresa.empresa.split(" ");

    let firstLetter = "";
    let secondLetter = "";
    if (empresaName.length === 1) {
      firstLetter = empresaName[0].charAt(0).toUpperCase();
      secondLetter = empresaName[0].charAt(1).toUpperCase();
    } else {
      firstLetter = empresaName[0].charAt(0).toUpperCase();
      secondLetter = empresaName[1].charAt(0).toUpperCase();
    }
    return {
      label: firstLetter + secondLetter,
    };
  };

  const getFullName = () => {
    if (!userInfo?.user?.oficialId) return "";

    const { firstname, lastname } = userInfo.user.oficialId;
    return `${firstname} ${lastname}`;
  };

  const getFechaDisplayInfo = () => {
    const fecha = planillaData.datosPsa.fecha.split("/");
    return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  };

  const generateFileName = (): string => {
    const displayInfo = getDisplayInfo();
    const codVuelo = planillaData.datosVuelo.codVuelo.codVuelo;
    const fecha = getFechaDisplayInfo();
    const name = `${displayInfo.label}_${codVuelo}_${fecha}`;
    return name;
  };

  const handleDownloadPDF = async () => {
    // Asegurarnos de que el elemento a imprimir existe
    if (!printRef.current) {
      console.error("El elemento a imprimir no se encuentra.");
      return;
    }

    setIsGenerating(true); // Inicia el estado de carga
    const fileName = generateFileName();

    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF } = await import("jspdf");

      const input = printRef.current;

      const canvas = await html2canvas(input, {
        scale: 5, // Mayor resolución
        useCORS: true, // Necesario si tienes imágenes de otros dominios
        logging: false, // Opcional: para limpiar la consola
      });

      const imgData = canvas.toDataURL("image/png");

      // Obtenemos el ancho y alto del PDF según el tamaño de papel seleccionado.
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: selectedPaperSize.label.toLowerCase(),
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculamos la altura que tendrá la imagen dentro del PDF para mantener su proporción.
      // Esta será la altura TOTAL de tu componente (Página 1 + Página 2).
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Agregamos la primera página (o la única si cabe)
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      // Bucle para agregar las páginas restantes
      while (heightLeft > 0) {
        position = -heightLeft; // La posición se vuelve negativa para "subir" la imagen
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.setProperties({
        title: `Planilla de Control: Vuelo ${planillaData.datosVuelo.codVuelo.codVuelo}`,
        subject: `Control vuelo ${planillaData.datosVuelo.empresa.empresa} ${planillaData.datosVuelo.codVuelo.codVuelo}`,
        author: `UOSP ${headerConfig.location}-PSA-${getFullName()}`,
        keywords: `planilla, control, ${planillaData.datosVuelo.codVuelo.codVuelo}, ${headerConfig.location}`,
        creator: "Sistema de Gestión de Planillas planillasPROapp",
      });

      pdf.save(`${fileName}.pdf`); // Aseguramos que tenga la extensión .pdf
    } catch (error) {
      console.error("Error al generar el PDF:", error);

      handleFallbackPrint(fileName);
    } finally {
      setIsGenerating(false); // Finaliza el estado de carga
    }
  };
  // Fallback print method (your original implementation)
  const handleFallbackPrint = (fileName: string) => {
    if (printRef.current) {
      const originalTitle = document.title;
      document.title = fileName;

      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.top = "-10000px";
      iframe.style.left = "-10000px";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";

      document.body.appendChild(iframe);

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
        <html>
          <head>
            <title>${fileName}</title>
            <style>
              @media print {
                @page {
                  size: ${selectedPaperSize.width} ${selectedPaperSize.height};
                  margin: 0;
                }
                body { margin: 0; }
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            </style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
        `);
        iframeDoc.close();

        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();

          setTimeout(() => {
            document.body.removeChild(iframe);
            document.title = originalTitle;
          }, 1000);
        }, 500);
      }
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100vw" }}>
      {/* Control Buttons - Responsive Layout */}
      <Box
        sx={{
          mb: isMobile ? 0 : 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 0.5 : 2,
          alignItems: isMobile ? "stretch" : "center",
          width: "100%",
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: isMobile ? "100%" : 120,
            maxWidth: isMobile ? "100%" : "none",
          }}
        >
          <InputLabel id="paper-size-select-label">Tamaño</InputLabel>
          <Select
            labelId="paper-size-select-label"
            value={selectedPaperSize.label}
            label="Tamaño"
            onChange={(e) => {
              const size = PAPER_SIZES.find((s) => s.label === e.target.value);
              if (size) setSelectedPaperSize(size);
            }}
          >
            {PAPER_SIZES.map((size) => (
              <MenuItem key={size.label} value={size.label}>
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 0 : 2}
          alignItems="center"
        >
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={handlePreview}
            sx={{
              minWidth: isMobile ? "100%" : 120,
              fontSize: isSmallMobile ? "0.875rem" : "inherit",
            }}
          >
            Vista Previa
          </Button>

          {isLargeDesktop && (
            <Button
              variant="text"
              startIcon={<Visibility />}
              onClick={handleInstructions}
              sx={{
                minWidth: isMobile ? "auto" : 100,
                fontSize: "0.8rem",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Instrucciones
            </Button>
          )}
        </Stack>
      </Box>

      {/* Preview Dialog - Responsive */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth={false}
        fullScreen={isMobile}
        aria-labelledby="preview-dialog-title"
        aria-describedby="preview-dialog-description"
        disableEnforceFocus={false}
        disableAutoFocus={false}
        PaperProps={{
          sx: {
            width: isMobile ? "100vw" : "90vw",
            height: isMobile ? "100vh" : "90vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            margin: isMobile ? 0 : "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: isMobile ? 1 : 3,
            py: isMobile ? 1 : 2,
            maxWidth: "100%",
            mx: "auto",
          }}
        >
          <Typography
            component="span"
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              fontSize: isSmallMobile ? "1rem" : "inherit",
              lineHeight: 1.2,
            }}
          >
            Vista Previa - Planilla de Control ({selectedPaperSize.label})
          </Typography>

          <Button
            onClick={() => setPreviewOpen(false)}
            startIcon={<Close />}
            size="small"
          >
            Cerrar
          </Button>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              p: isMobile ? 1 : 2,

              minHeight: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <div
              ref={printRef}
              style={{
                transform: isMobile
                  ? `scale(${isSmallMobile ? 0.3 : 0.4})`
                  : "scale(0.8)",
                transformOrigin: "top center",
                width: isMobile ? "250%" : "125%",
                marginBottom: isMobile ? "-60%" : "-20%",
              }}
            >
              <PlanillaPrintForm
                planillaData={planillaData}
                headerConfig={headerConfig}
                paperSize={selectedPaperSize}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: isMobile ? 1 : 3,
            py: isMobile ? 1 : 2,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 1 : 0,
          }}
        >
          <Button
            onClick={handleDownloadPDF}
            variant="contained"
            color="secondary"
            startIcon={
              isGenerating ? <CircularProgress size="1rem" /> : <PictureAsPdf />
            }
            sx={{
              width: isMobile ? "100%" : "auto",
              fontSize: isSmallMobile ? "0.875rem" : "inherit",
            }}
          >
            {isGenerating ? "Generando PDF..." : "Descargar PDF"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Instructions Dialog */}

      <Dialog
        open={instructionsOpen && !isMobile}
        onClose={() => setInstructionsOpen(false)}
        maxWidth={false}
        fullScreen={isMobile}
        aria-labelledby="instructions-dialog-title"
        aria-describedby="instructions-dialog-description"
        disableEnforceFocus={false}
        disableAutoFocus={false}
        PaperProps={{
          sx: {
            width: "90vw",
            height: "90vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            margin: "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 0,
            p: 2,
          }}
        >
          <Typography
            component="span"
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              lineHeight: 1.2,
            }}
          >
            Instrucciones
          </Typography>
          <Button
            onClick={() => setInstructionsOpen(false)}
            startIcon={<Close />}
            size="small"
          >
            Cerrar
          </Button>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "auto",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 1,
            }}
          >
            <ProfessionalDocument
              markdownContent={instructionsMarkdown}
              paperSize={selectedPaperSize}
              title="Instrucciones para integrar logos con Word"
              isDisplayMode={true}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PlanillaPDFGenerator;
