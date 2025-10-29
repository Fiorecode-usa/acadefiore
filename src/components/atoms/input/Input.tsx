import React, { useState } from 'react'
import styles from './Input.module.css'
import type { FieldError } from 'react-hook-form'

/**
 * Props del componente Input
 * Hereda todas las props nativas de input HTML (type, placeholder, value, onChange, etc.)
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Texto del label que aparece arriba del input */
  label?: string
  /** Mensaje de error (string) o FieldError de React Hook Form */
  error?: string | FieldError
  /** Texto de ayuda que aparece debajo del input */
  helperText?: string
  /** Si es true, el input ocupa el 100% del ancho disponible */
  fullWidth?: boolean
  /** Ícono o elemento que aparece al inicio del input (izquierda) */
  startAdornment?: React.ReactNode
  /** Ícono o elemento que aparece al final del input (derecha) */
  endAdornment?: React.ReactNode
}

/**
 * Componente Input flexible y reutilizable
 * Compatible con React Hook Form mediante forwardRef
 * Soporta: texto, password, email, number, tel, url, y todos los tipos nativos de HTML
 * Automáticamente agrega botón de mostrar/ocultar para inputs de tipo password
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  startAdornment,
  endAdornment,
  className = '',
  disabled = false,
  type = 'text',
  ...rest
}, ref) => {
  // Estado para mostrar/ocultar contraseña (solo para type="password")
  const [showPassword, setShowPassword] = useState(false)
  
  // Determinar el tipo de input real (cambia a "text" cuando showPassword es true)
  const inputType = type === 'password' && showPassword ? 'text' : type
  
  // Determinar si debe mostrar el botón del ojo
  const shouldShowEye = type === 'password'
  // Extraer mensaje de error si es FieldError de React Hook Form
  // Permite mostrar errores tanto como string simple como FieldError object
  const errorMessage = typeof error === 'object' && error?.message 
    ? error.message 
    : typeof error === 'string' 
    ? error 
    : undefined

  // Construir clases CSS del input según su estado
  const inputClasses = `
    ${styles.input}
    ${errorMessage ? styles.inputError : ''}          // Rojo si hay error
    ${startAdornment ? styles.inputWithStartIcon : ''} // Padding left para ícono inicial
    ${endAdornment || shouldShowEye ? styles.inputWithEndIcon : ''}     // Padding right para ícono final o botón del ojo
    ${disabled ? styles.inputDisabled : ''}            // Estilo cuando está deshabilitado
    ${className}                                       // Clases adicionales del usuario
  `.trim().replace(/\s+/g, ' ')

  // Construir clases CSS del contenedor
  const containerClasses = `
    ${styles.container}
    ${fullWidth ? styles.fullWidth : ''} // Ancho completo si se especifica
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className={containerClasses}>
      {/* Label opcional - solo se renderiza si se proporciona */}
      {label && (
        <label htmlFor={rest.id} className={styles.label}>
          {label}
        </label>
      )}
      
      {/* Wrapper del input que permite posicionar adornos absolutamente */}
      <div className={styles.inputWrapper}>
        {/* Ícono inicial (izquierda) - solo se renderiza si se proporciona */}
        {startAdornment && (
          <span className={styles.startAdornment}>
            {startAdornment}
          </span>
        )}
        
        {/* Input nativo con todas sus props */}
        <input
          {...rest}              // Todas las props nativas (type, placeholder, value, onChange, etc.)
          type={inputType}       // Tipo dinámico (cambia entre password/text)
          ref={ref}               // Ref para React Hook Form (register)
          disabled={disabled}     // Estado deshabilitado
          className={inputClasses}
          aria-invalid={errorMessage ? 'true' : 'false'}  // Accesibilidad: indica si hay error
          aria-describedby={      // Accesibilidad: linkea el mensaje de ayuda
            errorMessage || helperText 
              ? `${rest.id}-help` 
              : undefined
          }
        />
        
        {/* Botón del ojo para mostrar/ocultar contraseña (automático para type="password") */}
        {shouldShowEye && !endAdornment && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={-1}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
        
        {/* Ícono final (derecha) - solo se renderiza si se proporciona */}
        {endAdornment && (
          <span className={styles.endAdornment}>
            {endAdornment}
          </span>
        )}
      </div>

      {/* Mensaje de error o helper text - solo se renderiza si existe */}
      {(errorMessage || helperText) && (
        <span 
          id={`${rest.id}-help`}  // ID para accesibilidad (aria-describedby)
          className={errorMessage ? styles.error : styles.helperText}
        >
          {errorMessage || helperText}
        </span>
      )}
    </div>
  )
})

// Nombre del componente para DevTools de React
Input.displayName = 'Input'

export default Input
