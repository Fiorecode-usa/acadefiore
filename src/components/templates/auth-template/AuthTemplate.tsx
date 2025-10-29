import React from 'react'
import { Link } from 'react-router'
import { Outlet } from 'react-router'
import styles from './AuthTemplate.module.css'

/**
 * Template base para todas las páginas de autenticación
 * Proporciona el layout común para login, reset password, etc.
 */
const AuthTemplate: React.FC = () => {
  return (
    <div className={styles.layout}>
      {/* Gradiente animado de fondo */}
      <div className={styles.animatedBackground}></div>

      {/* Botón de regreso al home */}
      <Link to="/" className={styles.homeButton}>
        ← Volver al inicio
      </Link>

      {/* Contenedor del formulario */}
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthTemplate

