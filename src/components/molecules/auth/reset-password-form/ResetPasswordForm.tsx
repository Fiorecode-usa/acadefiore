import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../atoms/input/Input'
import PrimaryButton from '../../../atoms/primary-button/PrimaryButton'
import styles from './ResetPasswordForm.module.css'

/**
 * Datos del formulario de reset de contraseña
 */
export interface ResetPasswordFormData {
  email: string
}

/**
 * Props del componente ResetPasswordForm
 */
export interface ResetPasswordFormProps {
  /** Función que se ejecuta cuando se envía el email */
  onSubmit: (data: ResetPasswordFormData) => void | Promise<void>
  /** Estado de carga del formulario */
  isLoading?: boolean
  /** Función opcional para volver al login */
  onBackToLogin?: () => void
}

/**
 * Componente ResetPasswordForm
 * Formulario para solicitar el reset de contraseña por email
 * El usuario ingresa su email y recibe un código de verificación
 */
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  onBackToLogin
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange'
  })

  return (
    <div className={styles.container}>
      {/* Título del formulario */}
      <h1 className={styles.title}>Restablecer Contraseña</h1>
      <p className={styles.subtitle}>
        Te enviaremos un código de verificación a tu correo electrónico
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Campo de Email */}
        <Input
          id="email"
          type="email"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo electrónico inválido'
            }
          })}
          error={errors.email}
          fullWidth
        />

        {/* Botón de submit */}
        <PrimaryButton
          type="submit"
          variant="primary"
          width="full"
          text="Enviar Código"
          isLoading={isLoading}
          disabled={isLoading}
        />

        {/* Link para volver al login */}
        {onBackToLogin && (
          <div className={styles.backSection}>
            <button
              type="button"
              onClick={onBackToLogin}
              className={styles.linkButton}
              disabled={isLoading}
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ResetPasswordForm

