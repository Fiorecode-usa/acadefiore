import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../atoms/input/Input'
import PrimaryButton from '../../../atoms/primary-button/PrimaryButton'
import styles from './ForceChangePasswordForm.module.css'

/**
 * Datos del formulario de cambio forzado de contraseña
 */
export interface ForceChangePasswordFormData {
  password: string
  confirmPassword: string
}

/**
 * Props del componente ForceChangePasswordForm
 */
export interface ForceChangePasswordFormProps {
  /** Función que se ejecuta cuando se envía la nueva contraseña */
  onSubmit: (data: ForceChangePasswordFormData) => void | Promise<void>
  /** Estado de carga del formulario */
  isLoading?: boolean
}

/**
 * Componente ForceChangePasswordForm
 * Formulario para establecer una nueva contraseña
 * Se usa después de verificar el código o cuando Cognito requiere cambio forzado
 * El componente Input maneja automáticamente el botón de mostrar/ocultar contraseña
 */
const ForceChangePasswordForm: React.FC<ForceChangePasswordFormProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ForceChangePasswordFormData>({
    mode: 'onChange'
  })

  // Observar el valor de password para validar confirmPassword
  const password = watch('password')

  return (
    <div className={styles.container}>
      {/* Título del formulario */}
      <h1 className={styles.title}>Nueva Contraseña</h1>
      <p className={styles.subtitle}>
        Crea una contraseña segura para tu cuenta
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Campo de Nueva Contraseña */}
        <div>
          <Input
            id="password"
            type="password"
            label="Nueva contraseña"
            placeholder="Mínimo 8 caracteres"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Debe contener mayúscula, minúscula y número'
              }
            })}
            error={errors.password}
            fullWidth
          />
          <p className={styles.helperText}>
            • Al menos 8 caracteres<br />
            • Una letra mayúscula<br />
            • Una letra minúscula<br />
            • Un número
          </p>
        </div>

        {/* Campo de Confirmar Contraseña */}
        <Input
          id="confirmPassword"
          type="password"
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          {...register('confirmPassword', {
            required: 'Debes confirmar tu contraseña',
            validate: (value) =>
              value === password || 'Las contraseñas no coinciden'
          })}
          error={errors.confirmPassword}
          fullWidth
        />

        {/* Botón de submit */}
        <PrimaryButton
          type="submit"
          variant="primary"
          width="full"
          text="Cambiar Contraseña"
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

export default ForceChangePasswordForm

