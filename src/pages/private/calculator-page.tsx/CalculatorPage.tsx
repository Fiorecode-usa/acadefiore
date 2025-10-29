import React from 'react'
import { useNavigate } from 'react-router'
import styles from './CalculatorPage.module.css'
import P2PCalculator from '../../../components/organisms/p2p-calculator/P2PCalculator'
import { clearTokens } from '../../../config/services/token.services'

const CalculatorPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearTokens()
    navigate('/auth')
  }

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerActions}>
        <button onClick={handleGoToDashboard} className={styles.actionButton}>
          📊 Ir al Dashboard
        </button>
        <button onClick={handleLogout} className={styles.actionButton}>
          🔓 Cerrar Sesión
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.calculatorSection}>
          <P2PCalculator />
        </section>
      </div>
    </div>
  )
}

export default CalculatorPage

