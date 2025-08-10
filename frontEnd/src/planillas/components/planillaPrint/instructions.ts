const instructionsMarkdown = `# Instrucciones para Crear Plantilla de Logos

⚠️ **Importante:** Este documento contiene las especificaciones técnicas para crear una plantilla de logos compatible con el sistema de impresión institucional.

---

## Configuración del Documento

### Especificaciones para Papel A4 (210 × 297 mm)

* **Márgenes:** 12mm en todos los lados
* **Orientación:** Vertical (Retrato)
* **Tamaño del logo:** 110 × 110 px (equivale a ~29mm × 29mm)
* **Resolución mínima:** 300 DPI
* **Formato recomendado:** PNG con fondo transparente

### Especificaciones para Papel Oficio (216 × 330 mm)

* **Márgenes:** 14mm en todos los lados
* **Orientación:** Vertical (Retrato)  
* **Tamaño del logo:** 120 × 120 px (equivale a ~32mm × 32mm)
* **Resolución mínima:** 300 DPI
* **Formato recomendado:** PNG con fondo transparente

---

## Posicionamiento de los Logos

### Configuración Inicial en Microsoft Word

1. **Crear documento nuevo** con el tamaño de papel correspondiente
2. **Configurar márgenes** según especificaciones técnicas
3. **Insertar logos** como imágenes de alta resolución
4. **Configurar posicionamiento absoluto** para precisión milimétrica

### Logo Lado Izquierdo - Especificaciones Técnicas

* **Posición horizontal:** 20mm desde el borde izquierdo de la página
* **Posición vertical:** 12mm desde el borde superior (A4) / 14mm (Oficio)
* **Ajuste del texto:** "Detrás del texto"
* **Anclaje:** "A la página"
* **Distribución:** No interferir con el contenido principal

### Logo Lado Derecho - Especificaciones Técnicas

* **Posición horizontal:** 20mm desde el borde derecho de la página
* **Posición vertical:** 12mm desde el borde superior (A4) / 14mm (Oficio)
* **Ajuste del texto:** "Detrás del texto"  
* **Anclaje:** "A la página"
* **Distribución:** No interferir con el contenido principal

---

## Proceso Detallado en Microsoft Word

### 1. Configuración de Página

**Ruta:** Diseño → Configurar página → Márgenes → Márgenes personalizados

**Para Papel A4:**
* Superior: '12mm'
* Inferior: '12mm'
* Izquierdo: '12mm'
* Derecho: '12mm'

**Para Papel Oficio:**
* Superior: '14mm'
* Inferior: '14mm'
* Izquierdo: '14mm'
* Derecho: '14mm'

### 2. Inserción del Logo Lado Izquierdo

**Ruta:** 'Insertar → Imágenes → Desde archivo'

1. **Seleccionar** imagen del logo institucional izquierdo
2. **Clic derecho** → 'Ajustar texto' → **"Detrás del texto"**
3. **Clic derecho** → 'Tamaño y propiedades'
   * **Ancho:** 2.9cm (A4) / 3.2cm (Oficio)
   * **Alto:** 2.9cm (A4) / 3.2cm (Oficio)
   * **Mantener relación de aspecto:** ✓ Activado
4. **Posición** → 'Más opciones de diseño'
   * **Horizontal:** Absoluto, '2cm' desde "Página"
   * **Vertical:** Absoluto, '1.2cm' (A4) / '1.4cm' (Oficio) desde "Página"

### 3. Inserción del Logo Lado Derecho

**Repetir el proceso anterior** con las siguientes modificaciones:

* **Horizontal:** Absoluto, '2cm' desde **"Margen derecho"**
* **Vertical:** Absoluto, '1.2cm' (A4) / '1.4cm' (Oficio) desde "Página"

### 4. Configuración de Segunda Página (Reverso)

1. **Insertar** → 'Salto de página'
2. **Repetir posicionamiento** de logos en la segunda página
3. **Verificar alineación** con la primera página

---

## Proceso de Uso para el Usuario Final

### Paso 1: Preparación
1. **Descargar** el PDF principal del sistema (contiene cuadrados de referencia)
2. **Imprimir** el PDF principal en papel blanco
3. **Abrir** la plantilla '.docx' con los logos institucionales

### Paso 2: Configuración de Impresora
1. **Cargar** las hojas ya impresas en la bandeja de la impresora
2. ⚠️ **Importante:** Mantener la misma orientación que la impresión original
3. **Verificar** que la impresora esté configurada para el tamaño correcto

### Paso 3: Impresión Final
1. **Imprimir** la plantilla '.docx' sobre las hojas pre-impresas
2. **Verificar** la alineación antes de proceder con toda la cantidad
3. **Resultado:** Documento completo con logos institucionales integrados

---

## Consejos y Recomendaciones Técnicas

### Calidad de Imagen
* **Usar logos** en alta resolución (mínimo 300 DPI)
* **Preferir formato PNG** con fondo transparente
* **Evitar formatos JPG** para logos con transparencias

### Pruebas de Impresión
* **Realizar prueba** con papel borrador antes de la impresión final
* **Verificar alineación** comparando con los cuadrados de referencia
* **Ajustar posición** si es necesario antes de imprimir la cantidad total

### Solución de Problemas
* **Desalineación:** Revisar configuración de márgenes y posición absoluta
* **Calidad borrosa:** Verificar resolución de la imagen original
* **Problemas de transparencia:** Convertir imagen a PNG de alta calidad

⚠️ **Nota final:** Este proceso garantiza la integración correcta de logos institucionales manteniendo la calidad profesional del documento.`;

export default instructionsMarkdown;
