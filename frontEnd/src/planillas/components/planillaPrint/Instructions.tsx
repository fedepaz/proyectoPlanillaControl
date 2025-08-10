"use client";

import { PaperSize } from "../../types/searchById";
import React from "react";
import ProfessionalDocument from "./ProfessionalDocument";

interface InstructionsProps {
  instructionsMarkdown: string;
  paperSize: PaperSize;
  title?: string;
  author?: string;
  footer?: string;
  headerLogo?: string;
}

const Instructions: React.FC<InstructionsProps> = ({
  instructionsMarkdown,
  paperSize,
  title = "Instrucciones - Plantilla de Logos",
  subtitle = "Sistema de Gestión Documental",
  companyName = "cabecitaNegraDevOps",
}) => {
  return (
    <ProfessionalDocument
      markdownContent={instructionsMarkdown}
      paperSize={paperSize}
      title={title}
      subtitle={subtitle}
      companyName={companyName}
    />
  );
};

export default Instructions;
