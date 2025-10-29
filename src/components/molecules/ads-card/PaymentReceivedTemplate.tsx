import React, { useState } from 'react'
import styles from './PaymentTemplate.module.css'
import PrimaryButton from '../../atoms/primary-button/PrimaryButton'

interface PaymentReceivedTemplateProps {
  isBusinessAccount: boolean
}

const PaymentReceivedTemplate: React.FC<PaymentReceivedTemplateProps> = ({ isBusinessAccount }) => {
  const [copied, setCopied] = useState(false)

  // Generar el texto de la plantilla para cuando yo transfiero
  const templateText = `¡Hola! 👋 Te haré el pago según las siguientes condiciones.

Método de Pago: Zelle 🇺🇸

${
  isBusinessAccount
    ? '⚠️ INFORMACIÓN IMPORTANTE: Te transferiré desde mi cuenta EMPRESARIAL, no desde mi cuenta personal. Toma en cuenta esto para identificar el pago.\n\n'
    : ''
}Información de Pago:

Voy a transferir desde mi cuenta Zelle.

Proceso de Pago y Confirmación:

1. Realizaré la transferencia Zelle.
2. Notificaré inmediatamente por el chat de Binance que ya envié el pago.
3. Por favor, revisa tu cuenta y confirma cuando recibas el dinero.
4. Una vez confirmes la recepción del pago, procederé a liberar los USDT inmediatamente.`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(templateText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className={styles.templateBox}>
      <div className={styles.header}>
        <h4>📋 Plantilla de Mensaje</h4>
        <PrimaryButton
          variant="secondary"
          text={copied ? '✓ Copiado' : '📋 Copiar'}
          onClick={handleCopy}
          width="auto"
        />
      </div>
      
      <div className={styles.textArea}>
        <pre className={styles.templateText}>{templateText}</pre>
      </div>
    </div>
  )
}

export default PaymentReceivedTemplate
