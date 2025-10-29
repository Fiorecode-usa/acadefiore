import React from 'react'
import { useNavigate } from 'react-router'
import styles from './DashboardPage.module.css'
import AdsCard from '../../../components/molecules/ads-card/AdsCard'
import PaymentTemplate from '../../../components/molecules/ads-card/PaymentTemplate'
import PaymentReceivedTemplate from '../../../components/molecules/ads-card/PaymentReceivedTemplate'
import CourseVideoSection from '../../../components/organisms/course-video-section/CourseVideoSection'
import { clearTokens } from '../../../config/services/token.services'

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearTokens()
    navigate('/auth')
  }

  const handleGoToLanding = () => {
    navigate('/')
  }

  // Datos para la card de venta
  const ventaData = {
    type: 'venta' as const,
    price: '1.035',
    minAmount: '50 USD',
    maxAmount: '1500 USD (máximo 2k)',
    paymentMethod: 'Zelle',
    email: 'ASK',
    timeLimit: '15 minutos',
    terms: ['Recibo de pago obligatorio'],
    reciboObligatorio: true,
    countries: ['Argentina', 'Venezuela', 'Brasil', 'India', 'Francia', 'Indonesia']
  }

  // Datos para la card de compra
  const compraData = {
    type: 'compra' as const,
    price: '1.003',
    minAmount: '50 USD',
    maxAmount: '1010 USD',
    paymentMethod: 'Zelle',
    email: 'ASK',
    timeLimit: '15 minutos',
    terms: ['Recibo de pago obligatorio'],
    reciboObligatorio: false,
    countries: ['Argentina', 'Venezuela', 'Brasil', 'India', 'Francia', 'Indonesia']
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerActions}>
        <button onClick={handleGoToLanding} className={styles.actionButton}>
          🏠 Ir a Landing Page
        </button>
        <button onClick={() => navigate('/calculator')} className={styles.actionButton}>
          💰 Calculadora de Ganancias
        </button>
        <button onClick={handleLogout} className={styles.actionButton}>
          🔓 Cerrar Sesión
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.videoSection}>
          <CourseVideoSection />
          
          <div className={styles.downloadSection}>
            <a 
              href="https://impkable.com/wp-content/uploads/2025/10/binance.apkm" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              📱 Descargar APK de Binance
            </a>
          </div>
        </section>

        <section className={styles.adsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Ejemplos de Publicaciones</h2>
            <p className={styles.sectionDescription}>
              Esta es la configuración exacta que yo uso para mis operaciones P2P en Binance. 
              Estos ejemplos te muestran cómo estructuro mis publicaciones de venta y compra para 
              maximizar mis ganancias de manera segura.
            </p>
          </div>
          <div className={styles.cardsGrid}>
            <AdsCard {...ventaData} />
            <AdsCard {...compraData} />
          </div>
          
          <div className={styles.scheduleInfo}>
            <div className={styles.scheduleCard}>
              <h3 className={styles.scheduleTitle}>📊 Horario de Venta</h3>
              <p className={styles.scheduleText}>
                Dejo mis publicaciones de venta activas <strong>todo el día</strong>, 
                así puedo realizar otras actividades mientras espero las transacciones.
              </p>
              <p className={styles.scheduleTimes}>
                ⏰ Disponible <strong>24 horas</strong>
              </p>
            </div>
            
            <div className={styles.scheduleCard}>
              <h3 className={styles.scheduleTitle}>🕐 Horario de Compra</h3>
              <p className={styles.scheduleText}>
                Para este precio de <strong>1.003</strong>, el horario óptimo para realizar compras es:
              </p>
              <p className={styles.scheduleTimes}>
                🌙 <strong>11:00 PM - 2:00 AM</strong> (primer horario óptimo)<br/>
                🌅 <strong>4:00 AM - 8:00 AM</strong> (segundo horario óptimo)
              </p>
            </div>
          </div>
        </section>

        <section className={styles.templatesSection}>
          <h2 className={styles.sectionTitle}>Plantillas de Mensaje - Cuando Ellos Me Transfieren</h2>
          <div className={styles.templatesGrid}>
            <div className={styles.templateContainer}>
              <h3 className={styles.templateSubtitle}>📱 Para Cuenta Personal</h3>
              <PaymentTemplate 
                isBusinessAccount={false}
              />
            </div>
            
            <div className={styles.templateContainer}>
              <h3 className={styles.templateSubtitle}>🏢 Para Cuenta Empresarial</h3>
              <PaymentTemplate 
                isBusinessAccount={true}
              />
            </div>
          </div>
        </section>

        <section className={styles.templatesSection}>
          <h2 className={styles.sectionTitle}>Plantillas de Mensaje - Cuando Yo Les Transfiero</h2>
          <div className={styles.templatesGrid}>
            <div className={styles.templateContainer}>
              <h3 className={styles.templateSubtitle}>📱 Para Cuenta Personal</h3>
              <PaymentReceivedTemplate 
                isBusinessAccount={false}
              />
            </div>
            
            <div className={styles.templateContainer}>
              <h3 className={styles.templateSubtitle}>🏢 Para Cuenta Empresarial</h3>
              <PaymentReceivedTemplate 
                isBusinessAccount={true}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage