import React from 'react'
import { useNavigate } from 'react-router'
import AuthFlow from '../../../components/organisms/auth-flow/AuthFlow'

/**
 * Página de autenticación
 * Renderiza el flujo completo de autenticación (login, verify, reset, etc.)
 */
const AuthPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <div>
      <AuthFlow onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}

export default AuthPage

