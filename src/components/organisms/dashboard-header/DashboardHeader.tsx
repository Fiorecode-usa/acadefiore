import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './DashboardHeader.module.css'
import Logo from '../../atoms/logo/Logo'
import PrimaryButton from '../../atoms/primary-button/PrimaryButton'
import ImgLogo from '../../../assets/images/isotipo-2d.png'
import { clearTokens } from '../../../config/services/token.services'
import NavLinkItem from '../../molecules/nav-link-item/NavLinkItem'

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    clearTokens()
    navigate('/auth')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Logo img={ImgLogo} alt="FZ Academy Logo" width={40} />

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <NavLinkItem to="/" routerDom={true}> Inicio</NavLinkItem>
          <NavLinkItem to="/dashboard" routerDom={true}> Cursos</NavLinkItem>
          <NavLinkItem to="/dashboard/calculator" routerDom={true}> Calculadora P2P</NavLinkItem>
        </nav>

        {/* Desktop Button */}
        <div className={styles.desktopButton}>
          <PrimaryButton 
            text="Cerrar Sesión"
            variant="primary"
            onClick={handleLogout}
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <NavLinkItem to="/" routerDom={true}> Inicio</NavLinkItem>
          <NavLinkItem to="/dashboard" routerDom={true}> Cursos</NavLinkItem>
          <NavLinkItem to="/dashboard/calculator" routerDom={true}> Calculadora P2P</NavLinkItem>
          
          {/* Mobile Button */}
          <div className={styles.mobileButton}>
            <PrimaryButton 
              text="Cerrar Sesión"
              variant="primary"
              onClick={handleLogout}
              width="full"
            />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default DashboardHeader

