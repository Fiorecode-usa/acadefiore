import React from 'react'
import styles from './AdsCard.module.css'

interface AdsCardProps {
  type: 'venta' | 'compra'
  price: string
  minAmount: string
  maxAmount: string
  paymentMethod: string
  email: string
  timeLimit: string
  terms: string[]
  reciboObligatorio: boolean
  countries: string[]
}

const AdsCard: React.FC<AdsCardProps> = ({
  type,
  price,
  minAmount,
  maxAmount,
  paymentMethod,
  email,
  timeLimit,
  terms,
  reciboObligatorio: _reciboObligatorio,
  countries
}) => {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.header}>
        <h3 className={styles.type}>{type === 'venta' ? 'VENTA' : 'COMPRA'}</h3>
        <div className={styles.priceInfo}>
          <span className={styles.priceLabel}>Precio fijo</span>
          <span className={styles.priceValue}>{price}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Con Fiat:</span>
            <span className={styles.value}>Máximo USDT disponibles</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Orden Limit:</span>
            <span className={styles.value}>{minAmount} - {maxAmount}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Método de pago:</span>
            <span className={styles.value}>{paymentMethod}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Email:</span>
            <span className={styles.email}>{email}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Tiempo límite:</span>
            <span className={styles.value}>{timeLimit}</span>
          </div>
        </div>

        {terms.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Etiquetas de términos:</h4>
            <div className={styles.tags}>
              {terms.map((term, index) => (
                <span key={index} className={styles.tag}>{term}</span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Países recomendados:</h4>
          <div className={styles.countries}>
            {countries.map((country, index) => (
              <span key={index} className={styles.countryTag}>
                🌍 {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdsCard
