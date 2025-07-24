// ==================== DETAILED API RESPONSE INTERFACES ====================

export interface JerarquiaData {
  label: string;
  id: string;
}

export interface ResponsableDetailData {
  dni: number;
  firstname: string;
  lastname: string;
  legajo: number;
  jerarquiaId: JerarquiaData;
  id: string;
}

export interface EmpresaDetailData {
  empresa: string;
  id: string;
}

export interface AeropuertoData {
  aeropuerto: string;
  codIATA: string;
  codOACI: string;
  id: string;
}

export interface CodVueloDetailData {
  codVuelo: string;
  origen: AeropuertoData;
  destino: AeropuertoData;
  id: string;
}

export interface DemoraData {
  label: string;
  id: string;
}

export interface TipoVueloData {
  label: string;
  id: string;
}

export interface MatriculaAeronaveData {
  matriculaAeronave: string;
  id: string;
}

export interface LabeledOptionData {
  label: string;
  id: string;
}

export interface PersonalEmpresaData {
  dni: number;
  firstname: string;
  lastname: string;
  empresa: EmpresaDetailData;
  legajo: number;
  id: string;
}

export interface FuncionData {
  label: string;
  id: string;
}

export interface PersonalSeguridadData {
  dni: number;
  firstname: string;
  lastname: string;
  legajo: number;
  id: string;
}

export interface TipoVehiculoData {
  label: string;
  id: string;
}

export interface VehiculoDetailData {
  numInterno: string;
  empresa: EmpresaDetailData;
  tipoVehiculo: TipoVehiculoData;
  id: string;
}

export interface OperadorVehiculoData {
  dni: number;
  firstname: string;
  lastname: string;
  legajo: number;
  id: string;
}

// ==================== MAIN DATA INTERFACES ====================

export interface DatosPsaDetail {
  fecha: string;
  responsable: ResponsableDetailData;
  horaIni?: string;
  horaFin?: string;
  cant: string;
  tipoControl: LabeledOptionData[];
  medioTec: LabeledOptionData[];
  tipoPro: LabeledOptionData[];
}

export interface DatosVueloDetail {
  empresa: EmpresaDetailData;
  codVuelo: CodVueloDetailData;
  horaArribo?: string;
  horaPartida?: string;
  demora: DemoraData;
  tipoVuelo: TipoVueloData;
  matriculaAeronave: MatriculaAeronaveData;
  posicion: string;
}

export interface DatosTerrestreDetail {
  personalEmpresa: PersonalEmpresaData[];
  funcion: FuncionData;
  grupo: string;
  _id: string;
}

export interface DatosSeguridadDetail {
  personalSegEmpresa: PersonalSeguridadData[];
  empresaSeguridad: EmpresaDetailData;
  id: string;
}

export interface DatosVehiculosDetail {
  vehiculo: VehiculoDetailData;
  operadorVehiculo: OperadorVehiculoData;
  isObservaciones: boolean;
  observacionesVehiculo: string;
  _id: string;
}

export interface NovedadData {
  isRequired: boolean;
  observaciones: string;
}

// ==================== MAIN PLANILLA DETAIL INTERFACE ====================

export interface PlanillaDetailData {
  id: string;
  datosPsa: DatosPsaDetail;
  datosVuelo: DatosVueloDetail;
  datosTerrestre: DatosTerrestreDetail[];
  datosSeguridad: DatosSeguridadDetail[];
  datosVehiculos: DatosVehiculosDetail[];
  novEquipajes: NovedadData;
  novInspeccion: NovedadData;
  novOtras: NovedadData;
  createdAt: string;
  updatedAt: string;
}

// ==================== API RESPONSE INTERFACE ====================

