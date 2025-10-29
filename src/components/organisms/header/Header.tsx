import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import styles from './Header.module.css'
import Logo from '../../atoms/logo/Logo'
import PrimaryButton from '../../atoms/primary-button/PrimaryButton'
import NavLinkItem from '../../molecules/nav-link-item/NavLinkItem'
import ImgLogo from '../../../assets/images/isotipo-2d.png'
import { headerData } from '../../../data/appData'
import { getIdToken, isJwtTokenValid } from '../../../config/services/token.services'

const Header = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Función para navegar al login o dashboard
  const handleAuth = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/auth')
    }
  }

  useEffect(() => {
    // Check if user is authenticated
    const token = getIdToken()
    const isValid = token ? isJwtTokenValid(token) : false
    setIsAuthenticated(isValid)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const isMobile = window.innerWidth <= 768
      
      // Para desktop: cambiar padding cuando scroll > 50px
      if (!isMobile) {
        setIsScrolled(scrollTop > 50)
      }
      
      // Para móviles: ocultar/mostrar basado en dirección de scroll
      if (isMobile) {
        // Si el menú móvil está abierto y hay scroll, cerrarlo
        if (isMobileMenuOpen && Math.abs(scrollTop - lastScrollY) > 5) {
          setIsMobileMenuOpen(false)
        }
        
        if (scrollTop > lastScrollY && scrollTop > 100) {
          // Scrolling hacia abajo y más de 100px - ocultar navbar
          setIsVisible(false)
        } else if (scrollTop < lastScrollY) {
          // Scrolling hacia arriba - mostrar navbar
          setIsVisible(true)
        }
        setLastScrollY(scrollTop)
      } else {
        // En desktop siempre visible
        setIsVisible(true)
      }
    }

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768
      
      // Si cambiamos a desktop y el menú móvil está abierto, cerrarlo
      if (!isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    // Cleanup del event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [lastScrollY, isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }


  return (
    <div className={`${styles.ctn_main} ${isScrolled ? styles.scrolled : ''} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.ctn_content}>
        <Logo img={ImgLogo} alt={headerData.logo.alt} width={headerData.logo.width} />

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navigation}>
            {headerData.navigation.map((item, index) => (
              <NavLinkItem 
                key={index}
                to={item.to}
              >
                {item.label}
              </NavLinkItem>
            ))}
          </ul>
        </nav>

        {/* Desktop Button */}
        <div className={styles.desktopButton}>
          <PrimaryButton 
            text={isAuthenticated ? 'Dashboard' : 'Iniciar Sesión'}
            variant="primary"
            onClick={handleAuth}
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
          <ul className={styles.mobileNavigation}>
            {headerData.navigation.map((item, index) => (
              <NavLinkItem 
                key={index}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLinkItem>
            ))}
          </ul>
          {/* Mobile Button */}
          <div className={styles.mobileButton}>
            <PrimaryButton 
              text={isAuthenticated ? 'Dashboard' : 'Iniciar Sesión'}
              variant="primary"
              onClick={() => {
                handleAuth()
                setIsMobileMenuOpen(false)
              }}
              width="full"
            />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header