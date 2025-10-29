import { Navigate } from 'react-router'
import type { ReactNode } from 'react'
import { getIdToken, isJwtTokenValid } from '../config/services/token.services'

interface PublicRouteProps {
  children: ReactNode
  /** Si true, redirige a /dashboard si el usuario ya está autenticado */
  redirectIfAuth?: boolean
}

/**
 * Componente para rutas públicas
 * - Si redirectIfAuth es true y el usuario está autenticado, redirige a /dashboard
 * - Si el usuario no está autenticado, permite el acceso
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectIfAuth = false }) => {
  const token = getIdToken()
  const isAuthenticated = token ? isJwtTokenValid(token) : false

  // Si está configurado para redirigir cuando está autenticado
  if (redirectIfAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default PublicRoute
