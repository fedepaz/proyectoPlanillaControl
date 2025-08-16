import authClient from "./authClient";
import { SessionResponse } from "../types/auth";
import { LoginSchema } from "../login/types/modelsSchema";

// Backup de sesión para casos donde las cookies fallan
const SESSION_BACKUP_KEY = "user_session_backup";

export const sessionService = {
  // Login
  login: async (credentials: LoginSchema): Promise<SessionResponse> => {
    const response = await authClient.post<SessionResponse>(
      "/session/login",
      credentials
    );

    // Solo guardar información básica del usuario, NO el token
    if (response.data.authenticated) {
      const userBackup = {
        dni: response.data.user.dni,
        role: response.data.user.role,
        oficialId: response.data.user.oficialId,
        timestamp: Date.now(),
      };

      // Guardar backup en múltiples lugares para iOS
      try {
        sessionStorage.setItem(SESSION_BACKUP_KEY, JSON.stringify(userBackup));
        localStorage.setItem(SESSION_BACKUP_KEY, JSON.stringify(userBackup));
      } catch (error) {
        console.warn("Cannot save session backup:", error);
      }
    }

    return response.data;
  },

  // Verificar sesión
  getSession: async (): Promise<SessionResponse> => {
    try {
      const response = await authClient.get<SessionResponse>("/session");
      return response.data;
    } catch (error) {
      // Si falla la cookie, intentar con backup local
      const backup = getSessionBackup();
      if (backup && isBackupValid(backup)) {
        throw error; // Aún necesitamos validar con el servidor
      }
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await authClient.delete("/session");
    } finally {
      // Limpiar backups locales
      sessionStorage.removeItem(SESSION_BACKUP_KEY);
      localStorage.removeItem(SESSION_BACKUP_KEY);
    }
  },

  // Verificar si hay sesión válida local (para UI optimista)
  hasLocalSession: (): boolean => {
    const backup = getSessionBackup();
    return backup && isBackupValid(backup);
  },
};

// Funciones auxiliares
const getSessionBackup = () => {
  try {
    // Priorizar sessionStorage sobre localStorage
    let backupStr = sessionStorage.getItem(SESSION_BACKUP_KEY);
    if (!backupStr) {
      backupStr = localStorage.getItem(SESSION_BACKUP_KEY);
    }
    return backupStr ? JSON.parse(backupStr) : null;
  } catch {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBackupValid = (backup: any): boolean => {
  const maxAge = 12 * 60 * 60 * 1000; // 12 horas
  return backup.timestamp && Date.now() - backup.timestamp < maxAge;
};
