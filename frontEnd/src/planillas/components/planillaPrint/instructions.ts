const instructionsMarkdown = `# Instrucciones para Crear Plantilla de Logos (.docx)

## Configuración del Documento

### Para Papel A4 (210 × 297 mm)
*   Márgenes: 12mm en todos los lados
*   Orientación: Vertical
*   Tamaño del logo: 110 × 110 px (equivale a ~29mm × 29mm)

### Para Papel Oficio (216 × 330 mm)
*   Márgenes: 14mm en todos los lados
*   Orientación: Vertical
*   Tamaño del logo: 120 × 120 px (equivale a ~32mm × 32mm)

## Posicionamiento de los Logos

### Configuración en Word:
1.  Crear documento nuevo con el tamaño de papel correspondiente
2.  Configurar márgenes según especificaciones arriba
3.  Insertar logos como imágenes
4.  Configurar posicionamiento absoluto

### Logo Lado Izquierdo:
*   Posición horizontal: 20mm desde el borde izquierdo de la página
*   Posición vertical: 12mm desde el borde superior (A4) / 14mm (Oficio)
*   Ajuste del texto: "Detrás del texto"
*   Anclar: "A la página"

### Logo Lado Derecho:
*   Posición horizontal: 20mm desde el borde derecho de la página
*   Posición vertical: 12mm desde el borde superior (A4) / 14mm (Oficio)
*   Ajuste del texto: "Detrás del texto"
*   Anclar: "A la página"

## Pasos Detallados en Word:

### 1. Configurar Página
Diseño → Configurar página → Márgenes → Márgenes personalizados
*   Superior: 12mm (A4) / 14mm (Oficio)
*   Inferior: 12mm (A4) / 14mm (Oficio)
*   Izquierdo: 12mm (A4) / 14mm (Oficio)
*   Derecho: 12mm (A4) / 14mm (Oficio)

### 2. Insertar Logo Lado Izquierdo
Insertar → Imágenes → Desde archivo
1.  Seleccionar imagen del logo izquierdo
2.  Clic derecho → Ajustar texto → "Detrás del texto"
3.  Clic derecho → Tamaño y propiedades
    *   Ancho: 2.9cm (A4) / 3.2cm (Oficio)
    *   Alto: 2.9cm (A4) / 3.2cm (Oficio)
4.  Posición → Más opciones de diseño
    *   Horizontal: Absoluto, 2cm desde "Página"
    *   Vertical: Absoluto, 1.2cm (A4) / 1.4cm (Oficio) desde "Página"

### 3. Insertar Logo Lado Derecho
Repetir proceso anterior pero:
*   Horizontal: Absoluto, 2cm desde "Margen derecho"
*   Vertical: Absoluto, 1.2cm (A4) / 1.4cm (Oficio) desde "Página"

### 4. Segunda Página (Reverso)
Insertar → Salto de página
Repetir posicionamiento de logos en la segunda página

## Proceso de Uso:

### Para el Usuario Final:
1.  Descargar e imprimir el PDF principal (con cuadrados vacíos)
2.  Abrir plantilla .docx con sus propios logos
3.  Cargar las hojas impresas en la bandeja de la impresora
    ⚠️ Importante: Cargar en la misma orientación
4.  Imprimir la plantilla .docx sobre las hojas ya impresas
5.  Resultado: PDF completo con logos institucionales

## Consejos Adicionales:
*   Usar logos en alta resolución (mínimo 300 DPI)
*   Formato PNG con fondo transparente
*   Probar impresión con papel borrador primero
*   Verificar alineación antes de imprimir cantidad final
`;

export default instructionsMarkdown;
