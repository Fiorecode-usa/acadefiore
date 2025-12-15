import React from 'react'
import { motion } from 'framer-motion'
import styles from './CourseCard.module.css'

export interface CourseCardProps {
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
  onClick: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  description,
  type,
  lessons,
  duration,
  price,
  gradientFrom,
  gradientTo,
  badge,
  logo,
  onClick
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div 
        className={styles.header}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        }}
      >
        <div className={styles.headerTop}>
          {badge && (
            <div className={styles.badge}>
              {badge}
            </div>
          )}
        </div>
        
        <div className={styles.headerContent}>
          {logo && (
            <div className={styles.logoContainer}>
              <span className={styles.logo}>{logo}</span>
            </div>
          )}
          <div className={styles.headerText}>
            <h3 className={styles.courseName}>{title}</h3>
            <p className={styles.courseSubtitle}>{subtitle}</p>
          </div>
        </div>

        <div className={styles.headerPatterns}>
          <div className={styles.pattern}></div>
          <div className={styles.pattern}></div>
          <div className={styles.pattern}></div>
        </div>
      </div>

      <div className={styles.body}>
        <h4 className={styles.bodyTitle}>{title}</h4>
        
        <div className={styles.courseInfo}>
          <span className={styles.courseIcon}>📺</span>
          <span className={styles.courseType}>{type} • {lessons} lecciones</span>
        </div>

        <div className={styles.courseInfo}>
          <span className={styles.courseIcon}>🕗</span>
          <span className={styles.courseType}>Tiempo • {duration}</span>
        </div>

        <p className={styles.courseDescription}>{description}</p>

        <div className={styles.priceContainer}>
          <span className={styles.price}>{price}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard


