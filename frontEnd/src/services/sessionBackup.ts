import { SessionResponse } from "../types/auth";

export const sessionBackup = {
  // Guardar datos básicos del usuario
  save: (userData: SessionResponse) => {
    const backup = {
      user: userData.user,
      timestamp: Date.now(),
      authenticated: userData.authenticated,
    };

    try {
      sessionStorage.setItem("user_backup", JSON.stringify(backup));
      localStorage.setItem("user_backup", JSON.stringify(backup));
    } catch (error) {
      console.warn("No se pudo guardar backup:", error);
    }
  },

  // Cargar backup si existe y es válido
  load: () => {
    try {
      // Intentar desde sessionStorage primero
      let backupStr = sessionStorage.getItem("user_backup");

      // Si no, desde localStorage
      if (!backupStr) {
        backupStr = localStorage.getItem("user_backup");
      }

      if (backupStr) {
        const backup = JSON.parse(backupStr);
        // Verificar que no sea muy viejo (12 horas)
        const maxAge = 12 * 60 * 60 * 1000; // 12 horas
        if (backup.timestamp && Date.now() - backup.timestamp < maxAge) {
          return backup;
        }
      }
    } catch (error) {
      console.warn("Error cargando backup:", error);
    }

    return null;
  },

  // Limpiar todo
  clear: () => {
    try {
      sessionStorage.removeItem("user_backup");
      localStorage.removeItem("user_backup");
    } catch (error) {
      console.warn("Error limpiando backup:", error);
    }
  },
};
