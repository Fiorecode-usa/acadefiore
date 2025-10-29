import { Navigate } from 'react-router'
import type { ReactNode } from 'react'
import { getIdToken, isJwtTokenValid } from '../config/services/token.services'

interface PrivateRouteProps {
  children: ReactNode
}

/**
 * Componente que protege rutas privadas
 * Verifica si el usuario tiene un token válido
 * Si no está autenticado, redirige a /auth
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = getIdToken()
  const isValid = token ? isJwtTokenValid(token) : false

  // Si no tiene token válido, redirigir a login
  if (!isValid) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
