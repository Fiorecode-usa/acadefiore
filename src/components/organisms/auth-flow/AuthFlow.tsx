import React, { useState, useContext } from 'react'
import LoginForm from '../../molecules/auth/login-form/LoginForm'
import ResetPasswordForm from '../../molecules/auth/reset-password-form/ResetPasswordForm'
import ConfirmResetPasswordForm from '../../molecules/auth/confirm-reset-password-form/ConfirmResetPasswordForm'
import ForceChangePasswordForm from '../../molecules/auth/force-change-password-form/ForceChangePasswordForm'
import styles from './AuthFlow.module.css'
import { AuthContext } from '../../../context/AuthContext.tsx'
import { ToastContext } from '../../../context/ToastContext.tsx'
import { forcedPasswordChangeService, forgotPasswordService, confirmForgotPasswordService } from '../../../config/services/auth.services.ts'
import { saveTokens } from '../../../config/services/token.services.ts'

/**
 * Estados posibles del flujo de autenticación
 */
type AuthFlowState = 'login' | 'reset_password' | 'confirm_reset_password' | 'force_change_password'

/**
 * Datos compartidos entre los formularios del flujo
 */
interface AuthFlowData {
  email: string
  password?: string
  session?: string
  code?: string
}

/**
 * Props del componente AuthFlow
 */
export interface AuthFlowProps {
  /** Función que se ejecuta cuando el login es exitoso */
  onLoginSuccess?: () => void
}

/**
 * Organismo AuthFlow
 * Controla el flujo completo de autenticación según la respuesta de Cognito
 * Maneja el cambio entre formularios basado en los estados de autenticación
 */
