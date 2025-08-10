import { PaperSize } from "../../types/searchById";

const handleDocumentHTML = (
  fileName: string,
  instructionsMarkdown: string,
  selectedPaperSize: PaperSize
) => {
  // Convert markdown to clean HTML with better structure
  const convertMarkdownToHTML = (markdown: string) => {
    const html = markdown
      // Headers with better hierarchy
      .replace(/^# (.+)$/gm, '<h1 class="title-primary">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="title-secondary">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="title-tertiary">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="title-quaternary">$1</h4>')

      // Bold and italic text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-bold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="text-italic">$1</em>')

      // Inline code with better styling
      .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>')

      // Warning boxes with modern alert style
      .replace(
        /^⚠️?\s*(.+)$/gm,
        '<div class="alert alert-warning"><div class="alert-icon">⚠️</div><div class="alert-content">$1</div></div>'
      )
      .replace(
        /^⚠\s*Importante:\s*(.+)$/gm,
        '<div class="alert alert-important"><div class="alert-icon">⚠️</div><div class="alert-content"><strong>Importante:</strong> $1</div></div>'
      )
      .replace(
        /^⚠\s*Nota final:\s*(.+)$/gm,
        '<div class="alert alert-info"><div class="alert-icon">💡</div><div class="alert-content"><strong>Nota final:</strong> $1</div></div>'
      )

      // Dividers with modern styling
      .replace(/^---$/gm, '<hr class="modern-divider">')

      // Lists with better spacing
      .replace(/^\* (.+)$/gm, '<li class="list-item">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="numbered-item">$2</li>')

      // Process paragraphs and wrap lists properly
      .split("\n\n")
      .map((paragraph) => {
        paragraph = paragraph.trim();
        if (!paragraph) return "";

        if (
          paragraph.startsWith("<h") ||
          paragraph.startsWith("<div") ||
          paragraph.startsWith("<hr")
        ) {
          return paragraph;
        }

        if (paragraph.includes('<li class="list-item">')) {
          return '<ul class="modern-list">' + paragraph + "</ul>";
        }

        if (paragraph.includes('<li class="numbered-item">')) {
          return '<ol class="modern-numbered-list">' + paragraph + "</ol>";
        }

        if (paragraph.startsWith("<li")) {
          return paragraph;
        }

        return '<p class="paragraph">' + paragraph + "</p>";
      })
      .join("\n");

    return html;
  };

  const htmlContent = convertMarkdownToHTML(instructionsMarkdown);

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${fileName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          /* Reset and base styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          /* Page setup */
          @page {
            size: ${selectedPaperSize.width} ${selectedPaperSize.height};
            margin: 20mm 15mm 15mm 15mm;
          }

          @media print {
            @page {
              margin: 20mm 15mm 15mm 15mm;
            }
            
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }

          /* Body and typography */
          html {
            font-size: 14px;
          }

          body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #202124;
            background-color: #ffffff;
            font-weight: 400;
            letter-spacing: 0.00938em;
          }

          /* Container */
          .page {
            max-width: 100%;
            margin: 0 auto;
            background: #ffffff;
            position: relative;
            min-height: 100vh;
          }

          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0 24px 0;
            border-bottom: 2px solid #f5f7fa;
            margin-bottom: 32px;
          }

          .header-date {
            font-size: 0.875rem;
            color: #5f6368;
            font-weight: 500;
            letter-spacing: 0.00714em;
            padding: 8px 16px;
            background: linear-gradient(135deg, #f5f7fa 0%, #e8eef4 100%);
            border-radius: 8px;
            border: 1px solid rgba(58, 115, 178, 0.1);
          }

          /* Typography hierarchy */
          .title-primary {
            font-size: 2.125rem;
            font-weight: 600;
            letter-spacing: -0.01562em;
            color: #1a1c20;
            margin: 32px 0 24px 0;
            line-height: 1.2;
            position: relative;
          }

          .title-primary::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(135deg, #3a73b2 0%, #6c96c5 100%);
            border-radius: 2px;
          }

          .title-secondary {
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: -0.00833em;
            color: #2a5080;
            margin: 28px 0 16px 0;
            line-height: 1.3;
          }

          .title-tertiary {
            font-size: 1.25rem;
            font-weight: 500;
            color: #3a73b2;
            margin: 24px 0 12px 0;
            line-height: 1.4;
          }

          .title-quaternary {
            font-size: 1.125rem;
            font-weight: 500;
            color: #4a77a8;
            margin: 20px 0 12px 0;
            line-height: 1.4;
          }

          /* Paragraphs */
          .paragraph {
            margin: 0 0 16px 0;
            line-height: 1.7;
            color: #202124;
            text-align: justify;
            text-justify: inter-word;
          }

          /* Text styling */
          .text-bold {
            font-weight: 600;
            color: #1a1c20;
          }

          .text-italic {
            font-style: italic;
            color: #4a77a8;
          }

          /* Inline code */
          .inline-code {
            font-family: 'Roboto Mono', 'Courier New', monospace;
            font-size: 0.875rem;
            background: linear-gradient(135deg, #f5f7fa 0%, #e8eef4 100%);
            color: #2a5080;
            padding: 3px 6px;
            border-radius: 4px;
            border: 1px solid rgba(58, 115, 178, 0.2);
            font-weight: 500;
          }

          /* Modern alerts */
          .alert {
            margin: 20px 0;
            padding: 16px 20px;
            border-radius: 12px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            page-break-inside: avoid;
          }

          .alert-warning {
            background: linear-gradient(135deg, #fff8e1 0%, #fff3c4 100%);
            border-left: 4px solid #ff9800;
            color: #e65100;
          }

          .alert-important {
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
            border-left: 4px solid #f44336;
            color: #c62828;
          }

          .alert-info {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-left: 4px solid #2196f3;
            color: #1565c0;
          }

          .alert-icon {
            font-size: 1.2rem;
            min-width: 24px;
            margin-top: 2px;
          }

          .alert-content {
            flex: 1;
            font-weight: 500;
            line-height: 1.5;
          }

          /* Modern dividers */
          .modern-divider {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #e0e7ff 20%, #3a73b2 50%, #e0e7ff 80%, transparent 100%);
            margin: 32px 0;
          }

          /* Lists */
          .modern-list, .modern-numbered-list {
            margin: 16px 0 16px 0;
            padding-left: 0;
          }

          .list-item, .numbered-item {
            list-style: none;
            margin: 8px 0;
            padding: 12px 16px 12px 16px;
            background: linear-gradient(135deg, #f8f9fb 0%, #f1f5f9 100%);
            border-radius: 8px;
            border-left: 3px solid #6c96c5;
            transition: all 0.2s ease;
            position: relative;
            line-height: 1.6;
          }

          .list-item::before {
            content: '•';
            color: #3a73b2;
            font-size: 1.2rem;
            font-weight: bold;
            position: absolute;
            left: -12px;
            top: 12px;
          }

          .numbered-item {
            counter-increment: list-counter;
          }

          .modern-numbered-list {
            counter-reset: list-counter;
          }

          .numbered-item::before {
            content: counter(list-counter) '.';
            color: #3a73b2;
            font-weight: 600;
            position: absolute;
            left: -20px;
            top: 12px;
            font-size: 0.9rem;
          }

          /* Content area */
          .content {
            margin-bottom: 40px;
          }

          /* Footer */
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #e8eef4 100%);
            border-top: 1px solid rgba(58, 115, 178, 0.2);
            padding: 12px 20px;
          }

          .footer-text {
            text-align: center;
            font-size: 0.75rem;
            color: #5f6368;
            font-weight: 500;
            letter-spacing: 0.03333em;
          }

          /* Print optimizations */
          @media print {
            .footer {
              position: static;
              margin-top: 40px;
              background: none;
              border-top: 1px solid #e0e7ff;
            }

            .alert {
              break-inside: avoid;
            }

            .title-primary,
            .title-secondary,
            .title-tertiary {
              break-after: avoid;
            }

            /* Ensure good contrast in print */
            .alert-warning {
              background: #fff8e1 !important;
              border-left-color: #ff9800 !important;
            }

            .alert-important {
              background: #ffebee !important;
              border-left-color: #f44336 !important;
            }

            .alert-info {
              background: #e3f2fd !important;
              border-left-color: #2196f3 !important;
            }
          }

          /* Responsive adjustments for smaller papers */
          @media (max-width: 600px) {
            .header {
              flex-direction: column;
              gap: 12px;
              text-align: center;
            }

            .title-primary {
              font-size: 1.75rem;
            }

            .title-secondary {
              font-size: 1.25rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div></div>
            <div class="header-date">${new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</div>
          </div>
          
          <div class="content">
            ${htmlContent}
          </div>
          
          <div class="footer">
            <div class="footer-text">
              © ${new Date().getFullYear()} cabecitaNegraDevOps. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // Create iframe and print with better error handling
  const iframe = document.createElement("iframe");
  iframe.style.cssText = `
    position: absolute;
    top: -10000px;
    left: -10000px;
    width: 1px;
    height: 1px;
    border: none;
    opacity: 0;
  `;

  document.body.appendChild(iframe);

  iframe.onload = () => {
    try {
      const iframeDoc = iframe.contentDocument;
      const iframeWin = iframe.contentWindow;

      if (iframeDoc && iframeWin) {
        iframeDoc.open();
        iframeDoc.write(fullHTML);
        iframeDoc.close();

        // Wait for fonts and styles to load
        setTimeout(() => {
          const originalTitle = document.title;
          document.title = fileName;

          iframeWin.focus();
          iframeWin.print();

          // Clean up
          setTimeout(() => {
            try {
              document.body.removeChild(iframe);
              document.title = originalTitle;
            } catch (error) {
              console.warn("Error during cleanup:", error);
            }
          }, 1500);
        }, 1500);
      }
    } catch (error) {
      console.error("Error setting up print document:", error);
      // Clean up on error
      try {
        document.body.removeChild(iframe);
      } catch (cleanupError) {
        console.warn("Error during error cleanup:", cleanupError);
      }
    }
  };

  iframe.onerror = (error) => {
    console.error("Iframe load error:", error);
    try {
      document.body.removeChild(iframe);
    } catch (cleanupError) {
      console.warn("Error during error cleanup:", cleanupError);
    }
  };

  iframe.src = "about:blank";
};

export default handleDocumentHTML;
