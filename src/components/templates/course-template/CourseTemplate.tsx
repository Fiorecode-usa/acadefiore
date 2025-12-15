import React from 'react'
import { Outlet, useLocation } from 'react-router'
import styles from './CourseTemplate.module.css'
import CourseSidebar from '../../organisms/course-sidebar/CourseSidebar'
import { CourseProvider } from '../../../context/CourseContext'

const CourseTemplate: React.FC = () => {
  const location = useLocation()
  // Determinar si hay sidebar basado en la ruta
  const hasSidebar = location.pathname.includes('trading')

  return (
    <CourseProvider>
      <div className={styles.layout}>

        <main className={styles.ctn_content}>
          <CourseSidebar />
          <div className={`${styles.courseContent} ${!hasSidebar ? styles.noSidebar : ''}`}>
            <Outlet/>
          </div>
        </main>
      </div>
    </CourseProvider>
  )
}

export default CourseTemplate