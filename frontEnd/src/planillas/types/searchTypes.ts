// ==================== INTERFACES ====================

export interface DateFilters {
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface ResponsableData {
  firstname: string;
  lastname: string;
  id: string;
}

export interface EmpresaData {
  empresa: string;
  id: string;
}

export interface CodVueloData {
  codVuelo: string;
  id: string;
}

export interface DatosPsa {
  fecha: string;
  responsable: ResponsableData;
  horaIni?: string | undefined;
  horaFin?: string | undefined;
  cant: string;
  tipoControl: string | string[];
  medioTec: string | string[];
  tipoPro: string | string[];
}

export interface DatosVuelo {
  empresa: EmpresaData | string;
  codVuelo: CodVueloData | string;
  horaArribo?: string | undefined;
  horaPartida?: string | undefined;
  demora: string;
  tipoVuelo: string;
  matriculaAeronave: string;
  posicion: string;
}

export interface DatosTerrestre {
  personalEmpresa: string;
  funcion: string;
  grupo: string;
}

export interface DatosSeguridad {
  personalSegEmpresa: string[];
  empresaSeguridad: string;
}

export interface DatosVehiculos {
  vehiculo: string;
  operadorVehiculo: string;
  isObservaciones: boolean;
  observacionesVehiculo: string;
}

export interface NovedadData {
  isRequired: boolean;
  observaciones: string;
}

export interface PlanillaData {
  id: string;
  datosPsa: DatosPsa;
  datosVuelo: DatosVuelo;
  datosTerrestre: DatosTerrestre[];
  datosSeguridad: DatosSeguridad[];
  datosVehiculos: DatosVehiculos[];
  novEquipajes: NovedadData;
  novInspeccion: NovedadData;
  novOtras: NovedadData;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessedPlanillaData extends PlanillaData {
  empresa: string;
  codVuelo: string;
  responsable: string;
  formattedDate: string;
  formattedHoraIni: string;
  formattedHoraFin: string;
  formattedHoraArribo: string;
  formattedHoraPartida: string;
  novedadesCount: number;
}

export interface PlanillasApiResponse {
  data: PlanillaData[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export interface UsePlanillasParams {
  page?: number;
  pageSize?: number;
  empresa?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  populate?: string[];
  enabled?: boolean;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Formats date string to a readable format
 * @param dateString - Date string in various formats
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";

  // Handle different date formats
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/");
    return `${day}/${month}/${year}`;
  }

  // Handle ISO date format
  try {
    return new Date(dateString).toLocaleDateString("es-ES");
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formats time string from HHMM to HH:MM format
 * @param timeString - Time string in HHMM format
 * @returns Formatted time string
 */
export const formatTime = (timeString: string | undefined): string => {
  if (!timeString) return "N/A";

  // Format HHMM to HH:MM
  if (timeString.length === 4) {
    return `${timeString.slice(0, 2)}:${timeString.slice(2)}`;
  }

  return timeString;
};

/**
 * Extracts value from nested objects or returns the field directly
 * @param field - Field that can be object or string
 * @returns Extracted string value
 */
export const extractValue = (field: any): string => {
  if (typeof field === "object" && field !== null) {
    return (
      field.empresa ||
      field.codVuelo ||
      field.firstname + " " + field.lastname ||
      "N/A"
    );
  }
  return field || "N/A";
};

/**
 * Counts the number of required novedades for a planilla
 * @param planilla - Planilla data object
 * @returns Number of required novedades
 */
export const getNovedadesCount = (planilla: PlanillaData): number => {
  let count = 0;
  if (planilla.novEquipajes.isRequired) count++;
  if (planilla.novInspeccion.isRequired) count++;
  if (planilla.novOtras.isRequired) count++;
  return count;
};

/**
 * Processes raw planilla data into a more usable format
 * @param planillas - Array of raw planilla data
 * @returns Array of processed planilla data
 */
export const processPlantillaData = (
  planillas: PlanillaData[]
): ProcessedPlanillaData[] => {
  return planillas.map((planilla) => ({
    ...planilla,
    empresa: extractValue(planilla.datosVuelo.empresa),
    codVuelo: extractValue(planilla.datosVuelo.codVuelo),
    responsable: `${planilla.datosPsa.responsable.firstname} ${planilla.datosPsa.responsable.lastname}`,
    formattedDate: formatDate(planilla.datosPsa.fecha),
    formattedHoraIni: formatTime(planilla.datosPsa.horaIni),
    formattedHoraFin: formatTime(planilla.datosPsa.horaFin),
    formattedHoraArribo: formatTime(planilla.datosVuelo.horaArribo),
    formattedHoraPartida: formatTime(planilla.datosVuelo.horaPartida),
    novedadesCount: getNovedadesCount(planilla),
  }));
};

// ==================== ENUMS ====================

export enum FlightType {
  ARRIVAL = "arrival",
  DEPARTURE = "departure",
  BOTH = "both",
  UNKNOWN = "unknown",
}

export enum NovedadType {
  EQUIPAJES = "equipajes",
  INSPECCION = "inspeccion",
  OTRAS = "otras",
}

// ==================== CONSTANTS ====================

export const DEFAULT_PAGE_SIZE = 10;

export const PLANILLA_POPULATE_FIELDS = ["codVuelo", "empresa"];

// ==================== TYPE GUARDS ====================

/**
 * Type guard to check if empresa is an object
 * @param empresa - Empresa field
 * @returns Boolean indicating if empresa is an object
 */
export const isEmpresaObject = (
  empresa: EmpresaData | string
): empresa is EmpresaData => {
  return typeof empresa === "object" && empresa !== null;
};

/**
 * Type guard to check if codVuelo is an object
 * @param codVuelo - CodVuelo field
 * @returns Boolean indicating if codVuelo is an object
 */
export const isCodVueloObject = (
  codVuelo: CodVueloData | string
): codVuelo is CodVueloData => {
  return typeof codVuelo === "object" && codVuelo !== null;
};

/**
 * Type guard to check if responsable is an object
 * @param responsable - Responsable field
 * @returns Boolean indicating if responsable is an object
 */
export const isResponsableObject = (
  responsable: ResponsableData | string
): responsable is ResponsableData => {
  return typeof responsable === "object" && responsable !== null;
};
