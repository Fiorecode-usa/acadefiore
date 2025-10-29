import { createContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { loginService } from '../config/services/auth.services'
import { saveTokens } from '../config/services/token.services'

interface User {
  email: string
  // Agregar más campos según necesites
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await loginService({ email, password })

      // Si la respuesta tiene mensaje especial (ej: NEW_PASSWORD_REQUIRED)
      if (response.message && response.message !== 'Login successful') {
        return response // Retornar la respuesta completa para manejar en AuthFlow
      }

      // Guardar tokens en localStorage solo si son exitosos
      if (response.accessToken && response.idToken && response.refreshToken) {
        saveTokens({
          accessToken: response.accessToken,
          idToken: response.idToken,
          refreshToken: response.refreshToken,
        })

        // Actualizar estado del usuario
        setUser({ email })
        
        return response
      }

      return response
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    // Los tokens se limpian en otros lugares (ej: PrivateRoute, DashboardTemplate)
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