export interface PlanillaDetailApiResponse {
  data: PlanillaDetailData;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Extracts detailed value from complex nested objects
 * @param field - Field that can be a complex object
 * @returns Extracted string value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractDetailedValue = (field: any): string => {
  if (typeof field === "object" && field !== null) {
    // For empresa objects
    if (field.empresa) return field.empresa;
    // For codVuelo objects
    if (field.codVuelo) return field.codVuelo;
    // For responsable objects
    if (field.firstname && field.lastname)
      return `${field.firstname} ${field.lastname}`;
    // For labeled options
    if (field.label) return field.label;
    // For matricula objects
    if (field.matriculaAeronave) return field.matriculaAeronave;
    // For vehiculo objects
    if (field.numInterno) return field.numInterno;
    return "N/A";
  }
  return field || "N/A";
};

/**
 * Formats responsable name from detailed data
 * @param responsable - Responsable detail data
 * @returns Formatted full name
 */
export const formatResponsableName = (
  responsable: ResponsableDetailData
): string => {
  return `${responsable.firstname} ${responsable.lastname}`;
};

/**
 * Formats personal empresa names from array
 * @param personalEmpresa - Array of personal empresa data
 * @returns Comma-separated names
 */
export const formatPersonalEmpresaNames = (
  personalEmpresa: PersonalEmpresaData[]
): string => {
  return personalEmpresa
    .map((pe) => `${pe.firstname} ${pe.lastname}`)
    .join(", ");
};

/**
 * Formats personal seguridad names from array
 * @param personalSeguridad - Array of personal seguridad data
 * @returns Array of formatted names
 */
export const formatPersonalSeguridadNames = (
  personalSeguridad: PersonalSeguridadData[]
): string[] => {
  return personalSeguridad.map((ps) => `${ps.firstname} ${ps.lastname}`);
};

/**
 * Formats tipo control labels from array
 * @param tipoControl - Array of tipo control data
 * @returns Array of labels
 */
export const formatTipoControlLabels = (
  tipoControl: LabeledOptionData[]
): string[] => {
  return tipoControl.map((tc) => tc.label);
};

/**
 * Formats medio tecnico labels from array
 * @param medioTec - Array of medio tecnico data
 * @returns Array of labels
 */
export const formatMedioTecLabels = (
  medioTec: LabeledOptionData[]
): string[] => {
  return medioTec.map((mt) => mt.label);
};

/**
 * Formats tipo procedimiento labels from array
 * @param tipoPro - Array of tipo procedimiento data
 * @returns Array of labels
 */
export const formatTipoProLabels = (tipoPro: LabeledOptionData[]): string[] => {
  return tipoPro.map((tp) => tp.label);
};

/**
 * Gets the route information from codVuelo detail
 * @param codVuelo - CodVuelo detail data
 * @returns Formatted route string
 */
export const formatRoute = (codVuelo: CodVueloDetailData): string => {
  return `${codVuelo.origen.codIATA} → ${codVuelo.destino.codIATA}`;
};

/**
 * Gets the full route information from codVuelo detail
 * @param codVuelo - CodVuelo detail data
 * @returns Formatted full route string
 */
export const formatFullRoute = (codVuelo: CodVueloDetailData): string => {
  return `${codVuelo.origen.aeropuerto} → ${codVuelo.destino.aeropuerto}`;
};

/**
 * Counts the number of required novedades for a detailed planilla
 * @param planilla - Detailed planilla data object
 * @returns Number of required novedades
 */
export const getNovedadesCount = (planilla: PlanillaDetailData): number => {
  let count = 0;
  if (planilla.novEquipajes.isRequired) count++;
  if (planilla.novInspeccion.isRequired) count++;
  if (planilla.novOtras.isRequired) count++;
  return count;
};

/**
 * Gets all novedades that are required
 * @param planilla - Detailed planilla data object
 * @returns Array of required novedades with their types
 */
export const getRequiredNovedades = (
  planilla: PlanillaDetailData
): Array<{ type: string; observaciones: string }> => {
  const required = [];

  if (planilla.novEquipajes.isRequired) {
    required.push({
      type: "Equipajes",
      observaciones: planilla.novEquipajes.observaciones,
    });
  }

  if (planilla.novInspeccion.isRequired) {
    required.push({
      type: "Inspección",
      observaciones: planilla.novInspeccion.observaciones,
    });
  }

  if (planilla.novOtras.isRequired) {
    required.push({
      type: "Otras",
      observaciones: planilla.novOtras.observaciones,
    });
  }

  return required;
};

// ==================== TYPE GUARDS ====================

/**
 * Type guard to check if data is PlanillaDetailData
 * @param data - Data to check
 * @returns Boolean indicating if data is PlanillaDetailData
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPlanillaDetailData = (data: any): data is PlanillaDetailData => {
  return (
    data &&
    typeof data === "object" &&
    data.datosPsa &&
    data.datosPsa.responsable &&
    typeof data.datosPsa.responsable === "object" &&
    "jerarquiaId" in data.datosPsa.responsable &&
    data.datosVuelo &&
    data.datosVuelo.empresa &&
    typeof data.datosVuelo.empresa === "object" &&
    "empresa" in data.datosVuelo.empresa
  );
};

// ==================== Print Form ====================

export interface HeaderConfig {
  location: string; // "METROPOLITANA", "MENDOZA", "BARILOCHE", etc.
  airportName?: string; // Optional airport name
  logoUrl?: string; // Optional custom logo URL
  officialLogoUrl?: string; // Optional official logo URL
}

export interface PaperSize {
  label: string;
  width: string;
  height: string;
}

export const PAPER_SIZES: PaperSize[] = [
  { label: "A4", width: "210mm", height: "297mm" },
  { label: "Oficio", width: "216mm", height: "330mm" },
];
