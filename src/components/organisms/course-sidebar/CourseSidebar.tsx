import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import CourseSyllabus from '../course-syllabus/CourseSyllabus'
import { appData } from '../../../data/appData'
import { useCourse } from '../../../context/CourseContext'
import styles from './CourseSidebar.module.css'

const CourseSidebar: React.FC = () => {
  const location = useLocation()
  const { selectedLessonId, setSelectedLessonId } = useCourse()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Determinar qué curso está activo basado en la ruta
  const getCourseSyllabus = () => {
    if (location.pathname.includes('trading')) {
      return appData.tradingModule1Syllabus
    }
    // Si no es trading, no mostrar sidebar (por ejemplo, para P2P)
    return null
  }

  const syllabus = getCourseSyllabus()

  // Si no hay syllabus para este curso, no mostrar el sidebar
  if (!syllabus) {
    return null
  }

  // Seleccionar la primera lección por defecto
  useEffect(() => {
    if (syllabus.length > 0 && !selectedLessonId) {
      const firstLesson = syllabus[0].lessons[0]
      if (firstLesson) {
        setSelectedLessonId(firstLesson.id)
      }
    }
  }, [syllabus, selectedLessonId, setSelectedLessonId])

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId)
    // Cerrar el sidebar en móvil después de seleccionar una lección
    setIsMobileOpen(false)
    // Aquí podrías emitir un evento o usar un contexto para notificar al componente de video
  }

  return (
    <>
      {/* Botón para abrir sidebar en móvil */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsMobileOpen(true)}
        aria-label="Abrir temario"
      >
        <span className={styles.sidebarToggleIcon}>📋</span>
        <span className={styles.sidebarToggleText}>Temario</span>
      </button>

      {/* Overlay para cerrar sidebar en móvil */}
      {isMobileOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop */}
      <div className={styles.sidebarDesktop}>
        <CourseSyllabus
          sections={syllabus}
          selectedLessonId={selectedLessonId || undefined}
          onLessonSelect={handleLessonSelect}
        />
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`${styles.sidebarMobile} ${isMobileOpen ? styles.open : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Temario del Curso</h3>
          <button
            className={styles.sidebarClose}
            onClick={() => setIsMobileOpen(false)}
            aria-label="Cerrar temario"
          >
            ✕
          </button>
        </div>
        <div className={styles.sidebarContent}>
          <CourseSyllabus
            sections={syllabus}
            selectedLessonId={selectedLessonId || undefined}
            onLessonSelect={handleLessonSelect}
          />
        </div>
      </div>
    </>
  )
}

export default CourseSidebar

