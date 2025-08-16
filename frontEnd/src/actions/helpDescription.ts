import { View } from "../types/types";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import BuildIcon from "@mui/icons-material/Build";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import FlightIcon from "@mui/icons-material/Flight";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WarningIcon from "@mui/icons-material/Warning";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SaveIcon from "@mui/icons-material/Save";

export interface HelpStep {
  step: string;
  title: string;
  description: string;
  icon: string | React.ReactNode | React.ComponentType;
}

export interface HelpDescription {
  title: string;
  subtitle: string;
  steps: HelpStep[];
  criticalInfo?: string[];
  estimatedTime?: string;
}

// Definimos las descripciones específicas para cada vista
export const helpDescriptions: Record<View, HelpDescription | null> = {
  // Vistas sin ayuda (login/register/reset son obvias)
  [View.LOGIN]: null,
  [View.REGISTER]: null,
  [View.RESET_PASSWORD]: null,
  [View.DASHBOARD]: null,
  [View.LOGOUT]: null,

  // GENERATE_PLANILLAS - Flujo de 6 pasos
  [View.GENERATE_PLANILLAS]: {
    title: "Generar Planillas",
    subtitle: "Sigue estos pasos para crear una planilla correctamente",
    steps: [
      {
        step: "1",
        title: "Datos PSA",
        description:
          "Selecciona la fecha del inicio del control. Cantidad de personas que realizaron el control. Selecciona una casilla al menos de cada uno de los tipos de control, medio tecnico y tipo de procedimiento.",
        icon: AccessTimeIcon,
      },
      {
        step: "2",
        title: "Datos Vuelo",
        description:
          "Selecciona la aerolinea de vuelo. Selecciona el tipo de vuelo. Selecciona el aeropuerto de origen o destino. Selecciona la hora de arribo o partida. Selecciona el cod de vuelo o crealo. Selecciona la demora. Selecciona la matricula de la aeronave. Selecciona la posición de la aeronave.",
        icon: FlightIcon,
      },
      {
        step: "3",
        title: "Datos Peronal Terrestre",
        description:
          "Selecciona el personal terrestre colocando el DNI, sin puntos. Si no aparece crealo. Selecciona el grupo de trabajo del personal. Confirma la función del personal.",
        icon: PeopleIcon,
      },
      {
        step: "4",
        title: "Datos Pesronal de Seguridad",
        description:
          "Selecciona el personal de seguridad colocando el DNI, sin puntos. Si no aparece crealo. Confirma.",
        icon: SecurityIcon,
      },
      {
        step: "5",
        title: "Datos de Vehiculos",
        description:
          "Selecciona el tipo de vehiculo. Selecciona el personal de operación. Selecciona si el vehiculo está observando. Escribe las observaciones.",
        icon: DirectionsCarIcon,
      },
      {
        step: "6",
        title: "Novedades",
        description: "Selecciona si hay novedades. Escribe las observaciones.",
        icon: WarningIcon,
      },
    ],
    criticalInfo: [
      "TENGA EN CUENTA QUE LOS DATOS AGREGADOS SON LOS QUE VAN A TENER SU PLANILLA PARA LUEGO RUBRICAR CON SU FIRMA.",
      "No puede avanzar hasta que se completen todos los puntos",
      "Al menos un vehículo debe seleccionar, y luego asignar a un operador",
      "Una vez enviada, la planilla queda registrada y NO se puede modificar",
    ],
  },

  // VIEW_HISTORY - Historial de planillas
  [View.VIEW_HISTORY]: {
    title: "Historial de Planillas",
    subtitle: "Cómo buscar y revisar planillas anteriores",
    steps: [
      {
        step: "1",
        title: "Filtrar por fecha",
        description:
          "Selecciona el rango de fechas que necesitas. Por defecto muestra el último mes.",
        icon: AccessTimeIcon,
      },
      {
        step: "2",
        title: "Buscar planilla",
        description:
          "Usa el buscador para encontrar por número de planilla, vuelo o personal (ej: 'AR1234' o '20240515-001').",
        icon: SearchIcon,
      },
      {
        step: "3",
        title: "Vista rápida",
        description:
          "Haz clic en una planilla para ver su resumen. Muestra fecha, aeropuerto y estado básico.",
        icon: VisibilityIcon,
      },
      {
        step: "4",
        title: "Ver detalles",
        description:
          "En la vista rápida, haz clic en 'Ver detalles' para ver TODA la información completa.",
        icon: VisibilityIcon,
      },
      {
        step: "5",
        title: "Descargar PDF",
        description:
          "En la vista de detalles, usa el botón 'Descargar PDF' para guardar un informe oficial firmado.",
        icon: PictureAsPdfIcon,
      },
    ],
    criticalInfo: [
      "Solo puedes ver planillas de TU AEROPUERTO",
      "Los datos sensibles están ocultos por seguridad",
      "El historial se mantiene por 180 días",
    ],
  },

  // Vistas en construcción (muestra cuándo estará lista)
  [View.VIEW_PROFILE]: {
    title: "Perfil de Usuario",
    subtitle: "Funcionalidad en construcción",
    steps: [
      {
        step: "1",
        title: "Próximamente",
        description: "Esta funcionalidad estará disponible en Agosto 2025",
        icon: WarningIcon,
      },
    ],
    criticalInfo: [
      "Por ahora, no puedes cambiar tu información personal",
      "Para cambiar tu contraseña, usa 'Restablecer Contraseña'",
      "Esta función se implementará próximamente",
    ],
    estimatedTime: "Agosto 2025",
  },
  [View.VIEW_HISTORY_RESPONSABLES]: {
    title: "Historial de Responsables",
    subtitle: "Cómo revisar el trabajo de los responsables",
    steps: [
      {
        step: "1",
        title: "Filtrar por responsable",
        description:
          "Selecciona un responsable específico para ver solo sus planillas.",
        icon: PersonIcon,
      },
      {
        step: "2",
        title: "Ver métricas",
        description:
          "Revisa puntualidad, errores detectados y productividad del responsable.",
        icon: WarningIcon,
      },
      {
        step: "3",
        title: "Analizar tendencias",
        description:
          "Identifica patrones en el trabajo del responsable a lo largo del tiempo.",
        icon: WarningIcon,
      },
    ],
    criticalInfo: [
      "Solo los supervisores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
  [View.VIEW_HISTORY_SUPERVISORES]: {
    title: "Historial de Supervisores",
    subtitle: "Cómo supervisar el trabajo de los supervisores",
    steps: [
      {
        step: "1",
        title: "Filtrar por supervisor",
        description:
          "Selecciona un supervisor específico para revisar sus actividades.",
        icon: PeopleIcon,
      },
      {
        step: "2",
        title: "Ver validaciones",
        description:
          "Revisa las validaciones que el supervisor realizó en las planillas.",
        icon: CheckCircleIcon,
      },
      {
        step: "3",
        title: "Control de calidad",
        description:
          "Analiza los informes de control de calidad generados por el supervisor.",
        icon: SearchIcon,
      },
    ],
    criticalInfo: [
      "Solo los administradores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
  [View.VIEW_HISTORY_AUXILIARES]: {
    title: "Historial de Auxiliares",
    subtitle: "Cómo revisar el trabajo de los auxiliares",
    steps: [
      {
        step: "1",
        title: "Filtrar por auxiliar",
        description:
          "Selecciona un auxiliar específico para ver sus tareas completadas.",
        icon: WorkIcon,
      },
      {
        step: "2",
        title: "Ver tareas",
        description:
          "Revisa las tareas asignadas y completadas por el auxiliar.",
        icon: CheckCircleIcon,
      },
      {
        step: "3",
        title: "Tiempo de ejecución",
        description: "Analiza los tiempos que tardó en completar cada tarea.",
        icon: ScheduleIcon,
      },
    ],
    criticalInfo: [
      "Solo los supervisores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
  [View.SETTINGS]: {
    title: "Configuración del Sistema",
    subtitle:
      "Ajusta parámetros del sistema, configura integraciones, gestiona backups automáticos y personaliza la interfaz según las necesidades de tu organización.",
    steps: [
      {
        step: "1",
        title: "Configuración de integraciones",
        description:
          "Configura las integraciones con servicios externos, como Google Drive, Dropbox, etc.",
        icon: BusinessIcon,
      },
      {
        step: "2",
        title: "Backups automáticos",
        description:
          "Habilita la sincronización automática de datos con un servidor remoto.",
        icon: SaveIcon,
      },
      {
        step: "3",
        title: "Personalización",
        description:
          "Personaliza la interfaz del sistema según las necesidades de tu organización.",
        icon: ColorLensIcon,
      },
    ],
    criticalInfo: [
      "Solo los administradores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
  [View.MANAGE_USERS]: {
    title: "Administración de Usuarios",
    subtitle:
      "Crea, edita y gestiona usuarios del sistema. Asigna roles, controla accesos, gestiona grupos de trabajo y monitorea la actividad de usuarios.",
    steps: [
      {
        step: "1",
        title: "Crear usuarios",
        description: "Crea nuevos usuarios con diferentes roles y permisos.",
        icon: PersonIcon,
      },
      {
        step: "2",
        title: "Gestionar roles",
        description:
          "Crea y gestiona roles personalizados, configura permisos granulares, gestiona jerarquías de acceso y controla las capacidades de cada tipo de usuario en el sistema.",
        icon: PeopleIcon,
      },
      {
        step: "3",
        title: "Gestionar grupos",
        description:
          "Crea y gestiona grupos de trabajo, asigna usuarios a grupos y controla el acceso a diferentes funciones del sistema.",
        icon: PeopleIcon,
      },
      {
        step: "4",
        title: "Monitorear actividad",
        description: "Revisa la actividad de los usuarios en el sistema.",
        icon: WarningIcon,
      },
    ],
    criticalInfo: [
      "Solo los administradores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
  [View.REPORTS]: {
    title: "Reportes y Análisis",
    subtitle:
      "Genera reportes detallados, estadísticas de rendimiento, análisis de tendencias y métricas operativas. Incluye exportación a Excel, PDF y dashboards interactivos.",
    steps: [
      {
        step: "1",
        title: "Reportes",
        description:
          "Genera reportes detallados, estadísticas de rendimiento, análisis de tendencias y métricas operativas.",
        icon: WarningIcon,
      },
      {
        step: "2",
        title: "Análisis",
        description:
          "Incluye exportación a Excel, PDF y dashboards interactivos.",
        icon: WarningIcon,
      },
    ],
    criticalInfo: [
      "Solo los administradores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
  [View.USER_ROLES]: {
    title: "Gestión de Roles y Permisos",
    subtitle:
      "Define roles personalizados, configura permisos granulares, gestiona jerarquías de acceso y controla las capacidades de cada tipo de usuario en el sistema.",
    steps: [
      {
        step: "1",
        title: "Definir roles",
        description:
          "Crea y gestiona roles personalizados, configura permisos granulares, gestiona jerarquías de acceso y controla las capacidades de cada tipo de usuario en el sistema.",
        icon: PeopleIcon,
      },
      {
        step: "2",
        title: "Gestionar permisos",
        description:
          "Configura permisos para cada rol, controla el acceso a diferentes funciones del sistema.",
        icon: SecurityIcon,
      },
      {
        step: "3",
        title: "Gestionar jerarquías",
        description:
          "Crea y gestiona jerarquías de acceso, controla el acceso a diferentes funciones del sistema.",
        icon: PeopleIcon,
      },
    ],
    criticalInfo: [
      "Solo los administradores pueden acceder a esta información",
      "Los datos son confidenciales y no deben compartirse",
      "El acceso está auditado para seguridad",
    ],
  },
};

export const planillaStepDescriptions: Record<number, HelpDescription> = {
  0: {
    title: "Paso 1: Datos PSA",
    subtitle: "Completa la información básica de la planilla",
    steps: [
      {
        step: "1",
        title: "Hora de Inicio",
        description:
          "Selecciona la hora de inicio del control no la de arribo o partida.",
        icon: AccessTimeIcon,
      },
      {
        step: "2",
        title: "Cantidad",
        description:
          "Ingresa la cantidad de personas que realizaron el control.",
        icon: PeopleIcon,
      },
      {
        step: "3",
        title: "Tipo de Control",
        description: "Selecciona el tipo de control.",
        icon: SecurityIcon,
      },
      {
        step: "4",
        title: "Medios Técnicos",
        description: "Selecciona el medio tecnico.",
        icon: BuildIcon,
      },
      {
        step: "5",
        title: "Tipo de Procedimiento",
        description: "Selecciona el tipo de procedimiento.",
        icon: ListAltIcon,
      },
    ],
    criticalInfo: [
      "TENGA EN CUENTA QUE LOS DATOS AGREGADOS SON LOS QUE VAN A TENER SU PLANILLA PARA LUEGO RUBRICAR CON SU FIRMA.",
      "Admite hasta 2 horas previo a la hora actual, para colocar el inicio del control",
      "Todos los campos son obligatorios",
      "Sea minucioso, es la planilla que luego va a descargar. No se puede modificar.",
    ],
  },
  1: {
    title: "Paso 2: Datos del vuelo",
    subtitle: "Colocar los datos especificos del vuelo",
    steps: [
      {
        step: "1",
        title: "Aerolineas",
        description:
          "Selecciona la aerolinea de la vuelo. Si la aerolinea no aparece, puedes crearla.",
        icon: AirlineSeatIndividualSuiteIcon,
      },
      {
        step: "2",
        title: "Tipo de vuelo",
        description: "Selecciona el tipo de vuelo.",
        icon: FlightIcon,
      },
      {
        step: "3",
        title: "Destino u Origen",
        description:
          "Selecciona el aeropuerto de origen o destino. Escribiendo el nombre del aeropuerto, puedes buscarlo o agregarlo si no existe.",
        icon: LocationCityIcon,
      },
      {
        step: "4",
        title: "Hora de Arribo o Partida",
        description: "Selecciona la hora.",
        icon: ScheduleIcon,
      },
      {
        step: "5",
        title: "Demora",
        description: "Selecciona la demora.",
        icon: WarningIcon,
      },

      {
        step: "6",
        title: "Matricula Aeronave",
        description:
          "Selecciona la matricula de la aeronave. Si la matrícula no aparece, puedes crearla.",
        icon: AirplaneTicketIcon,
      },
      {
        step: "7",
        title: "Posición",
        description: "Ingresa la posición de la aeronave.",
        icon: LocationOnIcon,
      },
    ],
    criticalInfo: [
      "Los códigos IATA deben ser exactos",
      "Si un vuelo no aparece, puedes crearlo",
      "Los datos deben coincidir con el informe físico",
      "Todos los campos son obligatorios",
      "Sea minucioso, es la planilla que luego va a descargar. No se puede modificar.",
    ],
  },
  2: {
    title: "Paso 3: Personal de Operación Terrestre",
    subtitle: "Registra el personal asignado",
    steps: [
      {
        step: "1",
        title: "Empresa",
        description:
          "Selecciona la empresa de handling. Sino aparece la empresa, puedes crearla.",
        icon: BusinessIcon,
      },
      {
        step: "2",
        title: "Personal",
        description:
          "Selecciona el personal asignado colocando DNI, sin puntos, y sin errores. Si no aparece crealo.",
        icon: PersonIcon,
      },
      {
        step: "3",
        title: "Grupo",
        description: "Coloca el grupo de trabajo del personal.",
        icon: PeopleIcon,
      },
      {
        step: "4",
        title: "Función",
        description: "Selecciona la función del personal.",
        icon: WorkIcon,
      },
      {
        step: "5",
        title: "Confirmar",
        description: "Confirma la lista de personal de handling.",
        icon: CheckCircleIcon,
      },
    ],
    criticalInfo: [
      "Si no aparece alguien, puedes crearlo",
      "Todos los campos son obligatorios",
      "Sea minucioso, es la planilla que luego va a descargar. No se puede modificar.",
    ],
  },
  3: {
    title: "Paso 4: Personal de Seguridad",
    subtitle: "Registra el personal de seguridad asignado",
    steps: [
      {
        step: "1",
        title: "Empresa",
        description:
          "Selecciona la empresa de seguridad. Sino aparece la empresa, puedes crearla.",
        icon: BusinessIcon,
      },
      {
        step: "2",
        title: "Personal",
        description:
          "Selecciona el personal de seguridad colocando el DNI, sin puntos. Si no aparece crealo.",
        icon: PersonIcon,
      },
      {
        step: "3",
        title: "Confirmar",
        description: "Confirma la lista de personal de seguridad.",
        icon: CheckCircleIcon,
      },
    ],
    criticalInfo: [
      "Si no aparece alguien, puedes crearlo",
      "Todos los campos son obligatorios",
      "Sea minucioso, es la planilla que luego va a descargar. No se puede modificar.",
    ],
  },
  4: {
    title: "Paso 5: Vehículos",
    subtitle: "Registra los vehículos controlados",
    steps: [
      {
        step: "1",
        title: "Vehiculo",
        description:
          "Ingresa el número interno del vehículo. Si no aparece, puedes crearlo.",
        icon: DirectionsCarIcon,
      },
      {
        step: "2",
        title: "Confirmar",
        description: "Confirma la lista de vehiculos.",
        icon: CheckCircleIcon,
      },
      {
        step: "3",
        title: "Operadores",
        description:
          "Selecciona los operadores del vehículo colocando el DNI, sin puntos. Si no aparece alguno, puedes crearlo.",
        icon: PersonIcon,
      },
      {
        step: "4",
        title: "Confirmar",
        description:
          "Confirma la lista de vehiculos con operadores asignados. Y si hay observaciones, marca la casilla.",
        icon: CheckCircleIcon,
      },
      {
        step: "5",
        title: "Observaciones",
        description: "Registra las observaciones sobre el vehículo.",
        icon: CommentIcon,
      },
    ],
    criticalInfo: [
      "Al menos un vehículo debe seleccionar, y luego asignar a un operador",
      "El operador puede ser el mismo asignado en la sección de personal de handling",
      "Todos los campos son obligatorios",
      "Sea minucioso, es la planilla que luego va a descargar. No se puede modificar.",
    ],
  },
  5: {
    title: "Paso 6: Novedades",
    subtitle: "Registra las novedades sobre la planilla",
    steps: [
      {
        step: "1",
        title: "Seleccionar la novedad",
        description: "Selecciona si hubo novedad o no.",
        icon: WarningIcon,
      },
      {
        step: "2",
        title: "Observaciones",
        description: "Registra las observaciones.",
        icon: CommentIcon,
      },
    ],
    criticalInfo: [
      "Por defecto, todas las casillas están sin novedad.",
      "Sea minucioso, es la planilla que luego va a descargar. No se puede modificar.",
    ],
  },
  6: {
    title: "Revisión Final",
    subtitle: "Confirma todos los datos antes de enviar la planilla",
    steps: [
      {
        step: "1",
        title: "Verifica Responsable",
        description:
          "Confirma que el responsable sea correcto y corresponda a tu perfil.",
        icon: PersonIcon,
      },
      {
        step: "2",
        title: "Revisa Horas",
        description:
          "Verifica que la hora de inicio y fin sean correctas. La hora de fin es obligatoria y debe ser mayor a la hora de inicio.",
        icon: ScheduleIcon,
      },
      {
        step: "3",
        title: "Confirma Datos de Vuelo",
        description:
          "Revisa que el código de vuelo, origen y destino sean correctos.",
        icon: FlightIcon,
      },
      {
        step: "4",
        title: "Revisa Personal",
        description:
          "Confirma la cantidad total de personal terrestre ingresado.",
        icon: PeopleIcon,
      },
      {
        step: "5",
        title: "Verifica Vehículos",
        description: "Confirma la cantidad total de vehículos operados.",
        icon: DirectionsCarIcon,
      },
      {
        step: "6",
        title: "Confirma Novedades",
        description: "Revisa que no haya novedades que asentar.",
        icon: WarningIcon,
      },
    ],
    criticalInfo: [
      "Una vez enviada, la planilla NO se puede modificar",
      "La hora de fin es obligatoria y debe ser mayor a la hora de inicio",
      "Asegúrate de que todos los datos sean correctos antes de confirmar",
    ],
  },
};

export const successHelpDescription: HelpDescription = {
  title: "Planilla Generada con Éxito",
  subtitle: "Qué hacer ahora que tu planilla ha sido registrada",
  steps: [
    {
      step: "1",
      title: "Ver Detalles",
      description: "Puede visualizar la información detallada de la planilla.",
      icon: VisibilityIcon,
    },
    {
      step: "2",
      title: "Descargar PDF",
      description:
        "Selecciona el tamaño de la página y presiona 'Vista Previa' para ver la planilla en un formato de impresión. Luego puede descargar la planilla en PDF, lista para firmar y colocar sellos.",
      icon: PictureAsPdfIcon,
    },
    {
      step: "3",
      title: "Volver al Inicio",
      description:
        "Una vez descargada la planilla, haz clic en 'Finalizar' para regresar al menú principal y generar una nueva planilla si es necesario.",
      icon: HomeIcon,
    },
  ],
  criticalInfo: [
    "La planilla ya NO se puede modificar después de ser generada",
    "Guarda una copia del PDF para tus registros",
    "Estará disponible en el historial de planillas",
    "Si necesitas corregir algo, debes generar una nueva planilla",
    "En la versión de escritorio, se encuentra un instructivo para integrar logos.",
  ],
};
