import React from 'react'
import styles from './CalculatorPage.module.css'
import P2PCalculator from '../../../components/organisms/p2p-calculator/P2PCalculator'

const CalculatorPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.calculatorSection}>
          <P2PCalculator />
        </section>
      </div>
    </div>
  )
}

export default CalculatorPage

