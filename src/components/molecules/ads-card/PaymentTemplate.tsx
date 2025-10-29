import React, { useState } from 'react'
import styles from './PaymentTemplate.module.css'
import PrimaryButton from '../../atoms/primary-button/PrimaryButton'

interface PaymentTemplateProps {
  isBusinessAccount: boolean
}

const PaymentTemplate: React.FC<PaymentTemplateProps> = ({ isBusinessAccount }) => {
  const [copied, setCopied] = useState(false)

  // Generar el texto de la plantilla
  const templateText = `¡Hola! 👋 Por favor, procede con el pago según estas condiciones.

Método de Pago: Zelle 🇺🇸

${
  isBusinessAccount
    ? '⚠️ INFORMACIÓN IMPORTANTE: La transferencia será a mi cuenta EMPRESARIAL, no a mi cuenta personal. Si estás de acuerdo, procede con el pago.\n\n'
    : ''
}Condición Obligatoria:

La cuenta Zelle desde la que envíes el pago DEBE tener el mismo nombre que tu cuenta de Binance verificada. No se aceptan transferencias de terceros ni cuentas con nombres diferentes.

Proceso de Pago y Liberación:

1. Envía el pago y notifica inmediatamente por el chat de Binance.
2. Verificaré el monto exacto en mi cuenta Zelle.
3. Una vez confirmado que el dinero está en mi cuenta ${
  isBusinessAccount
    ? '(empresarial) Y verificado que el nombre en tu cuenta Zelle coincide exactamente con el nombre de tu cuenta de Binance verificada'
    : 'Y verificado que el nombre en tu cuenta Zelle coincide exactamente con el nombre de tu cuenta de Binance verificada'
}, procederé a la liberación inmediata de los fondos.

⚠⚠️ IMPORTANTE: El nombre en la cuenta Zelle desde la que realizas el pago DEBE SER EXACTAMENTE el mismo que aparece en tu cuenta de Binance verificada. No se aceptarán pagos de terceros ni cuentas con nombres diferentes.`

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

export default PaymentTemplate
