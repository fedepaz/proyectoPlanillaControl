// errors.ts - Translation system for user-friendly error messages

export interface ErrorTranslation {
  title: string;
  message: string;
  canRetry: boolean;
}

// Error patterns and their translations
const ERROR_TRANSLATIONS: Record<string, ErrorTranslation> = {
  // Authentication & Authorization
  "token missing or invalid": {
    title: "Sesión Expirada",
    message: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
    canRetry: false,
  },
  unauthorized: {
    title: "Acceso No Autorizado",
    message: "No tienes permisos para realizar esta acción.",
    canRetry: false,
  },
  forbidden: {
    title: "Acceso Denegado",
    message: "No tienes los permisos necesarios para acceder a este recurso.",
    canRetry: false,
  },

  // Validation Errors
  "legajo no corresponde": {
    title: "Error de Validación",
    message: "El legajo ingresado no es válido o no corresponde.",
    canRetry: false,
  },

  // Duplicate Data Errors
  "valor duplicado": {
    title: "Información Duplicada",
    message:
      "Este registro ya existe en el sistema. Consulte los registros existentes.",
    canRetry: false,
  },
  "already exists": {
    title: "Registro Duplicado",
    message:
      "La información que intentas agregar ya está registrada. Consulte los registros existentes.",
    canRetry: false,
  },

  // Not Found Errors
  "oficial not found": {
    title: "Oficial No Encontrado",
    message: "No se encontró el oficial solicitado.",
    canRetry: true,
  },
  "empresa not found": {
    title: "Empresa No Encontrada",
    message: "No se encontró la empresa solicitada.",
    canRetry: true,
  },
  "personal not found": {
    title: "Personal No Encontrado",
    message: "No se encontró el personal solicitado.",
    canRetry: true,
  },
  "matricula not found": {
    title: "Matrícula No Encontrada",
    message: "No se encontró la matrícula solicitada.",
    canRetry: true,
  },
  "aeropuerto not found": {
    title: "Aeropuerto No Encontrado",
    message: "No se encontró el aeropuerto solicitado.",
    canRetry: true,
  },
  "vuelo not found": {
    title: "Vuelo No Encontrado",
    message: "No se encontró el vuelo solicitado.",
    canRetry: true,
  },
  "vehiculo not found": {
    title: "Vehículo No Encontrado",
    message: "No se encontró el vehículo solicitado.",
    canRetry: true,
  },
  "tipoempresa not found": {
    title: "Tipo de Empresa No Encontrado",
    message: "No se encontró el tipo de empresa solicitado.",
    canRetry: true,
  },
  "codvuelo not found": {
    title: "Código de Vuelo No Encontrado",
    message: "No se encontró el código de vuelo solicitado.",
    canRetry: true,
  },
  "planilla not found": {
    title: "Planilla No Encontrada",
    message: "No se encontró la planilla solicitada.",
    canRetry: true,
  },
  "jearquia not found": {
    title: "Jerarquía No Encontrada",
    message: "No se encontró la jerarquía solicitada.",
    canRetry: true,
  },
  "user not found": {
    title: "Usuario No Encontrado",
    message: "No se encontró el usuario solicitado.",
    canRetry: true,
  },

  // Malformed ID Errors
  "id.*is malformed": {
    title: "ID Inválido",
    message: "El identificador proporcionado no tiene un formato válido.",
    canRetry: false,
  },

  // Network Errors
  "network error": {
    title: "Error de Conexión",
    message:
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
    canRetry: true,
  },
  timeout: {
    title: "Tiempo Agotado",
    message: "La operación tardó demasiado tiempo. Intenta nuevamente.",
    canRetry: true,
  },
  connection: {
    title: "Problema de Conexión",
    message: "No se pudo establecer conexión con el servidor.",
    canRetry: true,
  },

  // Server Errors
  "internal server error": {
    title: "Error del Servidor",
    message:
      "Ocurrió un error interno en el servidor. Nuestro equipo ha sido notificado.",
    canRetry: true,
  },
  "database operation error": {
    title: "Error de Base de Datos",
    message: "Ocurrió un error al procesar la información. Intenta nuevamente.",
    canRetry: true,
  },
  "an unexpected error occurred": {
    title: "Error Inesperado",
    message:
      "Ocurrió un error inesperado. Si el problema persiste, contacta al soporte técnico.",
    canRetry: true,
  },
};

// Default fallback translation
const DEFAULT_TRANSLATION: ErrorTranslation = {
  title: "Error",
  message:
    "Ocurrió un error inesperado. Si el problema persiste, contacta al soporte técnico.",
  canRetry: true,
};

/**
 * Translates an error message to a user-friendly Spanish message
 */
export const translateError = (errorMessage: string): ErrorTranslation => {
  const lowerMessage = errorMessage.toLowerCase();

  // Try to find a matching pattern
  for (const [pattern, translation] of Object.entries(ERROR_TRANSLATIONS)) {
    if (pattern.includes(".*")) {
      // Handle regex patterns
      const regex = new RegExp(pattern, "i");
      if (regex.test(lowerMessage)) {
        return translation;
      }
    } else {
      // Handle simple string matching
      if (lowerMessage.includes(pattern.toLowerCase())) {
        return translation;
      }
    }
  }

  return DEFAULT_TRANSLATION;
};

/**
 * Get error translation based on status code and message
 */
export const getErrorTranslation = (
  statusCode: number,
  message: string
): ErrorTranslation => {
  // First try to translate by message
  const messageTranslation = translateError(message);

  // If we got the default translation, try to use status code
  if (messageTranslation === DEFAULT_TRANSLATION) {
    switch (statusCode) {
      case 400:
        return {
          title: "Solicitud Incorrecta",
          message:
            "Los datos enviados no son válidos. Verifica la información e intenta nuevamente.",
          canRetry: false,
        };
      case 401:
        return {
          title: "No Autorizado",
          message:
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          canRetry: false,
        };
      case 403:
        return {
          title: "Acceso Denegado",
          message: "No tienes permisos para realizar esta acción.",
          canRetry: false,
        };
      case 404:
        return {
          title: "No Encontrado",
          message: "El recurso solicitado no fue encontrado.",
          canRetry: true,
        };
      case 409:
        return {
          title: "Conflicto",
          message:
            "La información que intentas guardar entra en conflicto con datos existentes. Comprueba los datos enviados e intenta nuevamente.",
          canRetry: false,
        };
      case 500:
        return {
          title: "Error del Servidor",
          message:
            "Ocurrió un error interno. Nuestro equipo ha sido notificado.",
          canRetry: true,
        };
      default:
        return messageTranslation;
    }
  }

  return messageTranslation;
};
