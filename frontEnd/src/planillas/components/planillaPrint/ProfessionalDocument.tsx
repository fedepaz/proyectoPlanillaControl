"use client";

import useTheme from "@mui/material/styles/useTheme";
import { PaperSize } from "../../types/searchById";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";
import React from "react";

interface ProfessionalDocumentProps {
  markdownContent: string;
  paperSize: PaperSize;
  title?: string;
  subtitle?: string;
  footer?: string;
  companyName?: string;
}

const ProfessionalDocument: React.FC<ProfessionalDocumentProps> = ({
  markdownContent,
  paperSize,
  title = "Documento",
  subtitle = "Sistema de Gestión",
  footer = `© ${new Date().getFullYear()} cabecitaNegraDevOps. Todos los derechos reservados.`,
  companyName = "cabecitaNegraDevOps",
}) => {
  const theme = useTheme();
  const isA4 = paperSize.label === "A4";

  // Professional page styling using MUI theme
  const pageStyle: React.CSSProperties = {
    width: paperSize.width,
    minHeight: paperSize.height,
    maxHeight: paperSize.height,
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: theme.typography.fontFamily,
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    pageBreakAfter: "always",
    position: "relative",
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.divider}`,
  };

  const parseInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    const regex = /(\*\*([^*]+?)\*\*|`([^`]+?)`|\*([^*]+?)\*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[1].startsWith("**")) {
        parts.push(
          <Typography
            key={match.index}
            component="span"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            {match[2]}
          </Typography>
        );
      } else if (match[1].startsWith("`")) {
        parts.push(
          <Chip
            key={match.index}
            label={match[3]}
            size="small"
            variant="outlined"
            sx={{
              height: "auto",
              fontSize: "0.85rem",
              fontFamily: "monospace",
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.dark,
              "& .MuiChip-label": {
                padding: "2px 8px",
              },
            }}
          />
        );
      } else if (match[1].startsWith("*")) {
        parts.push(
          <Typography
            key={match.index}
            component="span"
            sx={{
              fontStyle: "italic",
              color: theme.palette.text.secondary,
            }}
          >
            {match[4]}
          </Typography>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return <>{parts}</>;
  };

  const parseMarkdownToJsx = (markdown: string) => {
    const lines = markdown.split("\n");
    const elements: JSX.Element[] = [];
    let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

    const flushList = () => {
      if (currentList) {
        elements.push(
          <Paper
            key={`list-${elements.length}`}
            elevation={1}
            sx={{
              my: 2,
              p: 2.5,
              backgroundColor: alpha(theme.palette.background.default, 0.5),
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box
              component={currentList.type}
              sx={{
                m: 0,
                pl: 2,
                "& li": {
                  mb: 1.5,
                  lineHeight: 1.7,
                },
              }}
            >
              {currentList.items.map((item, idx) => (
                <Typography
                  component="li"
                  key={idx}
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {parseInlineMarkdown(item)}
                </Typography>
              ))}
            </Box>
          </Paper>
        );
        currentList = null;
      }
    };

    lines.forEach((line, index) => {
      line = line.trim();

      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <Box key={index} sx={{ mt: index === 0 ? 0 : 4, mb: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                color: theme.palette.primary.main,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
              }}
            >
              {parseInlineMarkdown(line.substring(2))}
            </Typography>
            <Divider
              sx={{
                height: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                border: "none",
              }}
            />
          </Box>
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="h4"
            component="h2"
            sx={{
              mt: 4,
              mb: 2,
              fontWeight: 700,
              color: theme.palette.primary.dark,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: -16,
                top: 6,
                width: 4,
                height: "80%",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 2,
              },
            }}
          >
            {parseInlineMarkdown(line.substring(3))}
          </Typography>
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="h5"
            component="h3"
            sx={{
              mt: 3,
              mb: 1.5,
              fontWeight: 600,
              color: theme.palette.primary.light,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '"▸"',
                color: theme.palette.secondary.main,
                fontWeight: 800,
              },
            }}
          >
            {parseInlineMarkdown(line.substring(4))}
          </Typography>
        );
      } else if (line.match(/^\*\s/)) {
        if (!currentList || currentList.type !== "ul") {
          flushList();
          currentList = { type: "ul", items: [] };
        }
        currentList.items.push(line.substring(line.indexOf("* ") + 2));
      } else if (line.match(/^\d+\.\s/)) {
        if (!currentList || currentList.type !== "ol") {
          flushList();
          currentList = { type: "ol", items: [] };
        }
        currentList.items.push(line.substring(line.indexOf(". ") + 2));
      } else if (
        line.startsWith("⚠️ ") ||
        line.includes("Importante:") ||
        line.includes("Nota:")
      ) {
        flushList();
        elements.push(
          <Paper
            key={index}
            elevation={2}
            sx={{
              mt: 2.5,
              mb: 2.5,
              p: 3,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.warning.main, 0.08),
              borderLeft: `6px solid ${theme.palette.warning.main}`,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
              position: "relative",
              "&::before": {
                content: '"⚠"',
                position: "absolute",
                top: 16,
                left: 16,
                fontSize: "1.5rem",
                color: theme.palette.warning.main,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.warning.dark,
                fontWeight: 600,
                margin: 0,
                pl: 4,
                lineHeight: 1.7,
              }}
            >
              {parseInlineMarkdown(line.replace("⚠️ ", ""))}
            </Typography>
          </Paper>
        );
      } else if (line.startsWith("---")) {
        flushList();
        elements.push(
          <Box key={index} sx={{ my: 4 }}>
            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              <Chip
                label="•••"
                size="small"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              />
            </Divider>
          </Box>
        );
      } else if (line.length > 0) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="body1"
            sx={{
              mb: 2,
              color: theme.palette.text.primary,
              textAlign: "justify",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            {parseInlineMarkdown(line)}
          </Typography>
        );
      } else {
        flushList();
        elements.push(<Box key={index} sx={{ height: theme.spacing(2) }} />);
      }
    });

    flushList();
    return elements;
  };

  // MUI-styled header
  const DocumentHeader = () => (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: isA4 ? "25mm" : "30mm",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${isA4 ? "20mm" : "25mm"}`,
        zIndex: 2,
        borderRadius: 0,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          {companyName}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: alpha(theme.palette.primary.contrastText, 0.8),
            fontSize: "0.75rem",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Chip
        label={new Date().toLocaleDateString("es-ES")}
        size="small"
        sx={{
          backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
          color: theme.palette.primary.contrastText,
          fontWeight: 500,
          border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.3)}`,
        }}
      />
    </Paper>
  );

  // MUI-styled footer
  const DocumentFooter = () => (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: isA4 ? "20mm" : "25mm",
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `0 ${isA4 ? "20mm" : "25mm"}`,
        zIndex: 2,
        borderRadius: 0,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "0.8rem",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {footer}
      </Typography>
    </Paper>
  );

  // Enhanced content area with MUI styling
  const contentStyle: React.CSSProperties = {
    padding: isA4 ? "35mm 24mm 30mm 24mm" : "40mm 30mm 35mm 30mm",
    minHeight: `calc(${paperSize.height} - 70mm)`,
    position: "relative",
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.background.default,
      0.02
    )} 0%, transparent 100%)`,
  };

  const pages = [parseMarkdownToJsx(markdownContent)]; // Single page for now

  return (
    <>
      {pages.map((pageContent, pageIndex) => (
        <Box
          key={pageIndex}
          sx={{
            ...pageStyle,
            pageBreakBefore: pageIndex > 0 ? "always" : "auto",
          }}
        >
          <DocumentHeader />

          {/* Main content area */}
          <Box sx={contentStyle}>
            {/* Document title section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: 1,
                }}
              >
                {title}
              </Typography>
              <Chip
                label={subtitle}
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.dark,
                  fontWeight: 600,
                }}
              />
            </Paper>

            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 1 }}>{pageContent}</Box>
          </Box>

          <DocumentFooter />
        </Box>
      ))}
    </>
  );
};

export default ProfessionalDocument;
