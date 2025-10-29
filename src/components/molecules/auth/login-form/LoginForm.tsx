import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../atoms/input/Input'
import PrimaryButton from '../../../atoms/primary-button/PrimaryButton'
import styles from './LoginForm.module.css'

/**
 * Datos del formulario de login
 */
export interface LoginFormData {
  email: string
  password: string
}

/**
 * Props del componente LoginForm
 */
export interface LoginFormProps {
  /** Función que se ejecuta cuando se envía el formulario */
  onSubmit: (data: LoginFormData) => void | Promise<void>
  /** Estado de carga del formulario */
  isLoading?: boolean
  /** Función opcional para el link de "Olvidé mi contraseña" */
  onForgotPassword?: () => void
}

/**
 * Componente LoginForm
 * Formulario de inicio de sesión con validación de email y password
 * Compatible con AWS Cognito
 */
const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  onForgotPassword
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    mode: 'onChange' // Validación en tiempo real
  })

  return (
    <div className={styles.container}>
      {/* Título del formulario */}
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <p className={styles.subtitle}>
        Ingresa tus credenciales para continuar
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

        {/* Campo de Password */}
        <Input
          id="password"
          type="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          })}
          error={errors.password}
          fullWidth
        />

        {/* Link de olvidé mi contraseña */}
        {onForgotPassword && (
          <div className={styles.forgotPasswordLink}>
            <button
              type="button"
              onClick={onForgotPassword}
              className={styles.linkButton}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        {/* Botón de submit */}
        <PrimaryButton
          type="submit"
          variant="primary"
          width="full"
          text="Iniciar Sesión"
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

export default LoginForm

