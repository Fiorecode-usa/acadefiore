import React from 'react'
import { motion } from 'framer-motion'
import CourseCard from '../../molecules/course-card/CourseCard'
import styles from './CoursesSection.module.css'
import type { CourseData } from '../../../data/appData'

export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  type: string
  lessons: number
  duration: string
  price: string
  gradientFrom: string
  gradientTo: string
  badge?: string
  logo?: string
}

interface CoursesSectionProps {
  courses: CourseData[]
  onCourseSelect: (courseId: string) => void
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, onCourseSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.section 
      className={styles.coursesSection}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cursos Disponibles</h2>
          <p className={styles.subtitle}>
            Selecciona el curso que deseas ver y comenzar a aprender
          </p>
        </div>

        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onClick={() => onCourseSelect(course.id)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default CoursesSection