const AuthFlow: React.FC<AuthFlowProps> = ({
  onLoginSuccess
}) => {
  // Acceder al contexto de autenticación
  const { login: loginContext } = useContext(AuthContext)!
  
  // Acceder al contexto de toasts
  const { showError, showToast } = useContext(ToastContext)!
  
  // Estado del flujo actual
  const [currentState, setCurrentState] = useState<AuthFlowState>('login')
  
  // Datos compartidos entre formularios
  const [flowData, setFlowData] = useState<AuthFlowData>({
    email: ''
  })
  
  // Estado de carga
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Maneja el submit del formulario de login
   */
  const handleLoginSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setFlowData({ email: data.email, password: data.password })

    try {
      const response = await loginContext(data.email, data.password)
      
      // Verificar si la respuesta tiene un error
      if (response?.errorType || response?.errorMessage) {
        showError(response.errorMessage || 'Error al iniciar sesión')
        return
      }
      
      // Si la respuesta indica NEW_PASSWORD_REQUIRED
      if (response?.message === 'NEW_PASSWORD_REQUIRED' || response?.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // Guardar el session en localStorage para usarlo después
        if (response.session) {
          localStorage.setItem('passwordChangeSession', JSON.stringify({ session: response.session }))
        }
        setCurrentState('force_change_password')
        return
      }
      
      // Login exitoso, redirigir
      onLoginSuccess?.()
      
    } catch (error: any) {
      console.error('Error en login:', error)
      
      // Mostrar mensajes de error según el tipo
      if (error.response?.data?.body?.errorMessage) {
        showError(error.response.data.body.errorMessage)
      } else if (error.message) {
        showError(error.message)
      } else {
        showError('Error al iniciar sesión. Intenta nuevamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el submit del formulario de reset password
   */
  const handleResetPasswordSubmit = async (data: { email: string }) => {
    setIsLoading(true)
    setFlowData({ email: data.email })

    try {
      const response = await forgotPasswordService({ email: data.email })
      
      // Verificar si la respuesta tiene un error
      if (response?.errorType || response?.errorMessage) {
        showError(response.errorMessage || 'Error al solicitar el reset de contraseña')
        return
      }

      // Si es exitoso, mostrar mensaje de éxito y cambiar al estado de confirmación
      showToast('Código enviado a tu email', 'success')
      setCurrentState('confirm_reset_password')
      
    } catch (error: any) {
      console.error('Error reseteando contraseña:', error)
      
      // Mostrar error específico
      if (error.response?.data?.body?.errorMessage) {
        showError(error.response.data.body.errorMessage)
      } else if (error.message) {
        showError(error.message)
      } else {
        showError('Error al procesar la solicitud. Intenta nuevamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el submit del formulario de confirmación de reset password
   */
  const handleConfirmResetPasswordSubmit = async (data: { code: string; newPassword: string; confirmPassword: string }) => {
    setIsLoading(true)

    try {
      const response = await confirmForgotPasswordService({
        email: flowData.email,
        code: data.code,
        newPassword: data.newPassword
      })

      // Verificar si la respuesta tiene un error
      if (response?.errorType || response?.errorMessage) {
        showError(response.errorMessage || 'Error al confirmar el reset de contraseña')
        return
      }

      // Si es exitoso, mostrar mensaje de éxito y volver al login
      showToast('Contraseña restablecida exitosamente', 'success')
      setCurrentState('login')
      
    } catch (error: any) {
      console.error('Error confirmando reset de contraseña:', error)
      
      // Mostrar error específico
      if (error.response?.data?.body?.errorMessage) {
        showError(error.response.data.body.errorMessage)
      } else if (error.message) {
        showError(error.message)
      } else {
        showError('Error al confirmar el reset. Verifica el código y la contraseña.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el submit del formulario de force change password
   */
  const handleForceChangePasswordSubmit = async (data: { password: string; confirmPassword: string }) => {
    setIsLoading(true)

    try {
      // Buscar el session del localStorage
      const sessionDataString = localStorage.getItem('passwordChangeSession')
      
      if (!sessionDataString) {
        throw new Error('Session not found')
      }

      const sessionData = JSON.parse(sessionDataString)
      
      if (!sessionData.session) {
        throw new Error('Invalid session data')
      }

      const response = await forcedPasswordChangeService({
        session: sessionData.session,
        newPassword: data.password,
        email: flowData.email
      })

      // Verificar si la respuesta tiene un error
      if (response?.errorType || response?.errorMessage) {
        showError(response.errorMessage || 'Error al cambiar la contraseña')
        return
      }

      // Guardar tokens
      if (response.accessToken && response.idToken && response.refreshToken) {
        saveTokens({
          accessToken: response.accessToken,
          idToken: response.idToken,
          refreshToken: response.refreshToken,
        })

        // Limpiar el session almacenado
        localStorage.removeItem('passwordChangeSession')
        
        // Login exitoso después de cambiar contraseña
        onLoginSuccess?.()
      } else {
        showError('Error al procesar la respuesta del servidor')
      }
      
    } catch (error: any) {
      console.error('Error cambiando contraseña:', error)
      
      // Mostrar error específico según el tipo
      if (error.response?.data?.body?.errorMessage) {
        showError(error.response.data.body.errorMessage)
      } else if (error.message) {
        showError(error.message)
      } else {
        showError('Error al cambiar la contraseña. Verifica que cumpla con los requisitos.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el click en "Olvidé mi contraseña"
   * Cambia al estado de reset_password
   */
  const handleForgotPassword = () => {
    setCurrentState('reset_password')
  }

  /**
   * Maneja el click en "Volver al login"
   * Regresa al estado de login
   */
  const handleBackToLogin = () => {
    setCurrentState('login')
    setFlowData({ email: flowData.email })
  }

  // Renderizar el formulario según el estado actual
  return (
    <div className={styles.container}>
      {currentState === 'login' && (
        <LoginForm
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {currentState === 'reset_password' && (
        <ResetPasswordForm
          onSubmit={handleResetPasswordSubmit}
          isLoading={isLoading}
          onBackToLogin={handleBackToLogin}
        />
      )}

      {currentState === 'confirm_reset_password' && (
        <ConfirmResetPasswordForm
          email={flowData.email}
          onSubmit={handleConfirmResetPasswordSubmit}
          isLoading={isLoading}
          onBackToLogin={handleBackToLogin}
        />
      )}

      {currentState === 'force_change_password' && (
        <ForceChangePasswordForm
          onSubmit={handleForceChangePasswordSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default AuthFlow
