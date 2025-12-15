import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { Section } from '../../../data/appData'
import styles from './CourseSyllabus.module.css'

interface CourseSyllabusProps {
  sections: Section[]
  selectedLessonId?: string
  onLessonSelect: (lessonId: string) => void
}

const CourseSyllabus: React.FC<CourseSyllabusProps> = ({ 
  sections, 
  selectedLessonId,
  onLessonSelect 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map(s => s.id))
  )

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <motion.div
      className={styles.syllabus}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Temario del Curso</h3>
        <p className={styles.subtitle}>
          {sections.reduce((total, section) => total + section.lessons.length, 0)} lecciones en total
        </p>
      </div>

      <div className={styles.sections}>
        {sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(section.id)
          
          return (
            <motion.div
              key={section.id}
              className={styles.section}
              variants={sectionVariants}
            >
              <button
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.id)}
              >
                <div className={styles.sectionTitleContainer}>
                  <span className={styles.sectionNumber}>{sectionIndex + 1}</span>
                  <h4 className={styles.sectionTitle}>{section.title}</h4>
                </div>
                <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                  ▼
                </span>
              </button>

              <motion.div
                className={styles.lessons}
                initial={false}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                variants={{
                  expanded: {
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3, ease: 'easeInOut' },
                      opacity: { duration: 0.2, delay: 0.1 }
                    }
                  },
                  collapsed: {
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: 'easeInOut' },
                      opacity: { duration: 0.2 }
                    }
                  }
                }}
                style={{ 
                  overflow: 'hidden'
                }}
              >
                {section.lessons.map((lesson, lessonIndex) => {
                  const isSelected = selectedLessonId === lesson.id
                  
                  return (
                    <button
                      key={lesson.id}
                      className={`${styles.lesson} ${isSelected ? styles.selected : ''}`}
                      onClick={() => onLessonSelect(lesson.id)}
                    >
                      <span className={styles.lessonIcon}>
                        {isSelected ? '▶' : '○'}
                      </span>
                      <span className={styles.lessonTitle}>{lesson.title}</span>
                      {lesson.duration && (
                        <span className={styles.lessonDuration}>{lesson.duration}</span>
                      )}
                    </button>
                  )
                })}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default CourseSyllabus

