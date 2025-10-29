import React from 'react'
import Toast from '../toast/Toast'
import type { ToastProps } from '../toast/Toast'
import styles from './ToastContainer.module.css'

interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}

export default ToastContainer

