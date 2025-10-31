import React from 'react'
import styles from './P2PCalculator.module.css'

type Results = {
  capital: number
  usdtBought: number
  revenueFromSale: number
  binanceFeeOnSale: number
  binanceFeeOnBuy: number
  binanceFeesPerCycle: number
  grossEarnings: number
  netEarningsPerCycle: number
  totalBinanceFees: number
  totalGrossEarnings: number
  totalNetEarnings: number
  profitPercentage: number
  ciclos: number
  lotsSummary: { totalUsd: number; totalUsdt: number; avgPrice: number }
}

const P2PResults: React.FC<{ results: Results }> = ({ results }) => {
  return (
    <div className={styles.resultsSection}>
      <h3 className={styles.resultsTitle}>📊 Resultados Detallados</h3>

      <div className={styles.summaryCard}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Ganancia Neta por Ciclo:</span>
          <span className={`${styles.summaryValue} ${results.netEarningsPerCycle >= 0 ? styles.positive : styles.negative}`}>
            ${results.netEarningsPerCycle.toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Ganancia Neta Total ({results.ciclos} ciclo{results.ciclos > 1 ? 's' : ''}):</span>
          <span className={`${styles.summaryValue} ${results.totalNetEarnings >= 0 ? styles.positive : styles.negative}`}>
            ${results.totalNetEarnings.toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>% de Ganancia:</span>
          <span className={`${styles.summaryValue} ${results.netEarningsPerCycle >= 0 ? styles.positive : styles.negative}`}>
            {results.profitPercentage.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className={styles.summaryContainer}> 
        <div className={styles.breakdownCard}>
          <h4 className={styles.breakdownTitle}>💰 Flujo de Capital</h4>
          <div className={styles.breakdownRow}>
            <span className={styles.breakdownLabel}>Capital Inicial:</span>
            <span className={styles.breakdownValue}>${results.capital.toFixed(2)}</span>
          </div>
          <div className={styles.breakdownRow}>
            <span className={styles.breakdownLabel}>USDT Comprados:</span>
            <span className={styles.breakdownValue}>{results.usdtBought.toFixed(2)} USDT</span>
          </div>
          <div className={styles.breakdownRow}>
            <span className={styles.breakdownLabel}>Ingresos por Venta:</span>
            <span className={styles.breakdownValue}>${results.revenueFromSale.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.breakdownCard}>
          <h4 className={styles.breakdownTitle}>💸 Comisiones de Binance (0.35%)</h4>
          <div className={styles.breakdownRow}>
            <span className={styles.breakdownLabel}>Comisión de Venta:</span>
            <span className={styles.breakdownValue}>- ${results.binanceFeeOnSale.toFixed(2)}</span>
          </div>
          {results.binanceFeeOnBuy > 0 && (
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Comisión de Compra:</span>
              <span className={styles.breakdownValue}>- ${results.binanceFeeOnBuy.toFixed(2)}</span>
            </div>
          )}
          {results.binanceFeeOnBuy === 0 && (
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Comisión de Compra:</span>
              <span className={styles.breakdownValue} style={{ opacity: 0.6 }}>$0.00 (Comprado fuera de Binance)</span>
            </div>
          )}
          <div className={`${styles.breakdownRow} ${styles.totalFee}`}>
            <span className={styles.breakdownLabel}>Total en Comisiones ({results.ciclos} ciclo{results.ciclos > 1 ? 's' : ''}):</span>
            <span className={styles.breakdownValue}>- ${results.totalBinanceFees.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.breakdownCard}>
        <h4 className={styles.breakdownTitle}>📈 Análisis de Ganancia</h4>
        <div className={styles.breakdownRow}>
          <span className={styles.breakdownLabel}>Ganancia Bruta por Ciclo:</span>
          <span className={styles.breakdownValue}>${results.grossEarnings.toFixed(2)}</span>
        </div>
        <div className={styles.breakdownRow}>
          <span className={styles.breakdownLabel}>Ganancia Bruta Total ({results.ciclos} ciclo{results.ciclos > 1 ? 's' : ''}):</span>
          <span className={styles.breakdownValue}>${results.totalGrossEarnings.toFixed(2)}</span>
        </div>
        <div className={styles.breakdownRow}>
          <span className={styles.breakdownLabel}>Menos Comisiones Totales:</span>
          <span className={styles.breakdownValue}>- ${results.totalBinanceFees.toFixed(2)}</span>
        </div>
        <div className={`${styles.breakdownRow} ${styles.finalProfit}`}>
          <span className={styles.breakdownLabel}>🏆 Ganancia Neta Final:</span>
          <span className={`${styles.breakdownValue} ${results.totalNetEarnings >= 0 ? styles.positive : styles.negative}`}>
            ${results.totalNetEarnings.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default P2PResults


