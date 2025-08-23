interface SessionResponse {
  authenticated: boolean;
  message: string;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
      id: string;
      currentAirportId: {
        aeropuerto: string;
        codIATA: string;
        codOACI: string;
        id: string;
      };
      jerarquiaId: {
        jerarquia: string;
        id: string;
      };
    };
    role: string;
  };
}

interface LoginResponse {
  authenticated: boolean;
  message: string;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
      id: string;
      currentAirportId: {
        aeropuerto: string;
        codIATA: string;
        codOACI: string;
        id: string;
      };
      jerarquiaId: {
        jerarquia: string;
        id: string;
      };
    };
    role: string;
  };
  accessToken?: string;
}

interface OficialResponse {
  dni: string;
  firstname: string;
  lastname: string;
  legajo: number;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  userID: string;
}

interface ResetPasswordResponse {
  id: string;
  okToChangePassword: boolean;
  changed: boolean;
  message: string;
}
interface ResetPasswordApprovedResponse {
  dni: string;
  email: string;
  role: string;
  name: string;
  legajo: number;
  dateUpdated: string;
  message: string;
}

export type {
  SessionResponse,
  LoginResponse,
  OficialResponse,
  RegisterResponse,
  ResetPasswordResponse,
  ResetPasswordApprovedResponse,
};
