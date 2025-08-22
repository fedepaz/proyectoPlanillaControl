import { SessionResponse } from "../types/auth";
import cookies from "./cookieClient";

export const sessionBackup = {
  // Guardar datos básicos del usuario
  save: (userData: SessionResponse) => {
    const backup = {
      user: userData.user,
      timestamp: Date.now(),
      authenticated: userData.authenticated,
    };

    try {
      // Múltiples lugares para iOS
      sessionStorage.setItem("user_backup", JSON.stringify(backup));
      localStorage.setItem("user_backup", JSON.stringify(backup));

      // Cookie especial para iOS (solo datos, no token)
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const cookieValue = JSON.stringify(backup);
        cookies.set("ios_user_backup", cookieValue, {
          path: "/",
          maxAge: 43200, // 12 hours
          sameSite: "lax",
        });
      }
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

      // Si no, desde cookie iOS
      if (!backupStr && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const cookieValue = cookies.get("ios_user_backup");
        if (cookieValue) {
          backupStr = cookieValue;
        }
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
      cookies.remove("ios_user_backup", { path: "/" });
    } catch (error) {
      console.warn("Error limpiando backup:", error);
    }
  },
};
