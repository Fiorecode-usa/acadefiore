import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Componente que rastrea los cambios de ruta y los envía a Google Analytics
 * Debe estar dentro del BrowserRouter para funcionar correctamente
 */
const PageViewTracker = () => {
  const location = useLocation()

  useEffect(() => {
    // Verificar que gtag esté disponible (Google Analytics cargado)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-WCD5EMZ3QL', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      })
    }
  }, [location])

  return null
}

export default PageViewTracker

