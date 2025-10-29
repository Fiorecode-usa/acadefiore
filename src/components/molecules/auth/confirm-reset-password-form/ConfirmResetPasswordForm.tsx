import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../atoms/input/Input'
import PrimaryButton from '../../../atoms/primary-button/PrimaryButton'
import styles from './ConfirmResetPasswordForm.module.css'

/**
 * Datos del formulario de confirmación de reset de contraseña
 */
export interface ConfirmResetPasswordFormData {
  code: string
  newPassword: string
  confirmPassword: string
}

/**
 * Props del componente ConfirmResetPasswordForm
 */
export interface ConfirmResetPasswordFormProps {
  /** Email del usuario */
  email: string
  /** Función que se ejecuta cuando se confirma el reset */
  onSubmit: (data: ConfirmResetPasswordFormData) => void | Promise<void>
  /** Estado de carga del formulario */
  isLoading?: boolean
  /** Función opcional para volver al login */
  onBackToLogin?: () => void
}

/**
 * Componente ConfirmResetPasswordForm
 * Formulario para confirmar el reset de contraseña con código
 * El usuario ingresa el código recibido, nueva contraseña y confirmación
 */
const ConfirmResetPasswordForm: React.FC<ConfirmResetPasswordFormProps> = ({
  email,
  onSubmit,
  isLoading = false,
  onBackToLogin
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ConfirmResetPasswordFormData>({
    mode: 'onChange'
  })

  const newPassword = watch('newPassword')

  return (
    <div className={styles.container}>
      {/* Título del formulario */}
      <h1 className={styles.title}>Confirmar Reset de Contraseña</h1>
      <p className={styles.subtitle}>
        Ingresa el código que enviamos a:
      </p>
      
      {/* Email del usuario */}
      <div className={styles.emailContainer}>
        <p className={styles.email}>{email}</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Campo de Código */}
        <Input
          id="code"
          type="text"
          label="Código de verificación"
          placeholder="123456"
          maxLength={6}
          {...register('code', {
            required: 'El código es obligatorio',
            pattern: {
              value: /^[0-9]{6}$/,
              message: 'El código debe tener 6 dígitos'
            }
          })}
          error={errors.code}
          fullWidth
        />

        {/* Campo de Nueva Contraseña */}
        <Input
          id="newPassword"
          type="password"
          label="Nueva contraseña"
          placeholder="Ingresa tu nueva contraseña"
          {...register('newPassword', {
            required: 'La nueva contraseña es obligatoria',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          })}
          error={errors.newPassword}
          fullWidth
        />

        {/* Campo de Confirmar Contraseña */}
        <Input
          id="confirmPassword"
          type="password"
          label="Confirmar nueva contraseña"
          placeholder="Confirma tu nueva contraseña"
          {...register('confirmPassword', {
            required: 'La confirmación de contraseña es obligatoria',
            validate: (value) =>
              value === newPassword || 'Las contraseñas no coinciden'
          })}
          error={errors.confirmPassword}
          fullWidth
        />

        {/* Botón de submit */}
        <PrimaryButton
          type="submit"
          variant="primary"
          width="full"
          text="Restablecer Contraseña"
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

export default ConfirmResetPasswordForm

