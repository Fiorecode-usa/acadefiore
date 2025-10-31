import React, { useMemo, useState } from 'react'
import styles from './P2PCalculator.module.css'
import P2PResults from './P2PResults'

const P2PCalculator: React.FC = () => {
  const [ventaPrice, setVentaPrice] = useState<number>(1.035)
  const [ciclos, setCiclos] = useState<number>(1)
  const [buyLots, setBuyLots] = useState<Array<{ amountUsd: number; price: number; mode: 'price' | 'percent'; percent: number; boughtOutsideBinance: boolean }>>([
    { amountUsd: 0, price: 1.003, mode: 'price', percent: 0, boughtOutsideBinance: false }
  ])
  const BINANCE_FEE_PERCENTAGE = 0.0035 // 0.35% basado en tus datos (8.11 / 2322.46)

  const lotsSummary = useMemo(() => {
    const totalUsd = buyLots.reduce((acc, lot) => acc + (isFinite(lot.amountUsd) ? lot.amountUsd : 0), 0)
    const totalUsdt = buyLots.reduce((acc, lot) => {
      if (!isFinite(lot.amountUsd)) return acc
      if (lot.mode === 'percent') {
        const pct = Math.max(-100, Math.min(100, lot.percent || 0))
        const factor = 1 - pct / 100
        return acc + (factor > 0 ? (lot.amountUsd * factor) : 0)
      }
      const factorFromPrice = 2 - lot.price
      return acc + (factorFromPrice > 0 ? (lot.amountUsd * factorFromPrice) : 0)
    }, 0)
    const avgPrice = totalUsdt > 0 ? totalUsd / totalUsdt : 0
    return { totalUsd, totalUsdt, avgPrice }
  }, [buyLots])

  const effectiveCapital = lotsSummary.totalUsd

  const calculateEarnings = () => {
    if (effectiveCapital <= 0) return null

    // Calcular USDT comprados desde los lots
    const usdtBought = lotsSummary.totalUsdt
    
    // Vender los USDT comprados
    const revenueFromSale = usdtBought * ventaPrice
    
    // Comisión de Binance (0.35%)
    const binanceFeeOnSale = revenueFromSale * BINANCE_FEE_PERCENTAGE
    
    // Comisión de compra: calcular para cada lot individualmente
    // Solo se aplica si NO fue comprado fuera de Binance
    const binanceFeeOnBuy = buyLots.reduce((acc, lot) => {
      if (!isFinite(lot.amountUsd) || lot.amountUsd <= 0) return acc
      // Solo aplicar comisión si NO fue comprado fuera de Binance
      return acc + (lot.boughtOutsideBinance ? 0 : (lot.amountUsd * BINANCE_FEE_PERCENTAGE))
    }, 0)
    
    // Ganancia bruta
    const grossEarnings = revenueFromSale - effectiveCapital
    
    // Ganancia neta (después de comisiones) por ciclo
    const netEarningsPerCycle = revenueFromSale - effectiveCapital - binanceFeeOnSale - binanceFeeOnBuy
    const binanceFeesPerCycle = binanceFeeOnSale + binanceFeeOnBuy
    
    // Porcentaje de ganancia (no cambia con los ciclos)
    const profitPercentage = (netEarningsPerCycle / effectiveCapital) * 100
    
    // Multiplicar por el número de ciclos
    const totalNetEarnings = netEarningsPerCycle * ciclos
    const totalGrossEarnings = grossEarnings * ciclos
    const totalBinanceFees = binanceFeesPerCycle * ciclos

    return {
      capital: effectiveCapital,
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
      ciclos,
      lotsSummary
    }
  }

  const results = calculateEarnings()

  return (
    <div className={styles.calculatorContainerMaster}>
      <div className={styles.calculatorContainer}>
        <h2 className={styles.title}>💰 Calculadora de Ganancias P2P</h2>
        <p className={styles.subtitle}>
          Ingresa tu capital para calcular ganancias, pérdidas y comisiones de Binance
        </p>

        <div className={styles.inputsSection}>
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

          <div className={styles.lotsSection}>
            <div className={styles.lotsHeader}>
              <h4 className={styles.breakdownTitle}>🧮 Compras múltiples</h4>
              <button
                type="button"
                className={styles.addLotButton}
                onClick={() => setBuyLots((prev) => [...prev, { amountUsd: 0, price: 1.003, mode: 'price', percent: 0, boughtOutsideBinance: false }])}
              >
                + Agregar compra
              </button>
            </div>

            <div className={styles.lotRows}>
              {buyLots.map((lot, index) => (
                <div key={index} className={styles.lotRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Monto USD</label>
                    <div className={styles.inputAdornmentWrap}>
                      {(() => {
                        const amount = isFinite(lot.amountUsd) ? lot.amountUsd : 0
                        let estimatedUsdt = 0
                        if (amount > 0) {
                          if (lot.mode === 'percent') {
                            const pct = Math.max(-100, Math.min(100, lot.percent || 0))
                            const factor = 1 - pct / 100
                            estimatedUsdt = factor > 0 ? amount * factor : 0
                          } else {
                            const factorFromPrice = 2 - (isFinite(lot.price) ? lot.price : 0)
                            estimatedUsdt = factorFromPrice > 0 ? amount * factorFromPrice : 0
                          }
                        }
                        return estimatedUsdt > 0 ? (
                          <span className={styles.inputAdornmentLeft}>~{estimatedUsdt.toFixed(2)}</span>
                        ) : null
                      })()}
                      <input
                        type="number"
                        className={`${styles.input} ${styles.inputWithAdornment}`}
                        min="0"
                        step="0.01"
                        value={lot.amountUsd}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setBuyLots((prev) => prev.map((l, i) => i === index ? { ...l, amountUsd: value } : l))
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>{lot.mode === 'percent' ? 'Compra como %' : 'Precio'}</label>
                    {lot.mode === 'price' ? (
                      <input
                        type="number"
                        className={styles.input}
                        min="0"
                        step="0.001"
                        value={lot.price}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setBuyLots((prev) => prev.map((l, i) => i === index ? { ...l, price: value } : l))
                        }}
                      />
                    ) : (
                      <input
                        type="number"
                        className={styles.input}
                        min="-100"
                        step="0.01"
                        value={lot.percent}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setBuyLots((prev) => prev.map((l, i) => i === index ? { ...l, percent: value } : l))
                        }}
                        placeholder="0.54 = 0.54%"
                      />
                    )}
                  </div>

                  <div className={styles.modeSelectWrap}>
                    <label className={styles.modeLabel} htmlFor={`mode-${index}`}>Tipo</label>
                    <select
                      className={styles.modeSelect}
                      id={`mode-${index}`}
                      value={lot.mode}
                      onChange={(e) => {
                        const mode = e.target.value as 'price' | 'percent'
                        setBuyLots((prev) => prev.map((l, i) => i === index ? { ...l, mode } : l))
                      }}
                      aria-label="Tipo de precio"
                    >
                      <option value="price">Fijo</option>
                      <option value="percent">%</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.switchLabel} style={{ marginTop: '26px' }}>
                      <input
                        type="checkbox"
                        checked={lot.boughtOutsideBinance}
                        onChange={(e) => {
                          setBuyLots((prev) => prev.map((l, i) => i === index ? { ...l, boughtOutsideBinance: e.target.checked } : l))
                        }}
                      />
                      <span style={{ fontSize: '0.9rem' }}>Fuera de Binance</span>
                    </label>
                  </div>
                  
                  {buyLots.length > 1 && (
                    <div className={styles.buttonGroup}>
                      <label className={styles.label}>&nbsp;</label>
                      <button
                        type="button"
                        className={styles.removeLotButton}
                        onClick={() => setBuyLots((prev) => prev.filter((_, i) => i !== index))}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.lotsSummary}>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Capital desde compras:</span>
                <span className={styles.breakdownValue}>${lotsSummary.totalUsd.toFixed(2)}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>USDT comprados:</span>
                <span className={styles.breakdownValue}>{lotsSummary.totalUsdt.toFixed(2)} USDT</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Precio promedio:</span>
                <span className={styles.breakdownValue}>{lotsSummary.avgPrice > 0 ? lotsSummary.avgPrice.toFixed(2) : '-'} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightPane}>
        {results && <P2PResults results={results} />}
      </div>
    </div>
  )
}

export default P2PCalculator
