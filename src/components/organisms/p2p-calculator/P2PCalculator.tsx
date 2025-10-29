import React, { useState } from 'react'
import styles from './P2PCalculator.module.css'

const P2PCalculator: React.FC = () => {
  const [capital, setCapital] = useState<number>(0)
  const [ventaPrice, setVentaPrice] = useState<number>(1.035)
  const [compraPrice, setCompraPrice] = useState<number>(1.003)
  const [ciclos, setCiclos] = useState<number>(1)
  const BINANCE_FEE_PERCENTAGE = 0.0035 // 0.35% basado en tus datos (8.11 / 2322.46)

  const calculateEarnings = () => {
    if (capital <= 0) return null

    // Comprar USDT con el capital
    const usdtBought = capital / compraPrice
    
    // Vender los USDT que compraste
    const revenueFromSale = usdtBought * ventaPrice
    
    // Comisión de Binance (0.35%)
    const binanceFeeOnSale = revenueFromSale * BINANCE_FEE_PERCENTAGE
    const binanceFeeOnBuy = usdtBought * BINANCE_FEE_PERCENTAGE
    
    // Ganancia bruta
    const grossEarnings = revenueFromSale - capital
    
    // Ganancia neta (después de ambas comisiones) por ciclo
    const netEarningsPerCycle = revenueFromSale - capital - binanceFeeOnSale - binanceFeeOnBuy
    const binanceFeesPerCycle = binanceFeeOnSale + binanceFeeOnBuy
    
    // Porcentaje de ganancia (no cambia con los ciclos)
    const profitPercentage = (netEarningsPerCycle / capital) * 100
    
    // Multiplicar por el número de ciclos
    const totalNetEarnings = netEarningsPerCycle * ciclos
    const totalGrossEarnings = grossEarnings * ciclos
    const totalBinanceFees = binanceFeesPerCycle * ciclos

    return {
      capital,
      usdtBought,
      revenueFromSale,
      binanceFeeOnSale,
      binanceFeeOnBuy,
      binanceFeesPerCycle,
      grossEarnings,
      netEarningsPerCycle,
      totalBinanceFees,
      totalGrossEarnings,
      totalNetEarnings,
      profitPercentage,
      ciclos
    }
  }

  const results = calculateEarnings()

  return (
    <div className={styles.calculatorContainer}>
      <h2 className={styles.title}>💰 Calculadora de Ganancias P2P</h2>
      <p className={styles.subtitle}>
        Ingresa tu capital para calcular ganancias, pérdidas y comisiones de Binance
      </p>

      <div className={styles.inputsSection}>
        <div className={styles.priceControls}>
          <div className={styles.inputGroup}>
            <label htmlFor="capital" className={styles.label}>
              Capital Inicial (USD)
            </label>
            <input
              id="capital"
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              placeholder="0.00"
              className={styles.input}
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ciclos" className={styles.label}>
              Número de Ciclos
            </label>
            <input
              id="ciclos"
              type="number"
              value={ciclos}
              onChange={(e) => setCiclos(Number(e.target.value))}
              placeholder="1"
              className={styles.input}
              min="1"
              step="1"
            />
          </div>
        </div>

        <div className={styles.priceControls}>
          <div className={styles.inputGroup}>
            <label htmlFor="ventaPrice" className={styles.label}>
              Precio de Venta
            </label>
            <input
              id="ventaPrice"
              type="number"
              value={ventaPrice}
              onChange={(e) => setVentaPrice(Number(e.target.value))}
              className={styles.input}
              step="0.001"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="compraPrice" className={styles.label}>
              Precio de Compra
            </label>
            <input
              id="compraPrice"
              type="number"
              value={compraPrice}
              onChange={(e) => setCompraPrice(Number(e.target.value))}
              className={styles.input}
              step="0.001"
            />
          </div>
        </div>
      </div>

      {results && (
        <div className={styles.resultsSection}>
          <h3 className={styles.resultsTitle}>📊 Resultados Detallados</h3>

          {/* Resumen */}
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

          {/* Desglose completo */}
          <div className={styles.breakdownCard}>
            <h4 className={styles.breakdownTitle}>💰 Flujo de Capital</h4>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Capital Inicial:</span>
              <span className={styles.breakdownValue}>${results.capital.toFixed(2)}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>USDT Comprados:</span>
              <span className={styles.breakdownValue}>{results.usdtBought.toFixed(4)} USDT</span>
            </div>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Ingresos por Venta:</span>
              <span className={styles.breakdownValue}>${results.revenueFromSale.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.breakdownCard}>
            <h4 className={styles.breakdownTitle}>💸 Comisiones de Binance (0.35%)</h4>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Comisión por Ciclo:</span>
              <span className={styles.breakdownValue}>- ${results.binanceFeesPerCycle.toFixed(2)}</span>
            </div>
            <div className={`${styles.breakdownRow} ${styles.totalFee}`}>
              <span className={styles.breakdownLabel}>Total en Comisiones ({results.ciclos} ciclo{results.ciclos > 1 ? 's' : ''}):</span>
              <span className={styles.breakdownValue}>- ${results.totalBinanceFees.toFixed(2)}</span>
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
      )}
    </div>
  )
}

export default P2PCalculator
