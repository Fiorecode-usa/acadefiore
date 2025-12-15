import React from 'react'
import { useNavigate } from 'react-router'
import styles from './DashboardPage.module.css'
import CoursesSection from '../../../components/organisms/courses-section/CoursesSection'
import { appData } from '../../../data/appData'

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const handleCourseSelect = (courseId: string) => {
    navigate(`/dashboard/course/${courseId}`)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <CoursesSection 
          courses={appData.courses}
          onCourseSelect={handleCourseSelect}
        />
      </div>
    </div>
  )
}

export default DashboardPage
