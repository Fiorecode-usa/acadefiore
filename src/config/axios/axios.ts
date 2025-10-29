import axios from 'axios';
import { getRefreshToken, saveTokens, clearTokens, getIdToken, isJwtTokenValid } from '../services/token.services';

// Función para refrescar los tokens
async function refreshTokens() {
  try {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(`${import.meta.env.VITE_API_ADMIN_BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });

    // Guardar los nuevos tokens
    saveTokens({
      accessToken: response.data.body.accessToken,
      idToken: response.data.body.idToken,
      refreshToken: response.data.body.refreshToken || refreshToken,
    });

    // Actualizar el token globalmente para futuras solicitudes
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.body.idToken}`;

    return response.data.body;
  } catch (error) {
    clearTokens();
    window.location.href = '/';
    return Promise.reject(error);
  }
}

// Crea una instancia de axios con configuración predeterminada para rutas protegidas
export const apiAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_ADMIN_BASE_URL, // URL base de tu API Gateway
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token solo a las solicitudes protegidas
apiAdmin.interceptors.request.use(
  (config) => {
    const isAuthRoute = config.url?.includes('/auth/');

    if (isAuthRoute) {
      return config;
    }

    const token = getIdToken();

    if (token && isJwtTokenValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si el token es inválido o no está presente, no hace nada (no redirige ni limpia)
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores basados en el status 401 y errores de Lambda
apiAdmin.interceptors.response.use(
  (response) => {
    // Verificar si la respuesta contiene un error de Lambda en el body
    if (response.data && response.data.errorType) {
      // Crear un error personalizado que incluya la información del error de Lambda
      const lambdaError: any = new Error(response.data.errorMessage || 'Lambda error');
      lambdaError.response = {
        status: 500, // O el status que prefieras
        data: response.data
      };
      return Promise.reject(lambdaError);
    }
    
    return response; // Si no hay error, devolver la respuesta normal
  },
  async (error) => {
    const originalRequest = error.config;

    // Verificar si el error es 401 y si no se ha intentado ya refrescar
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await refreshTokens();
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.idToken}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.idToken}`;
        return apiAdmin(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
