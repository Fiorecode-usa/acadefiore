import { createContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import Toast from '../components/atoms/toast/Toast'
import type { ToastProps } from '../components/atoms/toast/Toast'

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info', duration?: number) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showWarning: (message: string) => void
  showInfo: (message: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (
      message: string,
      type: 'success' | 'error' | 'warning' | 'info',
      duration: number = 5000
    ) => {
      const id = Math.random().toString(36).substring(7)
      const newToast: ToastProps = {
        id,
        message,
        type,
        duration,
        onClose: removeToast,
      }
      setToasts((prev) => [...prev, newToast])
    },
    [removeToast]
  )

  const showSuccess = useCallback(
    (message: string) => showToast(message, 'success'),
    [showToast]
  )

  const showError = useCallback(
    (message: string) => showToast(message, 'error', 6000),
    [showToast]
  )

  const showWarning = useCallback(
    (message: string) => showToast(message, 'warning'),
    [showToast]
  )

  const showInfo = useCallback(
    (message: string) => showToast(message, 'info'),
    [showToast]
  )

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxHeight: 'calc(100vh - 2rem)',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: 'auto'
      }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

