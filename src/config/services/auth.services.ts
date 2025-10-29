import { apiAdmin } from '../axios/axios.ts';

interface LoginData {
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ConfirmForgotPasswordData {
  email: string;
  code: string;
  newPassword: string;
}

// Servicio para login
export const loginService = async (data: LoginData) => {
  const response = await apiAdmin.post('/auth/signin', data);
  // Retornar el body directamente
  return response.data.body || response.data;
};

// Servicio para forgot password
export const forgotPasswordService = async (data: ForgotPasswordData) => {
  const response = await apiAdmin.post('/auth/forgot-password', data);
  return response.data.body || response.data;
};

// Servicio para confirm forgot password
export const confirmForgotPasswordService = async (data: ConfirmForgotPasswordData) => {
  const response = await apiAdmin.post('/auth/confirm-forgot-password', data);
  return response.data.body || response.data;
};

// Servicio para forced password change
export const forcedPasswordChangeService = async (data: { session: string; newPassword: string; email: string }) => {
  const response = await apiAdmin.post('/auth/force-password-change', data);
  return response.data.body || response.data;
};