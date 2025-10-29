import { jwtDecode } from 'jwt-decode';

interface Tokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

interface JWTPayload {
  exp: number;
  [key: string]: any;
}

// Obtener el accessToken desde localStorage
export const getAccessToken = (): string | null => localStorage.getItem('accessToken');

// Obtener el idToken desde localStorage
export const getIdToken = (): string | null => localStorage.getItem('idToken');

// Obtener el refreshToken desde localStorage
export const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

// Guardar los tokens en localStorage
export const saveTokens = (tokens: Tokens): void => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('idToken', tokens.idToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Función para verificar si el token es un JWT válido y no ha expirado
export const isJwtTokenValid = (token: string): boolean => {
  if (!token) {
    console.log('Token no encontrado.');
    return false;
  }

  try {
    const decodedToken = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;

    // Verificar si el token ha expirado
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      return true;
    } else {
      console.log('El token ha expirado.');
      return false;
    }
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return false;
  }
};

// Función para eliminar los tokens (accessToken, idToken y refreshToken)
export const clearTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  localStorage.removeItem('refreshToken');
};