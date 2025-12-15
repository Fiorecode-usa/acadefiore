import { Outlet } from 'react-router'
import styles from './DashboardTemplate.module.css'
import DashboardHeader from '../../organisms/dashboard-header/DashboardHeader'

const DashboardTemplate = () => {
    // Template base para todas las páginas de dashboard
    // Proporciona el layout común para el dashboard
    return (
      <div className={styles.layout}>
        {/* Gradiente animado de fondo */}
        <div className={styles.animatedBackground}></div>
        <DashboardHeader />
  
        {/* Contenedor del dashboard */}
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
    )
}

export default DashboardTemplate